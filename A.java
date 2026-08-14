# Study AI – Learning Assistant & Personalized Study Planner

A web application designed to help students organize their studies, build personalized study schedules, and leverage AI to learn more effectively.

---

## What This Project Does

Managing study schedules and figuring out *how* to study efficiently can be tough. Study AI provides a clean interface for students to manage their goals and track their progress while using AI to get instant study support and tailored learning plans.

* **Account Management:** User registration, login, and Google OAuth2 integration.
* **Smart Study Planner:** Create and customize study schedules based on your target goals.
* **AI Assistance:** Interactive learning support built with Spring AI to answer questions and clarify concepts.
* **Progress Tracking:** Monitor completed modules and stay consistent over time.

---

## Tech Stack

* **Frontend:** HTML5, CSS3, JavaScript (Vanilla ES6)
* **Backend:** Java 17+, Spring Boot, Spring AI, Spring Security
* **Database:** MySQL
* **Authentication:** OAuth2 (Google Sign-In) & Standard Form Auth

---

## Repository Structure

```text
HackInMotion-RICR-HIM-1221/
├── frontend/                       # HTML, CSS, JavaScript files
└── backend/                        # Spring Boot Application
    └── src/
        └── main/
            ├── java/com/studyai/   # Java Controllers, Models, & Services
            └── resources/
                └── application.properties # Database & Spring AI configuration