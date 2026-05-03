package com.option_tracker.finance.option_tracker;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.HashMap;

@RestController
public class HealthCheckController {

    @GetMapping("/api/status")
    public Map<String, String> getStatus() {
        HashMap<String, String> map = new HashMap<>();
        map.put("status", "Live");
        map.put("message", "Options Engine is running");
        map.put("engine", "Java 21");
        return map;
    }
}