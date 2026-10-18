package com.portfolio.model;

import java.util.List;

public record Project(
        String title,
        String category,
        String description,
        List<String> technologies,
        String githubUrl
) {}
