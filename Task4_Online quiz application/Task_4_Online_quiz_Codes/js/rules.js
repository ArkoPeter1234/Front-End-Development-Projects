/* ==========================================================================
   Sentinel Exams — Rules Module
   Single source of truth for the exam rules, shown both on the dashboard
   (right after login) and again on the pre-exam start screen.
   ========================================================================== */

const EXAM_RULES = [
  "Each question has a 40-second timer. If you don't answer in time, it is automatically skipped and you move to the next question.",
  "After you've been through every question once, any skipped questions come back in a Second Chance round — 10 seconds each to answer them.",
  "You can also press \u201cSkip Question\u201d at any time to move on without answering.",
  "Copying, cutting, pasting, and right-click/selecting text are disabled during the exam.",
  "The exam runs in fullscreen. If you switch tabs, minimize the window, or exit fullscreen, your exam is submitted immediately and flagged for review.",
  "Your live Focus score and a timestamped integrity log are visible in the side panel throughout the exam."
];

function renderRulesList(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = "";
  EXAM_RULES.forEach(rule => {
    const li = document.createElement("li");
    li.textContent = rule;
    el.appendChild(li);
  });
}
