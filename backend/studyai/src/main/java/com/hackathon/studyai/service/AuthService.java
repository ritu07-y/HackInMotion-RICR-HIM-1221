package com.hackathon.studyai.service;

import com.hackathon.studyai.entity.AuthProvider;
import com.hackathon.studyai.entity.StudyCategory;
import com.hackathon.studyai.entity.User;
import com.hackathon.studyai.repository.UserRepository;
import com.hackathon.studyai.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public User register(String name, String email, String rawPassword) {

        if (name == null || name.isBlank()) {
            throw new RuntimeException("Name is required");
        }
        if (email == null || email.isBlank()) {
            throw new RuntimeException("Email is required");
        }
        if (!email.matches("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$")) {
            throw new RuntimeException("Invalid email format");
        }
        if (rawPassword == null || rawPassword.isBlank()) {
            throw new RuntimeException("Password is required");
        }
        if (rawPassword.length() < 6) {
            throw new RuntimeException("Password must be at least 6 characters");
        }

        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("Email already registered");
        }
        User user = User.builder()
                .name(name)
                .email(email)
                .password(passwordEncoder.encode(rawPassword))
                .provider(AuthProvider.LOCAL)
                .build();
        return userRepository.save(user);
    }

    public String login(String email, String rawPassword) {
        if (email == null || email.isBlank() || rawPassword == null || rawPassword.isBlank()) {
            throw new RuntimeException("Email and password are required");
        }

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (user.getProvider() != AuthProvider.LOCAL) {
            throw new RuntimeException("Please login using Google for this account");
        }

        if (!passwordEncoder.matches(rawPassword, user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        return jwtUtil.generateToken(user.getEmail());
    }

    public User handleGoogleUser(String email, String name, String googleId) {
        return userRepository.findByEmail(email)
                .orElseGet(() -> userRepository.save(
                        User.builder()
                                .email(email)
                                .name(name)
                                .provider(AuthProvider.GOOGLE)
                                .providerId(googleId)
                                .build()
                ));
    }

    public User updateStudyCategory(User user, StudyCategory category) {
        if (category == null) {
            throw new RuntimeException("Study category is required");
        }
        user.setStudyCategory(category);
        return userRepository.save(user);
    }
}