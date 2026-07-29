/* ==========================================================================
   Sentinel Exams — Proctor Module
   Client-side exam-integrity monitor. Detects and logs:
   - Tab switches / window blur (candidate leaving the exam window)
   - Exiting fullscreen
   - Right-click (context menu) attempts
   - Copy / cut / paste attempts
   - Common inspection shortcuts (F12, Ctrl+Shift+I/J/C, Ctrl+U)

   IMPORTANT LIMITATION: this is a front-end deterrent and activity log, not
   a security boundary. A determined user can bypass any client-side check
   (e.g. via browser devtools). For real exam integrity at scale, pair this
   with server-side session validation and, if needed, human/video proctoring.
   ========================================================================== */

const MAJOR_PENALTY = 15;
const MINOR_PENALTY = 5;

const proctorState = {
  violations: [],
  integrityScore: 100,
  majorCount: 0,
  minorCount: 0,
  onViolationCallback: null,
  onCriticalCallback: null,
  active: false,
  terminated: false
};

function onProctorViolation(cb) { proctorState.onViolationCallback = cb; }
/** Called immediately the moment a "leave the exam environment" event happens
 *  (tab switch, window blur, or exiting fullscreen) — these submit the exam
 *  right away rather than accumulating toward a threshold. */
function onProctorCritical(cb) { proctorState.onCriticalCallback = cb; }

function logViolation(type, severity, message) {
  if (!proctorState.active || proctorState.terminated) return;
  const entry = { type, severity, message, time: new Date() };
  proctorState.violations.push(entry);

  if (severity === "major") {
    proctorState.majorCount += 1;
    proctorState.integrityScore = Math.max(0, proctorState.integrityScore - MAJOR_PENALTY);
  } else {
    proctorState.minorCount += 1;
    proctorState.integrityScore = Math.max(0, proctorState.integrityScore - MINOR_PENALTY);
  }

  if (proctorState.onViolationCallback) proctorState.onViolationCallback(entry, proctorState);

  if (severity === "major") {
    proctorState.terminated = true;
    if (proctorState.onCriticalCallback) proctorState.onCriticalCallback(entry, proctorState);
  }
}

function requestExamFullscreen() {
  const el = document.documentElement;
  const req = el.requestFullscreen || el.webkitRequestFullscreen || el.msRequestFullscreen;
  if (req) {
    req.call(el).catch(() => {
      // Fullscreen can be blocked by the browser/sandbox — log it but don't fail the exam.
      logViolation("fullscreen-denied", "minor", "Fullscreen mode could not be enabled");
    });
  }
}

function isFullscreenActive() {
  return !!(document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement);
}

function initProctor() {
  proctorState.active = true;

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) logViolation("tab-switch", "major", "Tab switched or window minimized");
  });

  window.addEventListener("blur", () => {
    if (proctorState.active) logViolation("window-blur", "major", "Exam window lost focus");
  });

  document.addEventListener("fullscreenchange", () => {
    if (proctorState.active && !isFullscreenActive()) {
      logViolation("fullscreen-exit", "major", "Exited fullscreen mode");
    }
  });

  document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    logViolation("right-click", "minor", "Right-click / context menu attempted");
  });

  document.addEventListener("selectstart", (e) => e.preventDefault());

  ["copy", "cut", "paste"].forEach(evt => {
    document.addEventListener(evt, (e) => {
      e.preventDefault();
      logViolation(evt, "minor", `Clipboard action blocked (${evt})`);
    });
  });

  document.addEventListener("keydown", (e) => {
    const key = e.key.toLowerCase();
    const blockedCombo =
      (e.ctrlKey && ["c", "v", "x", "u"].includes(key)) ||
      (e.ctrlKey && e.shiftKey && ["i", "j", "c"].includes(key)) ||
      key === "f12";
    if (blockedCombo) {
      e.preventDefault();
      logViolation("shortcut-blocked", "minor", `Blocked shortcut attempt (${e.key})`);
    }
  });
}

function stopProctor() {
  proctorState.active = false;
}

function getProctorSummary() {
  return {
    score: proctorState.integrityScore,
    majorCount: proctorState.majorCount,
    minorCount: proctorState.minorCount,
    violations: proctorState.violations
  };
}
