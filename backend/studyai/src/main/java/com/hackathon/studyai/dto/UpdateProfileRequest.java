package com.hackathon.studyai.dto;

import com.hackathon.studyai.entity.StudyCategory;

public record UpdateProfileRequest(
        StudyCategory studyCategory
) {}