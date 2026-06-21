package com.example.restapi.intro.auth.exception;

import com.example.restapi.intro.advices.ApiError;
import com.example.restapi.intro.advices.ApiResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationEntryPoint
        implements AuthenticationEntryPoint {

    private final ObjectMapper objectMapper;

    @Override
    public void commence(
            HttpServletRequest request,
            HttpServletResponse response,
            AuthenticationException authException
    ) throws IOException {

        ApiError apiError =
                ApiError.builder()
                        .status(HttpStatus.UNAUTHORIZED)
                        .message("Authentication Required")
                        .build();

        ApiResponse<?> apiResponse =
                new ApiResponse<>(apiError);

        response.setStatus(
                HttpStatus.UNAUTHORIZED.value()
        );

        response.setContentType(
                "application/json"
        );

        objectMapper.writeValue(
                response.getOutputStream(),
                apiResponse
        );
    }
}