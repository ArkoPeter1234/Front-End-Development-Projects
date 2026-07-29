/* ============================================================
   DataPath Academy Pro — Seed Data & Storage Layer
   ============================================================ */

const DPA_CATEGORIES = [
  "Programming", "Web Development", "Data & AI", "Cloud & DevOps",
  "Cybersecurity", "Networking & Systems", "Mobile Development",
  "Design & UX", "Databases", "Career & Business"
];

const DPA_INSTRUCTORS = [
  { id: "ins-01", name: "Nana Yaw Boateng", title: "Senior Backend Engineer", initials: "NB", bio: "12 years building distributed systems across fintech and agritech." },
  { id: "ins-02", name: "Adwoa Mensah", title: "Data Science Lead", initials: "AM", bio: "Former research scientist turned educator, focused on applied ML." },
  { id: "ins-03", name: "Kwabena Owusu", title: "Cloud Solutions Architect", initials: "KO", bio: "AWS & Azure certified architect, 9 years in enterprise cloud migration." },
  { id: "ins-04", name: "Efua Asante", title: "Security Consultant", initials: "EA", bio: "Penetration tester and CISSP holder, trains national CERT teams." },
  { id: "ins-05", name: "Kojo Appiah", title: "Full-Stack Engineer", initials: "KA", bio: "Built and shipped 20+ production web platforms across West Africa." },
  { id: "ins-06", name: "Abena Darko", title: "UX Design Lead", initials: "AD", bio: "Design systems specialist, previously at a Lagos-based fintech unicorn." },
  { id: "ins-07", name: "Yaw Sarpong", title: "Network Engineer, CCIE", initials: "YS", bio: "Two decades designing carrier-grade network infrastructure." },
  { id: "ins-08", name: "Akosua Frimpong", title: "Mobile Platform Lead", initials: "AF", bio: "Shipped Flutter and React Native apps with millions of installs." }
];

/* Module template generator keeps 30 courses realistic without hand-authoring
   90+ bespoke lesson trees. Each course still gets a distinct final module. */
function dpaBuildModules(title, capstone) {
  return [
    {
      title: "Foundations",
      lessons: [
        { title: `${title}: Orientation & Setup`, minutes: 12, type: "video" },
        { title: `Core Concepts in ${title}`, minutes: 18, type: "video" },
        { title: "Knowledge Check", minutes: 8, type: "quiz" }
      ]
    },
    {
      title: "Core Skills",
      lessons: [
        { title: "Hands-On Walkthrough", minutes: 24, type: "video" },
        { title: "Guided Exercise", minutes: 30, type: "lab" },
        { title: "Common Pitfalls & Debugging", minutes: 15, type: "video" },
        { title: "Knowledge Check", minutes: 8, type: "quiz" }
      ]
    },
    {
      title: "Applied Practice",
      lessons: [
        { title: "Real-World Case Study", minutes: 22, type: "video" },
        { title: "Build Along Lab", minutes: 35, type: "lab" },
        { title: "Peer Review Discussion", minutes: 10, type: "discussion" }
      ]
    },
    {
      title: "Capstone",
      lessons: [
        { title: capstone, minutes: 45, type: "lab" },
        { title: "Final Assessment", minutes: 20, type: "quiz" },
        { title: "Wrap-Up & Certification", minutes: 6, type: "video" }
      ]
    }
  ];
}

