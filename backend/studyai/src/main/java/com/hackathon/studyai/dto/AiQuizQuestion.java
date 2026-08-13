package com.hackathon.studyai.dto;

public record AiQuizQuestion(
        String question,
        String optionA,
        String optionB,
        String optionC,
        String optionD,
        String correctOption
) {}