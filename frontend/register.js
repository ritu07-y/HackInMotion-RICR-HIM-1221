/* =====================================
   SHOW / HIDE PASSWORD
===================================== */

function togglePassword(inputId, button) {

    const input =
        document.getElementById(inputId);


    if (input.type === "password") {

        input.type = "text";

        button.textContent = "🙈";

    } else {

        input.type = "password";

        button.textContent = "👁";

    }

}


/* =====================================
   PASSWORD STRENGTH
===================================== */

const password =
    document.getElementById("registerPassword");

const passwordStrength =
    document.getElementById("passwordStrength");


password.addEventListener("input", function () {

    const value = password.value;


    if (value.length === 0) {

        passwordStrength.classList.remove("show");

        return;

    }


    passwordStrength.classList.add("show");


    checkRule(
        "lengthCheck",
        value.length >= 8
    );


    checkRule(
        "uppercaseCheck",
        /[A-Z]/.test(value)
    );


    checkRule(
        "lowercaseCheck",
        /[a-z]/.test(value)
    );


    checkRule(
        "numberCheck",
        /[0-9]/.test(value)
    );


    checkRule(
        "specialCheck",
        /[^A-Za-z0-9]/.test(value)
    );

});


function checkRule(id, valid) {

    const element =
        document.getElementById(id);


    if (valid) {

        element.classList.add("valid");

        element.textContent =
            "✓ " +
            element.textContent.substring(2);

    } else {

        element.classList.remove("valid");

        element.textContent =
            "✕ " +
            element.textContent.substring(2);

    }

}


/* =====================================
   REGISTER FORM
===================================== */

const registerForm =
    document.getElementById("registerForm");


registerForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const name =
            document.getElementById(
                "registerName"
            ).value.trim();


        const email =
            document.getElementById(
                "registerEmail"
            ).value.trim();


        const passwordValue =
            document.getElementById(
                "registerPassword"
            ).value;


        const confirmPassword =
            document.getElementById(
                "confirmPassword"
            ).value;


        const terms =
            document.getElementById(
                "terms"
            ).checked;


        const toast =
            document.getElementById("toast");


        const strongPassword =

            passwordValue.length >= 8 &&

            /[A-Z]/.test(passwordValue) &&

            /[a-z]/.test(passwordValue) &&

            /[0-9]/.test(passwordValue) &&

            /[^A-Za-z0-9]/.test(passwordValue);


        if (!strongPassword) {

            toast.textContent =
                "Please create a strong password.";

            toast.classList.add("show");

            return;

        }


        if (passwordValue !== confirmPassword) {

            toast.textContent =
                "Passwords do not match.";

            toast.classList.add("show");

            return;

        }


        if (!terms) {

            toast.textContent =
                "Please accept the Terms & Conditions.";

            toast.classList.add("show");

            return;

        }


        console.log("Name:", name);

        console.log("Email:", email);


        /*
         * Later send this data to
         * your Spring Boot backend.
         */

        toast.textContent =
            "Account details are valid.";

        toast.classList.add("show");

    }
);


/* =====================================
   GOOGLE REGISTER
===================================== */

function googleRegister() {

    /*
     * Spring Boot OAuth2 endpoint
     */

    window.location.href =
        "http://localhost:8080/oauth2/authorization/google";

}