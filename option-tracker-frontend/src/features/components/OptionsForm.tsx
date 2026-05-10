import { useState } from 'react';
import type { OptionData } from '../types/OptionsData';
import { useOptionChain } from '../../api/hooks/useOptionChain';
import { Loader2, MoveRight, Tag } from 'lucide-react';

interface Props {
    onAnalyze: (data: OptionData) => void;
}

export const OptionForm = ({ onAnalyze }: Props) => {
    const [tickerInput, setTickerInput] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [formData, setFormData] = useState<OptionData>({
        ticker: '',
        optionType: 'CALL',
        quantity: 1,
        strikePrice: 0,
        entryPremium: 0,
        tradeDate: new Date().toISOString().split('T')[0],
        expiryDate: '',
        underlyingPrice: 0,
        delta: 0,
        impliedVolatility: 0
    });
    const {
        suggestions,
        searchTickers,
        expirations,
        strikes,
        fetchStrikes,
        loading,
        setSuggestions
    } = useOptionChain(formData.ticker);

    const handleTickerTyping = (val: string) => {
        setTickerInput(val.toUpperCase());
        searchTickers(val);
        setShowSuggestions(true);
    };

    const handleSelectTicker = (symbol: string) => {
        setFormData({ ...formData, ticker: symbol, expiryDate: '', strikePrice: 0 });
        setTickerInput(symbol);
        setSuggestions([]); // Clear suggestions via hook setter
        setShowSuggestions(false);
    };

    return (
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm max-w-2xl mx-auto">
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onAnalyze(formData); }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Ticker Search */}
                    <div className="relative">
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Asset Ticker</label>
                        <div className="relative">
                            <Tag className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                            <input
                                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-600"
                                value={tickerInput}
                                onChange={(e) => handleTickerTyping(e.target.value)}
                                placeholder="Search Ticker..."
                            />
                        </div>

                        {/* Suggestions Dropdown from Hook */}
                        {showSuggestions && suggestions.length > 0 && (
                            <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-xl overflow-hidden">
                                {suggestions.map(s => (
                                    <button
                                        key={s.symbol}
                                        type="button"
                                        onClick={() => handleSelectTicker(s.symbol)}
                                        className="w-full px-4 py-3 text-left hover:bg-slate-50 flex justify-between border-b border-slate-50 last:border-0"
                                    >
                                        <span className="font-bold text-slate-900">{s.symbol}</span>
                                        <span className="text-xs text-slate-500">{s.name}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Expiration Select */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Expiration</label>
                        <select
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none disabled:bg-slate-50"
                            disabled={!expirations.length}
                            value={formData.expiryDate}
                            onChange={(e) => {
                                setFormData({ ...formData, expiryDate: e.target.value });
                                fetchStrikes(e.target.value);
                            }}
                        >
                            <option value="">{loading && !expirations.length ? 'Loading...' : 'Select Date'}</option>
                            {expirations.map(date => <option key={date} value={date}>{date}</option>)}
                        </select>
                    </div>

                    {/* Strike Select */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Strike Price</label>
                        <select
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none disabled:bg-slate-50"
                            disabled={!strikes.length}
                            value={formData.strikePrice || ""}
                            onChange={(e) => setFormData({ ...formData, strikePrice: Number(e.target.value) })}
                        >
                            <option value="">Select Strike</option>
                            {strikes.map(s => <option key={s} value={s}>${s.toFixed(2)}</option>)}
                        </select>
                    </div>

                    {/* Standard Inputs (Premium, Qty, Type) */}
                    {/* ... (Keep your existing inputs for Premium, Quantity, etc.) ... */}

                </div>

                <button
                    type="submit"
                    disabled={!formData.strikePrice || loading}
                    className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all disabled:bg-slate-200"
                >
                    {loading ? <Loader2 className="animate-spin" /> : 'Record & Analyze Trade'}
                    <MoveRight />
                </button>
            </form>
        </div>
    );
};