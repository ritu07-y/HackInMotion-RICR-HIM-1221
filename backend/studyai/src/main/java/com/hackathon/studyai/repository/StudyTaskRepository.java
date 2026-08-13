package com.hackathon.studyai.repository;

import com.hackathon.studyai.entity.StudyTask;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface StudyTaskRepository extends JpaRepository<StudyTask, Long> {
    List<StudyTask> findByPlanId(Long planId);
    List<StudyTask> findByPlanIdAndCompletedFalse(Long planId);
}