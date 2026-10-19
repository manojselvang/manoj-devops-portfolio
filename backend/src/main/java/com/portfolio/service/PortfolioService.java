package com.portfolio.service;

import com.portfolio.model.Project;
import com.portfolio.model.SkillGroup;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class PortfolioService {
    public Map<String, String> getProfile() {
        return Map.of(
                "name", "Manoj Selvan G",
                "title", "DevOps & Cloud Engineer",
                "location", "Chennai, India",
                "summary", "I work at the intersection of infrastructure, security and automation—building practical skills in cloud-native platforms and reliable delivery workflows.",
                "github", "https://github.com/manojselvang",
                "linkedin", "https://www.linkedin.com/in/manojselvang",
                "email", "manojselvang@gmail.com"
        );
    }

    public List<Project> getProjects() {
        return List.of(
                new Project(
                        "Kubernetes HPA on AWS EKS",
                        "KUBERNETES / AWS",
                        "Implemented CPU-based horizontal autoscaling and validated scale-out and scale-in behavior under load.",
                        List.of("Kubernetes", "AWS EKS", "Metrics Server"),
                        "https://github.com/manojselvang/k8s-hpa-eks-project"
                ),
                new Project(
                        "Docker Image Build Comparison",
                        "DOCKER / OPTIMIZATION",
                        "Compared single-stage and multi-stage builds, reducing a sample image from 1.31 GB to 24.3 MB.",
                        List.of("Docker", "Go", "Multi-stage builds"),
                        "https://github.com/manojselvang/docker-build-comparison"
                ),
                new Project(
                        "DevOps Portfolio CI/CD",
                        "CI/CD / CLOUD-NATIVE",
                        "A full-stack React and Spring Boot portfolio delivered through Jenkins, Docker Hub and Kubernetes on AWS EC2.",
                        List.of("React", "Java", "Maven", "Jenkins", "Docker", "Kubernetes"),
                        "https://github.com/manojselvang/manoj-devops-portfolio-cicd"
                ),
                new Project(
                        "AI-Assisted Patch Prioritization",
                        "SECURITY AUTOMATION",
                        "Rule-based vulnerability prioritization using asset criticality, exposure and environment context.",
                        List.of("Python", "Risk scoring", "Automation"),
                        "https://github.com/manojselvang/patch-prioritization-engine"
                )
        );
    }

    public List<SkillGroup> getSkills() {
        return List.of(
                new SkillGroup("CLOUD & INFRASTRUCTURE", List.of("AWS", "Linux", "Terraform", "Infrastructure automation")),
                new SkillGroup("CONTAINERS & ORCHESTRATION", List.of("Docker", "Kubernetes", "Helm", "NGINX")),
                new SkillGroup("CI/CD & AUTOMATION", List.of("Jenkins", "Git", "GitHub", "Bash", "Python")),
                new SkillGroup("OBSERVABILITY & SECURITY", List.of("Prometheus", "Grafana", "Application security", "Vulnerability management"))
        );
    }

    public List<Map<String, String>> getExperience() {
        return List.of(
                Map.of(
                        "role", "Application Security Engineer",
                        "organization", "Karur Vysya Bank",
                        "period", "Apr 2024 – Present",
                        "location", "Chennai, India",
                        "description", "Application and architecture security reviews across application, infrastructure, authentication, network and API security."
                ),
                Map.of(
                        "role", "Beta Tester",
                        "organization", "Avalon Labs",
                        "period", "Mar 2021 – Jan 2022",
                        "location", "Bengaluru, India",
                        "description", "Tested and supported development of the Meta beta platform / Scenes app."
                )
        );
    }
}
