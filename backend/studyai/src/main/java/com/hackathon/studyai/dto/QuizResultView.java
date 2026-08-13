package com.hackathon.studyai.dto;

public record QuizResultView(
        Long quizId,
        int totalQuestions,
        int correctAnswers,
        int score
) {}