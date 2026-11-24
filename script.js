// 1. Quiz Questions with Explanations
const quizQuestions = [
  {
    question: "Which HTML tag is used to link an external CSS file?",
    choices: ["<style>", "<link>", "<script>", "<css>"],
    answer: 1,
    explanation: "The <link rel='stylesheet' href='styles.css'> tag connects an external CSS file inside <head>. <style> is only for internal CSS, and <script> is for JavaScript."
  },
  {
    question: "Which CSS property controls the space inside an element's border?",
    choices: ["margin", "gap", "padding", "border-spacing"],
    answer: 2,
    explanation: "Padding creates breathing room inside an element between its content and border, whereas margin creates space outside the border."
  },
  {
    question: "Which method saves data in the browser even after refreshing?",
    choices: ["localStorage.setItem()", "console.log()", "document.querySelector()", "JSON.parse()"],
    answer: 0,
    explanation: "localStorage.setItem(key, value) stores data persistently in the browser so your PomoGochi level and streak stay saved after reloading."
  }
];

let currentQuestionIndex = 0;
let sessionScore = 0;

// 2. Custom Inline SVG Artwork for Each Evolution Stage
const petSVGs = {
  1: `
    <svg viewBox="0 0 140 140" width="100%" height="100%" aria-hidden="true">
      <ellipse cx="42" cy="40" rx="14" ry="26" transform="rotate(-22 42 40)" fill="#f59e0b" stroke="#78350f" stroke-width="3"/>
      <ellipse cx="42" cy="40" rx="7" ry="16" transform="rotate(-22 42 40)" fill="#0d9488"/>
      <ellipse cx="98" cy="40" rx="14" ry="26" transform="rotate(22 98 40)" fill="#f59e0b" stroke="#78350f" stroke-width="3"/>
      <ellipse cx="98" cy="40" rx="7" ry="16" transform="rotate(22 98 40)" fill="#0d9488"/>
      <ellipse cx="112" cy="86" rx="16" ry="10" transform="rotate(-25 112 86)" fill="#fef3c7" stroke="#78350f" stroke-width="3"/>
      <ellipse cx="70" cy="82" rx="40" ry="34" fill="#f59e0b" stroke="#78350f" stroke-width="3"/>
      <path d="M58 50 Q70 30 84 48 Q75 56 58 50 Z" fill="#fbbf24" stroke="#78350f" stroke-width="3"/>
      <ellipse cx="70" cy="86" rx="16" ry="12" fill="#fef3c7"/>
      <circle cx="44" cy="82" r="9" fill="#fde047" stroke="#ca8a04" stroke-width="2"/>
      <circle cx="96" cy="82" r="9" fill="#fde047" stroke="#ca8a04" stroke-width="2"/>
      <circle cx="56" cy="73" r="4.5" fill="#1e293b"/>
      <circle cx="54.5" cy="71.5" r="1.5" fill="#ffffff"/>
      <circle cx="84" cy="73" r="4.5" fill="#1e293b"/>
      <circle cx="82.5" cy="71.5" r="1.5" fill="#ffffff"/>
      <circle cx="70" cy="81" r="2.5" fill="#78350f"/>
      <path d="M65 87 Q70 92 75 87" fill="none" stroke="#78350f" stroke-width="2.5" stroke-linecap="round"/>
      <ellipse cx="48" cy="112" rx="10" ry="7" fill="#fef3c7" stroke="#78350f" stroke-width="3"/>
      <ellipse cx="92" cy="112" rx="10" ry="7" fill="#fef3c7" stroke="#78350f" stroke-width="3"/>
    </svg>
  `,
  2: `
    <svg viewBox="0 0 140 140" width="100%" height="100%" aria-hidden="true">
      <ellipse cx="44" cy="34" rx="13" ry="28" transform="rotate(-18 44 34)" fill="#f59e0b" stroke="#78350f" stroke-width="3"/>
      <ellipse cx="44" cy="34" rx="6" ry="17" transform="rotate(-18 44 34)" fill="#0d9488"/>
      <ellipse cx="96" cy="34" rx="13" ry="28" transform="rotate(18 96 34)" fill="#f59e0b" stroke="#78350f" stroke-width="3"/>
      <ellipse cx="96" cy="34" rx="6" ry="17" transform="rotate(18 96 34)" fill="#0d9488"/>
      <ellipse cx="108" cy="96" rx="18" ry="11" transform="rotate(-30 108 96)" fill="#fef3c7" stroke="#78350f" stroke-width="3"/>
      <rect x="40" y="46" width="60" height="74" rx="30" fill="#f59e0b" stroke="#78350f" stroke-width="3"/>
      <path d="M54 48 Q66 22 86 42 Q76 52 54 48 Z" fill="#fbbf24" stroke="#78350f" stroke-width="3"/>
      <ellipse cx="70" cy="92" rx="20" ry="18" fill="#fef3c7"/>
      <ellipse cx="70" cy="68" rx="14" ry="10" fill="#fef3c7"/>
      <circle cx="48" cy="66" r="8.5" fill="#fde047" stroke="#ca8a04" stroke-width="2"/>
      <circle cx="92" cy="66" r="8.5" fill="#fde047" stroke="#ca8a04" stroke-width="2"/>
      <circle cx="58" cy="58" r="4.5" fill="#1e293b"/>
      <circle cx="56.5" cy="56.5" r="1.5" fill="#ffffff"/>
      <circle cx="82" cy="58" r="4.5" fill="#1e293b"/>
      <circle cx="80.5" cy="56.5" r="1.5" fill="#ffffff"/>
      <path d="M65 68 Q70 75 75 68 Z" fill="#f43f5e" stroke="#78350f" stroke-width="2"/>
      <ellipse cx="34" cy="82" rx="12" ry="9" transform="rotate(-25 34 82)" fill="#fef3c7" stroke="#78350f" stroke-width="3"/>
      <circle cx="32" cy="82" r="4" fill="#fde047"/>
      <ellipse cx="106" cy="82" rx="12" ry="9" transform="rotate(25 106 82)" fill="#fef3c7" stroke="#78350f" stroke-width="3"/>
      <circle cx="108" cy="82" r="4" fill="#fde047"/>
      <ellipse cx="54" cy="122" rx="10" ry="7" fill="#d97706" stroke="#78350f" stroke-width="3"/>
      <ellipse cx="86" cy="122" rx="10" ry="7" fill="#d97706" stroke="#78350f" stroke-width="3"/>
    </svg>
  `,
  3: `
    <svg viewBox="0 0 140 140" width="100%" height="100%" aria-hidden="true">
      <ellipse cx="40" cy="30" rx="14" ry="28" transform="rotate(-20 40 30)" fill="#f59e0b" stroke="#78350f" stroke-width="3"/>
      <ellipse cx="40" cy="30" rx="7" ry="18" transform="rotate(-20 40 30)" fill="#0d9488"/>
      <ellipse cx="100" cy="30" rx="14" ry="28" transform="rotate(20 100 30)" fill="#f59e0b" stroke="#78350f" stroke-width="3"/>
      <ellipse cx="100" cy="30" rx="7" ry="18" transform="rotate(20 100 30)" fill="#0d9488"/>
      <ellipse cx="114" cy="96" rx="18" ry="11" transform="rotate(-30 114 96)" fill="#fef3c7" stroke="#78350f" stroke-width="3"/>
      <rect x="36" y="44" width="68" height="78" rx="34" fill="#f59e0b" stroke="#78350f" stroke-width="3"/>
      <path d="M50 45 L56 20 L68 35 L78 16 L86 36 L96 26 L90 46 Z" fill="#fbbf24" stroke="#78350f" stroke-width="3" stroke-linejoin="round"/>
      <path d="M44 76 L54 84 L62 77 L70 85 L78 77 L86 84 L96 76" fill="none" stroke="#78350f" stroke-width="3" stroke-linecap="round"/>
      <ellipse cx="70" cy="64" rx="15" ry="11" fill="#fef3c7"/>
      <circle cx="46" cy="62" r="9.5" fill="#fde047" stroke="#ca8a04" stroke-width="2"/>
      <circle cx="94" cy="62" r="9.5" fill="#fde047" stroke="#ca8a04" stroke-width="2"/>
      <circle cx="57" cy="54" r="4.5" fill="#1e293b"/>
      <circle cx="55.5" cy="52.5" r="1.5" fill="#ffffff"/>
      <circle cx="83" cy="54" r="4.5" fill="#1e293b"/>
      <circle cx="81.5" cy="52.5" r="1.5" fill="#ffffff"/>
      <path d="M63 64 Q70 74 77 64 Z" fill="#f43f5e" stroke="#78350f" stroke-width="2"/>
      <ellipse cx="26" cy="84" rx="16" ry="12" transform="rotate(-15 26 84)" fill="#fef3c7" stroke="#78350f" stroke-width="3"/>
      <circle cx="22" cy="84" r="5.5" fill="#fde047" stroke="#ca8a04" stroke-width="1.5"/>
      <ellipse cx="114" cy="84" rx="16" ry="12" transform="rotate(15 114 84)" fill="#fef3c7" stroke="#78350f" stroke-width="3"/>
      <circle cx="118" cy="84" r="5.5" fill="#fde047" stroke="#ca8a04" stroke-width="1.5"/>
      <ellipse cx="52" cy="124" rx="11" ry="7" fill="#d97706" stroke="#78350f" stroke-width="3"/>
      <ellipse cx="88" cy="124" rx="11" ry="7" fill="#d97706" stroke="#78350f" stroke-width="3"/>
    </svg>
  `
};

