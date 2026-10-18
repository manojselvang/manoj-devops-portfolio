package com.portfolio.controller;

import com.portfolio.model.Project;
import com.portfolio.model.SkillGroup;
import com.portfolio.service.PortfolioService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class PortfolioController {
    private final PortfolioService portfolioService;

    public PortfolioController(PortfolioService portfolioService) {
        this.portfolioService = portfolioService;
    }

    @GetMapping("/profile")
    public Map<String, String> profile() {
        return portfolioService.getProfile();
    }

    @GetMapping("/projects")
    public List<Project> projects() {
        return portfolioService.getProjects();
    }

    @GetMapping("/skills")
    public List<SkillGroup> skills() {
        return portfolioService.getSkills();
    }

    @GetMapping("/experience")
    public List<Map<String, String>> experience() {
        return portfolioService.getExperience();
    }
}
