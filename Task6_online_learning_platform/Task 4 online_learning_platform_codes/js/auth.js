/* ============================================================
   DataPath Academy Pro — Auth Layer (client-side demo auth)
   ============================================================ */

function dpaGetSession() {
  try { return JSON.parse(sessionStorage.getItem("dpa_session")); }
  catch (e) { return null; }
}

function dpaSetSession(user) {
  sessionStorage.setItem("dpa_session", JSON.stringify({ id: user.id, role: user.role, name: user.name }));
}

function dpaLogout() {
  sessionStorage.removeItem("dpa_session");
  window.location.href = "index.html";
}

function dpaCurrentUser() {
  const session = dpaGetSession();
  if (!session) return null;
  return dpaGetUsers().find(u => u.id === session.id) || null;
}

function dpaLogin(email, password) {
  const users = dpaGetUsers();
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
  if (!user) return { ok: false, message: "That email and password combination doesn't match our records." };
  dpaSetSession(user);
  return { ok: true, user };
}

function dpaSignup({ name, email, password, role }) {
  const users = dpaGetUsers();
  if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
    return { ok: false, message: "An account with that email already exists." };
  }
  const id = "usr-" + Date.now();
  const newUser = {
    id, role, name, email, password,
    enrollments: {}, badges: [], joined: new Date().toISOString().slice(0, 10)
  };
  if (role === "instructor") {
    const instId = "ins-" + Date.now();
    newUser.instructorId = instId;
    const instructors = dpaGetInstructors();
    instructors.push({ id: instId, name, title: "New Instructor", initials: name.split(" ").map(p => p[0]).join("").slice(0, 2).toUpperCase(), bio: "New to DataPath Academy Pro." });
    localStorage.setItem("dpa_instructors", JSON.stringify(instructors));
  }
  users.push(newUser);
  dpaSaveUsers(users);
  dpaSetSession(newUser);
  return { ok: true, user: newUser };
}

/* Redirects unauthenticated or wrong-role visitors away from gated pages. */
function dpaRequireRole(roles) {
  const user = dpaCurrentUser();
  if (!user || !roles.includes(user.role)) {
    window.location.href = "login.html";
    return null;
  }
  return user;
}

function dpaUpdateUser(updatedUser) {
  const users = dpaGetUsers().map(u => u.id === updatedUser.id ? updatedUser : u);
  dpaSaveUsers(users);
}
