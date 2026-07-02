package com.example.moneymanager.controller;

import com.example.moneymanager.dto.ExpenseDTO;
import com.example.moneymanager.dto.FilterDTO;
import com.example.moneymanager.dto.IncomeDTO;
import com.example.moneymanager.service.ExpenseService;
import com.example.moneymanager.service.IncomeService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/filter")
@RequiredArgsConstructor
public class FilterController {

    private final IncomeService incomeService;
    private final ExpenseService expenseService;

    @PostMapping
    public ResponseEntity<?> filterTransactions(@RequestBody FilterDTO filterDTO){
        // preparing the data
        LocalDate startDate = filterDTO.getStartDate() != null ? filterDTO.getStartDate() : LocalDate.MIN;
        LocalDate endDate = filterDTO.getEndDate() != null ? filterDTO.getEndDate() : LocalDate.now();
        String keyword = filterDTO.getKeyword() != null ? filterDTO.getKeyword() : "";
        String sortField = filterDTO.getSortField() != null ? filterDTO.getSortField() : "date";
        Sort.Direction direction = "desc".equalsIgnoreCase(filterDTO.getSortOrder()) ? Sort.Direction.DESC : Sort.Direction.ASC;
        Sort sort = Sort.by(direction , sortField);

        // check filter is used for income or expense
        if("income".equalsIgnoreCase(filterDTO.getType())){
            List<IncomeDTO> filterIncomes = incomeService.filterIncomes(startDate , endDate , keyword , sort);
            return ResponseEntity.ok(filterIncomes);
        } else if ("expense".equalsIgnoreCase(filterDTO.getType())) {
            List<ExpenseDTO> filterExpenses = expenseService.filterExpenses(startDate , endDate , keyword , sort);
            return ResponseEntity.ok(filterExpenses);
        }
        else {
            return ResponseEntity.badRequest().body("Invalid type. Must be 'income' or 'expense'");
        }

    }
}
