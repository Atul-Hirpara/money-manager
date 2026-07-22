package com.example.moneymanager.service;

import com.example.moneymanager.dto.AuthDTO;
import com.example.moneymanager.dto.ProfileDTO;
import com.example.moneymanager.entity.ProfileEntity;
import com.example.moneymanager.repository.ProfileRepository;
import com.example.moneymanager.utils.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final ProfileRepository profileRepository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    @Value("${app.activation.url}")
    private String activationURL;

    public ProfileDTO registerProfile(ProfileDTO profileDTO){
        ProfileEntity newProfile = toEntity(profileDTO);
        newProfile.setActivationToken(UUID.randomUUID().toString());
        newProfile = profileRepository.save(newProfile);

        // send activation link mail
        String activationLink = activationURL+ "/api/v1.0/activate?token=" + newProfile.getActivationToken();
        String subject = "Activate Your Money Manager Account";
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
        <td align="center" style="padding:36px 30px; background:linear-gradient(135deg,#2B0F3F,#5B174C,#8B1E63);">
        
        <h1 style="margin:0; font-size:30px; color:#ffffff; font-weight:bold;">
         Money Manager
        </h1>
        
        <p style="margin-top:12px; margin-bottom:0; font-size:15px; color:#F3E8FF; line-height:24px;">
        Track your finances with confidence.
        </p>
        
        </td>
        </tr>
        
        <!-- CONTENT -->
        
        <tr>
        <td style="padding:40px 32px;">
        
        <h2 style=" margin-top:0; margin-bottom:18px; font-size:28px; color:#222222;">
        Welcome to Money Manager 
        </h2>
        
        <p style="margin:0; font-size:16px; line-height:28px;color:#555555;">
        Thank you for creating your account.
        </p>
        
        <p style="font-size:16px; line-height:28px; color:#555555; margin-top:12px; margin-bottom:0;">
        Please verify your email address to activate your account and start managing your income, expenses and financial goals.
        </p>
        
        <!-- BUTTON -->
        
        <table role="presentation" width="100%%" cellpadding="0" cellspacing="0" border="0" style="margin:40px 0;">
        <tr>
        <td align="center">
        
        <a href="%s" style="display:inline-block; background:#6D28D9; color:#ffffff; text-decoration:none; font-size:16px; font-weight:bold;
        padding:16px 40px; border-radius:10px; min-width:220px; text-align:center;">
        Activate Account
        </a>
        
        </td>
        </tr>
        </table>
        
        <p style="font-size:15px; line-height:26px; color:#666666; margin-top:14px;">
        If you didn't create an account, you can safely ignore this email.
        </p>
        
        <hr style="border:none; border-top:1px solid #EAEAEA; margin:30px 0;">
        
        <p style="font-size:14px; color:#666666; margin:0 0 5px;">
        If the button above doesn't work, copy and paste this link into your browser:
        </p>
        
        <p style="margin:0; word-break:break-all; font-size:13px; line-height:22px; color:#6D28D9;">
        %s
        </p>
        
        </td>
        </tr>
        
        <!-- FOOTER -->
        
        <tr>
        <td align="center" style="padding:26px; background:#FAFAFA; border-top:1px solid #EEEEEE;">
        
        <p style="margin:0; font-size:13px; color:#888888;">
        © 2026 Money Manager. All rights reserved.
        </p>
        
        <p style="margin-top:8px; font-size:12px; color:#AAAAAA;">
        This is an automated email, so please don't reply to this message.
        </p>
        
        </td>
        </tr>
        
        </table>
        
        </td>
        </tr>
        </table>
        
        </body>
        </html>
        """.formatted(activationLink, activationLink);
        emailService.sendMail(newProfile.getEmail() , subject , body);

        return toDTO(newProfile);

    }


    // helper function
    public ProfileEntity toEntity(ProfileDTO profileDTO){
        return ProfileEntity.builder()
                .id(profileDTO.getId())
                .fullName(profileDTO.getFullName())
                .email(profileDTO.getEmail())
                .password(passwordEncoder.encode(profileDTO.getPassword()))
                .profileImageUrl(profileDTO.getProfileImageUrl())
                .createdAt(profileDTO.getCreatedAt())
                .updatedAt(profileDTO.getUpdatedAt())
                .build();
    }

    // helper function
    public ProfileDTO toDTO(ProfileEntity profileEntity){
        return ProfileDTO.builder()
                .id(profileEntity.getId())
                .fullName(profileEntity.getFullName())
                .email(profileEntity.getEmail())
                .profileImageUrl(profileEntity.getProfileImageUrl())
                .createdAt(profileEntity.getCreatedAt())
                .updatedAt(profileEntity.getUpdatedAt())
                .build();
    }

    public boolean activateProfile(String activationToken){
        return profileRepository.findByActivationToken(activationToken)
                .map(profile -> {
                    profile.setIsActive(true);
                    profileRepository.save(profile);
                    return true;
                })
                .orElse(false);
    }

    public boolean isAccountActive(String email){
        return profileRepository.findByEmail(email)
                .map(ProfileEntity::getIsActive)
                .orElse(false);
    }

    public ProfileEntity getCurrentProfile(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return profileRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new UsernameNotFoundException("Profile not found with email" + authentication.getName()));
    }

    public ProfileDTO getPublicProfile(String email){
        ProfileEntity currentUser = null;
        if(email == null){
            currentUser = getCurrentProfile();
        }
        else{
            currentUser = profileRepository.findByEmail(email)
                    .orElseThrow(() -> new UsernameNotFoundException("Profile not found with email" + email));
        }

        return ProfileDTO.builder()
                .id(currentUser.getId())
                .fullName(currentUser.getFullName())
                .email(currentUser.getEmail())
                .profileImageUrl(currentUser.getProfileImageUrl())
                .createdAt(currentUser.getCreatedAt())
                .updatedAt(currentUser.getUpdatedAt())
                .build();
    }

    public Map<String, Object> authenticateAndGenerateToken(AuthDTO authDTO) {
        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authDTO.getEmail() , authDTO.getPassword()));
            // generate JWT token
            String token = jwtUtil.generateToken(authDTO.getEmail());
            return Map.of(
                    "token" , token ,
                    "user" , getPublicProfile(authDTO.getEmail())
            );
        } catch (Exception e) {
            throw new RuntimeException("Invalid email or password");
        }

    }
}
