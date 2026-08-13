package com.hackathon.studyai.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "study_plans")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class StudyPlan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String goal;

    private LocalDate deadline;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String rawAiResponse;

    @OneToMany(mappedBy = "plan", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<StudyTask> tasks;
}