// 3. LocalStorage Helpers
function getPetData() {
  const saved = localStorage.getItem("pomogochi_pet");
  return saved ? JSON.parse(saved) : { level: 1, exp: 0, streak: 0, totalScore: 0 };
}

function savePetData(pet) {
  localStorage.setItem("pomogochi_pet", JSON.stringify(pet));
}

// 4. Determine Pet Stage by Level
function getPetStage(level) {
  if (level >= 5) return { stage: 3, name: "Stage 3: PomoChamp" };
  if (level >= 3) return { stage: 2, name: "Stage 2: PomoPaw" };
  return { stage: 1, name: "Stage 1: PomoPup" };
}

// 5. Navigation Tabs & Logout Reset (index.html)
function setupNavigation() {
  const navButtons = document.querySelectorAll(".nav-btn[data-view]");
  const views = document.querySelectorAll(".view");

  navButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      navButtons.forEach((b) => b.classList.remove("active"));
      views.forEach((v) => v.classList.add("hidden"));

      btn.classList.add("active");
      const targetId = btn.getAttribute("data-view");
      const targetView = document.getElementById(targetId);
      if (targetView) {
        targetView.classList.remove("hidden");
      }
    });
  });

  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      if (confirm("Reset pet progress and log out?")) {
        localStorage.removeItem("pomogochi_pet");
        renderDashboard();
      }
    });
  }
}

