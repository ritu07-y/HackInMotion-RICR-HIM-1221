package com.hackathon.studyai.controller;

import com.hackathon.studyai.entity.User;
import com.hackathon.studyai.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.hackathon.studyai.dto.UpdateProfileRequest;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> body) {
        try {
            User user = authService.register(body.get("name"), body.get("email"), body.get("password"));
            user.setPassword(null); // never return password, even hashed
            return ResponseEntity.ok(user);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        try {
            String token = authService.login(body.get("email"), body.get("password"));
            return ResponseEntity.ok(Map.of("token", token));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/test-protected")
    public ResponseEntity<?> testProtected(org.springframework.security.core.Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return ResponseEntity.ok("Hello, " + user.getEmail());
    }

    @PutMapping("/profile/category")
    public ResponseEntity<?> updateCategory(@RequestBody UpdateProfileRequest request,
                                            org.springframework.security.core.Authentication authentication) {
        try {
            User user = (User) authentication.getPrincipal();
            User updated = authService.updateStudyCategory(user, request.studyCategory());
            updated.setPassword(null);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}