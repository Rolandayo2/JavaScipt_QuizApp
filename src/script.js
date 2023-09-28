const questions = [
  {
      question: "What is 2 + 2?",
      options: ["3", "4", "5", "6"],
      answer: "4"
  },
  {
      question: "Which is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      answer: "Paris"
  },
  {
      question: "What is the largest planet in our solar system?",
      options: ["Mars", "Jupiter", "Saturn", "Venus"],
      answer: "Jupiter"
  }
];

let currentQuestionIndex = 0;
let score = 0;

const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const scoreElement = document.getElementById("score");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");
const restartButton = document.getElementById("restart-button");

function loadQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionText.textContent = currentQuestion.question;
  optionsContainer.innerHTML = "";

  for (const option of currentQuestion.options) {
      const optionElement = document.createElement("div");
      optionElement.classList.add("option");

      // Create a checkbox for each option
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = option;
      checkbox.name = "options";
      checkbox.value = option;

      // Create a label for the checkbox
      const label = document.createElement("label");
      label.textContent = option;
      label.setAttribute("for", option);

      optionElement.appendChild(checkbox);
      optionElement.appendChild(label);

      optionsContainer.appendChild(optionElement);
  }

  // Update the state of the Previous and Next buttons
  prevButton.disabled = currentQuestionIndex === 0;
  nextButton.disabled = false;
}

function checkAnswers() {
  const selectedOptions = document.querySelectorAll('input[name="options"]:checked');
  const currentQuestion = questions[currentQuestionIndex];

  if (selectedOptions.length === 0) {
      return; // No option selected
  }

  const selectedValues = Array.from(selectedOptions).map((checkbox) => checkbox.value);
  const isCorrect = selectedValues.every((value) => currentQuestion.options.includes(value));

  if (isCorrect) {
      score++;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
      loadQuestion();
  } else {
      // Quiz is over
      questionText.textContent = "Quiz Over!";
      optionsContainer.innerHTML = "";
      prevButton.style.display = "none";
      nextButton.style.display = "none";
      restartButton.style.display = "block";
      scoreElement.textContent = score;
  }

  scoreElement.textContent = score;
}

prevButton.addEventListener("click", () => {
  currentQuestionIndex--;
  loadQuestion();
});

nextButton.addEventListener("click", () => {
  checkAnswers();
});

restartButton.addEventListener("click", () => {
  currentQuestionIndex = 0;
  score = 0;
  loadQuestion();
  prevButton.style.display = "inline-block";
  nextButton.style.display = "inline-block";
  restartButton.style.display = "none";
  scoreElement.textContent = "0";
});

// Initial load
loadQuestion();
