package com.example.restapi.intro.auth.service;

import com.example.restapi.intro.auth.dto.ChangePasswordRequestDto;
import com.example.restapi.intro.auth.entity.UserEntity;
import com.example.restapi.intro.auth.dto.AuthResponseDto;
import com.example.restapi.intro.auth.dto.LoginRequestDto;
import com.example.restapi.intro.auth.dto.RegisterRequestDto;
import com.example.restapi.intro.auth.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.restapi.intro.auth.dto.UserDto;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.Authentication;
@Service
@RequiredArgsConstructor
public class AuthService {
    private final ModelMapper modelMapper;
    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    private final JwtService jwtService;

    public String register(
            RegisterRequestDto request
    ) {

        if (userRepository.existsByUsername(
                request.getUsername()
        )) {
            throw new RuntimeException(
                    "Username already exists"
            );
        }

        UserEntity user = UserEntity.builder()
                .username(request.getUsername())
                .password(
                        passwordEncoder.encode(
                                request.getPassword()
                        )
                )
                .role(request.getRole())
                .build();

        userRepository.save(user);

        return "User Registered Successfully";
    }

    @Transactional
    public void changePassword(
            ChangePasswordRequestDto request
    ) {
        String username =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication()
                        .getName();

        UserEntity user =
                userRepository
                        .findByUsername(username)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "User not found"
                                )
                        );

        if (!passwordEncoder.matches(
                request.getOldPassword(),
                user.getPassword()
        )) {
            throw new RuntimeException(
                    "Old password is incorrect"
            );
        }

        if (passwordEncoder.matches(
                request.getNewPassword(),
                user.getPassword())) {
            throw new RuntimeException(
                    "New password cannot be same as old password"
            );
        }
        user.setPassword(
                passwordEncoder.encode(
                        request.getNewPassword()
                )
        );

        userRepository.save(user);
    }

    public AuthResponseDto login(
            LoginRequestDto request
    ) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        UserEntity user =
                userRepository
                        .findByUsername(
                                request.getUsername()
                        )
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "User not found"
                                )
                        );
        if (user.getRole() != request.getRole()) {
            throw new BadCredentialsException(
                    "Invalid role selected"
            );
        }
        String token =
                jwtService.generateToken(user);

        return new AuthResponseDto(
                token,
                user.getRole().name(),
                user.getUsername()
        );
    }

    public UserDto getCurrentUser()
    {
        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        UserEntity user =
                userRepository
                        .findByUsername(
                                authentication.getName()
                        )
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "User not found"
                                )
                        );

        return modelMapper.map(
                user,
                UserDto.class
        );
    }
}