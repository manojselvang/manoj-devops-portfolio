package com.portfolio.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class OperationalController {
    @Value("${portfolio.version:local}")
    private String version;

    @GetMapping("/health")
    public Map<String, String> health() {
        return Map.of("status", "UP", "timestamp", Instant.now().toString());
    }

    @GetMapping("/version")
    public Map<String, String> version() {
        return Map.of("version", version, "service", "portfolio-api");
    }
}
