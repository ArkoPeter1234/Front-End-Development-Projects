/* ==========================================================================
   Sentinel Exams — Results Module
   Renders the score gauge, a pass/review/flag verdict, and the integrity
   summary (focus score, violation counts, early termination notice).
   ========================================================================== */

const GAUGE_RADIUS = 76;
const GAUGE_CIRCUMFERENCE = 2 * Math.PI * GAUGE_RADIUS;

function pickVerdict(pct, integrityScore, terminatedEarly) {
  if (terminatedEarly || integrityScore < 40) {
    return { icon: "sealFlag", name: "Flagged for Review" };
  }
  if (pct >= 70 && integrityScore >= 70) {
    return { icon: "sealPass", name: "Passed" };
  }
  return { icon: "sealReview", name: "Needs Review" };
}

function initResults() {
  requireAuth();
  const raw = localStorage.getItem("sentinel_last_result");
  if (!raw) { window.location.href = "index.html"; return; }
  const result = JSON.parse(raw);
  const pct = Math.round((result.score / result.total) * 100);

  document.getElementById("gaugePct").textContent = pct + "%";
  document.getElementById("gaugeLabel").textContent = `${result.score} / ${result.total} correct`;

  const fg = document.getElementById("gaugeFg");
  fg.style.strokeDasharray = `${GAUGE_CIRCUMFERENCE}`;
  fg.style.strokeDashoffset = `${GAUGE_CIRCUMFERENCE}`;
  requestAnimationFrame(() => {
    fg.style.strokeDashoffset = `${GAUGE_CIRCUMFERENCE * (1 - pct / 100)}`;
  });

  const verdict = pickVerdict(pct, result.integrityScore, result.terminatedEarly);
  document.getElementById("verdictIconSlot").setAttribute("data-icon", verdict.icon);
  document.getElementById("verdictName").textContent = verdict.name;
  document.getElementById("resultsCategory").textContent = result.categoryTitle;

  document.getElementById("integrityScoreOut").textContent = result.integrityScore + " / 100";
  document.getElementById("majorCountOut").textContent = result.majorCount;
  document.getElementById("minorCountOut").textContent = result.minorCount;
  document.getElementById("terminatedOut").textContent = result.terminatedEarly ? "Yes — ended early" : "No";
  if (result.terminatedEarly && result.terminationReason) {
    document.getElementById("terminationReasonRow").style.display = "flex";
    document.getElementById("terminationReasonOut").textContent = result.terminationReason;
  }

  document.getElementById("retakeBtn").addEventListener("click", () => {
    window.location.href = `exam.html?category=${result.categoryKey}`;
  });

  mountSentinelIcons();
}

document.addEventListener("DOMContentLoaded", initResults);
