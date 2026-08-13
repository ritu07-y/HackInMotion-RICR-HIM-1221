package com.hackathon.studyai.repository;

import com.hackathon.studyai.entity.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizRepository extends JpaRepository<Quiz, Long> {
}