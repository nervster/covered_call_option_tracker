import { useState } from 'react';
import type { OptionData } from '../types/OptionsData';
import { Calculator, Calendar, DollarSign, Tag, TrendingUp, Hash, Activity, MoveRight } from 'lucide-react';

interface Props {
    onAnalyze: (data: OptionData) => void;
}

export const OptionForm = ({ onAnalyze }: Props) => {
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Validation: Ensure core data is present before sending to Java
        if (formData.ticker && formData.expiryDate && formData.entryPremium > 0) {
            onAnalyze(formData);
        }
    };

    const inputClass = "w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder:text-slate-400 text-slate-900";
    const labelClass = "block text-sm font-semibold text-slate-700 mb-1.5 ml-1";

    return (
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-blue-50 rounded-lg">
                    <Calculator className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900">New Strategy Entry</h3>
                    <p className="text-sm text-slate-500">Record your transaction to calculate net credit</p>
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
                                placeholder="e.g. TSLA"
                                value={formData.ticker}
                                onChange={e => setFormData({ ...formData, ticker: e.target.value.toUpperCase() })}
                            />
                        </div>
                    </div>

                    {/* Quantity */}
                    <div>
                        <label className={labelClass}>Contracts (Quantity)</label>
                        <div className="relative">
                            <Hash className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                            <input
                                type="number"
                                className={inputClass}
                                value={formData.quantity}
                                onChange={e => setFormData({ ...formData, quantity: Number(e.target.value) })}
                            />
                        </div>
                    </div>

                    {/* Strike Price */}
                    <div>
                        <label className={labelClass}>Strike Price</label>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                            <input
                                type="number"
                                step="0.01"
                                className={inputClass}
                                placeholder="0.00"
                                onChange={e => setFormData({ ...formData, strikePrice: Number(e.target.value) })}
                            />
                        </div>
                    </div>

                    {/* Entry Premium (Per Share) */}
                    <div>
                        <label className={labelClass}>Entry Premium (Per Share)</label>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                            <input
                                type="number"
                                step="0.01"
                                className={inputClass}
                                placeholder="e.g. 2.50"
                                onChange={e => setFormData({ ...formData, entryPremium: Number(e.target.value) })}
                            />
                        </div>
                    </div>

                    {/* Trade Date */}
                    <div>
                        <label className={labelClass}>Trade Date</label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                            <input
                                type="date"
                                className={inputClass}
                                value={formData.tradeDate}
                                onChange={e => setFormData({ ...formData, tradeDate: e.target.value })}
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
                                value={formData.expiryDate}
                                onChange={e => setFormData({ ...formData, expiryDate: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Underlying Price at Entry */}
                    <div>
                        <label className={labelClass}>Stock Price at Entry</label>
                        <div className="relative">
                            <TrendingUp className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                            <input
                                type="number"
                                step="0.01"
                                className={inputClass}
                                placeholder="Market Price"
                                onChange={e => setFormData({ ...formData, underlyingPrice: Number(e.target.value) })}
                            />
                        </div>
                    </div>

                    {/* Option Type Select */}
                    <div>
                        <label className={labelClass}>Strategy Type</label>
                        <select
                            className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-900 appearance-none"
                            value={formData.optionType}
                            onChange={e => setFormData({ ...formData, optionType: e.target.value as any })}
                        >
                            <option value="CALL">Covered Call</option>
                            <option value="PUT">Cash Secured Put</option>
                        </select>
                    </div>
                </div>

                {/* Optional Greeks Section */}
                <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-6">
                    <div>
                        <label className={labelClass}>Delta (Optional)</label>
                        <div className="relative">
                            <Activity className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                            <input
                                type="number"
                                step="0.001"
                                className={inputClass}
                                placeholder="0.30"
                                onChange={e => setFormData({ ...formData, delta: Number(e.target.value) })}
                            />
                        </div>
                    </div>
                    <div>
                        <label className={labelClass}>IV % (Optional)</label>
                        <div className="relative">
                            <TrendingUp className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                            <input
                                type="number"
                                step="0.1"
                                className={inputClass}
                                placeholder="45.0"
                                onChange={e => setFormData({ ...formData, impliedVolatility: Number(e.target.value) })}
                            />
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full mt-4 bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg shadow-slate-200 flex items-center justify-center gap-2 group cursor-pointer"
                >
                    Save & Analyze Transaction
                    <MoveRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
            </form>
        </div>
    );
};