package com.option_tracker.finance.option_tracker.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
@Table(name = "financial_option")
public class FinancialOption {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private String userId;

    // --- Core Transactional Data (The Ledger) ---
    private String ticker;

    @Column(name = "option_type")
    private String optionType; // CALL or PUT

    private int quantity; // Number of contracts (1 contract = 100 shares)

    private double strikePrice;

    private double entryPremium; // Price per share received (e.g., 2.50)

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate tradeDate; // Date the position was opened

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate expiryDate; // Date the contract expires

    // --- Market Context at Entry (The Snapshot) ---
    private Double underlyingPrice; // Stock price at time of entry
    private Double currentOptionPrice; // Market price (used for P/L tracking)
    private Double delta;
    private Double theta;
    private Double impliedVolatility;

    // Derived Values
    public long getDaysToExpiration() {
        if (this.expiryDate == null) return 0;
        return ChronoUnit.DAYS.between(LocalDate.now(), this.expiryDate);
    }

    public double getTotalCredit() {
        return this.quantity * 100 * this.entryPremium;
    }

    /**
     * Calculates the 'Moneyness' percentage.
     * Positive = Out of the Money, Negative = In the Money (for Covered Calls)
     */
    public double getMoneyness() {
        if (underlyingPrice == null || strikePrice == 0) return 0;
        return ((strikePrice - underlyingPrice) / underlyingPrice) * 100;
    }
}