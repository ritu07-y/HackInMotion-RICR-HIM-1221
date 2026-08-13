package com.hackathon.studyai.dto;

import java.util.List;

public record AiQuizResponse(
        List<AiQuizQuestion> questions
) {}