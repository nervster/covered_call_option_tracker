package com.option_tracker.finance.option_tracker.repository;

import com.option_tracker.finance.option_tracker.model.FinancialOption;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OptionRepository extends JpaRepository<FinancialOption, Long> {
    // JpaRepository gives us save(), findAll(), and findById() for free!
}