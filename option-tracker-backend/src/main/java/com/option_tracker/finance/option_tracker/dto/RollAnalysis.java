package com.option_tracker.finance.option_tracker.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RollAnalysis {
    private String recommendation; // e.g., "ROLL", "HOLD"
    private String reasoning;      // e.g., "High Theta decay"
    private double targetRollCredit; // Suggested price for the roll
}