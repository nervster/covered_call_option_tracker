import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { marketApi } from '../marketApi';

export const useOptionChain = (ticker: string) => {
  const { getToken } = useAuth();
  const [suggestions, setSuggestions] = useState<{symbol: string, name: string}[]>([]);
  const [expirations, setExpirations] = useState<string[]>([]);
  const [strikes, setStrikes] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  

  // 1. Handle Ticker Autocomplete
  const searchTickers = useCallback(async (query: string) => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }
    try {
      const token = await getToken();
      const data = await marketApi.searchTickers(query, token!);
      setSuggestions(data);
    } catch (err) {
      console.error("Ticker search failed", err);
    }
  }, [getToken]);

  // 2. Fetch Expirations when a ticker is locked in
  useEffect(() => {
    if (!ticker) {
      setExpirations([]);
      setStrikes([]);
      return;
    }

    const loadChain = async () => {
      setLoading(true);
      try {
        const token = await getToken();
        const data = await marketApi.getExpirations(ticker, token!);
        setExpirations(data);
      } catch (err) {
        console.error("Failed to fetch expirations");
      } finally {
        setLoading(false);
      }
    };

    loadChain();
  }, [ticker, getToken]);

  // 3. Fetch Strikes for a specific date
  const fetchStrikes = async (expiration: string) => {
    setLoading(true);
    try {
      const token = await getToken();
      const data = await marketApi.getStrikes(ticker, expiration, token!);
      setStrikes(data);
    } catch (err) {
      console.error("Failed to fetch strikes");
    } finally {
      setLoading(false);
    }
  };

  return { 
    suggestions, 
    searchTickers, 
    expirations, 
    strikes, 
    fetchStrikes, 
    loading,
    setSuggestions // Useful for closing the dropdown after selection
  };
};