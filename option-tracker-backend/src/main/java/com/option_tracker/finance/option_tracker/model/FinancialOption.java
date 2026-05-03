package com.option_tracker.finance.option_tracker.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class FinancialOption {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String ticker;
    private String optionType;
    private double strikePrice;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate expiryDate;

    // Pricing Data
    private Double currentOptionPrice;
    private Double underlyingPrice;
    private Double delta;
    private Double theta;
    private Double impliedVolatility;

    // Derived Values
    public double getDaysToExpiration() {
        return java.time.temporal.ChronoUnit.DAYS.between(LocalDate.now(), this.expiryDate);
    }
}