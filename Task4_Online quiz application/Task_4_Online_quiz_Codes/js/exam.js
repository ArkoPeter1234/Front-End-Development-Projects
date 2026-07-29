/* ==========================================================================
   Sentinel Exams — Exam Engine
   Round 1: every question gets 40 seconds. No answer in time -> skipped,
            moves on automatically. "Skip Question" also skips immediately.
   Round 2 ("Second Chance"): any questions skipped in Round 1 come back
            with 10 seconds each. No answer this time -> stays unanswered.
   A tab switch, window blur, or fullscreen exit submits the exam instantly.
   ========================================================================== */

const ROUND1_TIME = 40;
const ROUND2_TIME = 10;
const RADIUS = 22;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const FOCUS_RADIUS = 40;
const FOCUS_CIRCUMFERENCE = 2 * Math.PI * FOCUS_RADIUS;

const examState = {
  categoryKey: null,
  round1Queue: [],   // all questions, round 1
  round2Queue: [],   // skipped questions carried into round 2
  round: 1,
  index: 0,
  score: 0,
  totalQuestions: 0,
  timer: null,
  timeLeft: ROUND1_TIME,
  answered: false,
  terminatedEarly: false,
  terminationReason: null
};

function getParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

function initExam() {
  requireAuth();
  const key = getParam("category");
  const cat = EXAM_BANK[key];
  if (!cat) { window.location.href = "index.html"; return; }

  examState.categoryKey = key;
  examState.round1Queue = buildExamSet(key, 8);
  examState.totalQuestions = examState.round1Queue.length;
  document.getElementById("examCategoryTag").textContent = cat.title;
  document.getElementById("examCategoryTagStart").textContent = `Track: ${cat.title} — read the rules below before you start.`;

  renderRulesList("startRulesList");
  document.getElementById("startExamBtn").addEventListener("click", startExam);
  document.getElementById("skipBtn").addEventListener("click", skipCurrentQuestion);
}

function startExam() {
  document.getElementById("startGate").style.display = "none";
  document.getElementById("examCardMain").style.display = "block";

  initProctor();
  requestExamFullscreen();
  onProctorViolation(renderViolation);
  onProctorCritical(handleCriticalViolation);
  updateFocusGauge();

  renderQuestion();
}

function currentQueue() {
  return examState.round === 1 ? examState.round1Queue : examState.round2Queue;
}

function renderRoundBadge() {
  const badge = document.getElementById("roundBadge");
  if (!badge) return;
  badge.textContent = examState.round === 1 ? "Round 1" : "Second Chance";
  badge.className = "round-badge" + (examState.round === 2 ? " round-2" : "");
}

function renderDots() {
  const wrap = document.getElementById("progressDots");
  wrap.innerHTML = "";
  currentQueue().forEach((_, i) => {
    const dot = document.createElement("span");
    dot.className = "dot" + (i < examState.index ? " done" : i === examState.index ? " current" : "");
    wrap.appendChild(dot);
  });
}

function renderQuestion() {
  const queue = currentQueue();

  if (examState.index >= queue.length) {
    if (examState.round === 1 && examState.round2Queue.length > 0) {
      examState.round = 2;
      examState.index = 0;
      renderQuestion();
    } else {
      finishExam(false);
    }
    return;
  }

  examState.answered = false;
  examState.timeLeft = examState.round === 1 ? ROUND1_TIME : ROUND2_TIME;
  const item = queue[examState.index];

  renderRoundBadge();
  document.getElementById("examQuestion").textContent = item.q;
  document.getElementById("liveScore").textContent = examState.score;
  document.getElementById("liveTotal").textContent = examState.totalQuestions;

  const optionsWrap = document.getElementById("optionsWrap");
  optionsWrap.innerHTML = "";
  const letters = ["A", "B", "C", "D"];
  item.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.innerHTML = `<span class="option-letter">${letters[i]}</span><span>${opt}</span>`;
    btn.addEventListener("click", () => selectOption(i));
    optionsWrap.appendChild(btn);
  });

  renderDots();
  startTimer();
}

function startTimer() {
  clearInterval(examState.timer);
  const total = examState.round === 1 ? ROUND1_TIME : ROUND2_TIME;
  updateRing(total);
  examState.timer = setInterval(() => {
    examState.timeLeft -= 1;
    updateRing(total);
    if (examState.timeLeft <= 0) {
      clearInterval(examState.timer);
      if (!examState.answered) autoSkip();
    }
  }, 1000);
}

