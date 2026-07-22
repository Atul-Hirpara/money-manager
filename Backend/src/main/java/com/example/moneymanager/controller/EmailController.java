package com.example.moneymanager.controller;

import com.example.moneymanager.entity.ProfileEntity;
import com.example.moneymanager.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

@RestController
@RequestMapping("/email")
@RequiredArgsConstructor
public class EmailController {

    private final ExcelService excelService;
    private final IncomeService incomeService;
    private final ExpenseService expenseService;
    private final EmailService emailService;
    private final ProfileService profileService;

    String bodyIncome = """
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
    </head>
    
    <body style=" margin:0; padding:20px; background:#f6f2f8; font-family:Arial, sans-serif;">
    
    <div style="max-width:520px; margin:auto; background:#ffffff; border:1px solid #e8ddee; border-radius:12px; padding:32px;">
    
        <h2 style="margin:0 0 16px; color:#5B174C; font-size:24px;">
            📊 Monthly Income Report
        </h2>
    
        <p style="color:#555; font-size:15px; line-height:24px; margin-bottom:20px;"> Hello, </p>
    
        <p style="color:#555; font-size:15px; line-height:24px; ">
            Your monthly <strong>Income Report</strong> is ready.
            We've attached the Excel file containing all of your income
            transactions for this month.
        </p>
    
        <div style="margin:24px 0; padding:16px; background:#f9f5fb; border-left:4px solid #5B174C; border-radius:8px; color:#444; font-size:14px;">
            📎 Attachment: <strong>income.xlsx</strong>
        </div>
    
        <p style="color:#555; font-size:15px; line-height:24px;">
            Thank you for using <strong>MoneyManager</strong> to manage your finances.
        </p>
    
        <hr style="border:none; border-top:1px solid #ececec; margin:28px 0;">
    
        <p style="font-size:13px; color:#888; margin:0;">
            Regards,<br>
            <strong>MoneyManager Team</strong>
        </p>
    
    </div>
    
    </body>
    </html>
    """;

    String bodyExpense = """
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
    </head>
    
    <body style=" margin:0; padding:20px; background:#f6f2f8; font-family:Arial, sans-serif;">
    
    <div style="max-width:520px; margin:auto; background:#ffffff; border:1px solid #e8ddee; border-radius:12px; padding:32px;">
    
        <h2 style="margin:0 0 16px; color:#5B174C; font-size:24px;">
            📊 Monthly Expense Report
        </h2>
    
        <p style="color:#555; font-size:15px; line-height:24px; margin-bottom:20px;"> Hello, </p>
    
        <p style="color:#555; font-size:15px; line-height:24px; ">
            Your monthly <strong>Expense Report</strong> is ready.
            We've attached the Excel file containing all of your expense
            transactions for this month.
        </p>
    
        <div style="margin:24px 0; padding:16px; background:#f9f5fb; border-left:4px solid #5B174C; border-radius:8px; color:#444; font-size:14px;">
            📎 Attachment: <strong>expenses.xlsx</strong>
        </div>
    
        <p style="color:#555; font-size:15px; line-height:24px;">
            Thank you for using <strong>MoneyManager</strong> to manage your finances.
        </p>
    
        <hr style="border:none; border-top:1px solid #ececec; margin:28px 0;">
    
        <p style="font-size:13px; color:#888; margin:0;">
            Regards,<br>
            <strong>MoneyManager Team</strong>
        </p>
    
    </div>
    
    </body>
    </html>
    """;

    @GetMapping("/income-excel")
    public ResponseEntity<Void> emailIncomeExcel() throws IOException {
        ProfileEntity profile = profileService.getCurrentProfile();
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        excelService.writeIncomesToExcel(baos, incomeService.getCurrentMonthIncomesForCurrentUser());
        emailService.sendEmailWithAttachment(profile.getEmail(),
                    "Your Income Excel Report",
                    bodyIncome,
                    baos.toByteArray(),
                    "income.xlsx");

        return ResponseEntity.ok(null);
    }

    @GetMapping("/expense-excel")
    public ResponseEntity<Void> emailExpenseExcel() throws IOException {
        ProfileEntity profile = profileService.getCurrentProfile();
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        excelService.writeExpensesToExcel(baos, expenseService.getCurrentMonthExpensesForCurrentUser());
        emailService.sendEmailWithAttachment(profile.getEmail(),
                "Your Expense Excel Report",
                bodyExpense,
                baos.toByteArray(),
                "expenses.xlsx");

        return ResponseEntity.ok(null);
    }
}
