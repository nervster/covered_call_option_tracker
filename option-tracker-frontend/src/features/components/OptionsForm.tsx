import { useState } from 'react';
import type { OptionData } from '../types/OptionsData';
import { Calculator, Calendar, DollarSign, Tag, TrendingUp } from 'lucide-react';

interface Props {
    onAnalyze: (data: OptionData) => void;
}

export const OptionForm = ({ onAnalyze }: Props) => {
    const [formData, setFormData] = useState<OptionData>({
        ticker: 'TSLA',
        strikePrice: 200,
        expiryDate: '',
        optionType: 'CALL',
        underlyingPrice: 210,
        currentOptionPrice: 5.50
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAnalyze(formData);
    };

    const inputClass = "w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-slate-400 text-slate-900";
    const labelClass = "block text-sm font-semibold text-slate-700 mb-1.5 ml-1";

    return (
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-blue-50 rounded-lg">
                    <Calculator className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900">Trade Entry</h3>
                    <p className="text-sm text-slate-500">Enter position details for analysis</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Ticker Input */}
                    <div>
                        <label className={labelClass}>Asset Ticker</label>
                        <div className="relative">
                            <Tag className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                            <input
                                className={inputClass}
                                placeholder="e.g. NVDA"
                                value={formData.ticker}
                                onChange={e => setFormData({ ...formData, ticker: e.target.value.toUpperCase() })}
                            />
                        </div>
                    </div>

                    {/* Option Type Select */}
                    <div>
                        <label className={labelClass}>Contract Type</label>
                        <select
                            className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-900 appearance-none"
                            onChange={e => setFormData({ ...formData, optionType: e.target.value as any })}
                        >
                            <option value="CALL">Call Option</option>
                            <option value="PUT">Put Option</option>
                        </select>
                    </div>

                    {/* Strike Price */}
                    <div>
                        <label className={labelClass}>Strike Price</label>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                            <input
                                type="number"
                                className={inputClass}
                                placeholder="0.00"
                                onChange={e => setFormData({ ...formData, strikePrice: Number(e.target.value) })}
                            />
                        </div>
                    </div>

                    {/* Expiry Date */}
                    <div>
                        <label className={labelClass}>Expiration Date</label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                            <input
                                type="date"
                                className={inputClass}
                                onChange={e => setFormData({ ...formData, expiryDate: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Underlying Price */}
                    <div>
                        <label className={labelClass}>Current Stock Price</label>
                        <div className="relative">
                            <TrendingUp className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                            <input
                                type="number"
                                className={inputClass}
                                placeholder="0.00"
                                onChange={e => setFormData({ ...formData, underlyingPrice: Number(e.target.value) })}
                            />
                        </div>
                    </div>

                    {/* Current Premium */}
                    <div>
                        <label className={labelClass}>Option Premium (Market)</label>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                            <input
                                type="number"
                                className={inputClass}
                                placeholder="0.00"
                                onChange={e => setFormData({ ...formData, currentOptionPrice: Number(e.target.value) })}
                            />
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full mt-4 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg shadow-slate-200 flex items-center justify-center gap-2 group"
                >
                    Analyze Stair-Step Roll
                    <MoveRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
            </form>
        </div>
    );
};

// Simple icon import for the button
import { MoveRight } from 'lucide-react';