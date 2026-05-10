package com.option_tracker.finance.option_tracker;

import com.option_tracker.finance.option_tracker.model.FinancialOption;
import com.option_tracker.finance.option_tracker.dto.RollAnalysis;
import com.option_tracker.finance.option_tracker.repository.OptionRepository;
import com.option_tracker.finance.option_tracker.service.OptionMathService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/options")
@CrossOrigin(origins = {"http://localhost:5173", "https://covered-call-option-tracker.vercel.app/"}, allowedHeaders = "*")
public class OptionController {

    @Autowired
    private OptionMathService mathService;

    @Autowired
    private OptionRepository optionRepository;

    @GetMapping("/all")
    public List<FinancialOption> getAllOptions(@AuthenticationPrincipal Jwt jwt) {
        String userId = jwt.getSubject();
        return optionRepository.findByUserId(userId);
    }

    @PostMapping("/analyze")
    public FinancialOption analyzeAndSave(@RequestBody FinancialOption option, @AuthenticationPrincipal Jwt jwt) {
        String userId = jwt.getSubject();
        option.setUserId(userId);

        // Add your 'stair-step' analysis logic here...

        return optionRepository.save(option);
    }
}