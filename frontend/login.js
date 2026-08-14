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


const API_BASE_URL = "http://localhost:8080";


loginForm.addEventListener(
    "submit",
    async function(event) {

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


        /* Call backend */

        try {

            const response = await fetch(
                API_BASE_URL + "/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {

                toast.textContent =
                    data.error || "Login failed. Please try again.";

                toast.className =
                    "toast error";

                return;

            }

            /* Success — store the JWT */

            if (rememberMe) {
                localStorage.setItem("authToken", data.token);
            } else {
                sessionStorage.setItem("authToken", data.token);
            }

            toast.textContent =
                "Login successful!";

            toast.className =
                "toast success";

            setTimeout(function() {
                window.location.href = "dashboard.html";
            }, 1000);

        }
        catch (error) {

            toast.textContent =
                "Could not connect to server. Please try again.";

            toast.className =
                "toast error";

        }

    }
);