package com.option_tracker.finance.option_tracker.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class MarketDataService {

    @Value("${massive.api.key}")
    private String apiKey;

    @Value("${massive.base.url}")
    private String baseUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    public List<String> getExpirationDates(String ticker) {
        double price = getLatestPrice(ticker);

        long strikeTarget = Math.round(price / 10.0) * 10;
        String strikeFilter = (strikeTarget > 0) ? "&strike_price=" + strikeTarget : "";

        String url = String.format(
                "%s/v3/reference/options/contracts?underlying_ticker=%s%s&contract_type=call&expired=false&limit=1000&apiKey=%s",
                baseUrl, ticker.toUpperCase(), strikeFilter, apiKey
        );

        ResponseEntity<Map<String, Object>> responseEntity = restTemplate.exchange(
                url,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<Map<String, Object>>() {}
        );
        Map<String, Object> response = responseEntity.getBody();

        if (response == null || !response.containsKey("results")) {
            return Collections.emptyList();
        }

        @SuppressWarnings("unchecked")
        List<Map<String, Object>> results = (List<Map<String, Object>>) response.get("results");

        List<String> data = results.stream()
                .map(res -> (String) res.get("expiration_date"))
                .distinct()
                .sorted()
                .collect(Collectors.toList());

        return data;
    }

    public List<Double> getStrikes(String ticker, String expiration) {
        // Massive Endpoint for option contracts
        String url = String.format("%s/v3/reference/options/contracts?underlying_ticker=%s&expiration_date=%s&limit=1000&apiKey=%s",
                baseUrl, ticker.toUpperCase(), expiration, apiKey);

        try {
            ResponseEntity<Map<String, Object>> responseEntity = restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    null,
                    new ParameterizedTypeReference<Map<String, Object>>() {}
            );
            Map<String, Object> response = responseEntity.getBody();

            if (response != null && response.containsKey("results")) {
                @SuppressWarnings("unchecked")
                List<Map<String, Object>> results = (List<Map<String, Object>>) response.get("results");

                return results.stream()
                        .map(res -> {
                            // Massive returns strike_price as a Number (Double or Integer)
                            Object strike = res.get("strike_price");
                            return strike instanceof Number ? ((Number) strike).doubleValue() : 0.0;
                        })
                        .filter(strike -> strike > 0)
                        .distinct()
                        .sorted() // Professional UI: Strikes must be in ascending order
                        .collect(Collectors.toList());
            }
        } catch (Exception e) {
            // Log error in a real app: System.out.println("Error fetching strikes: " + e.getMessage());
            return Collections.emptyList();
        }
        return Collections.emptyList();
    }

    public Map<String, Object> getHistoricalHistory(String ticker, String from, String to) {
        // Massive uses O:TickerYearMonthDayTypeStrike format for options aggregates
        String url = String.format("%s/v2/aggs/ticker/%s/range/1/day/%s/%s?apiKey=%s",
                baseUrl, ticker, from, to, apiKey);
        
        ResponseEntity<Map<String, Object>> responseEntity = restTemplate.exchange(
                url,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<Map<String, Object>>() {}
        );
        return responseEntity.getBody();
    }

    public List<Map<String, String>> searchTickers(String query) {
        // Only search if the query is at least 2 characters to save API calls
        if (query == null || query.length() < 2) return Collections.emptyList();

        String url = String.format("https://query2.finance.yahoo.com/v1/finance/search?q=%s&quotesCount=10&newsCount=0", query);
        HttpHeaders headers = new HttpHeaders();
        // Use a real browser User-Agent
        headers.set("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36");

        HttpEntity<String> entity = new HttpEntity<>(headers);
        try {
            ResponseEntity<Map<String, Object>> responseEntity = restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    entity,
                    new ParameterizedTypeReference<Map<String, Object>>() {}
            );
            Map<String, Object> response = responseEntity.getBody();
            
            if (response == null || !response.containsKey("quotes")) {
                return Collections.emptyList();
            }

            @SuppressWarnings("unchecked")
            List<Map<String, Object>> results = (List<Map<String, Object>>) response.get("quotes");

            return results.stream().map(res -> {
                Map<String, String> map = new HashMap<>();
                map.put("symbol", (String) res.get("symbol"));
                map.put("name", (String) res.get("longname"));
                return map;
            }).collect(Collectors.toList());
        } catch (Exception e) {
            return Collections.emptyList();
        }
    }

    public double getLatestPrice(String ticker) {
        // Yahoo Finance chart endpoint for the last 1-day interval
        String url = String.format("https://query2.finance.yahoo.com/v8/finance/chart/%s?interval=1m&range=1d", ticker.toUpperCase());

        HttpHeaders headers = new HttpHeaders();
        headers.set("User-Agent", "Mozilla/5.0"); // Essential to avoid 429/403
        HttpEntity<String> entity = new HttpEntity<>(headers);

        try {
            ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.GET, entity, Map.class);
            Map<String, Object> chart = (Map<String, Object>) response.getBody().get("chart");
            List<Map<String, Object>> result = (List<Map<String, Object>>) chart.get("result");
            Map<String, Object> meta = (Map<String, Object>) result.get(0).get("meta");

            // 'regularMarketPrice' is the most reliable current price field
            Object price = meta.get("regularMarketPrice");
            return price instanceof Number ? ((Number) price).doubleValue() : 0.0;
        } catch (Exception e) {
            return 0.0;
        }
    }
}
