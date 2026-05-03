package com.option_tracker.finance.option_tracker.service;

import com.option_tracker.finance.option_tracker.model.FinancialOption;
import com.option_tracker.finance.option_tracker.dto.RollAnalysis;
import org.springframework.stereotype.Service;

@Service
public class OptionMathService {

    public RollAnalysis analyzeOption(FinancialOption option) {
        double dte = option.getDaysToExpiration();
        
        if (dte <= 14) {
            return new RollAnalysis(
                    "ROLL",
                    "DTE is " + dte + ". Time value is dropping fast. Look to roll for more premium.",
                    option.getCurrentOptionPrice() * 1.15
            );
        }

        if (option.getUnderlyingPrice() >= option.getStrikePrice() && option.getOptionType().equals("CALL")) {
            return new RollAnalysis(
                    "DANGER",
                    "Option is In-The-Money. Rolling up and out is recommended to avoid assignment.",
                    0.0
            );
        }

        return new RollAnalysis("HOLD", "Strategy is performing well. No action needed.", 0.0);
    }
}