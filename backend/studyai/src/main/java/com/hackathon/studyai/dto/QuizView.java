package com.hackathon.studyai.dto;

import java.util.List;

public record QuizView(
        Long quizId,
        String category,
        List<QuizQuestionView> questions
) {}