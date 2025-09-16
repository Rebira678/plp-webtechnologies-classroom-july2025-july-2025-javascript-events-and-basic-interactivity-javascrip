document.addEventListener("DOMContentLoaded", () => {
  // ===== DARK MODE TOGGLE =====
  const darkModeBtn = document.getElementById("darkModeToggle");
  darkModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });

  // ===== COUNTER =====
  let counter = 0;
  const counterDisplay = document.querySelector(".counter-display");
  const incrementBtn = document.getElementById("incrementBtn");
  const decrementBtn = document.getElementById("decrementBtn");
  const resetBtn = document.getElementById("resetBtn");

  function updateCounter() {
    counterDisplay.textContent = counter;
    counterDisplay.classList.add("bump");
    setTimeout(() => counterDisplay.classList.remove("bump"), 200);
  }

  incrementBtn.addEventListener("click", () => {
    counter++;
    updateCounter();
  });
  decrementBtn.addEventListener("click", () => {
    counter--;
    updateCounter();
  });
  resetBtn.addEventListener("click", () => {
    counter = 0;
    updateCounter();
  });

  // ===== FAQ COLLAPSE =====
  const faqQuestions = document.querySelectorAll(".faq-question");
  faqQuestions.forEach((q) => {
    q.addEventListener("click", () => {
      const answer = q.nextElementSibling;
      if (answer.style.maxHeight) {
        answer.style.maxHeight = null;
        answer.style.padding = "0 15px";
      } else {
        answer.style.maxHeight = answer.scrollHeight + "px";
        answer.style.padding = "15px";
      }
    });
  });

  // ===== TABS =====
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabContents = document.querySelectorAll(".tab-content");
  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabButtons.forEach((b) => b.classList.remove("active"));
      tabContents.forEach((c) => c.classList.remove("active"));

      btn.classList.add("active");
      document.getElementById(btn.dataset.tab).classList.add("active");
    });
  });

  // ===== TAB 1: Quiz =====
  const quizBtns = document.querySelectorAll("#tab1 .quiz-btn");
  const quizFeedback = document.getElementById("quizFeedback");

  quizBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.dataset.answer === "8") {
        quizFeedback.textContent = "Correct! 🎉";
        quizFeedback.style.color = "green";
      } else {
        quizFeedback.textContent = "Wrong! ❌ Try again.";
        quizFeedback.style.color = "red";
      }
    });
  });

  // ===== TAB 2: Random Color Generator =====
  const generateColorBtn = document.getElementById("generateColorBtn");
  const colorBox = document.getElementById("colorBox");
  const colorCode = document.getElementById("colorCode");

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  generateColorBtn.addEventListener("click", () => {
    const newColor = getRandomColor();
    colorBox.style.backgroundColor = newColor;
    colorCode.textContent = `Color: ${newColor}`;
  });

  // ===== TAB 3: To-Do List =====
  const todoInput = document.getElementById("todoInput");
  const addTodoBtn = document.getElementById("addTodoBtn");
  const todoList = document.getElementById("todoList");

  addTodoBtn.addEventListener("click", () => {
    const task = todoInput.value.trim();
    if (task) {
      const li = document.createElement("li");
      li.textContent = task;
      li.style.cursor = "pointer";
      li.addEventListener("click", () => {
        li.style.textDecoration =
          li.style.textDecoration === "line-through" ? "none" : "line-through";
      });
      todoList.appendChild(li);
      todoInput.value = "";
    }
  });

  // ===== FORM VALIDATION =====
  const form = document.getElementById("signupForm");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const formSuccess = document.getElementById("formSuccess");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;

    // Clear previous messages
    form
      .querySelectorAll(".error-msg")
      .forEach((msg) => (msg.textContent = ""));
    formSuccess.textContent = "";

    // Name validation
    if (!nameInput.value.trim()) {
      nameInput.nextElementSibling.textContent = "Name cannot be empty";
      valid = false;
    }

    // Email validation
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!emailPattern.test(emailInput.value)) {
      emailInput.nextElementSibling.textContent = "Please enter a valid email";
      valid = false;
    }

    // Password validation
    if (passwordInput.value.length < 6) {
      passwordInput.nextElementSibling.textContent =
        "Password must be at least 6 characters";
      valid = false;
    }

    if (valid) {
      formSuccess.textContent = "Form submitted successfully! ✅";
      form.reset();
    }
  });
});