const DPA_COURSE_SEED = [
  ["Python Programming Fundamentals", "Programming", "Beginner", "ins-01", "Learn Python from first principles: syntax, data structures, functions, and file I/O.", "Build a command-line inventory tracker"],
  ["Data Structures & Algorithms", "Programming", "Intermediate", "ins-01", "Master arrays, trees, graphs, and the algorithmic thinking behind technical interviews.", "Implement and benchmark five core algorithms"],
  ["Object-Oriented Programming in Java", "Programming", "Intermediate", "ins-05", "Encapsulation, inheritance, and polymorphism through practical Java projects.", "Design a small library management system"],
  ["Git & Version Control", "Programming", "Beginner", "ins-05", "Branching, merging, pull requests, and collaborative workflows used on real teams.", "Resolve a multi-branch merge conflict scenario"],
  ["JavaScript & Modern Web Development", "Web Development", "Beginner", "ins-05", "ES6+, the DOM, async programming, and the fundamentals every web developer needs.", "Build an interactive weather dashboard"],
  ["Full-Stack Web Development (MERN)", "Web Development", "Advanced", "ins-05", "MongoDB, Express, React, and Node.js combined into a production-ready stack.", "Ship a full e-commerce storefront"],
  ["API Development with Node.js & Express", "Web Development", "Intermediate", "ins-01", "Design, secure, and document REST APIs consumed by real front-end apps.", "Build an authenticated REST API with rate limiting"],
  ["React for Production Applications", "Web Development", "Intermediate", "ins-06", "Component architecture, hooks, state management, and performance patterns.", "Refactor a legacy app into reusable components"],
  ["Data Science with Python", "Data & AI", "Intermediate", "ins-02", "Pandas, NumPy, and statistical analysis for real-world datasets.", "Analyze an agricultural yield dataset end-to-end"],
  ["Machine Learning & AI Foundations", "Data & AI", "Intermediate", "ins-02", "Supervised and unsupervised learning, model evaluation, and feature engineering.", "Train and evaluate a classification model"],
  ["Deep Learning with TensorFlow", "Data & AI", "Advanced", "ins-02", "Neural networks, CNNs, and RNNs applied to vision and sequence problems.", "Build an image classifier from scratch"],
  ["Power BI & Data Visualization", "Data & AI", "Beginner", "ins-02", "Turn raw spreadsheets into interactive dashboards decision-makers actually use.", "Design an executive KPI dashboard"],
  ["Excel for Data Analysis", "Data & AI", "Beginner", "ins-02", "Pivot tables, lookup formulas, and dashboarding for everyday analysts.", "Build a rolling sales dashboard"],
  ["GIS & Spatial Data Analysis", "Data & AI", "Intermediate", "ins-02", "Map, join, and analyze spatial datasets with QGIS and GeoPandas.", "Map a supply chain catchment area"],
  ["Cloud Computing with AWS", "Cloud & DevOps", "Intermediate", "ins-03", "Core AWS services: EC2, S3, IAM, and Lambda for scalable applications.", "Deploy a serverless application on AWS"],
  ["Microsoft Azure Fundamentals", "Cloud & DevOps", "Beginner", "ins-03", "Azure's core services and the AZ-900 exam objectives, explained practically.", "Provision a resource group and web app"],
  ["DevOps & CI/CD Pipelines", "Cloud & DevOps", "Advanced", "ins-03", "Automate build, test, and deploy pipelines with modern DevOps tooling.", "Build an end-to-end CI/CD pipeline"],
  ["Docker & Kubernetes for Beginners", "Cloud & DevOps", "Intermediate", "ins-03", "Containerize applications and orchestrate them at scale.", "Deploy a multi-container app to a Kubernetes cluster"],
  ["Cloud Security Essentials", "Cybersecurity", "Intermediate", "ins-04", "Shared responsibility models, IAM hardening, and cloud-native threat detection.", "Audit and remediate a misconfigured cloud environment"],
  ["Cybersecurity Fundamentals", "Cybersecurity", "Beginner", "ins-04", "Threats, vulnerabilities, and the defensive fundamentals every IT pro needs.", "Conduct a basic security risk assessment"],
  ["Ethical Hacking & Penetration Testing", "Cybersecurity", "Advanced", "ins-04", "Reconnaissance, exploitation, and reporting using an authorized lab environment.", "Complete a full penetration test report"],
  ["Networking Essentials (CCNA Prep)", "Networking & Systems", "Beginner", "ins-07", "IP addressing, routing, switching, and the fundamentals behind the CCNA.", "Configure a small routed office network"],
  ["Computer Networks & Systems Administration", "Networking & Systems", "Intermediate", "ins-07", "Manage servers, DNS, and network services in real infrastructure.", "Stand up a DNS and file server"],
  ["Linux System Administration", "Networking & Systems", "Intermediate", "ins-07", "Shell scripting, permissions, and service management on Linux servers.", "Automate server hardening with a shell script"],
  ["Mobile App Development (Flutter)", "Mobile Development", "Intermediate", "ins-08", "Build cross-platform mobile apps from a single Dart codebase.", "Ship a cross-platform habit tracker app"],
  ["Mobile App Development (React Native)", "Mobile Development", "Intermediate", "ins-08", "Native mobile experiences using React and a shared JavaScript codebase.", "Build an offline-first field data app"],
  ["UI/UX Design Principles", "Design & UX", "Beginner", "ins-06", "Usability heuristics, wireframing, and design systems for digital products.", "Design a complete mobile app prototype"],
  ["SQL & Database Management", "Databases", "Beginner", "ins-01", "Query, join, and optimize relational databases used across the industry.", "Design and query a normalized database schema"],
  ["NoSQL Databases (MongoDB)", "Databases", "Intermediate", "ins-01", "Document modeling, aggregation pipelines, and scaling patterns for MongoDB.", "Model and query a multi-collection dataset"],
  ["IT Project Management (PMP-Aligned)", "Career & Business", "Intermediate", "ins-03", "Scope, schedule, risk, and stakeholder management for technical projects.", "Build a full project charter and risk register"]
];

