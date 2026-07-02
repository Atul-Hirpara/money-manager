package com.example.moneymanager;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class MoneyApp {

	public static void main(String[] args) {
		SpringApplication.run(MoneyApp.class, args);
	}

}
