package com.option_tracker.finance.option_tracker.repository;

import com.option_tracker.finance.option_tracker.model.FinancialOption;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OptionRepository extends JpaRepository<FinancialOption, Long> {
    List<FinancialOption> findByUserId(String userId);}