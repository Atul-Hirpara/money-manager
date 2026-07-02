package com.example.moneymanager.service;

import com.example.moneymanager.dto.ExpenseDTO;
import com.example.moneymanager.dto.IncomeDTO;
import com.example.moneymanager.dto.RecentTransactionDTO;
import com.example.moneymanager.entity.ProfileEntity;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

import static java.util.stream.Stream.concat;

@Service
@AllArgsConstructor
public class DashboardService {

    private final IncomeService incomeService;
    private final ExpenseService expenseService;
    private final ProfileService profileService;

    public Map<String , Object> getDashboardData(){
        ProfileEntity profile = profileService.getCurrentProfile();
        Map<String , Object> returnValue = new LinkedHashMap<>();
        List<IncomeDTO> latestIncomes = incomeService.getLatest5IncomesForCurrentUser();
        List<ExpenseDTO> latestExpenses = expenseService.getLatest5ExpensesForCurrentUser();

        List<RecentTransactionDTO> recentTransaction = concat(latestIncomes.stream().map(income ->
                        RecentTransactionDTO.builder()
                                .id(income.getId())
                                .profileId(profile.getId())
                                .name(income.getName())
                                .icon(income.getIcon())
                                .date(income.getDate())
                                .amount(income.getAmount())
                                .createdAt(income.getCreatedAt())
                                .updatedAt(income.getUpdatedAt())
                                .type("income")
                                .build()),
                latestExpenses.stream().map(expense ->
                        RecentTransactionDTO.builder()
                                .id(expense.getId())
                                .profileId(profile.getId())
                                .name(expense.getName())
                                .icon(expense.getIcon())
                                .date(expense.getDate())
                                .amount(expense.getAmount())
                                .createdAt(expense.getCreatedAt())
                                .updatedAt(expense.getUpdatedAt())
                                .type("expense")
                                .build()))
                .sorted((a , b) -> {
                    int cmp = b.getDate().compareTo(a.getDate());
                    if(cmp == 0 && a.getCreatedAt() != null && b.getCreatedAt() != null){
                        return b.getCreatedAt().compareTo(a.getCreatedAt());
                    }
                    return cmp;
                }).collect(Collectors.toList());

        returnValue.put("totalBalance" ,
                incomeService.getTotalIncomeForCurrentUser()
                        .subtract(expenseService.getTotalExpenseForCurrentUser()));
        returnValue.put("totalIncome" , incomeService.getTotalIncomeForCurrentUser());
        returnValue.put("totalExpense" , expenseService.getTotalExpenseForCurrentUser());
        returnValue.put("recent5Expenses" , latestExpenses);
        returnValue.put("recent5Incomes" , latestIncomes);
        returnValue.put("recentTransactions" , recentTransaction);
        return returnValue;
    }
}
