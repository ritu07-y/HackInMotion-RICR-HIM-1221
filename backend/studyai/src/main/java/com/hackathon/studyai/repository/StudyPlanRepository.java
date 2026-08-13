package com.hackathon.studyai.repository;

import com.hackathon.studyai.entity.StudyPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface StudyPlanRepository extends JpaRepository<StudyPlan, Long> {
    List<StudyPlan> findByUserId(Long userId);
}