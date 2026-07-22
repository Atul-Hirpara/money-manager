package com.example.moneymanager.service;

import com.example.moneymanager.dto.ExpenseDTO;
import com.example.moneymanager.entity.ProfileEntity;
import com.example.moneymanager.repository.ProfileRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationService {

    private final ProfileRepository profileRepository;
    private final EmailService emailService;
    private final ExpenseService expenseService;

    @Value("${money.manager.frontend.url}")
    private String frontendUrl;

//  @Scheduled(cron = "0 * * * * *", zone = "IST")   // for testing
    @Scheduled(cron = "0 0 22 * * *", zone = "IST") // daily at 10PM
    public void sendDailyIncomeExpenseReminder(){
        log.info("Job started : sendDailyIncomeExpenseReminder()");
        List<ProfileEntity> allProfiles = profileRepository.findAll();

        for(ProfileEntity profile : allProfiles){

            String body = """
            <!DOCTYPE html>
            <html lang="en">
            <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            
            <body style="margin:0;padding:0;background:#F5F3FA;font-family:Arial,Helvetica,sans-serif;">
            
            <table role="presentation" width="100%%" cellpadding="0" cellspacing="0" border="0" style="background:#F5F3FA;padding:40px 20px;">
            <tr>
            <td align="center">
            
            <table role="presentation" width="100%%" cellpadding="0" cellspacing="0" border="0"
            style="max-width:600px; width:100%%; background:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,.08);">
            
            <!-- HEADER -->
            
            <tr>
            <td align="center" style="padding:32px; background:linear-gradient(135deg,#2B0F3F,#5B174C,#8B1E63);">
            
            <h1 style="margin:0;color:#ffffff;font-size:28px;">
             Money Manager
            </h1>
            
            <p style="margin-top:10px;color:#F3E8FF;font-size:15px;">
            Your daily finance companion
            </p>
            
            </td>
            </tr>
            
            <!-- CONTENT -->
            
            <tr>
            <td style="padding:40px 32px;">
            
            <h2 style="margin-top:0;color:#222;font-size:26px;">
            Hi %s 
            </h2>
            
            <p style="font-size:16px; line-height:28px; color:#555; margin:0;">
            We hope you're having a great day!
            </p>
            
            <p style="font-size:16px; line-height:28px; color:#555; margin-top:15px;">
            This is your daily reminder to record today's <strong>income</strong> and <strong>expenses</strong>.
            Keeping your transactions up to date helps you understand your spending habits and stay on track with your financial goals.
            </p>
            
            <!-- BUTTON -->
            
            <table role="presentation" width="100%%" cellpadding="0" cellspacing="0" border="0" style="margin:40px 0;">
            <tr>
            <td align="center">
            
            <a href="%s"
            style="display:inline-block; background:#6D28D9; color:#ffffff; text-decoration:none; padding:16px 40px; border-radius:10px;font-size:16px;
            font-weight:bold; min-width:220px; text-align:center;">
            Open Money Manager
            </a>
            
            </td>
            </tr>
            </table>
            
            <div style="background:#F8F5FF; border-left:4px solid #7C3AED; padding:18px; border-radius:8px;">
            
            <p style="margin:0; font-size:15px; line-height:26px; color:#555;">
            
            💡 <strong>Tip:</strong> Recording your transactions every day takes less than a minute and makes monthly budgeting much easier.
            
            </p>
            
            </div>
            
            <p style="margin-top:35px; font-size:15px; line-height:26px; color:#666;">
            Have a productive day!
            </p>
            
            <p style="margin-top:5px; font-size:15px; color:#444;">
            Regards,<br>
            <strong>Money Manager Team</strong>
            </p>
            
            </td>
            </tr>
            
            <!-- FOOTER -->
            
            <tr>
            <td align="center" style=" padding:24px; background:#FAFAFA; border-top:1px solid #EEEEEE;">
            
            <p style="margin:0; font-size:13px; color:#888;">
            © 2026 Money Manager. All rights reserved.
            </p>
            
            <p style="margin-top:8px; font-size:12px; color:#AAA;">
            You're receiving this reminder because daily notifications are enabled for your account.
            </p>
            
            </td>
            </tr>
            
            </table>
            
            </td>
            </tr>
            </table>
            
            </body>
            </html>
            """.formatted(profile.getFullName(), frontendUrl);

            emailService.sendMail(profile.getEmail(), "Daily reminder : Add your incomes and expense" , body);
        }

        log.info("Job completed : sendDailyIncomeExpenseReminder()");
    }


//  @Scheduled(cron = "0 * * * * *", zone = "IST")   // for testing
    @Scheduled(cron = "0 0 23 * * *", zone = "IST")  // daily at 11PM
    public void sendDailyExpenseSummary(){
        log.info("Job started : sendDailyExpenseSummary()");
        List<ProfileEntity> allProfiles = profileRepository.findAll();

        for(ProfileEntity profile : allProfiles){
            List<ExpenseDTO> todaysExpenses = expenseService.getExpensesForUserOnDate(profile.getId(), LocalDate.now());

            if(!todaysExpenses.isEmpty()){
                StringBuilder table = new StringBuilder();

                table.append("""
                <table role='presentation' style='width:100%; border-collapse:collapse; margin-top:25px; font-family:Arial,sans-serif;
                font-size:14px;'>
                """);

                table.append("""
                <tr style='background:#F4F0FF;'>
                
                <th style='padding:14px;border:1px solid #E5E7EB;text-align:center;'>#</th>
                <th style='padding:14px;border:1px solid #E5E7EB;text-align:left;'>Expense</th>
                <th style='padding:14px;border:1px solid #E5E7EB;text-align:left;'>Category</th>
                <th style='padding:14px;border:1px solid #E5E7EB;text-align:right;'>Amount</th>
                
                </tr>
                """);

                BigDecimal totalExpense = BigDecimal.ZERO;
                int i = 1;

                for (ExpenseDTO expense : todaysExpenses) {

                    totalExpense = totalExpense.add(expense.getAmount());

                    table.append("<tr>");
                    table.append("<td style='padding:12px;border:1px solid #E5E7EB;text-align:center;'>")
                            .append(i++)
                            .append("</td>");

                    table.append("<td style='padding:12px;border:1px solid #E5E7EB;'>")
                            .append(expense.getName())
                            .append("</td>");

                    table.append("<td style='padding:12px;border:1px solid #E5E7EB;'>")
                            .append(expense.getCategoryId() != null ? expense.getCategoryName() : "Uncategorized")
                            .append("</td>");

                    table.append("<td style='padding:12px;border:1px solid #E5E7EB;text-align:right;font-weight:600;color:#5B174C;'>₹")
                            .append(String.format("%.2f", expense.getAmount()))
                            .append("</td>");
                    table.append("</tr>");
                }
                table.append("</table>");


                String body = """
                <!DOCTYPE html>
                <html>
                <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                </head>
                
                <body style="margin:0;padding:0;background:#F5F3FA;font-family:Arial,Helvetica,sans-serif;">
                
                <table width="100%%" cellpadding="0" cellspacing="0" style="padding:40px 20px;background:#F5F3FA;">
                <tr>
                <td align="center">
                
                <table width="100%%" style=" max-width:650px; background:#ffffff; border-radius:16px; overflow:hidden; 
                box-shadow:0 10px 30px rgba(0,0,0,.08);">
                
                <!-- HEADER -->
                
                <tr>
                
                <td align="center" style="padding:32px; background:linear-gradient(135deg,#2B0F3F,#5B174C,#8B1E63);">
                
                <h1 style="margin:0;color:white;font-size:28px;">
                 Money Manager
                </h1>
                
                <p style="margin-top:10px;color:#F3E8FF;">
                Daily Expense Summary
                </p>
                
                </td>
                
                </tr>
                
                <!-- CONTENT -->
                
                <tr>
                
                <td style="padding:40px;">
                
                <h2 style="margin-top:0;color:#222;">
                Hello %s 
                </h2>
                
                <p style="font-size:16px;color:#555;line-height:28px;">
                Here's a summary of your expenses for today.
                </p>
                
                %s
                
                <!-- SUMMARY CARD -->
                
                <table width="100%%" style="margin-top:30px; background:#F8F5FF; border-left:5px solid #7C3AED; border-radius:10px;">
                
                <tr>
                <td style="padding:20px;">
                
                <p style="margin:0;font-size:14px;color:#666;">
                Total Expenses
                </p>
                
                <h2 style="margin:8px 0 0;color:#5B174C;">
                ₹%s
                </h2>
                
                <p style="margin-top:10px;color:#777;">
                Transactions Today : %d
                </p>
                
                </td>
                </tr>
                
                </table>
                
                <!-- BUTTON -->
                
                <div style="text-align:center;margin:40px 0;">
                
                <a href="%s" style="display:inline-block; padding:16px 38px; background:#6D28D9; color:white; text-decoration:none;
                border-radius:10px; font-weight:bold;">
                Open Money Manager
                </a>
                
                </div>
                
                <div style="background:#FAF7FF; padding:18px; border-radius:10px; border-left:4px solid #A855F7;">
                
                <p style="margin:0;color:#555;line-height:26px;">
                
                💡 <strong>Finance Tip:</strong>
                Reviewing your expenses every day helps you identify unnecessary spending and build stronger financial habits.
                </p>
                
                </div>
                
                <p style="margin-top:35px;color:#666;">
                Regards,<br>
                <strong>Money Manager Team</strong>
                </p>
                
                </td>
                
                </tr>
                
                <!-- FOOTER -->
                
                <tr>
                
                <td align="center" style=" padding:24px; background:#FAFAFA; border-top:1px solid #EEEEEE;">
                
                <p style="margin:0;font-size:13px;color:#888;">
                © 2026 Money Manager. All rights reserved.
                </p>
                
                </td>
                
                </tr>
                
                </table>
                
                </td>
                
                </tr>
                
                </table>
                
                </body>
                
                </html>
                """.formatted(
                        profile.getFullName(),
                        table.toString(),
                        totalExpense.toPlainString(),
                        todaysExpenses.size(),
                        frontendUrl
                );

                emailService.sendMail(profile.getEmail(), "Your daily Expense summary", body);
            }
        }
        log.info("Job completed : sendDailyExpenseSummary()");
    }
}
