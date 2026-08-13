package com.hackathon.studyai.security;

import com.hackathon.studyai.entity.User;
import com.hackathon.studyai.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {

    private final AuthService authService;
    private final JwtUtil jwtUtil;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException {

        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");
        String googleId = oAuth2User.getAttribute("sub"); // Google's unique user ID field

        User user = authService.handleGoogleUser(email, name, googleId);
        String token = jwtUtil.generateToken(user.getEmail());

        // Redirect back to frontend with the token as a query param
        String redirectUrl = "http://localhost:5173/oauth2-redirect?token=" + token;
        response.sendRedirect(redirectUrl);
    }
}