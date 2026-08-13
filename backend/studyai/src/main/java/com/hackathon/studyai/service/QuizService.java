package com.hackathon.studyai.service;

import com.hackathon.studyai.dto.*;
import com.hackathon.studyai.entity.*;
import com.hackathon.studyai.repository.QuizRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class QuizService {

    private final ChatClient.Builder chatClientBuilder;
    private final QuizRepository quizRepository;

    private ChatClient chatClient;

    private ChatClient client() {
        if (chatClient == null) {
            chatClient = chatClientBuilder.build();
        }
        return chatClient;
    }

    public QuizView generateQuiz(User user) {

        StudyCategory category = user.getStudyCategory();
        if (category == null) {
            throw new RuntimeException("Please complete your profile (select your study category) before taking a quiz");
        }

        String prompt = """
                Generate exactly 5 multiple choice questions suitable for a student in the "%s" category.
                Cover a mix of core topics relevant to that category.
                Each question must have exactly 4 options (A, B, C, D) and exactly one correct option.
                Keep questions clear, unambiguous, and appropriate for that level.
                Do not repeat topics across questions.
                """.formatted(category.name());

        AiQuizResponse aiResponse;
        try {
            aiResponse = client()
                    .prompt()
                    .user(prompt)
                    .call()
                    .entity(AiQuizResponse.class);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("DEBUG: " + e.getMessage());
        }

        if (aiResponse == null || aiResponse.questions() == null || aiResponse.questions().isEmpty()) {
            throw new RuntimeException("Failed to generate quiz. Please try again.");
        }

        Quiz quiz = Quiz.builder()
                .user(user)
                .category(category)
                .createdAt(LocalDateTime.now())
                .submitted(false)
                .build();

        List<QuizQuestion> questionEntities = aiResponse.questions().stream()
                .map(q -> QuizQuestion.builder()
                        .quiz(quiz)
                        .questionText(q.question())
                        .optionA(q.optionA())
                        .optionB(q.optionB())
                        .optionC(q.optionC())
                        .optionD(q.optionD())
                        .correctOption(q.correctOption().trim().toUpperCase())
                        .build())
                .toList();

        quiz.setQuestions(questionEntities);
        Quiz saved = quizRepository.save(quiz);

        List<QuizQuestionView> views = saved.getQuestions().stream()
                .map(q -> new QuizQuestionView(q.getId(), q.getQuestionText(), q.getOptionA(), q.getOptionB(), q.getOptionC(), q.getOptionD()))
                .toList();

        return new QuizView(saved.getId(), category.name(), views);
    }

    public QuizResultView submitQuiz(Long quizId, User user, SubmitAnswerRequest request) {

        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new RuntimeException("Quiz not found"));

        if (!quiz.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("This quiz does not belong to you");
        }
        if (quiz.isSubmitted()) {
            throw new RuntimeException("This quiz has already been submitted");
        }

        int correctCount = 0;

        for (SubmitAnswerRequest.AnswerEntry answer : request.answers()) {
            QuizQuestion question = quiz.getQuestions().stream()
                    .filter(q -> q.getId().equals(answer.questionId()))
                    .findFirst()
                    .orElse(null);

            if (question != null) {
                question.setSelectedOption(answer.selectedOption() == null ? null : answer.selectedOption().trim().toUpperCase());
                if (question.getSelectedOption() != null && question.getSelectedOption().equals(question.getCorrectOption())) {
                    correctCount++;
                }
            }
        }

        int total = quiz.getQuestions().size();
        int score = total == 0 ? 0 : (correctCount * 100) / total;

        quiz.setSubmitted(true);
        quiz.setScore(score);
        quizRepository.save(quiz);

        return new QuizResultView(quiz.getId(), total, correctCount, score);
    }
}