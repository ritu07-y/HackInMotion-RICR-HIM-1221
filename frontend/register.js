function togglePassword(i,b){const input=document.getElementById(i);if(input.type==="password"){input.type="text";b.textContent="🙈"}else{input.type="password";b.textContent="👁"}}

const password=document.getElementById("registerPassword"),passwordStrength=document.getElementById("passwordStrength");

password.addEventListener("input",function(){const v=password.value;if(v.length===0){passwordStrength.classList.remove("show");return}passwordStrength.classList.add("show");checkRule("lengthCheck",v.length>=8);checkRule("uppercaseCheck",/[A-Z]/.test(v));checkRule("lowercaseCheck",/[a-z]/.test(v));checkRule("numberCheck",/[0-9]/.test(v));checkRule("specialCheck",/[^A-Za-z0-9]/.test(v))});

function checkRule(i,v){const e=document.getElementById(i);if(v){e.classList.add("valid");e.textContent="✓ "+e.textContent.substring(2)}else{e.classList.remove("valid");e.textContent="✕ "+e.textContent.substring(2)}}

const API_BASE_URL = "http://localhost:8080";

const registerForm=document.getElementById("registerForm");

registerForm.addEventListener("submit",async function(e){

    e.preventDefault();

    const n=document.getElementById("registerName").value.trim(),
          em=document.getElementById("registerEmail").value.trim(),
          p=document.getElementById("registerPassword").value,
          cp=document.getElementById("confirmPassword").value,
          t=document.getElementById("terms").checked,
          toast=document.getElementById("toast"),
          s=p.length>=8&&/[A-Z]/.test(p)&&/[a-z]/.test(p)&&/[0-9]/.test(p)&&/[^A-Za-z0-9]/.test(p);

    if(!s){toast.textContent="Please create a strong password.";toast.classList.add("show");return}
    if(p!==cp){toast.textContent="Passwords do not match.";toast.classList.add("show");return}
    if(!t){toast.textContent="Please accept the Terms & Conditions.";toast.classList.add("show");return}

    try {

        const response = await fetch(API_BASE_URL + "/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: n, email: em, password: p })
        });

        const data = await response.json();

        if (!response.ok) {
            toast.textContent = data.error || "Registration failed. Please try again.";
            toast.classList.add("show");
            return;
        }

        toast.textContent = "Account created successfully!";
        toast.classList.add("show");

        setTimeout(function() {
            window.location.href = "login.html";
        }, 1200);

    } catch (error) {
        toast.textContent = "Could not connect to server. Please try again.";
        toast.classList.add("show");
    }

});

function googleRegister(){window.location.href="http://localhost:8080/oauth2/authorization/google"}