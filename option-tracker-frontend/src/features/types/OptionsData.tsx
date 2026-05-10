export interface OptionData {
    ticker: string;
    strikePrice: number;
    expiryDate: string;
    optionType: 'CALL' | 'PUT';
    underlyingPrice: number;
    currentOptionPrice: number;
}

export interface AnalysisResponse {
    recommendation: string;
    reasoning: string;
    targetRollCredit: number;
}