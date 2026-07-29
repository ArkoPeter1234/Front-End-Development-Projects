/* ============================================================
   DataPath Academy Pro — Shared UI Utilities
   ============================================================ */

function dpaFormatPrice(v) { return v === 0 ? "Free" : "₵" + v; }

function dpaStars(rating) {
  const full = Math.round(rating);
  return "★".repeat(full) + "☆".repeat(5 - full);
}

function dpaRenderNavbar(activePage) {
  const user = typeof dpaCurrentUser === "function" ? dpaCurrentUser() : null;
  const el = document.getElementById("navbar");
  if (!el) return;

  const links = [
    ["index.html", "Home"],
    ["courses.html", "Courses"],
  ];

  let dashLink = "";
  if (user) {
    const dashHref = user.role === "student" ? "dashboard.html" : user.role === "instructor" ? "instructor.html" : "admin.html";
    dashLink = `<a href="${dashHref}" class="${activePage === "dash" ? "active" : ""}">Dashboard</a>`;
  }

  el.innerHTML = `
    <div class="container navbar-inner">
      <a href="index.html" class="brand">
        <span class="brand-mark">
          <svg viewBox="0 0 28 28" width="28" height="28"><circle cx="14" cy="14" r="13" fill="none" stroke="var(--cyan)" stroke-width="1.5"/><path d="M8 18 L12 10 L16 15 L20 8" stroke="var(--cyan)" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="20" cy="8" r="1.8" fill="var(--amber)"/></svg>
        </span>
        DataPath Academy <span class="mono text-muted" style="font-size:.7rem;font-weight:500;">PRO</span>
      </a>
      <nav class="nav-links">
        ${links.map(([href, label]) => `<a href="${href}" class="${activePage === label.toLowerCase() ? "active" : ""}">${label}</a>`).join("")}
        ${dashLink}
      </nav>
      <div class="nav-actions">
        ${user
          ? `<div class="avatar" title="${user.name}">${user.name.split(" ").map(p => p[0]).join("").slice(0,2).toUpperCase()}</div>
             <button class="btn btn-ghost btn-sm" onclick="dpaLogout()">Log out</button>`
          : `<a href="login.html" class="btn btn-ghost btn-sm">Log in</a>
             <a href="signup.html" class="btn btn-primary btn-sm">Get started</a>`
        }
      </div>
    </div>
  `;
}

function dpaCourseCardHTML(course) {
  const initials = course.title.split(" ").filter(w => /^[A-Z0-9(&]/.test(w)).slice(0, 2).map(w => w[0]).join("") || "IT";
  return `
    <a href="course.html?id=${course.id}" class="course-card">
      <div class="course-thumb">${initials}</div>
      <div class="course-body">
        <span class="course-cat">${course.category}</span>
        <h3 class="course-title">${course.title}</h3>
        <div class="course-meta">
          <span class="stars">${dpaStars(course.rating)}</span>
          <span>${course.rating} (${course.reviewCount})</span>
        </div>
        <div class="course-meta">
          <span class="badge badge-level-${course.level}">${course.level}</span>
          <span>${course.hours}h · ${course.lessonCount} lessons</span>
        </div>
        <div class="course-foot">
          <span class="price ${course.price === 0 ? "free" : ""}">${dpaFormatPrice(course.price)}${course.price > 0 ? `<span class="price-strike">₵${course.originalPrice}</span>` : ""}</span>
          <span class="small text-muted">${course.studentCount.toLocaleString()} students</span>
        </div>
      </div>
    </a>
  `;
}

function dpaToast(message) {
  let el = document.getElementById("dpa-toast");
  if (!el) {
    el = document.createElement("div");
    el.id = "dpa-toast";
    el.className = "toast";
    document.body.appendChild(el);
  }
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove("show"), 2600);
}

function dpaCourseProgress(user, courseId) {
  const course = dpaGetCourse(courseId);
  const enrollment = user && user.enrollments ? user.enrollments[courseId] : null;
  const totalLessons = dpaAllLessonTitles(course).length;
  const done = enrollment ? enrollment.completedLessons.length : 0;
  const pct = totalLessons ? Math.round((done / totalLessons) * 100) : 0;
  return { done, totalLessons, pct, enrolled: !!enrollment };
}

function dpaInitAccordions() {
  document.querySelectorAll(".accordion-head").forEach(head => {
    head.addEventListener("click", () => {
      head.parentElement.classList.toggle("open");
    });
  });
}

function dpaInitTabs(scope) {
  const root = scope || document;
  root.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const group = btn.closest(".tabs");
      const panelId = btn.dataset.tab;
      group.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const panelsParent = group.parentElement;
      panelsParent.querySelectorAll(".tab-panel").forEach(p => p.classList.remove("active"));
      const target = panelsParent.querySelector("#" + panelId);
      if (target) target.classList.add("active");
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  document.body.style.opacity = "1";
});
