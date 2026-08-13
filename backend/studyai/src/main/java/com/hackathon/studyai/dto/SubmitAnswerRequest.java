package com.hackathon.studyai.dto;

import java.util.List;

public record SubmitAnswerRequest(
        List<AnswerEntry> answers
) {
    public record AnswerEntry(Long questionId, String selectedOption) {}
}