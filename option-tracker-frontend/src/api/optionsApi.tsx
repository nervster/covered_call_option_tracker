import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

export const optionsApi = {
  // We'll pass the token from our custom hooks
  fetchHistory: (token: string) => 
    apiClient.get('/api/options/all', {
      headers: { Authorization: `Bearer ${token}` }
    }),

  analyzeTrade: (payload: any, token: string) => 
    apiClient.post('/api/options/analyze', payload, {
      headers: { Authorization: `Bearer ${token}` }
    }),
};