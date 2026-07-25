package com.taskflow.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import com.taskflow.backend.dto.GeminiRequest;
import com.taskflow.backend.dto.GeminiResponse;
import com.taskflow.backend.dto.SmartFillResponse;

import java.util.List;
import com.fasterxml.jackson.databind.ObjectMapper;


@Service
public class GeminiService {

    @Value("${gemini.api.key}")
    private String apiKey;

    private final RestClient restClient = RestClient.create();
    private final ObjectMapper objectMapper = new ObjectMapper();

    // ===========================
    // AI Description Generator
    // ===========================

    public String generateDescription(String title) {

        try {

            GeminiRequest.Part part =
                    new GeminiRequest.Part(
                            """
                            You are a task management assistant.

                            Generate ONLY ONE professional task description.

                            Requirements:
                            - Maximum 20 words.
                            - No headings.
                            - No bullet points.
                            - No markdown.
                            - No explanations.
                            - Return only the description.

                            Task:
                            """ + title
                    );

            GeminiRequest.Content content =
                    new GeminiRequest.Content(List.of(part));

            GeminiRequest request =
                    new GeminiRequest(List.of(content));

            GeminiResponse response =
                    restClient.post()
                            .uri(
                                    "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key="
                                            + apiKey
                            )
                            .body(request)
                            .retrieve()
                            .body(GeminiResponse.class);

            if (response != null &&
                    response.getCandidates() != null &&
                    !response.getCandidates().isEmpty()) {

                return response.getCandidates()
                        .get(0)
                        .getContent()
                        .getParts()
                        .get(0)
                        .getText()
                        .trim();
            }

        } catch (Exception e) {

            System.out.println("Gemini Error: " + e.getMessage());

            return "AI service is currently unavailable.";
        }

        return "Unable to generate description.";
    }

    // ===========================
    // AI Priority Generator
    // ===========================

    public String suggestPriority(String title) {

        try {

            GeminiRequest.Part part =
                    new GeminiRequest.Part(
                            """
                            You are a task prioritization assistant.

                            Based only on the task title, reply with ONLY ONE WORD.

                            Allowed responses:
                            High
                            Medium
                            Low

                            Task:
                            """ + title
                    );

            GeminiRequest.Content content =
                    new GeminiRequest.Content(List.of(part));

            GeminiRequest request =
                    new GeminiRequest(List.of(content));

            GeminiResponse response =
                    restClient.post()
                            .uri(
                                    "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key="
                                            + apiKey
                            )
                            .body(request)
                            .retrieve()
                            .body(GeminiResponse.class);

            if (response != null &&
                    response.getCandidates() != null &&
                    !response.getCandidates().isEmpty()) {

                return response.getCandidates()
                        .get(0)
                        .getContent()
                        .getParts()
                        .get(0)
                        .getText()
                        .trim();
            }

        } catch (Exception e) {

            System.out.println("Gemini Error: " + e.getMessage());

            return "Medium";
        }

        return "Medium";
    }

    public SmartFillResponse smartFill(String title) {

    try {

        GeminiRequest.Part part =
                new GeminiRequest.Part(
    """
You are an AI task assistant.

Based on the task title, generate:

1. A short professional description (maximum 20 words).
2. A suitable priority (High, Medium, or Low).
3. A due date ONLY if the task title explicitly mentions one (today, tomorrow, next Monday, etc.).
   Otherwise return an empty string.

Return ONLY valid JSON in exactly this format:

{
  "description":"Write a short task description here",
  "priority":"High",
  "dueDate":"yyyy-MM-dd or empty string"
}

Do not explain.
Do not use markdown.
Do not add extra text.
Do not leave description empty.

Task Title:
"""
+ title
);

        GeminiRequest.Content content =
                new GeminiRequest.Content(List.of(part));

        GeminiRequest request =
                new GeminiRequest(List.of(content));

        GeminiResponse response =
                restClient.post()
                        .uri(
                                "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key="
                                        + apiKey
                        )
                        .body(request)
                        .retrieve()
                        .body(GeminiResponse.class);

        if (response != null &&
                response.getCandidates() != null &&
                !response.getCandidates().isEmpty()) {

            String json = response.getCandidates()
                    .get(0)
                    .getContent()
                    .getParts()
                    .get(0)
                    .getText()
                    .trim();

                    System.out.println("Gemini Response:");
System.out.println(json);

            // Remove markdown if Gemini accidentally adds it
           json = json.replace("```json", "")
           .replace("```", "")
           .trim();

int start = json.indexOf("{");
int end = json.lastIndexOf("}");

if (start != -1 && end != -1) {
    json = json.substring(start, end + 1);
}

            return objectMapper.readValue(json, SmartFillResponse.class);
        }

    } catch (Exception e) {

        System.out.println("Gemini SmartFill Error: " + e.getMessage());

    }

    SmartFillResponse fallback = new SmartFillResponse();

    fallback.setDescription("");

    fallback.setPriority("Medium");

    fallback.setDueDate("");

    return fallback;
}

    
}