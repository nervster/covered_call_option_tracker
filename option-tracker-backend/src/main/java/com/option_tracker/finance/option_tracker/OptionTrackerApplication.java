package com.option_tracker.finance.option_tracker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.WebApplicationType;

@SpringBootApplication
public class OptionTrackerApplication {
	public static void main(String[] args) {
		SpringApplication app = new SpringApplication(OptionTrackerApplication.class);
		app.setWebApplicationType(WebApplicationType.SERVLET);
		app.run(args);	}
}