// 6. Render Dashboard, Streak & Progress Views (index.html)
function renderDashboard() {
  const levelEl = document.getElementById("pet-level");
  if (!levelEl) return;

  const pet = getPetData();
  const currentStage = getPetStage(pet.level);
  const currentSVG = petSVGs[currentStage.stage];

  const dashPet = document.getElementById("dashboard-pet");
  const streakPet = document.getElementById("streak-pet");
  const progressPet = document.getElementById("progress-pet");

  if (dashPet) dashPet.innerHTML = currentSVG;
  if (streakPet) streakPet.innerHTML = currentSVG;
  if (progressPet) progressPet.innerHTML = currentSVG;

  const evo1 = document.getElementById("evo-icon-1");
  const evo2 = document.getElementById("evo-icon-2");
  const evo3 = document.getElementById("evo-icon-3");
  if (evo1) evo1.innerHTML = petSVGs[1];
  if (evo2) evo2.innerHTML = petSVGs[2];
  if (evo3) evo3.innerHTML = petSVGs[3];

  const stage2Card = document.getElementById("evo-stage-2");
  const stage3Card = document.getElementById("evo-stage-3");
  if (stage2Card) stage2Card.classList.toggle("unlocked", pet.level >= 3);
  if (stage3Card) stage3Card.classList.toggle("unlocked", pet.level >= 5);

  const stageLabel = document.getElementById("pet-stage-label");
  const progressStageText = document.getElementById("progress-stage-text");
  if (stageLabel) stageLabel.textContent = currentStage.name;
  if (progressStageText) progressStageText.textContent = currentStage.name;

  levelEl.textContent = pet.level;
  document.getElementById("streak-pet-level").textContent = pet.level;
  document.getElementById("pet-exp").textContent = pet.exp;
  document.getElementById("exp-bar-fill").style.width = `${pet.exp}%`;
  document.getElementById("total-score").textContent = pet.totalScore;
  document.getElementById("streak-count").textContent = pet.streak;
}

