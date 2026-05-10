package com.option_tracker.finance.option_tracker;

import com.option_tracker.finance.option_tracker.service.MarketDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/market")
@CrossOrigin(origins = "*") // Update this to your production URL later
public class MarketDataController {

    @Autowired
    private MarketDataService marketDataService;

    @GetMapping("/expirations/{ticker}")
    public ResponseEntity<List<String>> getExpirations(@PathVariable String ticker) {
        return ResponseEntity.ok(marketDataService.getExpirationDates(ticker));
    }

    @GetMapping("/strikes/{ticker}/{expiration}")
    public ResponseEntity<List<Double>> getStrikes(
            @PathVariable String ticker,
            @PathVariable String expiration) {

        List<Double> strikes = marketDataService.getStrikes(ticker, expiration);

        if (strikes.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(strikes);
    }

    @GetMapping("/history/{optionTicker}")
    public ResponseEntity<Map<String, Object>> getHistory(
            @PathVariable String optionTicker,
            @RequestParam String from,
            @RequestParam String to) {
        return ResponseEntity.ok(marketDataService.getHistoricalHistory(optionTicker, from, to));
    }

    @GetMapping("/search")
    public ResponseEntity<List<Map<String, String>>> searchTickers(@RequestParam String query) {
        return ResponseEntity.ok(marketDataService.searchTickers(query));
    }
}