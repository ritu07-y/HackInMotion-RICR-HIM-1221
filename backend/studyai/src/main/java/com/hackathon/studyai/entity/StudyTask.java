package com.hackathon.studyai.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "study_tasks")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class StudyTask {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "plan_id", nullable = false)
    private StudyPlan plan;

    @Column(nullable = false)
    private String subject;

    private String topic;

    private LocalDate scheduledDate;

    private int durationMinutes;

    @Builder.Default
    private boolean completed = false;
}