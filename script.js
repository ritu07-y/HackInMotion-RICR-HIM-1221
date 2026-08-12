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