// 7. Quiz Logic with Wrong-Answer Explanations (app.html)
function loadQuestion() {
  const quizBox = document.getElementById("quiz-box");
  if (!quizBox) return;

  const current = quizQuestions[currentQuestionIndex];
  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;

  document.getElementById("quiz-progress-fill").style.width = `${progressPercent}%`;
  document.getElementById("question-counter").textContent =
    `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`;
  document.getElementById("question-text").textContent = current.question;

  const feedbackBox = document.getElementById("feedback-box");
  feedbackBox.className = "feedback-box hidden";
  document.getElementById("next-btn").classList.add("hidden");

  const choicesContainer = document.getElementById("choices-container");
  choicesContainer.innerHTML = "";

  current.choices.forEach((choiceText, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice-btn";
    button.textContent = choiceText;
    button.addEventListener("click", () => handleAnswer(index, button));
    choicesContainer.appendChild(button);
  });
}

function handleAnswer(selectedIndex, clickedBtn) {
  const current = quizQuestions[currentQuestionIndex];
  const allButtons = document.querySelectorAll(".choice-btn");
  const feedbackBox = document.getElementById("feedback-box");
  const feedbackTitle = document.getElementById("feedback-text");
  const explanationText = document.getElementById("explanation-text");

  allButtons.forEach((btn) => (btn.disabled = true));
  feedbackBox.classList.remove("hidden");

  if (selectedIndex === current.answer) {
    clickedBtn.classList.add("correct");
    feedbackBox.classList.add("correct-banner");
    feedbackTitle.textContent = "Awesome! +25 EXP 🎉";
    explanationText.textContent = current.explanation;
    sessionScore += 1;
  } else {
    clickedBtn.classList.add("wrong");
    allButtons[current.answer].classList.add("correct");
    feedbackBox.classList.add("wrong-banner");
    feedbackTitle.textContent = `Not quite! The correct answer is: ${current.choices[current.answer]}`;
    explanationText.textContent = `Why: ${current.explanation}`;
  }

  document.getElementById("next-btn").classList.remove("hidden");
}

function finishQuiz() {
  const pet = getPetData();
  const previousLevel = pet.level;

  pet.totalScore += sessionScore;
  pet.exp += sessionScore * 25;
  if (sessionScore > 0) pet.streak += 1;

  while (pet.exp >= 100) {
    pet.level += 1;
    pet.exp -= 100;
  }
  savePetData(pet);

  const stage = getPetStage(pet.level);
  const evolvedMessage =
    (previousLevel < 3 && pet.level >= 3) || (previousLevel < 5 && pet.level >= 5)
      ? `<p class="stage-pill">✨ Your PomoGochi evolved into ${stage.name}! ✨</p>`
      : "";

  document.getElementById("quiz-box").innerHTML = `
    <div class="quiz-progress-track">
      <div class="quiz-progress-fill" style="width: 100%;"></div>
    </div>
    <div style="width: 110px; height: 110px; margin: 0 auto;" class="pet-idle">
      ${petSVGs[stage.stage]}
    </div>
    <h2 style="text-align: center;">Quiz Complete! 🎉</h2>
    ${evolvedMessage}
    <p style="text-align: center;">You scored <strong>${sessionScore} / ${quizQuestions.length}</strong> (+${sessionScore * 25} EXP)</p>
    <a href="index.html" class="primary-pill-btn">Back to Dashboard</a>
  `;
}

// 8. Initialize App
document.addEventListener("DOMContentLoaded", () => {
  setupNavigation();
  renderDashboard();
  loadQuestion();

  const nextBtn = document.getElementById("next-btn");
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      currentQuestionIndex += 1;
      if (currentQuestionIndex < quizQuestions.length) {
        loadQuestion();
      } else {
        finishQuiz();
      }
    });
  }
});