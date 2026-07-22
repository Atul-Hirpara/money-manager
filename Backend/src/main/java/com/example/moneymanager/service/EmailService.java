package com.example.moneymanager.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.Base64;

import java.util.*;

@Service
@RequiredArgsConstructor
public class EmailService {

//    private final JavaMailSender mailSender;
//    @Value("${spring.mail.properties.mail.smtp.from}")
//    private String fromEmail;
//    public void sendMail(String to , String subject , String body){
//
//        if (to == null || to.isBlank()) {
//            System.out.println("Email not sent because recipient email is null or empty.");
//            return;
//        }
//
//        try{
//            SimpleMailMessage message = new SimpleMailMessage();
//            message.setFrom(fromEmail);
//            message.setTo(to);
//            message.setSubject(subject);
//            message.setText(body);
//            mailSender.send(message);
//        } catch (Exception e) {
//            throw new RuntimeException(e);
//        }
//    }

    // new code --------------------------------------------------------------
    @Value("${brevo.api.key}")
    private String apiKey;

    @Value("${brevo.sender.email}")
    private String fromEmail;

    public void sendMail(String to, String subject, String body) {

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();

        headers.setContentType(MediaType.APPLICATION_JSON);

        headers.set("api-key", apiKey);

        Map<String,Object> request = new HashMap<>();

        Map<String,String> sender = new HashMap<>();
        sender.put("email", fromEmail);
        sender.put("name","Money Manager");

        Map<String,String> receiver = new HashMap<>();
        receiver.put("email",to);

        request.put("sender",sender);

        request.put("to", List.of(receiver));

        request.put("subject",subject);

        request.put("htmlContent",body);

        HttpEntity<Map<String,Object>> entity =
                new HttpEntity<>(request,headers);

        restTemplate.postForEntity(
                "https://api.brevo.com/v3/smtp/email",
                entity,
                String.class
        );
    }


    public void sendEmailWithAttachment(String to, String subject, String body, byte[] attachment, String filename) {

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("api-key", apiKey);

        Map<String, Object> request = new HashMap<>();

        // Sender
        Map<String, String> sender = new HashMap<>();
        sender.put("email", fromEmail);
        sender.put("name", "Money Manager");

        // Receiver
        Map<String, String> receiver = new HashMap<>();
        receiver.put("email", to);

        request.put("sender", sender);
        request.put("to", List.of(receiver));
        request.put("subject", subject);
        request.put("htmlContent", body);

        // Attachment
        Map<String, String> attachmentMap = new HashMap<>();
        attachmentMap.put("name", filename);
        attachmentMap.put("content", Base64.getEncoder().encodeToString(attachment));

        request.put("attachment", List.of(attachmentMap));

        HttpEntity<Map<String, Object>> entity =
                new HttpEntity<>(request, headers);

        restTemplate.postForEntity(
                "https://api.brevo.com/v3/smtp/email",
                entity,
                String.class
        );
    }

}
