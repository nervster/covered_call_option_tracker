import { useState } from 'react';
import type { OptionData } from '../types/OptionsData';

interface Props {
  onAnalyze: (data: OptionData) => void;
}

export const OptionForm = ({ onAnalyze }: Props) => {
  const [formData, setFormData] = useState<OptionData>({
    ticker: 'TSLA', strikePrice: 200, expiryDate: '',
    optionType: 'CALL', underlyingPrice: 210, currentOptionPrice: 5.50
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAnalyze(formData);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <input placeholder="Ticker" onChange={e => setFormData({...formData, ticker: e.target.value})} />
      <input type="number" placeholder="Strike" onChange={e => setFormData({...formData, strikePrice: Number(e.target.value)})} />
      <input type="date" onChange={e => setFormData({...formData, expiryDate: e.target.value})} />
      <select onChange={e => setFormData({...formData, optionType: e.target.value as any})}>
        <option value="CALL">Call</option>
        <option value="PUT">Put</option>
      </select>
      <input type="number" placeholder="Stock Price" onChange={e => setFormData({...formData, underlyingPrice: Number(e.target.value)})} />
      <button type="submit" style={{ padding: '10px', background: '#007bff', color: 'white', border: 'none' }}>
        Analyze Trade
      </button>
    </form>
  );
};