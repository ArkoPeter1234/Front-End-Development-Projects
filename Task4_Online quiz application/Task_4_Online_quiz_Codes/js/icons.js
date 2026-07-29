/* ==========================================================================
   Sentinel Exams — Icon Library
   Custom inline SVG icons (no external icon fonts / CDN dependency).
   ========================================================================== */

const SentinelIcons = {
  brand: `
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" class="brand-seal">
      <path d="M24 4l17 7v11c0 11-7 18-17 22-10-4-17-11-17-22V11z" fill="#3FB68A"/>
      <path d="M17 24l5 5 10-11" stroke="#0B0F14" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,

  sql: `
    <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" class="exam-icon">
      <rect x="4" y="4" width="48" height="48" rx="12" fill="#F4F6F5" stroke="#3FB68A" stroke-width="2"/>
      <ellipse cx="28" cy="19" rx="12" ry="5" stroke="#17212B" stroke-width="2"/>
      <path d="M16 19v9c0 2.8 5.4 5 12 5s12-2.2 12-5v-9" stroke="#17212B" stroke-width="2"/>
      <path d="M16 28v9c0 2.8 5.4 5 12 5s12-2.2 12-5v-9" stroke="#17212B" stroke-width="2"/>
    </svg>`,

  powerbi: `
    <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" class="exam-icon">
      <rect x="4" y="4" width="48" height="48" rx="12" fill="#F4F6F5" stroke="#F2A93B" stroke-width="2"/>
      <rect x="16" y="30" width="6" height="12" fill="#F2A93B"/>
      <rect x="25" y="22" width="6" height="20" fill="#17212B"/>
      <rect x="34" y="15" width="6" height="27" fill="#F2A93B"/>
    </svg>`,

  python: `
    <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" class="exam-icon">
      <rect x="4" y="4" width="48" height="48" rx="12" fill="#F4F6F5" stroke="#17212B" stroke-width="2"/>
      <path d="M28 14c-6 0-6 4-6 4v5h12M28 14c6 0 6 4 6 4v5" stroke="#3FB68A" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M28 42c6 0 6-4 6-4v-5H22M28 42c-6 0-6-4-6-4v-5" stroke="#17212B" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="24" cy="19" r="1.4" fill="#17212B"/>
      <circle cx="32" cy="37" r="1.4" fill="#3FB68A"/>
    </svg>`,

  ethics: `
    <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" class="exam-icon">
      <rect x="4" y="4" width="48" height="48" rx="12" fill="#F4F6F5" stroke="#E8483A" stroke-width="2"/>
      <path d="M28 14v6M20 20l-6 4 6 4M36 20l6 4-6 4" stroke="#17212B" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M14 24h28" stroke="#17212B" stroke-width="2.2"/>
      <path d="M28 20v22" stroke="#17212B" stroke-width="2.2"/>
      <path d="M20 42h16" stroke="#17212B" stroke-width="2.2" stroke-linecap="round"/>
    </svg>`,

  lock: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" stroke-width="1.8"/><path d="M8 11V8a4 4 0 0 1 8 0v3" stroke="currentColor" stroke-width="1.8"/></svg>`,

  camera: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 8h3l2-3h6l2 3h3v11H4z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><circle cx="12" cy="13" r="3.2" stroke="currentColor" stroke-width="1.7"/></svg>`,

  ban: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.7"/><path d="M6 6l12 12" stroke="currentColor" stroke-width="1.7"/></svg>`,

  clock: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.7"/><path d="M12 7v5l3.5 2" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,

  sealPass: `
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="verdict-seal">
      <circle cx="20" cy="20" r="18" fill="#3FB68A"/>
      <path d="M13 20l5 5 9-10" stroke="#052018" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,

  sealReview: `
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="verdict-seal">
      <circle cx="20" cy="20" r="18" fill="#F2A93B"/>
      <path d="M20 12v9" stroke="#3A2600" stroke-width="2.6" stroke-linecap="round"/>
      <circle cx="20" cy="27" r="1.6" fill="#3A2600"/>
    </svg>`,

  sealFlag: `
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="verdict-seal">
      <circle cx="20" cy="20" r="18" fill="#E8483A"/>
      <path d="M14 13l12 12M26 13L14 25" stroke="#2A0603" stroke-width="2.6" stroke-linecap="round"/>
    </svg>`
};

function mountSentinelIcons() {
  document.querySelectorAll('[data-icon]').forEach(el => {
    const key = el.getAttribute('data-icon');
    if (SentinelIcons[key]) el.innerHTML = SentinelIcons[key];
  });
}

document.addEventListener('DOMContentLoaded', mountSentinelIcons);
