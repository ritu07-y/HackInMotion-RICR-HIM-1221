const form = document.querySelector(".learning-form");
const subjects = document.querySelectorAll('input[name="subjects"]');
const question = document.querySelector("#question");
const characterCount = document.querySelector("#characterCount");
const formMessage = document.querySelector("#formMessage");

/* Purple style when a subject is selected */
subjects.forEach(function (subject) {
  subject.addEventListener("change", function () {
    const card = subject.closest(".subject-card");

    if (subject.checked) {
      card.classList.add("selected");
    } else {
      card.classList.remove("selected");
    }
  });
});

/* Update character count while typing */
question.addEventListener("input", function () {
  characterCount.textContent = question.value.length;
});

/* Validate form on submit */
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const selectedSubjects = document.querySelectorAll(
    'input[name="subjects"]:checked'
  );

  if (selectedSubjects.length === 0) {
    formMessage.textContent = "Please select at least one subject.";
    formMessage.className = "form-message error";
    return;
  }

  if (question.value.trim() === "") {
    formMessage.textContent = "Please write your question.";
    formMessage.className = "form-message error";
    return;
  }

  formMessage.textContent = "Your question has been submitted successfully.";
  formMessage.className = "form-message success";

  form.reset();
  characterCount.textContent = "0";

  subjects.forEach(function (subject) {
    subject.closest(".subject-card").classList.remove("selected");
  });

});


/* =========================================
   LOAD LOGGED-IN USER INFO
========================================= */

const API_BASE_URL = "http://localhost:8080";


function getToken() {
    return localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
}


function getInitials(fullName) {
    if (!fullName) return "S";
    const parts = fullName.trim().split(" ");
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}


async function loadCurrentUser() {

    const token = getToken();

    if (!token) {
        window.location.href = "login.html";
        return;
    }

    try {

        const response = await fetch(API_BASE_URL + "/api/auth/me", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        if (!response.ok) {
            localStorage.removeItem("authToken");
            sessionStorage.removeItem("authToken");
            window.location.href = "login.html";
            return;
        }

        const user = await response.json();

        document.getElementById("welcomeName").textContent = user.name || "Student";
        document.getElementById("userFullName").textContent = user.name || "Student";
        document.getElementById("userAvatar").textContent = getInitials(user.name);

    } catch (error) {
        console.error("Failed to load user:", error);
    }

}


loadCurrentUser();