function dpaGenerateCourses() {
  return DPA_COURSE_SEED.map((row, idx) => {
    const [title, category, level, instructorId, description, capstone] = row;
    const modules = dpaBuildModules(title, capstone);
    const totalLessons = modules.reduce((s, m) => s + m.lessons.length, 0);
    const totalMinutes = modules.reduce((s, m) => s + m.lessons.reduce((ss, l) => ss + l.minutes, 0), 0);
    const price = idx % 5 === 0 ? 0 : [149, 199, 249, 299, 349][idx % 5];
    return {
      id: "crs-" + String(idx + 1).padStart(2, "0"),
      title, category, level, instructorId, description,
      price,
      originalPrice: price === 0 ? 0 : price + 100,
      rating: (4.2 + ((idx * 7) % 8) / 10).toFixed(1),
      reviewCount: 40 + ((idx * 37) % 260),
      studentCount: 500 + ((idx * 173) % 4200),
      hours: Math.round((totalMinutes / 60) * 10) / 10,
      lessonCount: totalLessons,
      modules
    };
  });
}

function dpaSeedDatabase() {
  if (localStorage.getItem("dpa_seeded_v1")) return;

  const courses = dpaGenerateCourses();
  localStorage.setItem("dpa_courses", JSON.stringify(courses));
  localStorage.setItem("dpa_instructors", JSON.stringify(DPA_INSTRUCTORS));

  const demoStudent = {
    id: "usr-student-demo", role: "student", name: "Peter Arko",
    email: "student@demo.dev", password: "demo1234",
    enrollments: {}, badges: [], joined: "2026-06-01"
  };
  const demoInstructor = {
    id: "usr-instructor-demo", role: "instructor", name: "Nana Yaw Boateng",
    email: "instructor@demo.dev", password: "demo1234",
    instructorId: "ins-01", joined: "2025-11-10"
  };
  const demoAdmin = {
    id: "usr-admin-demo", role: "admin", name: "Platform Admin",
    email: "admin@demo.dev", password: "demo1234", joined: "2025-01-01"
  };

  // Give the demo student some realistic in-progress state.
  demoStudent.enrollments["crs-01"] = { enrolledAt: Date.now() - 12 * 86400000, completedLessons: ["Python Programming Fundamentals: Orientation & Setup", "Core Concepts in Python Programming Fundamentals", "Knowledge Check"] };
  demoStudent.enrollments["crs-05"] = { enrolledAt: Date.now() - 5 * 86400000, completedLessons: [] };
  demoStudent.enrollments["crs-09"] = { enrolledAt: Date.now() - 40 * 86400000, completedLessons: dpaAllLessonTitles(courses.find(c => c.id === "crs-09")) };
  demoStudent.badges = ["First Enrollment", "Course Completed"];

  localStorage.setItem("dpa_users", JSON.stringify([demoStudent, demoInstructor, demoAdmin]));
  localStorage.setItem("dpa_reviews", JSON.stringify(dpaSeedReviews(courses)));
  localStorage.setItem("dpa_seeded_v1", "1");
}

function dpaAllLessonTitles(course) {
  if (!course) return [];
  return course.modules.flatMap(m => m.lessons.map(l => l.title));
}

function dpaSeedReviews(courses) {
  const names = ["Kofi A.", "Ama S.", "David N.", "Linda O.", "Ibrahim T.", "Grace M."];
  const comments = [
    "Clear explanations and practical labs. Exactly what I needed.",
    "Solid course, the capstone project tied everything together well.",
    "Pace was good for a working professional. Would recommend.",
    "Instructor explains the harder concepts patiently.",
    "Some sections move fast but the exercises fill the gaps.",
    "Best course I've taken on this topic so far."
  ];
  const reviews = {};
  courses.forEach((c, i) => {
    const count = 2 + (i % 3);
    reviews[c.id] = Array.from({ length: count }).map((_, j) => ({
      name: names[(i + j) % names.length],
      rating: 4 + ((i + j) % 2),
      comment: comments[(i + j * 3) % comments.length],
      date: new Date(Date.now() - (i + j) * 5 * 86400000).toISOString().slice(0, 10)
    }));
  });
  return reviews;
}

function dpaGetCourses() { return JSON.parse(localStorage.getItem("dpa_courses") || "[]"); }
function dpaGetCourse(id) { return dpaGetCourses().find(c => c.id === id); }
function dpaGetInstructors() { return JSON.parse(localStorage.getItem("dpa_instructors") || "[]"); }
function dpaGetInstructor(id) { return dpaGetInstructors().find(i => i.id === id); }
function dpaGetUsers() { return JSON.parse(localStorage.getItem("dpa_users") || "[]"); }
function dpaSaveUsers(users) { localStorage.setItem("dpa_users", JSON.stringify(users)); }
function dpaGetReviews(courseId) { return (JSON.parse(localStorage.getItem("dpa_reviews") || "{}"))[courseId] || []; }

dpaSeedDatabase();
