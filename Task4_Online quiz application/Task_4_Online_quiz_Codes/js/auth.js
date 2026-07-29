/* ==========================================================================
   Sentinel Exams — Auth Module
   NOTE: Client-side demo authentication for a static site. Candidates are
   stored in the browser's localStorage (not a real database) and passwords
   are NOT securely hashed. For production, replace with a real backend and
   server-side password hashing + session handling.
   ========================================================================== */

const SENTINEL_USERS_KEY = "sentinel_users";
const SENTINEL_SESSION_KEY = "sentinel_session";

function getUsers() {
  try { return JSON.parse(localStorage.getItem(SENTINEL_USERS_KEY)) || []; }
  catch { return []; }
}
function saveUsers(users) {
  localStorage.setItem(SENTINEL_USERS_KEY, JSON.stringify(users));
}

/** Lightweight obfuscation only — NOT cryptographically secure. See note above. */
function simpleHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return "h" + Math.abs(hash).toString(36);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function signup({ name, email, password }) {
  const users = getUsers();
  if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
    return { ok: false, message: "A candidate account with that email already exists." };
  }
  users.push({ name, email, password: simpleHash(password), createdAt: Date.now() });
  saveUsers(users);
  setSession(email);
  return { ok: true };
}

function login({ email, password }) {
  const users = getUsers();
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!user || user.password !== simpleHash(password)) {
    return { ok: false, message: "Incorrect email or password." };
  }
  setSession(email);
  return { ok: true };
}

function setSession(email) { localStorage.setItem(SENTINEL_SESSION_KEY, email); }

function getCurrentUser() {
  const email = localStorage.getItem(SENTINEL_SESSION_KEY);
  if (!email) return null;
  return getUsers().find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
}

function logout() {
  localStorage.removeItem(SENTINEL_SESSION_KEY);
  window.location.href = "login.html";
}

function requireAuth() {
  const user = getCurrentUser();
  if (!user) { window.location.href = "login.html"; return null; }
  return user;
}

function mountUserChip() {
  const user = getCurrentUser();
  const chip = document.getElementById("navUserChip");
  const logoutBtn = document.getElementById("navLogoutBtn");
  if (chip && user) { chip.textContent = user.name.split(" ")[0]; chip.style.display = "inline-flex"; }
  if (logoutBtn) logoutBtn.addEventListener("click", logout);
}
