package com.option_tracker.finance.option_tracker;

import com.option_tracker.finance.option_tracker.model.FinancialOption;
import com.option_tracker.finance.option_tracker.dto.RollAnalysis;
import com.option_tracker.finance.option_tracker.repository.OptionRepository;
import com.option_tracker.finance.option_tracker.service.OptionMathService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/options")
@CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*")
public class OptionController {

    @Autowired
    private OptionMathService mathService;

    @Autowired
    private OptionRepository optionRepository;

    @GetMapping("/all")
    public List<FinancialOption> getAllOptions() {
        return optionRepository.findAll();
    }

    @PostMapping("/analyze")
    public RollAnalysis analyzeTrade(@RequestBody FinancialOption option) {
        System.out.println("Received Option: " + option.toString());
        System.out.println("HIT CONTROLLER: " + option.getTicker());

        optionRepository.save(option);
        return mathService.analyzeOption(option);
    }
}