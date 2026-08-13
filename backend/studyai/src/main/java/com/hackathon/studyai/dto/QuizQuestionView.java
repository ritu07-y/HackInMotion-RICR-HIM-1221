package com.hackathon.studyai.dto;

public record QuizQuestionView(
        Long id,
        String question,
        String optionA,
        String optionB,
        String optionC,
        String optionD
) {}