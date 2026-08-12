<<<<<<< HEAD
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
=======
/* =========================================
   SHOW / HIDE PASSWORD
========================================= */

function togglePassword() {

    const password =
        document.getElementById("loginPassword");

    const button =
        document.querySelector(".password-toggle");


    if (password.type === "password") {

        password.type = "text";

        button.textContent = "🙈";

    }
    else {

        password.type = "password";

        button.textContent = "👁";

    }

}


/* =========================================
   LOGIN FORM
========================================= */

const loginForm =
    document.getElementById("loginForm");


loginForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const email =
            document.getElementById(
                "loginEmail"
            ).value.trim();


        const password =
            document.getElementById(
                "loginPassword"
            ).value;


        const rememberMe =
            document.getElementById(
                "rememberMe"
            ).checked;


        const toast =
            document.getElementById("toast");


        /* Validation */

        if (email === "") {

            toast.textContent =
                "Please enter your email address.";

            toast.className =
                "toast error";

            return;

        }


        if (password === "") {

            toast.textContent =
                "Please enter your password.";

            toast.className =
                "toast error";

            return;

        }


        /* Demo */

        console.log("Email:", email);

        console.log(
            "Remember me:",
            rememberMe
        );


        toast.textContent =
            "Login successful!";

        toast.className =
            "toast success";


        /*
         * Later connect Firebase
         * Authentication here.
         */

    }
);
>>>>>>> 3a2fef2e847344a269e68d8341244552af083355
