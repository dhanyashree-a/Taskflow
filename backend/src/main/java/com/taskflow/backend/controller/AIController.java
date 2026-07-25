package com.taskflow.backend.controller;

import com.taskflow.backend.dto.SmartFillResponse;
import com.taskflow.backend.service.GeminiService;
import org.springframework.web.bind.annotation.*;
import com.taskflow.backend.dto.SmartFillResponse;

import java.util.Map;


@RestController // receives api request
@RequestMapping("/api/ai")
@CrossOrigin(origins = "http://localhost:5173")
public class AIController {

    private final GeminiService geminiService;

    public AIController(GeminiService geminiService) {
        this.geminiService = geminiService;
    }

    @PostMapping("/description")
    public Map<String, String> generateDescription(
            @RequestBody Map<String, String> request
    ) {

        String title = request.get("title");

        String description =
                geminiService.generateDescription(title);

        return Map.of(
                "description",
                description
        );
    }
    @PostMapping("/priority")
public Map<String, String> generatePriority(
        @RequestBody Map<String, String> request) {

    String priority =
            geminiService.suggestPriority(request.get("title"));

    return Map.of("priority", priority);
}
@PostMapping("/smartfill")
public SmartFillResponse smartFill(
        @RequestBody Map<String, String> request) {

    String title = request.get("title");

    return geminiService.smartFill(title);
}
}