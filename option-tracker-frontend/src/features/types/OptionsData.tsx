export interface OptionData {
    id?: number;              // Optional for new entries
    userId?: string;          // Managed by Clerk
    ticker: string;
    optionType: 'CALL' | 'PUT';
    quantity: number;
    strikePrice: number;
    entryPremium: number;     // Price per share at entry

    // Dates stored as ISO strings (YYYY-MM-DD)
    tradeDate: string;
    expiryDate: string;

    // Market Context (Optional/Greeks)
    underlyingPrice?: number;
    currentOptionPrice?: number;
    delta?: number;
    theta?: number;
    impliedVolatility?: number;

    // Derived values from Backend (Optional)
    daysToExpiration?: number;
}

export interface AnalysisResponse {
    recommendation: string;
    reasoning: string;
    targetRollCredit: number;
}