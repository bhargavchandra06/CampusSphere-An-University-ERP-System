package com.example.restapi.intro.auth.controller;

import com.example.restapi.intro.auth.dto.AuthResponseDto;
import com.example.restapi.intro.auth.dto.ChangePasswordRequestDto;
import com.example.restapi.intro.auth.dto.LoginRequestDto;
import com.example.restapi.intro.auth.dto.RegisterRequestDto;
import com.example.restapi.intro.auth.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.restapi.intro.auth.dto.UserDto;
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<String> register(
            @RequestBody @Valid RegisterRequestDto request
    ) {

        return ResponseEntity.ok(
                authService.register(request)
        );
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDto> login(
            @RequestBody @Valid LoginRequestDto request
    ) {

        return ResponseEntity.ok(
                authService.login(request)
        );
    }
    @PutMapping("/change-password")
    public ResponseEntity<String> changePassword(
            @RequestBody @Valid ChangePasswordRequestDto request
    )
    {
        authService.changePassword(request);

        return ResponseEntity.ok(
                "Password changed successfully"
        );
    }
    @PostMapping("/logout")
    public ResponseEntity<String> logout()
    {
        return ResponseEntity.ok(
                "Logged out successfully"
        );
    }

    @GetMapping("/me")
    public ResponseEntity<UserDto> getCurrentUser()
    {
        return ResponseEntity.ok(
                authService.getCurrentUser()
        );
    }
}