function updateRing(total) {
  const fg = document.getElementById("timerFg");
  const num = document.getElementById("timerNum");
  const fraction = Math.max(examState.timeLeft, 0) / total;
  fg.style.strokeDasharray = `${CIRCUMFERENCE}`;
  fg.style.strokeDashoffset = `${CIRCUMFERENCE * (1 - fraction)}`;
  fg.style.stroke = fraction < 0.25 ? "#E8483A" : "#3FB68A";
  num.textContent = Math.max(examState.timeLeft, 0);
}

/** Time ran out with no answer: Round 1 -> carry into Round 2. Round 2 -> stays unanswered. */
function autoSkip() {
  if (examState.answered) return;
  examState.answered = true;
  disableOptions();
  if (examState.round === 1) {
    examState.round2Queue.push(currentQueue()[examState.index]);
  }
  advance();
}

/** Manual "Skip Question" button. Same rule: Round 1 carries the question
 *  forward to the Second Chance round; Round 2 skip is final. */
function skipCurrentQuestion() {
  if (examState.answered) return;
  examState.answered = true;
  clearInterval(examState.timer);
  disableOptions();
  if (examState.round === 1) {
    examState.round2Queue.push(currentQueue()[examState.index]);
  }
  advance();
}

function disableOptions() {
  document.querySelectorAll(".option-btn").forEach(btn => btn.disabled = true);
}

function selectOption(selectedIndex) {
  if (examState.answered) return;
  examState.answered = true;
  clearInterval(examState.timer);

  const item = currentQueue()[examState.index];
  const buttons = document.querySelectorAll(".option-btn");
  buttons.forEach((btn, i) => {
    btn.disabled = true;
    if (i === item.answer) btn.classList.add("correct");
    if (i === selectedIndex && selectedIndex !== item.answer) btn.classList.add("wrong");
  });

  if (selectedIndex === item.answer) examState.score += 1;
  document.getElementById("liveScore").textContent = examState.score;

  setTimeout(advance, 1100);
}

function advance() {
  examState.index += 1;
  renderQuestion();
}

/* ---------- Integrity panel wiring ---------- */

function renderViolation(entry) {
  const list = document.getElementById("violationLog");
  const empty = document.getElementById("violationEmpty");
  if (empty) empty.remove();

  const li = document.createElement("li");
  li.className = entry.severity;
  const timeStr = entry.time.toLocaleTimeString();
  li.innerHTML = `<span class="v-time">${timeStr}</span>${entry.message}`;
  list.appendChild(li);

  updateFocusGauge();
}

function updateFocusGauge() {
  const summary = getProctorSummary();
  const fg = document.getElementById("focusFg");
  const num = document.getElementById("focusNum");
  if (!fg || !num) return;
  const fraction = summary.score / 100;
  fg.style.strokeDasharray = `${FOCUS_CIRCUMFERENCE}`;
  fg.style.strokeDashoffset = `${FOCUS_CIRCUMFERENCE * (1 - fraction)}`;
  fg.style.stroke = summary.score >= 70 ? "#3FB68A" : summary.score >= 40 ? "#F2A93B" : "#E8483A";
  num.textContent = summary.score;
}

function handleCriticalViolation(entry) {
  if (examState.terminatedEarly) return;
  examState.terminatedEarly = true;
  examState.terminationReason = entry.message;
  clearInterval(examState.timer);
  document.getElementById("overlayWarning").classList.add("show");
  setTimeout(() => finishExam(true), 2200);
}

function finishExam(terminatedEarly) {
  stopProctor();
  const proctorSummary = getProctorSummary();
  const result = {
    categoryKey: examState.categoryKey,
    categoryTitle: EXAM_BANK[examState.categoryKey].title,
    score: examState.score,
    total: examState.totalQuestions,
    terminatedEarly,
    terminationReason: examState.terminationReason,
    integrityScore: proctorSummary.score,
    majorCount: proctorSummary.majorCount,
    minorCount: proctorSummary.minorCount,
    violationCount: proctorSummary.violations.length,
    completedAt: Date.now()
  };
  localStorage.setItem("sentinel_last_result", JSON.stringify(result));
  window.location.href = "results.html";
}

document.addEventListener("DOMContentLoaded", initExam);
