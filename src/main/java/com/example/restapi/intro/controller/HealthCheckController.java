package com.example.restapi.intro.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthCheckController {
    @GetMapping("/")
    public String home() {
        return "CampusSphere Backend Running";
    }

    @GetMapping("/health")
    public String health() {
        return "OK";
    }
}
