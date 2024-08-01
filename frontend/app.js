const loginForm = document.querySelector("#login");
const createAccountForm = document.querySelector("#createAccount");
const resetPasswordForm = document.querySelector("#forgotPassword");

function setFormMessage(formElement, type, message) {
  const messageElement = formElement.querySelector(".form__message");

  messageElement.textContent = message;
  messageElement.classList.remove(
    "form__message--success",
    "form__message--error"
  );
  messageElement.classList.add(`form__message--${type}`);
}

function setInputError(inputElement, message) {
  inputElement.classList.add("form__input--error");
  inputElement.parentElement.querySelector(
    ".form__input-error-message"
  ).textContent = message;
}

function clearInputError(inputElement) {
  inputElement.classList.remove("form__input--error");
  inputElement.parentElement.querySelector(
    ".form__input-error-message"
  ).textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelector("#linkCreateAccount")
    .addEventListener("click", (e) => {
      e.preventDefault();
      loginForm.classList.add("form--hidden");
      createAccountForm.classList.remove("form--hidden");
    });

  document.querySelector("#linkLogin").addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.classList.remove("form--hidden");
    createAccountForm.classList.add("form--hidden");
  });

  document.querySelector("#resetPassword").addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.classList.add("form--hidden");
    resetPasswordForm.classList.remove("form--hidden");
  });

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    setFormMessage(loginForm, "error", "Invalid username/password combination");
  });

  document.querySelectorAll(".form__input").forEach((inputElement) => {
    inputElement.addEventListener("blur", (e) => {
      if (
        e.target.id === "signupUsername" &&
        e.target.value.length > 0 &&
        e.target.value.length < 10
      ) {
        setInputError(
          inputElement,
          "Username must be at least 10 characters in length"
        );
      }
    });

    inputElement.addEventListener("input", (e) => {
      clearInputError(inputElement);
    });
  });
});

document.getElementById("reset").addEventListener("click", (e) => {
  e.preventDefault();
  const forgotPasswordInput = document.getElementById("forgot_password_input");
  console.log(forgotPasswordInput);
  if (forgotPasswordInput == " ") {
    const forgotPasswordInputErrorMessage = document.querySelectorAll(
      ".form__input-error-message"
    );
    forgotPasswordInputErrorMessage.textContent = "Please type in your email";
  }
  let message = "We just sent you an otp to your email for verification";
  const otpDiv = document.getElementById("form__otp--message");
  otpDiv.style.color = "green";
  otpDiv.textContent = message;
});

// signUp and signIn buttons
const signUpButton = document.getElementById("sign-up-btn");
const signInButton = document.getElementById("sign-in-btn");

// Input fields to collect data from
const signUpUsername = document.getElementById("sign-up-username");
const signUpEmail = document.getElementById("sign-up-email");
const signUpPassword = document.getElementById("sign-up-password");

const signInEmail = document.getElementById("login-email");
const signInPassword = document.getElementById("login-password");

// fetch data
async function signUp() {
  try {
    const response = await fetch("http://localhost:3000/api/v1/auth/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: signUpUsername.value,
        email: signUpEmail.value,
        password: signUpPassword.value,
      }),
    });
    const data = await response.json();
    console.log(data);
    // Hide the sign-up form
    createAccountForm.classList.add("form--hidden");

    // Show the login form
    loginForm.classList.remove("form--hidden");
  } catch (error) {
    console.log(error);
  }
}

async function signIn() {
  try {
    const response = await fetch("http://localhost:3000/api/v1/auth/sign-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: signInEmail.value,
        password: signInPassword.value,
      }),
    });
    const data = await response.json();
    if (response.status === 200) {
      window.location.href = "http://127.0.0.1:5500/frontend/dashboard.html";
    } else {
    }
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

signUpButton.addEventListener("click", (e) => {
  e.preventDefault();
  signUp();
});

signInButton.addEventListener("click", (e) => {
  e.preventDefault();
  signIn();
});
