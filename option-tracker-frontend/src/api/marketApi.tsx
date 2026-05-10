// src/api/marketApi.ts
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
const ENDPOINT_PREFIX = "api/market";

export const marketApi = {
    // Get all expiration dates for a ticker
    getExpirations: async (ticker: string, token: string): Promise<string[]> => {
        const { data } = await axios.get(`${API_BASE}/${ENDPOINT_PREFIX}/expirations/${ticker}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return data;
    },

    // Get all strikes for a specific ticker and expiration
    getStrikes: async (ticker: string, expiration: string, token: string): Promise<number[]> => {
        const { data } = await axios.get(`${API_BASE}/${ENDPOINT_PREFIX}/strikes/${ticker}/${expiration}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return data;
    },

    // Get real-time Greeks and Price for a specific contract
    getContractSnapshot: async (ticker: string, expiration: string, strike: number, type: string, token: string) => {
        const { data } = await axios.get(`${API_BASE}/${ENDPOINT_PREFIX}/snapshot`, {
            params: { ticker, expiration, strike, type },
            headers: { Authorization: `Bearer ${token}` }
        });
        return data;
    },

    // Pull historical price bars for the "Stair-Step" analysis
    getPriceHistory: async (optionTicker: string, from: string, to: string, token: string) => {
        const { data } = await axios.get(`${API_BASE}/${ENDPOINT_PREFIX}/history/${optionTicker}`, {
            params: { from, to },
            headers: { Authorization: `Bearer ${token}` }
        });
        return data;
    },

    searchTickers: async (query: string, token: string) => {
        const { data } = await axios.get(`${API_BASE}/${ENDPOINT_PREFIX}/search`, {
            params: { query },
            headers: { Authorization: `Bearer ${token}` }
        });
        return data;
    }
};