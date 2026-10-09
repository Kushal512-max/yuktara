/* ==========================================================================
   js/app.js — Core Application Logic for YUKTARA
   ========================================================================== */

const STORAGE_KEY = "pla_pro_state_v2";

// Universal scroll position memory across all tabs (persisted in-memory per tab)
const _tabScrollPositions = {
  dashboard: 0,
  plan: 0,
  tutor: 0,
  quiz: 0,
  progress: 0
};

// Continuous passive scroll listener to keep the active tab's scroll position strictly up-to-date
window.addEventListener("scroll", () => {
  if (state && state.ui && state.ui.page) {
    _tabScrollPositions[state.ui.page] = window.scrollY;
  }
}, { passive: true });

const DEFAULT_AUTH = {
  currentUser: null,
  // NOTE: No hardcoded users — PostgreSQL is the ONLY source of truth.
  // Users are stored in the cloud PostgreSQL database via the backend API.
  mode: "login", // "login" | "register"
  error: null
};

const DEFAULT_STATE = {
  theme: "dark",
  auth: structuredClone(DEFAULT_AUTH),
  profile: null, // { name, subject, level, goal, studyTime, targetDate, createdAt }
  plan: [],      // [{ day, date, topicId, topicName, subtopic, minutes, done }]
  progress: {
    completedSubtopics: {}, // `${topicId}::${subtopic}` -> true
    quizAttempts: []        // [{ id, topicId, topicName, score, total, percent, date, answers, mode }]
  },
  chat: [],
  activeQuiz: null, // Saved draft state for active quiz
  ui: {
    page: "dashboard",
    tutorTopicId: null,
    quizTopicId: null,
    activeReviewAttemptId: null,
    editingProfile: false,
    syllabusSearch: "",
    syllabusUnitFilter: "all",
    planViewMode: "schedule"
  }
};

let state = loadState();
let timerInterval = null;

/* --------------------------------------------------------------------------
   Local Date Helpers (Prevents UTC Timezone Shift Bugs)
   -------------------------------------------------------------------------- */
function formatYMD(dateObj) {
  const d = new Date(dateObj);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseYMD(ymdStr) {
  if (!ymdStr) return new Date();
  if (typeof ymdStr === "string" && ymdStr.includes("-")) {
    const parts = ymdStr.slice(0, 10).split("-").map(Number);
    return new Date(parts[0], parts[1] - 1, parts[2]);
  }
  return new Date(ymdStr);
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return structuredClone(DEFAULT_STATE);
    const parsed = JSON.parse(raw);
    const merged = { ...structuredClone(DEFAULT_STATE), ...parsed };
    merged.ui = { ...DEFAULT_STATE.ui, ...(parsed.ui || {}) };

    // Auth normalization — PostgreSQL is the sole source of truth for users.
    // We only persist the currently-logged-in user session here, not a user list.
    if (!merged.auth) {
      merged.auth = structuredClone(DEFAULT_AUTH);
    } else {
      // Drop any legacy localStorage user arrays — they are NOT authoritative.
      // Authentication must go through the backend API → PostgreSQL.
      delete merged.auth.users;

      if (merged.auth.currentUser) {
        // Normalize role on the session user (in case of old cached data)
        if (!merged.auth.currentUser.role) {
          merged.auth.currentUser.role = (merged.auth.currentUser.email && merged.auth.currentUser.email.toLowerCase() === "admin@yuktara.edu") ? "admin" : "student";
        }
      }
      merged.auth.error = null;
      merged.auth.mode = merged.auth.mode || "login";
    }

    // Role-based protection: non-admins cannot stay on backend page
    const cur = merged.auth && merged.auth.currentUser;
    const isCurAdmin = Boolean(cur && (cur.role === "admin" || (cur.email && cur.email.toLowerCase() === "admin@yuktara.edu")));
    if (merged.ui && merged.ui.page === "backend" && !isCurAdmin) {
      merged.ui.page = "dashboard";
    }

    return merged;
  } catch (e) {
    console.error("State loading error:", e);
    return structuredClone(DEFAULT_STATE);
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error("State save failed:", e);
  }
}

function toggleTheme() {
  state.theme = state.theme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", state.theme);
  saveState();
  render();
}

function resetAllData() {
  if (!confirm("Are you sure you want to reset all profile, plan, and quiz progress on this device?")) return;
  localStorage.removeItem(STORAGE_KEY);
  Object.keys(_tabScrollPositions).forEach(k => { _tabScrollPositions[k] = 0; });
  state = structuredClone(DEFAULT_STATE);
  saveState();
  render();
  window.scrollTo({ top: 0, behavior: "instant" });
}

function logoutUser() {
  // Notify backend to log the logout event in PostgreSQL auth_logs
  try {
    const email = state.auth && state.auth.currentUser && state.auth.currentUser.email;
    if (email) {
      fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      }).catch(err => console.warn("[AUTH] Logout API notification failed (non-critical):", err));
    }
  } catch (e) {
    console.warn("[AUTH] Logout API call error (non-critical):", e);
  }

  if (state.auth) {
    state.auth.currentUser = null;
    state.auth.error = null;
    state.auth.mode = "login";
  }
  state.ui.page = "dashboard";
  state.ui.editingProfile = false;
  saveState();
  render();
  window.scrollTo({ top: 0, behavior: "instant" });
}

/* --------------------------------------------------------------------------
   Navigation & Role-Based Access Control
   -------------------------------------------------------------------------- */
function isHostDevice() {
  // Localhost is always authorized (developer machine)
  const isLocal = window.location.hostname === "localhost" || 
                  window.location.hostname === "127.0.0.1" || 
                  window.location.protocol === "file:";
  if (isLocal) return true;

  // Check URL query parameter to authorize this specific device (e.g. ?dev=true or ?admin=1)
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get("dev") === "true" || params.get("admin") === "1" || params.get("host") === "true") {
      localStorage.setItem("yuktara_host_device", "true");
      // Clean query params from address bar
      const cleanUrl = window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);
      return true;
    }
  } catch (e) {}

  // Check persistent device authorization stored in browser's localStorage
  try {
    if (localStorage.getItem("yuktara_host_device") === "true") {
      return true;
    }
  } catch (e) {}

  // Other remote devices (general public) are not authorized to see or use demo accounts
  return false;
}

function isAdmin() {
  if (!state || !state.auth || !state.auth.currentUser) return false;
  const cur = state.auth.currentUser;
  const role = (cur.role || "").toLowerCase();
  // Admin is determined exclusively by the role stored in PostgreSQL
  return role === "admin";
}

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: "fa-solid fa-house" },
  { id: "plan", label: "Learning Plan", icon: "fa-solid fa-calendar-check" },
  { id: "tutor", label: "YuktaraAI", icon: "fa-solid fa-robot" },
  { id: "quiz", label: "Quiz & Review", icon: "fa-solid fa-graduation-cap" },
  { id: "progress", label: "Analytics", icon: "fa-solid fa-chart-line" },
  { id: "backend", label: "Backend & DB", icon: "fa-solid fa-database", adminOnly: true }
];

function goTo(page) {
  // Prevent students / non-admins from opening backend page
  if (page === "backend" && !isAdmin()) {
    page = "dashboard";
  }

  // Save current tab's scroll position before changing page
  if (state && state.ui && state.ui.page) {
    _tabScrollPositions[state.ui.page] = window.scrollY;
  }
  state.ui.page = page;
  saveState();
  render();

  // Restore the target tab's exact scroll position
  const targetY = _tabScrollPositions[page] !== undefined ? _tabScrollPositions[page] : 0;
  requestAnimationFrame(() => {
    window.scrollTo({ top: targetY, behavior: "instant" });
  });
}

/* --------------------------------------------------------------------------
   Exact Daily Minutes Study Plan Scheduler
   -------------------------------------------------------------------------- */
const LEVEL_MINUTES_PER_SUBTOPIC = { Beginner: 40, Intermediate: 30, Advanced: 20 };
const LEVEL_SKIP_RATIO = { Beginner: 0, Intermediate: 0.2, Advanced: 0.4 };

function generatePlan(profile) {
  const subject = getSubjectData(profile.subject);
  let items = [];
  subject.topics.forEach(t => {
    t.subtopics.forEach(st => items.push({ topicId: t.id, topicName: t.name, subtopic: st }));
  });

  const skipRatio = LEVEL_SKIP_RATIO[profile.level] || 0;
  const skipCount = Math.floor(items.length * skipRatio);
  items = items.slice(skipCount);
  if (items.length === 0 && subject.topics.length > 0) {
    const lastTopic = subject.topics[subject.topics.length - 1];
    items = [{ topicId: lastTopic.id, topicName: lastTopic.name, subtopic: "Mastery Review" }];
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const targetDateObj = profile.targetDate ? parseYMD(profile.targetDate) : new Date(today);
  targetDateObj.setHours(0, 0, 0, 0);

  const diffMs = Math.max(0, targetDateObj.getTime() - today.getTime());
  const availableDays = Math.max(1, Math.round(diffMs / (1000 * 60 * 60 * 24)) + 1);

  const targetDailyMinutes = Math.max(15, Number(profile.studyTime) || 45);
  const estMinutesPerSubtopic = LEVEL_MINUTES_PER_SUBTOPIC[profile.level] || 30;

  const itemsPerDayAtUserPace = Math.max(1, Math.round(targetDailyMinutes / estMinutesPerSubtopic));
  const naturalDaysNeeded = Math.max(1, Math.ceil(items.length / itemsPerDayAtUserPace));

  let daysToUse = 1;
  let itemsPerDay = 1;

  if (availableDays < naturalDaysNeeded) {
    daysToUse = availableDays;
    itemsPerDay = Math.ceil(items.length / daysToUse);
  } else {
    daysToUse = Math.min(availableDays, naturalDaysNeeded);
    itemsPerDay = itemsPerDayAtUserPace;
  }

  const plan = [];
  let cursor = 0;

  for (let day = 1; day <= daysToUse && cursor < items.length; day++) {
    const date = new Date(today);
    date.setDate(date.getDate() + (day - 1));

    const remainingItems = items.length - cursor;
    const remainingDays = daysToUse - day + 1;
    const countToday = (day === daysToUse) ? remainingItems : Math.min(itemsPerDay, Math.ceil(remainingItems / remainingDays));

    const baseMinutesPerItem = Math.max(10, Math.floor(targetDailyMinutes / Math.max(1, countToday)));

    for (let k = 0; k < countToday && cursor < items.length; k++) {
      const item = items[cursor++];
      const itemMinutes = (k === countToday - 1) ? (targetDailyMinutes - baseMinutesPerItem * (countToday - 1)) : baseMinutesPerItem;

      plan.push({
        day,
        date: formatYMD(date),
        topicId: item.topicId,
        topicName: item.topicName,
        subtopic: item.subtopic,
        minutes: Math.max(10, itemMinutes),
        done: false
      });
    }
  }

  return plan;
}

function toggleSubtopic(topicId, subtopic) {
  const currentY = window.scrollY;
  const key = `${topicId}::${subtopic}`;
  const nowDone = !state.progress.completedSubtopics[key];
  if (nowDone) state.progress.completedSubtopics[key] = true;
  else delete state.progress.completedSubtopics[key];

  state.plan.forEach(item => {
    if (item.topicId === topicId && item.subtopic === subtopic) item.done = nowDone;
  });
  if (state.ui && state.ui.page) {
    _tabScrollPositions[state.ui.page] = currentY;
  }
  saveState();
  render();
  requestAnimationFrame(() => window.scrollTo({ top: currentY, behavior: "instant" }));

  // Asynchronously record study session in PostgreSQL when marked complete
  if (nowDone) {
    try {
      const curUser = state.auth && state.auth.currentUser;
      const userEmail = (curUser && curUser.email) || "anonymous";
      const subject = (state.profile && state.profile.subject) || "General Engineering";
      fetch("/api/study/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userEmail,
          subject,
          topicId,
          subtopic,
          durationMinutes: 30,
          status: "COMPLETED"
        })
      }).catch(err => console.warn("Study session DB sync warning:", err));
    } catch (e) {
      console.warn("Study session sync error:", e);
    }
  }
}

/* --------------------------------------------------------------------------
   Analytics & Weak Topic Evaluator
   -------------------------------------------------------------------------- */
function getWeakTopics() {
  const latestByTopic = {};
  state.progress.quizAttempts.forEach(a => {
    if (!latestByTopic[a.topicId] || new Date(a.date) > new Date(latestByTopic[a.topicId].date)) {
      latestByTopic[a.topicId] = a;
    }
  });
  return Object.values(latestByTopic).filter(a => a.percent < 60);
}

function getOverallStats() {
  const totalSubtopics = state.plan.length;
  const completed = state.plan.filter(i => i.done).length;
  const attempts = state.progress.quizAttempts;
  const avgScore = attempts.length
    ? Math.round(attempts.reduce((s, a) => s + a.percent, 0) / attempts.length)
    : null;

  const daysCount = state.plan.length ? Math.max(...state.plan.map(i => i.day)) : 0;

  return {
    totalSubtopics,
    completed,
    percentComplete: totalSubtopics ? Math.round((completed / totalSubtopics) * 100) : 0,
    avgScore,
    quizzesTaken: attempts.length,
    weakTopics: getWeakTopics(),
    daysCount
  };
}

/* --------------------------------------------------------------------------
   Dynamic AI Tutor Engine & MCQ Explainer
   -------------------------------------------------------------------------- */
function findMatchingMCQ(userText) {
  const subject = getSubjectData(state.profile ? state.profile.subject : "");
  const query = (userText || "").toLowerCase().trim();
  if (!query || query.length < 15) return null;

  for (const topic of subject.topics) {
    for (const mcq of topic.quiz.mcq) {
      if (query.includes(mcq.q.toLowerCase()) || (mcq.q.toLowerCase().includes(query) && query.length >= 20)) {
        return { mcq, topic };
      }
    }
  }
  return null;
}


/* --------------------------------------------------------------------------
   Comprehensive Bilingual English / Marathi Translation Engine
   -------------------------------------------------------------------------- */
const MARATHI_TOPIC_TRANSLATIONS = {
  "py-basics": {
    name: "सुरुवात आणि डेटा प्रकार (Getting Started & Data Types)",
    beginner: "पायथन ही एक अतिशय सोपी संगणक भाषा आहे ज्यामध्ये तुम्ही साध्या वाक्यांमध्ये सूचना लिहू शकता. व्हेरिएबल (Variable) म्हणजे माहिती साठवणारा एक लेबल लावलेला डबा होय (उदा. `age = 15`). पायथनमध्ये संख्यांसाठी (`int`, `float`), मजकुरासाठी (`str`), आणि खरे/खोटे (`bool`) असे डेटा प्रकार असतात. `print()` मजकूर स्क्रीनवर दाखवतो आणि `input()` वापरकर्त्याकडून माहिती घेतो.",
    intermediate: "पायथनमध्ये डायनॅमिक टायपिंग (Dynamic Typing) असते; व्हेरिएबलचा प्रकार कोड चालू असताना आपोआप ठरवला जातो. `input()` नेहमी स्ट्रिंग स्वरूपातच माहिती परत करतो (त्यामुळे गणितासाठी `int()` किंवा `float()` मध्ये कास्टिंग करावे लागते). F-strings (`f'Hello {name}'`) मुळे स्ट्रिंगमध्ये व्हेरिएबल्स थेट वापरता येतात.",
    advanced: "पायथनमध्ये सर्व काही ऑब्जेक्ट (Object) असते, ज्याला स्वतःचा प्रकार, ओळख (`id()`), आणि मूल्य असते. इम्युटेबल (Immutable) प्रकार (जसे `int`, `str`, `tuple`) बदलल्यास नवीन ऑब्जेक्ट तयार होतो, तर म्युटेबल (Mutable) प्रकार (जसे `list`, `dict`) त्याच जागेवर बदलले जातात.",
    example: "व्हेरिएबलचा विचार एका लेबल लावलेल्या बरणीप्रमाणे करा. `fruit = 'apple'` म्हणजे 'fruit' नावाच्या बरणीत 'apple' ठेवणे. नंतर `print(fruit)` केल्यावर त्यातील सफरचंद दिसते.",
    pitfalls: [
      "१. गणिताची कृती करण्यापूर्वी `input()` ला int किंवा float मध्ये बदलण्यास विसरणे (`input()` मुळे संख्या 5 ऐवजी स्ट्रिंग `'5'` मिळते).",
      "२. तुलना करण्यासाठी `==` ऐवजी चुकून सिंगल `=` वापरणे.",
      "३. केस सेन्सिटिव्हिटी: पायथनमध्ये `Name` आणि `name` ही दोन पूर्णपणे वेगळी व्हेरिएबल्स आहेत."
    ]
  },
  "py-control-flow": {
    name: "कंट्रोल फ्लो आणि निर्णय (Control Flow & Decisions)",
    beginner: "कंट्रोल फ्लो (Control Flow) ठरवतो की कोणता कोड कधी चालू करायचा. `if` एका अटीची तपासणी करतो; अट खोटी असल्यास `else` पर्यायी कोड चालवतो. `for` लूप याद्यांवर किंवा संख्यांवर फिरतो; `while` लूप जोपर्यंत अट खरी (True) आहे तोपर्यंत कोड पुन्हा पुन्हा चालवतो.",
    intermediate: "If/elif शृंखला पहिल्या खऱ्या अटीवरच थांबते. `break` मुळे लूपमधून त्वरित बाहेर पडता येते; `continue` मुळे पुढील फेरीत उडी घेतली जाते. `range(start, stop, step)` संख्यांचा क्रम तयार करतो.",
    advanced: "पायथन ३.१०+ मध्ये structural pattern matching (`match/case`) आले आहे. लूपमधील `else` ब्लॉक फक्त तेव्हाच चालतो जेव्हा लूपमध्ये `break` न लागता तो नैसर्गिकपणे संपतो.",
    example: "कपडे धुताना वेगळे करण्यासारखे आहे: जर पांढरे असतील तर पांढऱ्या ढिगाऱ्यात ठेवा; नाहीतर रंगीत ढिगाऱ्यात ठेवा. हा झाला if/else निर्णय!",
    pitfalls: [
      "१. `range(a, b)` मधील 1 ने होणारी चूक: `range(1, 5)` ही 1 ते 4 पर्यंत चालते, 5 पर्यंत नाही.",
      "२. अनंत (Infinite) while लूप: लूपच्या आत अटीचा व्हेरिएबल अपडेट करण्यास विसरणे.",
      "३. इंडेंटेशन (अंतर) च्या चुका: पायथन कोड ब्लॉक्समध्ये टॅब आणि स्पेसची सरमिसळ करणे."
    ]
  },
  "py-functions": {
    name: "फंक्शन्स आणि स्कोप (Functions & Scope)",
    beginner: "फंक्शन्स म्हणजे पुन्हा पुन्हा वापरता येणारे कोड ब्लॉक्स असतात, जे `def नाव():` ने सुरू होतात. तुम्ही पॅरामीटर्सद्वारे माहिती आत पाठवता आणि `return` द्वारे निकाल परत मिळवता.",
    intermediate: "फंक्शन्स पोझिशनल, कीवर्ड, डिफॉल्ट पॅरामीटर्स आणि व्हेरिएबल आर्ग्युमेंट्ससाठी `*args` / `**kwargs` स्वीकारतात. `return` कॉलरला निकाल परत देतो; `print()` फक्त स्क्रीनवर माहिती दाखवतो.",
    advanced: "पायथन LEGB स्कोप रिझोल्यूशन वापरते (Local, Enclosing, Global, Built-in). फंक्शन्स हे फर्स्ट-क्लास ऑब्जेक्ट्स आहेत, म्हणजेच ते आर्ग्युमेंट म्हणून पाठवले जाऊ शकतात किंवा डेकोरेटरमधून परत केले जाऊ शकतात.",
    example: "फंक्शन म्हणजे मिक्सरसारखे आहे: घटक (आर्ग्युमेंट्स) आत टाका, बटण चालू करा, आणि ज्यूस/स्मूदी (रिटर्न व्हॅल्यू) तयार मिळते.",
    pitfalls: [
      "१. `return` आणि `print()` मधील गोंधळ: `print()` फक्त स्क्रीनवर दाखवतो पण कॉलरला काहीही (`None`) परत करत नाही.",
      "२. फंक्शनच्या आत तयार केलेले स्थानिक (लोकल) व्हेरिएबल्स बाहेर वापरण्याचा प्रयत्न करणे.",
      "३. `def func(lst=[])` सारखे म्युटेबल डिफॉल्ट आर्ग्युमेंट्स वापरणे, ज्यामुळे सर्व कॉल्समध्ये डेटा साठवला जातो."
    ]
  },
  "py-data-structures": {
    name: "डेटा स्ट्रक्चर्स (Built-in Data Structures)",
    beginner: "लिस्ट `[1, 2]` क्रमबद्ध घटक साठवते जे बदलता येतात. ट्युपल `(1, 2)` बदलता येत नाही. डिक्शनरी `{'a': 1}` की-व्हॅल्यू जोड्या साठवते. सेट `{1, 2}` फक्त एकमेव (युनिक) घटक साठवतो.",
    intermediate: "लिस्ट कॉम्प्रिहेन्शन्स (`[x*2 for x in nums]`) द्वारे कमी ओळीत लिस्ट तयार करता येते. डिक्शनरीमधील की (Key) शोधणे हे सरासरी O(1) वेळेत होते.",
    advanced: "डिक्शनरीच्या कीज या हॅश करण्यायोग्य (इम्युटेबल ऑब्जेक्ट्स जसे स्ट्रिंग्स, संख्या, ट्युपल्स) असणे आवश्यक आहे. फंक्शन आर्ग्युमेंट्समध्ये म्युटेबल डिफॉल्ट्स बदलल्यास अनपेक्षित बग्स येतात.",
    example: "डिक्शनरी म्हणजे फोन बुकसारखी आहे: नाव (की) पहा आणि त्वरित त्याचा फोन नंबर (व्हॅल्यू) मिळवा.",
    pitfalls: [
      "१. ट्युपल बदलण्याचा प्रयत्न करणे: `tup[0] = 5` मुळे TypeError येतो.",
      "२. नसलेली की शोधताना KeyError येणे: सुरक्षिततेसाठी नेहमी `dict.get('key')` वापरा.",
      "३. फॉर लूपमध्ये फिरत असताना त्याच लिस्टमध्ये घटक बदलणे किंवा काढणे."
    ]
  },
  "web-html": {
    name: "HTML5 आणि सिमेंटिक वेब (HTML5 & Semantic Web)",
    beginner: "HTML हे वेबपेजची रचना ठरवते, ज्यासाठी `<h1>` आणि `<p>` सारखे टॅग्ज वापरले जातात. `<main>` आणि `<nav>` सारखे सिमेंटिक टॅग्ज मजकुराची भूमिका स्पष्ट करतात.",
    intermediate: "सिमेंटिक HTML मुळे गुगल सर्च (SEO) आणि स्क्रीन रीडर्ससाठी वेबपेज अधिक सुलभ बनते. HTML5 इनपुट्स आपोआप प्रमाणीकरण (`required`, `type='email'`) तपासतात.",
    advanced: "DOM ट्री समकालिकपणे (synchronously) पार्स होतो. ARIA रोल ॲट्रिब्युट्स स्क्रीन रीडर्ससाठी उपयुक्त ठरतात.",
    example: "HTML म्हणजे घराचा पाया आणि भिंतीसारखे आहे: रंगकाम किंवा सजावट करण्यापूर्वीची मूळ रचना.",
    pitfalls: [
      "१. सर्व गोष्टींसाठी सिमेंटिक टॅग्ज ऐवजी फक्त `<div>` वापरणे.",
      "२. `<img>` टॅगवर `alt` ॲट्रिब्युट न देणे, ज्यामुळे वाचताना अडचण येते.",
      "३. एकाच पानावर अनेक `<h1>` टॅग्ज वापरणे."
    ]
  },
  "web-css": {
    name: "CSS3 बॉक्स मॉडेल आणि लेआउट्स (CSS3 Box Model & Layouts)",
    beginner: "CSS मुळे HTML चे रूप आणि डिझाईन ठरते. प्रत्येक घटक हा बॉक्स असतो ज्यामध्ये कन्टेन्ट (मजकूर), पॅडिंग, बॉर्डर आणि मार्जिन असते. फ्लेक्सबॉक्स (Flexbox) घटकांना एका ओळीत किंवा स्तंभात मांडतो.",
    intermediate: "CSS ग्रिड २-डी लेआउट (ओळी आणि स्तंभ दोन्ही) नियंत्रित करते. मीडिया क्वेरीज (`@media`) मोबाईल स्क्रीननुसार डिझाईन बदलतात.",
    advanced: "स्पेसिफिसिटी पदानुक्रम: इनलाइन स्टाईल > ID > क्लास > घटक सिलेक्टर्स.",
    example: "फ्लेक्सबॉक्स म्हणजे एका फळीवर वस्तू व्यवस्थित मांडणे; ग्रिड म्हणजे संपूर्ण कपाटातील अनेक कप्प्यांमध्ये वस्तू रचणे.",
    pitfalls: [
      "१. पॅडिंग (बॉर्डरच्या आत) आणि मार्जिन (बॉर्डरच्या बाहेर) मध्ये गोंधळ करणे.",
      "२. `!important` चा अतिवापर करणे.",
      "३. `box-sizing: border-box` न लावणे, ज्यामुळे रुंदीची गणना चुकते."
    ]
  },
  "dsa-complexity": {
    name: "कॉम्प्लेक्सिटी ॲनालिसिस आणि Big-O (Complexity Analysis & Big-O)",
    beginner: "Big-O दर्शवते की डेटा वाढल्यावर अल्गोरिदम किती जलद किंवा मंद चालतो. O(1) म्हणजे स्थिर वेळ; O(n) म्हणजे डेटा वाढेल तसा वेळ वाढतो.",
    intermediate: "वाढीचा दर क्रम: O(1) < O(log n) < O(n) < O(n log n) < O(n^2) < O(2^n). सर्वात वाईट स्थिती (Worst case) कामगिरीची हमी देते.",
    advanced: "एमॉर्टाइज्ड ॲनालिसिस (Amortized analysis) अनेक कृतींमधील सरासरी खर्च मोजते.",
    example: "न क्रमबद्ध केलेल्या फोनबुकमध्ये एकेक नाव शोधणे हे O(n) आहे; परंतु क्रमबद्ध फोनबुक अर्धे-अर्धे करून शोधणे हे O(log n) आहे.",
    pitfalls: [
      "१. नेस्टेड लूप्स दिसले की नेहमीच O(n^2) समजणे.",
      "२. अल्गोरिदमच्या मेमरी (Space complexity) कडे दुर्लक्ष करणे.",
      "३. उत्कृष्ट वेळ आणि सर्वात वाईट वेळ (Worst-case) यात गफलत करणे."
    ]
  }
};

const MARATHI_DICTIONARY = [
  // Greetings & Persona
  [/Hello,?\s*([A-Za-z\s]+)!/gi, "नमस्कार, $1!"],
  [/Hello/gi, "नमस्कार"],
  [/Welcome to your study session!/gi, "तुमच्या अभ्यास सत्रात स्वागत आहे!"],
  [/Welcome to/gi, "स्वागत आहे"],
  [/I'm YuktaraAI, your 24\/7 personal tutor and study companion\./gi, "मी युक्ताराAI (YuktaraAI), तुमचा २४/७ वैयक्तिक शिक्षक आणि अभ्यास मार्गदर्शक आहे."],
  [/I'm YuktaraAI/gi, "मी युक्ताराAI आहे"],
  [/I'm PratejAI, your 24\/7 personal tutor and study companion\./gi, "मी युक्ताराAI (YuktaraAI), तुमचा २४/७ वैयक्तिक शिक्षक आणि अभ्यास मार्गदर्शक आहे."],
  [/I'm PratejAI/gi, "मी युक्ताराAI आहे"],
  [/STUDY MOTIVATION FOR YOU:/gi, "तुमच्यासाठी अभ्यासाची प्रेरणा:"],
  [/Success is the sum of small efforts, repeated day in and day out\./gi, "यश म्हणजे दररोज सातत्याने केलेल्या लहान प्रयत्नांची बेरीज."],
  [/Every single topic you master today brings you closer to your dream!/gi, "आज तुम्ही शिकलेला प्रत्येक विषय तुम्हाला स्वप्नांच्या जवळ नेतो!"],
  [/Stay hungry/gi, "प्रयत्न चालू ठेवा"],
  [/You have everything it takes to conquer/gi, "तुमच्यामध्ये हे सहज शिकून घेण्याची पूर्ण क्षमता आहे"],
  [/Action cures fear and builds momentum\./gi, "कृती भीती दूर करते आणि आत्मविश्वास वाढवते."],
  [/Believe in yourself/gi, "स्वतःवर विश्वास ठेवा"],
  [/The journey of a thousand miles begins with a single step\./gi, "हजार मैलांचा प्रवासही एका लहान पावलानेच सुरू होतो."],
  [/Make today count!/gi, "आजचा दिवस महत्त्वाचा बनवा!"],

  // Profile & Status
  [/Your Learning Target:/gi, "तुमचे शिकण्याचे ध्येय:"],
  [/Your Current Status:/gi, "तुमची सद्यस्थिती:"],
  [/Course:/gi, "कोर्स:"],
  [/Your Goal:/gi, "तुमचे ध्येय:"],
  [/Goal:/gi, "ध्येय:"],
  [/Target Date:/gi, "अंतिम तारीख:"],
  [/Daily Commitment:/gi, "दररोजचा वेळ:"],
  [/Overall Progress:/gi, "एकूण प्रगती:"],
  [/Progress:/gi, "प्रगती:"],
  [/days remaining/gi, "दिवस बाकी"],
  [/days left/gi, "दिवस उरले"],
  [/Target reached!/gi, "ध्येय तारीख गाठली!"],
  [/Goal date reached!/gi, "ध्येय तारीख पूर्ण झाली!"],
  [/minutes per day/gi, "मिनिटे दररोज"],
  [/minutes/gi, "मिनिटे"],
  [/mins/gi, "मिनिटे"],
  [/subtopics done/gi, "उपविषय पूर्ण"],
  [/subtopics/gi, "उपविषय"],
  [/scheduled for today/gi, "आजसाठी नियोजित"],
  [/Today's Focus:/gi, "आजचा मुख्य अभ्यास:"],
  [/Next Up:/gi, "पुढील अभ्यास:"],
  [/All done!/gi, "सर्व पूर्ण झाले!"],
  [/Ready to study\? Here's what you can ask me:/gi, "अभ्यासासाठी तयार आहात? मला हे विचारू शकता:"],
  [/What should I study today\?/gi, "मी आज काय अभ्यास करावा?"],
  [/Show my course plan/gi, "माझा संपूर्ण कोर्स प्लॅन दाखवा"],
  [/What is my profile and goal\?/gi, "माझे प्रोफाईल आणि ध्येय काय आहे?"],
  [/What is YUKTARA/gi, "युक्तारा (YUKTARA) ॲप काय आहे"],
  [/What is PRATEJ/gi, "युक्तारा (YUKTARA) ॲप काय आहे"],

  // Dashboard & Navigation
  [/Dashboard/gi, "डॅशबोर्ड (Dashboard)"],
  [/Learning Plan/gi, "लर्निंग प्लॅन (Learning Plan)"],
  [/Quiz & Review/gi, "क्विझ आणि पुनरावलोकन (Quiz & Review)"],
  [/Analytics/gi, "विश्लेषण (Analytics)"],
  [/Edit Profile/gi, "प्रोफाईल संपादित करा"],
  [/Reset All Data/gi, "सर्व डेटा हटवा / रीसेट करा"],
  [/Switch to Light Mode/gi, "लाईट मोड सुरू करा"],
  [/Switch to Dark Mode/gi, "डार्क मोड सुरू करा"],

  // Technical / Course concepts
  [/Beginner Level/gi, "नवशिक्या पातळी (Beginner)"],
  [/Intermediate Level/gi, "मध्यम पातळी (Intermediate)"],
  [/Advanced Level/gi, "प्रगत पातळी (Advanced)"],
  [/Practical Code Example for ([^:]+):/gi, "$1 साठी प्रात्यक्षिक कोड उदाहरण:"],
  [/Practical Code Example/gi, "प्रात्यक्षिक कोड उदाहरण (Practical Code Example)"],
  [/Key Takeaways for ([^:]+):/gi, "$1 साठी महत्त्वाचे मुद्दे:"],
  [/Key Takeaways/gi, "महत्त्वाचे मुद्दे (Key Takeaways)"],
  [/Common Pitfalls & How to Avoid Them/gi, "सामान्य चुका आणि त्या कशा टाळाव्यात"],
  [/Real-World Analogy:/gi, "दैनंदिन जीवनातील उदाहरण / साम्य:"],
  [/Real-World Intuition:/gi, "दैनंदिन जीवनातील उदाहरण:"],
  [/Core Concept in Plain English:/gi, "सोप्या भाषेत मूळ संकल्पना:"],
  [/Correct Answer:/gi, "योग्य उत्तर:"],
  [/Explanation:/gi, "स्पष्टीकरण:"],
  [/Question:/gi, "प्रश्न:"],
  [/Topic:/gi, "विषय:"],
  [/Option/gi, "पर्याय"],
  [/Tip: Tap 💻 Code example, ⚠️ Common pitfalls, or ask about your study plan!/gi, "टीप: 💻 कोड उदाहरण, ⚠️ सामान्य चुका यावर टॅप करा किंवा तुमच्या अभ्यास नियोजनाबद्दल विचारा!"],
  [/Does this make intuitive sense, ([^?]+)\? You can ask for a code example or quiz question explanation anytime!/gi, "हे समजायला सोपे वाटले का, $1? तुम्ही कधीही कोड उदाहरण किंवा क्विझचे स्पष्टीकरण विचारू शकता!"],
  [/Keep these in mind when completing your quizzes and coding projects, ([^!]+)!/gi, "तुमची क्विझ आणि कोडिंग करताना या गोष्टी नक्की लक्षात ठेवा, $1!"],
  [/Run this code directly in your dev environment or browser console\./gi, "हा कोड थेट तुमच्या कॉम्प्युटरवर किंवा ब्राउझर कन्सोलमध्ये चालवून पहा."],
  [/Experiment by modifying the input values to see how the output changes!/gi, "वेगवेगळे इनपुट बदलून आऊटपुट कसा बदलतो याचा सराव करा!"],
  [/Need this explained line by line\? Just ask!/gi, "हा कोड ओळीनुसार समजून घ्यायचा असल्यास मला नक्की विचारा!"],

  // App features & Fallback
  [/About YUKTARA — Personalized Learning Assistant/gi, "युक्तारा (YUKTARA) बद्दल — वैयक्तिक शिक्षण सहाय्यक"],
  [/YUKTARA is an intelligent, client-side web application built for personalized self-paced education\./gi, "युक्तारा (YUKTARA) हे वैयक्तिक आणि स्वतःच्या गतीने शिकण्यासाठी तयार केलेले आधुनिक ॲप्लिकेशन आहे."],
  [/Universal Scroll Position Memory/gi, "युनिव्हर्सल स्क्रोल मेमरी (Universal Scroll Memory)"],
  [/Floating "Ask YuktaraAI" Selector/gi, "फ्लोटिंग \"Ask YuktaraAI\" सिलेक्टर"],
  [/Universal Tab Scroll Memory in YUKTARA/gi, "युक्तारा (YUKTARA) मधील युनिव्हर्सल स्क्रोल मेमरी"],
  [/How Quizzes Work in YUKTARA/gi, "युक्तारा (YUKTARA) मध्ये क्विझ कशा काम करतात"],
  [/Practice Mode — 5 MCQs/gi, "सराव पद्धत (Practice Mode — 5 MCQs)"],
  [/Timed Mode/gi, "वेळेवर आधारित परीक्षा (Timed Mode)"],
  [/Quiz Question Explanation/gi, "क्विझ प्रश्न स्पष्टीकरण"],
  [/Option-by-Option Breakdown:/gi, "प्रत्येक पर्यायाचे सविस्तर विश्लेषण:"],
  [/CORRECT — /gi, "बरोबर — "],
  [/Incorrect choice for this question\./gi, "या प्रश्नासाठी चुकीचा पर्याय."],
  [/Why is this answer correct\?/gi, "हे उत्तर बरोबर का आहे?"],
  [/Hmm, I'm not sure about that one, ([^!]+)!/gi, "मला याबद्दल निश्चित खात्री नाही, $1!"],
  [/Here's what I can definitely help you with:/gi, "मी तुम्हाला या गोष्टींमध्ये नक्की मदत करू शकेन:"],
  [/What should I study today\? — Today's schedule/gi, "मी आज काय अभ्यास करावा? — आजचे वेळापत्रक"],
  [/Show my course plan — Full day-by-day roadmap/gi, "माझा संपूर्ण कोर्स प्लॅन दाखवा — दिवसानुसार योजना"],
  [/How do quizzes work\? — Quiz modes & features/gi, "क्विझ कशा काम करतात? — क्विझ पद्धती आणि वैशिष्ट्ये"],
  [/What is YUKTARA\? — Full app guide/gi, "युक्तारा (YUKTARA) काय आहे? — संपूर्ण ॲप मार्गदर्शक"]
];

function translateToMarathi(text) {
  if (!text) return "";
  let out = text;

  // 1. Check if the text matches any known topic explanations and replace with Marathi
  for (const [topicId, data] of Object.entries(MARATHI_TOPIC_TRANSLATIONS)) {
    const origTopic = SUBJECT_LIBRARY["python programming"]?.topics.find(t => t.id === topicId) ||
      SUBJECT_LIBRARY["web development"]?.topics.find(t => t.id === topicId) ||
      SUBJECT_LIBRARY["data structures and algorithms"]?.topics.find(t => t.id === topicId);
    if (origTopic) {
      if (origTopic.name && out.includes(origTopic.name)) {
        out = out.split(origTopic.name).join(data.name);
      }
      if (origTopic.explanations) {
        if (origTopic.explanations.beginner && out.includes(origTopic.explanations.beginner)) {
          out = out.split(origTopic.explanations.beginner).join(data.beginner);
        }
        if (origTopic.explanations.intermediate && out.includes(origTopic.explanations.intermediate)) {
          out = out.split(origTopic.explanations.intermediate).join(data.intermediate);
        }
        if (origTopic.explanations.advanced && out.includes(origTopic.explanations.advanced)) {
          out = out.split(origTopic.explanations.advanced).join(data.advanced);
        }
      }
      if (origTopic.example && out.includes(origTopic.example)) {
        out = out.split(origTopic.example).join(data.example);
      }
      if (origTopic.pitfalls && data.pitfalls) {
        origTopic.pitfalls.forEach((pit, idx) => {
          if (data.pitfalls[idx] && out.includes(pit)) {
            out = out.split(pit).join(data.pitfalls[idx]);
          }
        });
      }
    }
  }

  // 2. Run general dictionary replacements
  for (const [pattern, replacement] of MARATHI_DICTIONARY) {
    out = out.replace(pattern, replacement);
  }

  return out;
}

function translateToEnglish(text) {
  return text;
}

function tutorRespond(userText, selectedTopicId, level) {
  const qLower = (userText || "").toLowerCase().trim();
  const asksMarathiDirect = qLower.includes("marathi") || qLower.includes("मराठी") || qLower.includes("translate in marathi") || qLower.includes("in marathi");
  const profile = state.profile || {
    name: "Student",
    subject: "Python Programming",
    level: "Beginner",
    goal: "Master course concepts",
    studyTime: 45,
    targetDate: formatYMD(new Date()),
    createdAt: new Date().toISOString()
  };

  const subject = getSubjectData(profile.subject);
  const plan = state.plan || [];
  const attempts = (state.progress && state.progress.quizAttempts) || [];
  const todayStr = formatYMD(new Date());

  // Calculations & Personalization
  const fullName = profile.name || "Student";
  const firstName = fullName.trim().split(/\s+/)[0] || "Student";
  const daysCount = plan.length ? Math.max(...plan.map(i => i.day)) : 0;
  const totalSubtopics = plan.length;
  const completedCount = plan.filter(i => i.done).length;
  const pendingCount = totalSubtopics - completedCount;
  const percentComplete = totalSubtopics ? Math.round((completedCount / totalSubtopics) * 100) : 0;

  const todayItems = plan.filter(i => i.date === todayStr);
  const firstIncomplete = plan.find(i => !i.done);

  // Date math
  const todayDateObj = new Date();
  todayDateObj.setHours(0, 0, 0, 0);
  const targetDateObj = parseYMD(profile.targetDate);
  targetDateObj.setHours(0, 0, 0, 0);
  const diffDays = Math.round((targetDateObj.getTime() - todayDateObj.getTime()) / (1000 * 60 * 60 * 24));
  const targetDateFormatted = formatDate(profile.targetDate);
  const createdDateFormatted = formatDate(profile.createdAt);

  // 0. Conversational Greetings & Study Motivation (HIGHEST PRIORITY)
  // Catches: hi, hii, hiii, hey, heyy, hello, helloo, yo, sup, howdy, greetings, good morning/evening, etc.
  const cleanQ = qLower.replace(/[!?.,;:~]+$/g, "").trim();
  const isGreeting = (
    /^h+i+$/.test(cleanQ) ||
    /^he+y+$/.test(cleanQ) ||
    /^h+e+l+l+o+$/.test(cleanQ) ||
    /^h+o+l+a+$/.test(cleanQ) ||
    cleanQ === "howdy" ||
    cleanQ === "yo" ||
    cleanQ === "sup" ||
    cleanQ === "greetings" ||
    cleanQ.startsWith("hi ") ||
    cleanQ.startsWith("hii ") ||
    cleanQ.startsWith("hello ") ||
    cleanQ.startsWith("hey ") ||
    cleanQ.includes("good morning") ||
    cleanQ.includes("good afternoon") ||
    cleanQ.includes("good evening") ||
    cleanQ.includes("good night") ||
    cleanQ === "hi yuktara" ||
    cleanQ === "hello yuktara" ||
    cleanQ === "hi pratej" ||
    cleanQ === "hello pratej"
  );

  if (isGreeting) {
    const motivations = [
      `🌟 **"Success is the sum of small efforts, repeated day in and day out."** Every single topic you master today brings you closer to your dream!`,
      `🔥 **Stay hungry, ${firstName}!** You set a goal of *" ${profile.goal} "* — don't let up now. You have everything it takes to conquer ${profile.subject}!`,
      `🚀 **Action cures fear and builds momentum.** Just ${profile.studyTime} minutes of focused study today will compound into incredible mastery. Let's do this!`,
      `🎯 **Keep your eyes on the prize:** You're working hard for *" ${profile.goal} "*. Every line of code and every quiz question is a stepping stone to your success!`,
      `💪 **Believe in yourself, ${firstName}!** ${percentComplete > 0 ? `You're already ${percentComplete}% of the way there!` : "The journey of a thousand miles begins with a single step."} Make today count!`
    ];
    // Pick dynamic motivation
    const quote = motivations[Math.floor(Math.random() * motivations.length)];

    return `👋 **Hello, ${fullName}!**

Welcome to your study session! I'm **YuktaraAI**, your 24/7 personal tutor and study companion.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✨ **STUDY MOTIVATION FOR YOU:**
${quote}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 **Your Learning Target:**
• **Course:** ${profile.subject} (${profile.level} Level)
• **Your Goal:** "${profile.goal}"
• **Target Date:** ${targetDateFormatted} (${diffDays >= 0 ? `${diffDays} days left` : "Goal date reached!"})
• **Daily Commitment:** ${profile.studyTime} minutes per day
• **Overall Progress:** ${percentComplete}% complete (${completedCount}/${totalSubtopics} subtopics done)

${todayItems.length ? `📌 **Today's Focus:** You have **${todayItems.length} subtopic(s)** scheduled for today (${todayItems.reduce((s, i) => s + i.minutes, 0)} mins).` : firstIncomplete ? `📌 **Next Up:** Day ${firstIncomplete.day} — *${firstIncomplete.subtopic}* (${firstIncomplete.minutes} mins).` : `🎉 **Incredible!** You've completed all topics in your plan!`}

**Ready to study? Here's what you can ask me:**
• 📅 *"What should I study today?"*
• 📊 *"Show my course plan"*
• 💡 *"Explain [any topic]"* or paste any quiz question for full explanations!`;
  }

  // 0.1 UI Text / Button / Sidebar Selection Awareness
  // Handles text selected anywhere on the page (buttons, labels, sidebar, etc.)
  if (qLower === "reset all data" || qLower.includes("reset all data")) {
    return `🗑️ **Reset All Data**

The **"Reset All Data"** button (bottom of the sidebar) permanently erases all your YUKTARA data from this browser:
• ❌ Your profile (name, subject, level, goal, dates)
• ❌ Your entire learning plan & study schedule
• ❌ All quiz attempts and scores
• ❌ The full YuktaraAI chat history

⚠️ This action is **irreversible**. Only use it if you want a completely fresh start.
After reset, you will be taken back to the profile setup screen.`;
  }

  if (qLower.includes("switch to light mode") || qLower.includes("switch to dark mode") || qLower === "light mode" || qLower === "dark mode" || qLower.includes("theme")) {
    return `🌓 **Theme Toggle — Light & Dark Mode**

YUKTARA supports a **Dark Mode** (default) and a **Light Mode**:
• Click **"Switch to Light Mode"** (or Dark Mode) in the bottom of the sidebar to toggle instantly.
• Your preference is **saved automatically** in localStorage so it persists across sessions.
• The design uses a glassmorphic HSL color system — both themes are premium and fully accessible.`;
  }

  if ((qLower.includes("yuktara") || qLower.includes("pratej")) && qLower.length < 30) {
    return `🎓 **YUKTARA — Personalized Learning Assistant**

YUKTARA is your AI-powered, client-side study platform. It includes:
1. 🏠 **Dashboard** — Progress overview & today's focus
2. 🗓️ **Learning Plan** — Day-by-day personalized schedule
3. 🤖 **YuktaraAI** — AI tutor (that's me!) aware of your full profile
4. 🎓 **Quiz & Review** — 5-MCQ adaptive quizzes with review keys
5. 📊 **Analytics** — Scores, weak topics & attempt history

All data is stored **locally in your browser** — 100% private, no accounts needed.`;
  }

  if (qLower === "dashboard" || qLower === "learning plan" || qLower === "quiz & review" || qLower === "analytics") {
    const tabInfo = {
      "dashboard": "🏠 **Dashboard** — Your main control panel. Shows overall % completion, daily study target, average quiz score, today's scheduled subtopics, weak topic alerts, and quick-action buttons.",
      "learning plan": "🗓️ **Learning Plan** — Your personalized day-by-day study roadmap. Each day lists the topic, subtopic, and exact allocated minutes. Tick checkboxes to mark progress!",
      "quiz & review": "🎓 **Quiz & Review** — Adaptive quiz system. Each topic has 5 MCQs + 1 short answer in **Practice** or **Timed** (180s) mode. After submitting, get a full answer key and option-by-option explanations.",
      "analytics": "📊 **Analytics** — Tracks your full learning journey: completion %, average quiz score, per-topic attempt history, and weak topics (any score below 60%) flagged for revision."
    };
    return tabInfo[qLower] || `That is one of the 5 navigation tabs in YUKTARA. Ask me "What are the tabs?" for a full overview!`;
  }

  if (qLower.includes("edit profile") || qLower === "edit profile") {
    return `✏️ **Edit Profile**

Click **"Edit Profile"** on the Dashboard to update any of your settings without losing existing data:
• Your **name**, **subject**, **expertise level**, **daily study goal**, **learning goal**, or **target date** can all be changed.
• The form pre-fills with your current values — only change what you need.
• Clicking **Cancel** exits without saving any changes.
• On saving, your learning plan is **regenerated** to fit the updated parameters!`;
  }

  if (qLower.includes("view full plan") || qLower.includes("full plan")) {
    return `🗓️ **View Full Plan**

This button on the Dashboard takes you directly to your **Learning Plan** tab where:
• Every day of your course is listed (Day 1 → Day ${plan.length ? Math.max(...plan.map(i => i.day)) : "N"})
• Each item shows the **topic name**, **subtopic**, and **allocated minutes**
• Tick any checkbox to mark it as complete — progress auto-saves instantly!`;
  }

  if (qLower.includes("revise weak topics") || qLower.includes("weak topics with yuktara") || qLower.includes("weak topics with pratej") || qLower.includes("revise missed")) {
    return `🔁 **Revise Weak Topics with YuktaraAI**

This button appears when you score below 60% on a quiz topic. Clicking it:
1. Opens the **YuktaraAI** tab automatically
2. Sets the topic focus to the weak subject
3. You can then ask for explanations, code examples, pitfalls, or retry the quiz!`;
  }

  if (qLower.includes("welcome back") || qLower.includes("welcome student") || (qLower.startsWith("welcome") && qLower.length < 40)) {
    return `👋 **Welcome Back, ${fullName}!**

This greeting appears on your **Dashboard** every time you open YUKTARA. It shows your first name pulled from your saved profile.

Your current status:
• **Course:** ${profile.subject} (${profile.level})
• **Progress:** ${percentComplete}% complete (${completedCount}/${totalSubtopics} subtopics)
• **Target:** ${formatDate(profile.targetDate)}`;
  }

  if (qLower.includes("ask yuktara") || qLower.includes("ask yuktarai") || qLower.includes("ask pratej") || qLower.includes("ask pratejAi") || qLower === "ask yuktara" || qLower === "ask pratej") {
    return `🤖 **"Ask YuktaraAI" — Text Selection Feature**

Highlight **any text** on any page (a topic name, quiz question, error message, button label, anything!) and a floating **"Ask YuktaraAI"** popup appears. Click it to:
• Instantly navigate to the YuktaraAI tab
• Send the selected text as your question
• Get a smart contextual answer based on what was selected!`;
  }

  if (qLower.includes("practice") && qLower.includes("mcq") || qLower === "practice (5 mcqs)") {
    return `✅ **Practice Mode — 5 MCQs**

Practice mode is the default quiz experience in YUKTARA:
• **Untimed** — no pressure, learn at your own pace
• **5 Multiple Choice Questions** covering the topic's core concepts
• **1 Short Answer** graded by keyword matching
• Your answers are **auto-saved** to localStorage — refresh or switch tabs without losing progress
• After submitting, see the complete **Review Key** with correct answers and option breakdowns!`;
  }

  if (qLower === "timed" || qLower.includes("timed mode") || qLower.includes("stopwatch")) {
    return `⏱️ **Timed Mode**

Timed mode simulates a real exam environment:
• **180-second countdown** timer starts immediately
• All 5 MCQs + 1 short answer must be completed before time runs out
• Timer auto-submits when it hits 0 — so work quickly!
• Great for exam preparation and testing how well you know the material under pressure.`;
  }

  // 1. MCQ Specific Explainer (if user asks about a quiz question or pasted question)
  const matchedMCQ = findMatchingMCQ(userText);

  if (matchedMCQ) {
    const { mcq, topic: mcqTopic } = matchedMCQ;
    const correctOpt = mcq.options[mcq.answer];

    return `🤖 **YuktaraAI — Quiz Question Explanation**

**Topic:** ${mcqTopic.name}
**Question:** "${mcq.q}"

✅ **Correct Answer:** Option ${mcq.answer + 1} — \`${correctOpt}\`

💡 **Why is this answer correct?**
${mcq.explanation}

🔍 **Option-by-Option Breakdown:**
${mcq.options.map((opt, idx) => {
      const isAns = idx === mcq.answer;
      return `• **Option ${idx + 1} (${opt})**: ${isAns ? "✓ CORRECT — " + mcq.explanation : "✗ Incorrect choice for this question."}`;
    }).join("\n")}`;
  }

  // 2. User Name & Identity Questions
  if (
    qLower.includes("my name") ||
    qLower.includes("who am i") ||
    qLower.includes("know my name") ||
    qLower.includes("who are you talking to") ||
    qLower.includes("what is my name") ||
    qLower.includes("what's my name") ||
    qLower.includes("do you remember me") ||
    (fullName.toLowerCase() !== "student" && qLower.includes(fullName.toLowerCase())) ||
    (firstName.toLowerCase() !== "student" && qLower.includes(firstName.toLowerCase()))
  ) {
    return `👤 **Hello ${fullName}!** 👋

Yes, I know you very well! Your registered profile in YUKTARA is:

• **Full Name:** ${fullName}
• **Enrolled Course:** ${profile.subject}
• **Mastery Level:** ${profile.level}
• **Daily Study Commitment:** ${profile.studyTime} minutes per day
• **Target Completion Date:** ${targetDateFormatted} (${diffDays >= 0 ? `${diffDays} days remaining` : "Target date reached!"})
• **Personal Learning Goal:** "${profile.goal}"
• **Current Progress:** ${percentComplete}% completed (${completedCount} of ${totalSubtopics} subtopics done)

Whenever you have any questions about your course, schedule, or YUKTARA features, I'm here to help, ${firstName}!`;
  }

  // 3. User Profile / Details / Goal / Dates
  if (
    qLower.includes("my profile") ||
    qLower.includes("my details") ||
    qLower.includes("my info") ||
    qLower.includes("profile info") ||
    qLower.includes("my goal") ||
    qLower.includes("learning goal") ||
    qLower.includes("study goal") ||
    qLower.includes("my level") ||
    qLower.includes("daily time") ||
    qLower.includes("study time") ||
    qLower.includes("target date") ||
    qLower.includes("deadline") ||
    qLower.includes("my date") ||
    qLower.includes("when did i create") ||
    qLower.includes("when was my profile") ||
    qLower.includes("when did i start")
  ) {
    return `📋 **Profile & Goal Details for ${fullName}**

• **Student Name:** ${fullName}
• **Course / Subject:** ${profile.subject}
• **Proficiency Level:** ${profile.level}
• **Learning Goal:** "${profile.goal}"
• **Daily Study Goal:** ${profile.studyTime} minutes/day
• **Target Completion Date:** ${targetDateFormatted} (${diffDays >= 0 ? `${diffDays} days from now` : "Completed/Reached"})
• **Profile Created On:** ${createdDateFormatted}
• **Total Course Duration:** ${daysCount} Days
• **Course Progress:** ${percentComplete}% (${completedCount}/${totalSubtopics} subtopics finished)

*Tip: You can update your goal, daily time, or target date anytime by clicking "Edit Profile" on your Dashboard!*`;
  }

  // 4. Course Days & Timeline Questions
  if (
    qLower.includes("course day") ||
    qLower.includes("how many day") ||
    qLower.includes("days in my course") ||
    qLower.includes("total day") ||
    qLower.includes("how long is my course") ||
    qLower.includes("course length") ||
    qLower.includes("how many days")
  ) {
    const startDate = plan.length ? formatDate(plan[0].date) : "Today";
    const endDate = plan.length ? formatDate(plan[plan.length - 1].date) : targetDateFormatted;

    return `🗓️ **Course Days & Timeline for ${profile.subject}**

• **Total Course Days:** **${daysCount} Days**
• **Start Date:** ${startDate}
• **Target End Date:** ${endDate}
• **Daily Commitment:** ${profile.studyTime} minutes/day
• **Total Planned Subtopics:** ${totalSubtopics} subtopics
• **Subtopics Completed:** ${completedCount} subtopics (${percentComplete}%)
• **Subtopics Pending:** ${pendingCount} subtopics

Your study schedule is distributed across **${daysCount} active days** to comfortably reach your target date of **${targetDateFormatted}**!`;
  }

  // 5. Today's Plan & Schedule
  if (
    qLower.includes("today") ||
    qLower.includes("what should i study") ||
    qLower.includes("what to study today") ||
    qLower.includes("today's plan") ||
    qLower.includes("today's tasks") ||
    qLower.includes("scheduled for today")
  ) {
    if (todayItems.length > 0) {
      const todayDay = todayItems[0].day;
      const todayTotalMins = todayItems.reduce((s, i) => s + i.minutes, 0);

      return `📅 **Today's Study Schedule (${formatDate(todayStr)}) — Day ${todayDay} of ${daysCount}**

Here are the tasks planned for you today, ${firstName}:

${todayItems.map((item, idx) => `**${idx + 1}. ${item.topicName} — ${item.subtopic}**\n   • Allocated Time: ${item.minutes} minutes\n   • Status: ${item.done ? "✅ Completed" : "⏳ Pending"}`).join("\n\n")}

⏱️ **Total Allocated Time Today:** ${todayTotalMins} minutes.
${todayItems.every(i => i.done) ? "🎉 You've completed all tasks for today! Great job, " + firstName + "!" : "💪 Head to the **Learning Plan** tab to check off these items as you complete them!"}`;
    } else {
      if (firstIncomplete) {
        return `📅 **Today's Status (${formatDate(todayStr)})**

There are no tasks specifically scheduled with today's exact date, but here is your **next active study session**:

• **Next Scheduled Session:** **Day ${firstIncomplete.day}** (${formatDate(firstIncomplete.date)})
• **Topic Focus:** ${firstIncomplete.topicName}
• **Subtopic:** ${firstIncomplete.subtopic}
• **Allocated Time:** ${firstIncomplete.minutes} minutes
• **Overall Progress:** ${percentComplete}% (${completedCount}/${totalSubtopics} completed)

Check the **Learning Plan** tab to review your day-by-day roadmap!`;
      } else {
        return `🎉 **Congratulations ${fullName}!**

You have completed all ${totalSubtopics} subtopics in your **${profile.subject}** course plan!
• **Overall Progress:** 100% Completed
• **Quiz Modules:** Check the **Quiz & Review** tab to practice your 5-MCQ evaluations or take timed challenges!`;
      }
    }
  }

  // 6. Specific Day Plan (e.g. Day 1, Day 2, Day 3...)
  const dayMatch = qLower.match(/day\s*(\d+)/i);
  if (dayMatch) {
    const requestedDay = Number(dayMatch[1]);
    const dayItems = plan.filter(i => i.day === requestedDay);
    if (dayItems.length > 0) {
      const dayDate = formatDate(dayItems[0].date);
      const dayMins = dayItems.reduce((s, i) => s + i.minutes, 0);

      return `📖 **Study Itinerary for Day ${requestedDay} (${dayDate})**

**Scheduled Subtopics (${dayMins} mins total):**
${dayItems.map((i, idx) => `• **${i.topicName}**: ${i.subtopic} (${i.minutes} mins) — ${i.done ? "✅ Done" : "⏳ Pending"}`).join("\n")}

*You can mark these tasks as done anytime on the **Learning Plan** tab!*`;
    } else {
      return `ℹ️ **Day ${requestedDay} Inquiry**\n\nYour current **${profile.subject}** study plan is configured for **${daysCount} days** (Day 1 through Day ${daysCount}). Day ${requestedDay} is outside this range.`;
    }
  }

  // 7. Full Course Plan / Schedule / Itinerary
  if (
    qLower.includes("course plan") ||
    qLower.includes("study plan") ||
    qLower.includes("show my plan") ||
    qLower.includes("show plan") ||
    qLower.includes("my plan") ||
    qLower.includes("study schedule") ||
    qLower.includes("how is my course planned") ||
    qLower.includes("roadmap")
  ) {
    const byDay = {};
    plan.forEach(item => {
      if (!byDay[item.day]) byDay[item.day] = [];
      byDay[item.day].push(item);
    });

    const daySummaries = Object.keys(byDay).map(day => {
      const items = byDay[day];
      const allDone = items.every(i => i.done);
      const totalM = items.reduce((s, i) => s + i.minutes, 0);
      const topicNames = [...new Set(items.map(i => i.topicName))].join(", ");
      return `• **Day ${day} (${formatDate(items[0].date)} · ${totalM}m)**: ${topicNames} (${items.length} subtopics) — ${allDone ? "✅ Complete" : "⏳ Active"}`;
    }).slice(0, 10).join("\n");

    return `🗺️ **Your Personalized Learning Plan for ${profile.subject}**

• **Student:** ${fullName} (${profile.level} Level)
• **Total Duration:** ${daysCount} Days (${plan.length ? formatDate(plan[0].date) : "Today"} → ${targetDateFormatted})
• **Daily Commitment:** ${profile.studyTime} mins/day
• **Completion Status:** ${percentComplete}% (${completedCount}/${totalSubtopics} subtopics done)

**Day-by-Day Schedule Overview:**
${daySummaries}
${Object.keys(byDay).length > 10 ? `\n*(+ ${Object.keys(byDay).length - 10} more days — view the complete list in the Learning Plan tab!)*` : ""}

Go to the **Learning Plan** tab to see all subtopic checkboxes and track your study time!`;
  }

  // 8. Progress / Completion / Pending
  if (
    qLower.includes("progress") ||
    qLower.includes("how much have i finished") ||
    qLower.includes("how much completed") ||
    qLower.includes("completion") ||
    qLower.includes("pending") ||
    qLower.includes("what is next") ||
    qLower.includes("what's next") ||
    qLower.includes("what to study next")
  ) {
    return `📈 **Current Learning Progress for ${fullName}**

• **Course:** ${profile.subject}
• **Overall Completion:** **${percentComplete}%**
• **Subtopics Done:** ${completedCount} of ${totalSubtopics}
• **Subtopics Pending:** ${pendingCount}
• **Total Course Days:** ${daysCount} Days

${firstIncomplete ? `📌 **Next Up on Your Roadmap:**\n• **Day ${firstIncomplete.day} (${formatDate(firstIncomplete.date)})**\n• **Topic:** ${firstIncomplete.topicName}\n• **Subtopic:** ${firstIncomplete.subtopic} (${firstIncomplete.minutes} mins)` : "🎉 All scheduled subtopics are completed! You're ready for final quiz assessments!"}`;
  }

  // 9. What is YUKTARA / About App / Features / How it works
  if (
    qLower.includes("what is yuktara") ||
    qLower.includes("about yuktara") ||
    qLower.includes("yuktara app") ||
    qLower.includes("what does yuktara stand for") ||
    qLower.includes("how does yuktara work") ||
    qLower.includes("what is pratej") ||
    qLower.includes("about pratej") ||
    qLower.includes("pratej app") ||
    qLower.includes("this app") ||
    qLower.includes("what does pratej stand for") ||
    qLower.includes("what does pratej mean") ||
    qLower.includes("features of this app") ||
    qLower.includes("what can this app do") ||
    qLower.includes("how to use this app") ||
    qLower.includes("how does this app work") ||
    qLower.includes("how does pratej work") ||
    qLower.includes("app feature")
  ) {
    return `🌟 **About YUKTARA — Personalized Learning Assistant**

**YUKTARA** is an intelligent, client-side web application built for personalized self-paced education. It combines automated study scheduling, AI-assisted tutoring, interactive assessments, and deep progress analytics.

**Key Architecture & App Features:**
1. 🏠 **Dashboard**: Your command center showing overall progress, daily streak, quiz performance, today's focus tasks, and weak topic alerts.
2. 🗓️ **Learning Plan**: An intelligent algorithm that calculates your exact daily study schedule based on your target date, available minutes (${profile.studyTime}m/day), and skill level. Features interactive checkboxes for completion tracking.
3. 🤖 **YuktaraAI Tutor**: Context-aware AI assistant (that's me!) with level-adaptive explanations, code snippets, common pitfalls, analogies, full profile awareness, and MCQ review keys.
4. 🎓 **Adaptive Quiz System**: 5 MCQs + short-answer evaluations per topic. Offers both **Practice Mode** and a high-intensity **Timed Mode** (180s countdown), draft auto-save, and question-by-question review keys.
5. 📊 **Analytics**: Tracks completion percentage, average quiz scores, weak topic detection (<60%), and full attempt history.
6. 🔒 **Local Persistence**: All your data is saved in your browser's \`localStorage\` (\`pla_pro_state_v2\`). Your profile, quiz history, and chat stay private on your device.
7. 📌 **Universal Scroll Position Memory**: YUKTARA saves and restores your exact scroll position across every tab so you never lose your place!
8. ✨ **Floating "Ask YuktaraAI" Selector**: Highlight any text on any page to open a quick popup that brings you directly here with the question ready!
9. 🌓 **Dark / Light Mode**: Instant theme switching with custom glassmorphic styling and HSL tokens.`;
  }

  // 10. Questions about App Tabs
  if (
    qLower.includes("tab") ||
    qLower.includes("what are the tabs") ||
    qLower.includes("navigation")
  ) {
    return `🧭 **YUKTARA Navigation Tabs Overview**

YUKTARA features 5 primary tabs in the sidebar:
1. **Dashboard** (\`dashboard\`): Welcome screen, study streak, high-level metrics, today's focus items, and quick action buttons.
2. **Learning Plan** (\`plan\`): Complete day-by-day roadmap with subtopic checkboxes and exact allocated minutes.
3. **YuktaraAI** (\`tutor\`): Personal AI tutor for explanations, code samples, quiz reviews, and course guidance.
4. **Quiz & Review** (\`quiz\`): Topic quizzes with 5 MCQs each, practice/timed modes, and detailed review keys.
5. **Analytics** (\`progress\`): Comprehensive mastery analytics, weak topic highlights, and quiz attempt records.

*You can switch between any of these tabs anytime without losing your place or scroll position!*`;
  }

  // 11. Questions about Scrolling Memory
  if (
    qLower.includes("scroll") ||
    qLower.includes("stuck at one place") ||
    qLower.includes("scrolling")
  ) {
    return `📌 **Universal Tab Scroll Memory in YUKTARA**

YUKTARA includes seamless scroll position preservation across **all tabs** (Dashboard, Learning Plan, YuktaraAI, Quiz & Review, Analytics):
• When you scroll down on any tab (e.g. browsing Day 5 on Learning Plan or Question 4 in a Quiz) and switch to another tab, YUKTARA records your exact vertical scroll position.
• When you navigate back to that tab, YUKTARA instantly restores your exact scroll location.
• You will never lose your place or have the page snap back to top unexpectedly!`;
  }

  // 12. Questions about Quizzes & Modes & Explanations
  if (
    qLower.includes("quiz") && (
      qLower.includes("how") ||
      qLower.includes("mode") ||
      qLower.includes("practice") ||
      qLower.includes("timed") ||
      qLower.includes("work") ||
      qLower.includes("mcq")
    )
  ) {
    return `🎓 **How Quizzes Work in YUKTARA**

Every quiz module in YUKTARA includes:
• **5 Multiple Choice Questions (MCQs)**: Covering foundational concepts, syntax, and problem-solving.
• **1 Short Answer Question**: Graded automatically by keyword matching against model criteria.
• **Two Modes**:
  1. **Practice Mode**: Untimed, stress-free learning to reinforce concepts.
  2. **Timed Mode**: 180-second countdown timer for exam simulation.
• **Draft Auto-Saving**: If you switch tabs or refresh, your active quiz draft is preserved.
• **Review & Explanations**: Immediately after submitting, you get a full question review showing correct answers, option breakdowns, and a 1-click button to **"Ask YuktaraAI to Explain"**!`;
  }

  // 13. Questions about Quiz Performance / Scores / Weak Topics
  if (
    qLower.includes("quiz score") ||
    qLower.includes("my score") ||
    qLower.includes("quiz performance") ||
    qLower.includes("quiz result") ||
    qLower.includes("how did i do in quiz") ||
    qLower.includes("weak topic") ||
    qLower.includes("weak area") ||
    qLower.includes("where to improve") ||
    qLower.includes("struggling")
  ) {
    if (attempts.length === 0) {
      return `📊 **Quiz Performance for ${fullName}**

You haven't attempted any quizzes yet!
• Head to the **Quiz & Review** tab to test your knowledge on **${profile.subject}**.
• Each quiz features 5 MCQs and 1 short answer.
• Once you complete a quiz, I'll analyze your scores and highlight any weak topics (<60%) for targeted revision!`;
    }

    const avg = Math.round(attempts.reduce((s, a) => s + a.percent, 0) / attempts.length);
    const weak = getWeakTopics();
    const latest = attempts[attempts.length - 1];

    return `📊 **Quiz Performance & Analytics for ${fullName}**

• **Total Quizzes Attempted:** ${attempts.length}
• **Average Score:** **${avg}%**
• **Latest Attempt:** ${latest.topicName} — **${latest.percent}%** (${latest.score}/${latest.total} pts)

${weak.length > 0 ? `⚠️ **Topics Needing Revision (<60% score):**\n${weak.map(w => `• **${w.topicName}** (Last score: ${w.percent}%) — *Click "Quiz & Review" to retake or ask me for an explanation!*`).join("\n")}` : `✨ **Outstanding Mastery!** None of your attempted topics are below 60%. Keep up the fantastic work, ${firstName}!`}`;
  }

  // 14. Course & Syllabus / Topics
  if (
    qLower.includes("what course") ||
    qLower.includes("what subject") ||
    qLower.includes("my course") ||
    qLower.includes("course details") ||
    qLower.includes("syllabus") ||
    qLower.includes("all topics") ||
    qLower.includes("list of topics") ||
    qLower.includes("what will i learn") ||
    qLower.includes("available course") ||
    qLower.includes("available subject")
  ) {
    const topicsList = subject.topics.map((t, idx) => `**${idx + 1}. ${t.name}**\n   • Subtopics: ${t.subtopics.join(", ")}`).join("\n\n");

    return `📚 **Course Curriculum: ${subject.displayName}**

You are currently studying **${subject.displayName}** at the **${profile.level}** level.

**Modules & Topics Included:**
${topicsList}

💡 *Available subjects in YUKTARA also include Python Programming, Web Development, and Data Structures & Algorithms (or any custom subject)!*`;
  }

  // 15. Profile Edit / Reset / Data Storage Questions
  if (
    qLower.includes("edit profile") ||
    qLower.includes("change my name") ||
    qLower.includes("change goal") ||
    qLower.includes("change subject") ||
    qLower.includes("reset data") ||
    qLower.includes("where is my data") ||
    qLower.includes("localstorage") ||
    qLower.includes("data safe") ||
    qLower.includes("privacy")
  ) {
    return `⚙️ **Profile Management & Data Storage**

• **Editing Your Profile**: Click the **"Edit Profile"** button at the top of your **Dashboard** to modify your name, enrolled subject, level, daily study minutes, goal, or target date without losing your existing values.
• **Resetting Data**: If you want a clean slate, click the **"Reset All Data"** button at the bottom of the sidebar.
• **Privacy & Local Storage**: YUKTARA stores 100% of your data locally in your browser via \`localStorage\` (\`pla_pro_state_v2\`). No accounts, passwords, or cloud servers are required; your learning journey is completely private to this device!`;
  }



  // 16. Viva / Interview Questions Query
  if (qLower.includes("viva") || qLower.includes("interview question") || qLower.includes("oral exam")) {
    let matchedTopic = subject.topics.find(t =>
      t.name.toLowerCase().includes(qLower) ||
      t.subtopics.some(st => st.toLowerCase().includes(qLower))
    ) || (selectedTopicId ? subject.topics.find(t => t.id === selectedTopicId) : null) || subject.topics[0];

    if (matchedTopic && matchedTopic.vivaQuestions && matchedTopic.vivaQuestions.length > 0) {
      const vivaList = matchedTopic.vivaQuestions.map((vq, idx) => `**Q${idx + 1}: ${vq.q}**\n👉 *Answer:* ${vq.a}`).join("\n\n");
      return `🎓 **Viva & Interview Questions: ${matchedTopic.name}**\n\nHere are core viva / oral exam and technical interview questions from the official university syllabus:\n\n${vivaList}\n\n💡 *Tip: Practice answering these without notes to prepare for university oral exams!*`;
    }
  }

  // 16b. Syllabus Case Study Query
  if (qLower.includes("case study") || qLower.includes("exemplar") || qLower.includes("real world scenario") || qLower.includes("practical scenario")) {
    let matchedTopic = subject.topics.find(t =>
      t.name.toLowerCase().includes(qLower) ||
      t.subtopics.some(st => st.toLowerCase().includes(qLower))
    ) || (selectedTopicId ? subject.topics.find(t => t.id === selectedTopicId) : null) || subject.topics[0];

    if (matchedTopic && matchedTopic.caseStudy) {
      return `💡 **Syllabus Case Study: ${matchedTopic.name}**\n\n**Official Curriculum Scenario:**\n${matchedTopic.caseStudy}\n\n**Academic Significance:**\nThis case study bridges foundational theory with practical engineering architecture in industry applications.`;
    }
  }

  // 16c. Formulas and Laws Query
  if (qLower.includes("formula") || qLower.includes("equation") || qLower.includes("bounds") || qLower.includes("asymptotic formula")) {
    let matchedTopic = subject.topics.find(t =>
      t.name.toLowerCase().includes(qLower) ||
      t.subtopics.some(st => st.toLowerCase().includes(qLower))
    ) || (selectedTopicId ? subject.topics.find(t => t.id === selectedTopicId) : null) || subject.topics[0];

    if (matchedTopic && matchedTopic.formulas && matchedTopic.formulas.length > 0) {
      const fList = matchedTopic.formulas.map(f => "• `" + f + "`").join("\n");
      return `📐 **Key Formulas & Complexity Bounds: ${matchedTopic.name}**\n\n${fList}\n\n*Review these formulas for exam derivations and algorithmic proofs!*`;
    }
  }

  // 17. Topic Specific Searches & Explanations (Code Examples, Pitfalls, Analogies)
  // Check if query explicitly matches a topic/subtopic name or common inquiry words
  let topic = subject.topics.find(t =>
    t.name.toLowerCase().includes(qLower) ||
    t.subtopics.some(st => st.toLowerCase().includes(qLower)) ||
    (qLower.length >= 4 && t.name.toLowerCase().split(/\s+/).some(w => w.length > 3 && qLower.includes(w)))
  );

  const asksAboutTopic = (
    qLower.includes("code") ||
    qLower.includes("pitfall") ||
    qLower.includes("mistake") ||
    qLower.includes("analogy") ||
    qLower.includes("explain") ||
    qLower.includes("what is") ||
    qLower.includes("how does") ||
    qLower.includes("concept") ||
    qLower.includes("this topic") ||
    qLower.includes("tell me about") ||
    qLower.includes("मराठी") ||
    qLower.includes("marathi") ||
    qLower.includes("सांगा") ||
    qLower.includes("शिकवा") ||
    qLower.includes("माहिती")
  );

  if (!topic && (asksAboutTopic || asksMarathiDirect)) {
    // Check if previous messages in chat referenced a topic
    if (state.chat && state.chat.length) {
      for (let i = state.chat.length - 1; i >= 0; i--) {
        const prevText = (state.chat[i].originalEn || state.chat[i].text || "").toLowerCase();
        const found = subject.topics.find(t => prevText.includes(t.name.toLowerCase()));
        if (found) { topic = found; break; }
      }
    }
    if (!topic) {
      topic = subject.topics.find(t => t.id === selectedTopicId) ||
        (firstIncomplete ? subject.topics.find(t => t.id === firstIncomplete.topicId) : null) ||
        subject.topics[0];
    }
  }

  if (topic) {
    const lvl = (level || profile.level || "Beginner").toLowerCase();
    const exp = topic.explanations[lvl] || topic.explanations.beginner || "";

    // Code Example
    if (qLower.includes("code example") || qLower.includes("code") || qLower.includes("practical code") || qLower.includes("syntax")) {
      const code = topic.codeExample || `// Practical ${subject.displayName} Code\nconsole.log("Welcome to ${subject.displayName}");`;
      return `💻 **Practical Code Example for ${topic.name} (${profile.level} Level):**

\`\`\`
${code}
\`\`\`

**Key Takeaways for ${firstName}:**
• Run this code directly in your dev environment or browser console.
• Experiment by modifying the input values to see how the output changes!
• Need this explained line by line? Just ask!`;
    }

    // Common Pitfalls
    if (qLower.includes("pitfall") || qLower.includes("mistake") || qLower.includes("common mistake") || qLower.includes("trap")) {
      const pitfallsList = topic.pitfalls ? topic.pitfalls.map(p => `• ${p}`).join("\n") : `• Avoid rushing through setup.\n• Test edge cases carefully.\n• Review variable naming and scoping.`;
      return `⚠️ **Common Pitfalls & How to Avoid Them (${topic.name}):**

${pitfallsList}

*Keep these in mind when completing your quizzes and coding projects, ${firstName}!*`;
    }

    // Simple Analogy / Intuition
    if (qLower.includes("explain simply") || qLower.includes("simple analogy") || qLower.includes("analogy") || qLower.includes("confus") || qLower.includes("don't get") || qLower.includes("stuck") || qLower.includes("beginner")) {
      return `💡 **Simple Real-World Analogy for ${topic.name}:**

**Real-World Analogy:**
${topic.example || "Think of it like following a clear step-by-step recipe."}

**Core Concept in Plain English:**
${topic.explanations.beginner || exp}

*Does this make intuitive sense, ${firstName}? You can ask for a code example or quiz question explanation anytime!*`;
    }

    // General concept explanation for matched topic
    if (exp && (asksAboutTopic || qLower.length >= 3)) {
      return `🤖 **YuktaraAI: ${topic.name} (${profile.level} Level)**

${exp}

${topic.example ? `**💡 Real-World Intuition:**\n${topic.example}\n` : ""}
*Tip: Tap 💻 Code example, ⚠️ Common pitfalls, or ask about your study plan!*`;
    }
  }

  // Unknown query fallback — graceful and helpful
  return `🤔 **Hmm, I'm not sure about that one, ${firstName}!**

I couldn't find a specific answer for: *"${userText}"*

**Here's what I can definitely help you with:**
• 👤 *"What is my name / profile?"* — Your saved details
• 📅 *"What should I study today?"* — Today's schedule
• 📊 *"Show my course plan"* — Full day-by-day roadmap
• 🎓 *"How do quizzes work?"* — Quiz modes & features
• ℹ️ *"What is YUKTARA?"* — Full app guide
• 💡 Ask about any **${profile.subject}** concept, topic, or paste a quiz question!

💪 Keep going, ${firstName} — your goal *"${profile.goal}"* is waiting!`;
}

function sendTutorMessage(text) {
  if (!text.trim()) return;
  state.chat.push({ role: "user", text, ts: Date.now() });

  const qLower = text.toLowerCase().trim();
  const asksMarathi = qLower.includes("marathi") || qLower.includes("मराठी") || qLower.includes("translate in marathi") || qLower.includes("in marathi");

  let reply = tutorRespond(text, state.ui.tutorTopicId, state.profile ? state.profile.level : "Beginner");
  let marathiReply = translateToMarathi(reply);

  // If user specifically asked for marathi, display marathi by default
  const activeLang = asksMarathi ? "mr" : "en";

  state.chat.push({
    role: "tutor",
    text: activeLang === "mr" ? marathiReply : reply,
    originalEn: reply,
    translatedMr: marathiReply,
    currentLang: activeLang,
    ts: Date.now()
  });

  saveState();
  render();

  const raf = window.requestAnimationFrame || (fn => setTimeout(fn, 0));
  raf(() => {
    const box = document.getElementById("chatScroll");
    if (box) box.scrollTop = box.scrollHeight;
  });
}

/* --------------------------------------------------------------------------
   Quiz Engine (Corrected MCQ Grading & Detailed Review Key)
   -------------------------------------------------------------------------- */
function startQuiz(topicId, mode = "practice", questionCount = 10) {
  const subject = getSubjectData(state.profile ? state.profile.subject : "");
  const topic = subject.topics.find(t => t.id === topicId);
  if (!topic) return;

  // Clamp question count between 5 and 20
  const count = Math.max(5, Math.min(20, Number(questionCount) || 10));

  // Shuffle and slice the MCQ pool to the requested count
  const allMcq = topic.quiz.mcq.slice();
  // Fisher-Yates shuffle for variety
  for (let i = allMcq.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allMcq[i], allMcq[j]] = [allMcq[j], allMcq[i]];
  }
  const selectedMcq = allMcq.slice(0, count).map((q, idx) => ({ ...q, id: `mcq-${idx}` }));

  // Dynamic time: 90 seconds per question (sufficient for analysis)
  const timedSeconds = count * 90;

  state.activeQuiz = {
    topicId: topic.id,
    topicName: topic.name,
    mcq: selectedMcq,
    short: topic.quiz.short.map((q, idx) => ({ ...q, id: `short-${idx}` })),
    answers: {},
    submitted: false,
    mode,
    questionCount: count,
    timeLeft: mode === "timed" ? timedSeconds : null,
    startedAt: new Date().toISOString()
  };

  _tabScrollPositions["quiz"] = 0;
  state.ui.quizTopicId = topicId;
  saveState();

  if (mode === "timed") startQuizTimer();
  render();
  requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "instant" }));
}

function startQuizTimer() {
  if (timerInterval) clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    if (!state.activeQuiz || state.activeQuiz.submitted) {
      clearInterval(timerInterval);
      return;
    }
    if (state.activeQuiz.timeLeft > 0) {
      state.activeQuiz.timeLeft--;
      const timerEl = document.getElementById("quizTimerDisplay");
      if (timerEl) {
        const mins = Math.floor(state.activeQuiz.timeLeft / 60);
        const secs = state.activeQuiz.timeLeft % 60;
        timerEl.textContent = `${mins}:${secs < 10 ? "0" : ""}${secs}`;
      }
    } else {
      clearInterval(timerInterval);
      alert("Time is up! Submitting your quiz now.");
      submitQuiz();
    }
  }, 1000);
}

function setQuizAnswer(qid, val) {
  if (!state.activeQuiz) return;
  state.activeQuiz.answers[qid] = val;
  saveState();
}

function gradeShortAnswer(answerText, keywords) {
  if (!answerText || answerText.trim().length < 2) {
    return { score: 0, matched: [], missed: keywords };
  }
  const text = answerText.toLowerCase();
  const matched = keywords.filter(k => text.includes(k.toLowerCase()));
  const missed = keywords.filter(k => !text.includes(k.toLowerCase()));

  let score = 0;
  if (matched.length >= 2 || (matched.length >= 1 && keywords.length === 1)) score = 1;
  else if (matched.length === 1) score = 0.75;
  else if (answerText.trim().split(/\s+/).length >= 8) score = 0.5;

  return { score, matched, missed };
}

function submitQuiz() {
  if (!state.activeQuiz || state.activeQuiz.submitted) return;
  if (timerInterval) clearInterval(timerInterval);

  let earned = 0;
  let total = 0;
  const questionReviews = [];

  state.activeQuiz.mcq.forEach(q => {
    total += 1;
    const userChoiceRaw = state.activeQuiz.answers[q.id];
    const userChoiceNum = (userChoiceRaw !== undefined && userChoiceRaw !== null && userChoiceRaw !== "") ? Number(userChoiceRaw) : null;
    const correctChoiceNum = Number(q.answer);

    const isCorrect = userChoiceNum !== null && userChoiceNum === correctChoiceNum;
    if (isCorrect) earned += 1;

    questionReviews.push({
      type: "mcq",
      q: q.q,
      userChoice: userChoiceNum,
      correctChoice: correctChoiceNum,
      options: q.options,
      isCorrect,
      explanation: q.explanation || "Correct choice aligns with core principles.",
      difficulty: q.difficulty || "Standard"
    });
  });

  state.activeQuiz.short.forEach(q => {
    total += 1;
    const userText = state.activeQuiz.answers[q.id] || "";
    const grading = gradeShortAnswer(userText, q.keywords);
    earned += grading.score;

    questionReviews.push({
      type: "short",
      q: q.q,
      userText,
      score: grading.score,
      matchedKeywords: grading.matched,
      missedKeywords: grading.missed,
      modelAnswer: q.modelAnswer || "A complete response addresses key structural components.",
      explanation: q.explanation || "Response evaluated based on keyword accuracy and conceptual clarity."
    });
  });

  const percent = total ? Math.round((earned / total) * 100) : 0;
  const attemptId = `attempt-${Date.now()}`;

  const attempt = {
    id: attemptId,
    topicId: state.activeQuiz.topicId,
    topicName: state.activeQuiz.topicName,
    score: earned,
    total,
    percent,
    date: new Date().toISOString(),
    reviews: questionReviews,
    mode: state.activeQuiz.mode
  };

  state.progress.quizAttempts.push(attempt);
  state.activeQuiz = null;
  state.ui.activeReviewAttemptId = attemptId;
  _tabScrollPositions["quiz"] = 0;
  saveState();
  render();
  requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "instant" }));

  // Asynchronously record quiz attempt in PostgreSQL database
  try {
    const curUser = state.auth && state.auth.currentUser;
    const userEmail = (curUser && curUser.email) || "anonymous";
    const userName = (curUser && curUser.fullName) || (state.profile && state.profile.name) || "Student";
    const subject = (state.profile && state.profile.subject) || "General Engineering";

    fetch("/api/quiz/attempt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userEmail,
        userName,
        subject,
        topicId: attempt.topicId,
        topicName: attempt.topicName,
        questionCount: attempt.total,
        score: attempt.score,
        percentage: attempt.percent,
        mode: attempt.mode || "practice",
        timeSpentSeconds: 0,
        answers: attempt.reviews || []
      })
    }).catch(err => console.warn("Quiz attempt DB sync warning:", err));
  } catch (e) {
    console.warn("Quiz submission DB sync error:", e);
  }
}

function exitQuiz() {
  if (timerInterval) clearInterval(timerInterval);
  state.activeQuiz = null;
  _tabScrollPositions["quiz"] = 0;
  saveState();
  render();
  requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "instant" }));
}

/* --------------------------------------------------------------------------
   UI Render Engine & Authentication Views
   -------------------------------------------------------------------------- */
const root = () => document.getElementById("app");

function renderAuthPage() {
  const isLogin = state.auth.mode === "login";

  return `
    <div class="auth-wrapper">
      <div class="auth-topbar">
        <button class="theme-toggle-btn" id="authThemeToggleBtn" style="border-radius:20px; padding:8px 16px;">
          <i class="fa-solid ${state.theme === "dark" ? "fa-sun" : "fa-moon"}"></i>
          Switch to ${state.theme === "dark" ? "Light" : "Dark"}
        </button>
      </div>

      <div class="auth-card">
        <div class="auth-brand">
          <div class="auth-brand-icon" id="authBrandIcon" title="YUKTARA" style="cursor:pointer; user-select:none;">
            <i class="fa-solid fa-graduation-cap"></i>
          </div>
          <h1 class="auth-brand-title">YUKTARA</h1>
          <p class="auth-brand-subtitle">Personalized Learning Assistant & Adaptive Tutor</p>
        </div>

        <div class="auth-tabs">
          <button type="button" class="auth-tab-btn ${isLogin ? "active" : ""}" id="tabLoginBtn">
            <i class="fa-solid fa-right-to-bracket"></i> Sign In
          </button>
          <button type="button" class="auth-tab-btn ${!isLogin ? "active" : ""}" id="tabRegisterBtn">
            <i class="fa-solid fa-user-plus"></i> Register
          </button>
        </div>

        ${isLogin && isHostDevice() ? `
          <div class="demo-credentials-box" style="display:flex; flex-direction:column; gap:8px;">
            <div style="display:flex; align-items:center; justify-content:space-between; gap:10px;">
              <div class="demo-credentials-info">
                <span class="demo-credentials-title"><i class="fa-solid fa-graduation-cap"></i> Student Demo:</span>
                <span class="demo-credentials-text">abc@gmail.com &bull; 123456</span>
              </div>
              <button type="button" class="demo-fill-btn" id="demoStudentBtn">
                <i class="fa-solid fa-wand-magic-sparkles"></i> Use Student
              </button>
            </div>
            <div style="display:flex; align-items:center; justify-content:space-between; gap:10px; border-top:1px dashed var(--border-color); padding-top:8px;">
              <div class="demo-credentials-info">
                <span class="demo-credentials-title" style="color:#ef4444;"><i class="fa-solid fa-shield-halved"></i> Admin Demo:</span>
                <span class="demo-credentials-text">admin@yuktara.edu &bull; admin123</span>
              </div>
              <button type="button" class="demo-fill-btn" id="demoAdminBtn" style="border-color:rgba(239,68,68,0.4); color:#ef4444;">
                <i class="fa-solid fa-key"></i> Use Admin
              </button>
            </div>
          </div>
        ` : ""}

        ${state.auth.error ? `
          <div class="auth-alert-box">
            <i class="fa-solid fa-triangle-exclamation"></i>
            <div>${escapeHtml(state.auth.error)}</div>
          </div>
        ` : ""}

        ${isLogin ? `
          <form id="loginForm">
            <div class="field">
              <label for="auth-email">Email Address</label>
              <input id="auth-email" type="email" placeholder="e.g. abc@gmail.com" required autocomplete="username" />
            </div>

            <div class="field">
              <label for="auth-password">Password</label>
              <input id="auth-password" type="password" placeholder="••••••••" required autocomplete="current-password" />
            </div>

            <button type="submit" class="btn-primary" style="width:100%; margin-top:8px; padding:12px;">
              <i class="fa-solid fa-right-to-bracket"></i> Sign In to YUKTARA
            </button>

            <div class="auth-switch-prompt">
              Don't have an account? 
              <button type="button" class="auth-switch-link" id="switchToRegisterBtn">Register here</button>
            </div>
          </form>
        ` : `
          <form id="registerForm">
            <div class="field">
              <label for="reg-name">Full Name</label>
              <input id="reg-name" type="text" placeholder="e.g. Kunal Dange" required autocomplete="name" />
            </div>

            <div class="field">
              <label for="reg-email">Email Address</label>
              <input id="reg-email" type="email" placeholder="e.g. kunal@example.com" required autocomplete="email" />
            </div>

            <div class="field">
              <label for="reg-password">Password</label>
              <input id="reg-password" type="password" placeholder="Minimum 6 characters" minlength="6" required autocomplete="new-password" />
            </div>

            <div class="field">
              <label for="reg-confirm">Confirm Password</label>
              <input id="reg-confirm" type="password" placeholder="Re-enter your password" minlength="6" required autocomplete="new-password" />
            </div>

            <button type="submit" class="btn-primary" style="width:100%; margin-top:8px; padding:12px;">
              <i class="fa-solid fa-user-plus"></i> Create Account & Continue
            </button>

            <div class="auth-switch-prompt">
              Already have an account? 
              <button type="button" class="auth-switch-link" id="switchToLoginBtn">Sign in here</button>
            </div>
          </form>
        `}
      </div>
    </div>
  `;
}

function attachAuthHandlers() {
  const themeBtn = document.getElementById("authThemeToggleBtn");
  if (themeBtn) themeBtn.addEventListener("click", toggleTheme);

  // Secret 3-click authorization toggle on YUKTARA brand icon
  let logoClicks = 0;
  let logoTimer = null;
  const brandIcon = document.getElementById("authBrandIcon");
  if (brandIcon) {
    brandIcon.addEventListener("click", () => {
      logoClicks++;
      clearTimeout(logoTimer);
      logoTimer = setTimeout(() => { logoClicks = 0; }, 1500);
      if (logoClicks >= 3) {
        logoClicks = 0;
        const current = localStorage.getItem("yuktara_host_device") === "true";
        if (current) {
          localStorage.removeItem("yuktara_host_device");
          state.auth.error = "Host device authorization disabled.";
        } else {
          localStorage.setItem("yuktara_host_device", "true");
          state.auth.error = null;
        }
        render();
      }
    });
  }

  const tabLoginBtn = document.getElementById("tabLoginBtn");
  if (tabLoginBtn) {
    tabLoginBtn.addEventListener("click", () => {
      state.auth.mode = "login";
      state.auth.error = null;
      render();
    });
  }

  const tabRegisterBtn = document.getElementById("tabRegisterBtn");
  if (tabRegisterBtn) {
    tabRegisterBtn.addEventListener("click", () => {
      state.auth.mode = "register";
      state.auth.error = null;
      render();
    });
  }

  const switchToRegisterBtn = document.getElementById("switchToRegisterBtn");
  if (switchToRegisterBtn) {
    switchToRegisterBtn.addEventListener("click", () => {
      state.auth.mode = "register";
      state.auth.error = null;
      render();
    });
  }

  const switchToLoginBtn = document.getElementById("switchToLoginBtn");
  if (switchToLoginBtn) {
    switchToLoginBtn.addEventListener("click", () => {
      state.auth.mode = "login";
      state.auth.error = null;
      render();
    });
  }

  const demoStudentBtn = document.getElementById("demoStudentBtn");
  if (demoStudentBtn) {
    demoStudentBtn.addEventListener("click", () => {
      if (!isHostDevice()) return;
      const emailInput = document.getElementById("auth-email");
      const passInput = document.getElementById("auth-password");
      if (emailInput && passInput) {
        emailInput.value = "abc@gmail.com";
        passInput.value = "123456";
        const form = document.getElementById("loginForm");
        if (form && typeof form.requestSubmit === "function") {
          form.requestSubmit();
        } else if (form) {
          form.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
        }
      }
    });
  }

  const demoAdminBtn = document.getElementById("demoAdminBtn");
  if (demoAdminBtn) {
    demoAdminBtn.addEventListener("click", () => {
      if (!isHostDevice()) return;
      const emailInput = document.getElementById("auth-email");
      const passInput = document.getElementById("auth-password");
      if (emailInput && passInput) {
        emailInput.value = "admin@yuktara.edu";
        passInput.value = "admin123";
        const form = document.getElementById("loginForm");
        if (form && typeof form.requestSubmit === "function") {
          form.requestSubmit();
        } else if (form) {
          form.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
        }
      }
    });
  }

  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("auth-email").value.trim().toLowerCase();
      const password = document.getElementById("auth-password").value;

      // Restrict demo and admin logins to the authorized host device
      if (!isHostDevice() && (email === "abc@gmail.com" || email === "admin@yuktara.edu")) {
        state.auth.error = "Demo accounts are restricted to the authorized host device. Please sign in with your registered account or create a new one.";
        render();
        return;
      }

      // UI feedback: Disable submit button and show authentication spinner
      const submitBtn = loginForm.querySelector("button[type='submit']");
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Authenticating...`;
      }

      // Authenticate against the backend API → PostgreSQL (single source of truth)
      try {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password })
        });

        if (res.status === 404) {
          // Running on a static host (e.g. Netlify) without a Node backend — show clear message
          state.auth.error = "The YUKTARA backend server is not running. Please start the Node.js server (npm start) to use this application.";
          render();
          return;
        }

        const data = await res.json().catch(() => ({}));
        if (res.ok && data.success && data.user) {
          // Authenticated successfully via PostgreSQL
          state.auth.currentUser = {
            id: data.user.id,
            fullName: data.user.fullName,
            email: data.user.email,
            role: data.user.role || "student"
          };
          state.auth.error = null;
          if (state.profile && !state.profile.name) {
            state.profile.name = data.user.fullName;
          }
          // Direct admin to backend explorer, student to dashboard
          state.ui.page = (state.auth.currentUser.role === "admin") ? "backend" : "dashboard";
          saveState();
          render();
          return;
        } else if (res.status === 401 || res.status === 403) {
          state.auth.error = data.error || "Invalid email or password. Please verify your credentials.";
          render();
          return;
        } else {
          state.auth.error = data.error || `Sign in failed (Server HTTP ${res.status}). Please try again.`;
          render();
          return;
        }
      } catch (err) {
        // Network error — backend is not reachable
        console.error("[AUTH] Login failed — backend unreachable:", err);
        state.auth.error = "Cannot connect to the YUKTARA backend server. Please ensure the Node.js server is running (npm start) and try again.";
        render();
      }
    });
  }

  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const nameInput = document.getElementById("reg-name");
      const emailInput = document.getElementById("reg-email");
      const passInput = document.getElementById("reg-password");
      const confirmInput = document.getElementById("reg-confirm");

      const fullName = (nameInput ? nameInput.value : "").trim();
      const email = (emailInput ? emailInput.value : "").trim().toLowerCase();
      const password = passInput ? passInput.value : "";
      const confirmPassword = confirmInput ? confirmInput.value : "";

      if (!fullName || !email || !password || !confirmPassword) {
        state.auth.error = "Please fill in all registration fields.";
        render();
        return;
      }

      if (fullName.length < 2) {
        state.auth.error = "Full Name must be at least 2 characters long.";
        render();
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        state.auth.error = "Please provide a valid email address (e.g. scholar@example.com).";
        render();
        return;
      }

      if (password.length < 6) {
        state.auth.error = "Password must be at least 6 characters long.";
        render();
        return;
      }

      if (password !== confirmPassword) {
        state.auth.error = "Passwords do not match. Please verify and re-enter.";
        render();
        return;
      }

      // UI feedback: Disable submit button and display active registration spinner
      const submitBtn = registerForm.querySelector("button[type='submit']");
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Registering Account...`;
      }

      // Register user via backend API → INSERT into PostgreSQL (single source of truth)
      try {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fullName, email, password })
        });

        if (res.status === 404) {
          // No Node.js backend running — cannot create accounts
          state.auth.error = "The YUKTARA backend server is not running. Please start the Node.js server (npm start) or deploy to Netlify. Accounts are stored in PostgreSQL.";
          render();
          return;
        }

        const data = await res.json().catch(() => ({}));

        if (res.status === 201 && data.success && data.user) {
          // PostgreSQL registration confirmed — set session from the database-returned user record
          state.auth.currentUser = {
            id: data.user.id,
            fullName: data.user.fullName,
            email: data.user.email,
            role: data.user.role || "student",
            createdAt: data.user.createdAt
          };
          state.auth.error = null;
          state.auth.mode = "login";

          if (state.profile) {
            state.profile.name = data.user.fullName;
          }

          // Direct newly registered student to dashboard
          state.ui.page = "dashboard";
          saveState();
          render();
          return;
        }

        if (res.status === 409) {
          state.auth.error = data.error || "An account with this email address already exists in the database. Please sign in instead.";
          render();
          return;
        }

        if (res.status === 400) {
          state.auth.error = data.error || "Invalid registration information. Please check your inputs.";
          render();
          return;
        }

        state.auth.error = data.error || `Database registration failed (HTTP ${res.status}). Please try again.`;
        render();
      } catch (err) {
        // Network error — backend is not reachable
        console.error("[AUTH] Registration failed — backend unreachable:", err);
        state.auth.error = "Cannot connect to the YUKTARA backend server. Please ensure the Node.js server is running (npm start) or the site is deployed to Netlify. Accounts are stored in PostgreSQL.";
        render();
      }
    });
  }
}

function render() {
  document.documentElement.setAttribute("data-theme", state.theme);

  // Authentication Guard: If no logged in user, render Auth Page
  if (!state.auth || !state.auth.currentUser) {
    root().innerHTML = renderAuthPage();
    attachAuthHandlers();
    return;
  }

  const page = state.ui.page;

  let html = `<div class="app-shell">${renderSidebar(page)}<main class="main-content">`;

  if (!state.profile && page !== "dashboard") {
    html += renderNoProfileNotice();
  } else if (!state.profile || state.ui.editingProfile) {
    html += renderProfileForm();
  } else {
    switch (page) {
      case "dashboard": html += renderDashboard(); break;
      case "plan": html += renderPlan(); break;
      case "tutor": html += renderTutor(); break;
      case "quiz": html += renderQuiz(); break;
      case "progress": html += renderProgress(); break;
      case "backend":
        if (isAdmin()) {
          html += renderBackendDataView();
        } else {
          state.ui.page = "dashboard";
          saveState();
          html += renderDashboard();
        }
        break;
      default: html += renderDashboard();
    }
  }

  html += `</main></div>`;
  root().innerHTML = html;
  attachHandlers();
}

function renderSidebar(activePage) {
  const student = state.profile;
  const user = state.auth ? state.auth.currentUser : null;
  const displayName = user ? user.fullName : (student ? student.name : "Welcome Student");
  const displayEmail = user ? user.email : "";

  return `
    <aside class="sidebar">
      <div class="brand">
        <div class="brand-icon"><i class="fa-solid fa-graduation-cap"></i></div>
        <div class="brand-name">YUKTARA</div>
      </div>

      <div class="sidebar-student">
        <div class="sidebar-student-name">
          ${escapeHtml(displayName)}
          ${isAdmin() ? `<span class="pill pill-high" style="font-size:0.65rem; margin-left:6px; vertical-align:middle; text-transform:uppercase;">Admin</span>` : ""}
        </div>
        ${displayEmail ? `<div class="sidebar-student-email">${escapeHtml(displayEmail)}</div>` : ""}
        ${student && student.subject ? `<div class="sidebar-student-meta">${escapeHtml(student.subject)} · ${student.level}</div>` : ""}
      </div>

      <nav class="nav">
        ${NAV_ITEMS.filter(item => !item.adminOnly || isAdmin()).map(item => `
          <button class="nav-item ${item.id === activePage ? "active" : ""}" data-nav="${item.id}">
            <i class="${item.icon}"></i> ${item.label}
          </button>
        `).join("")}
      </nav>

      <div class="sidebar-footer">
        <button class="theme-toggle-btn" id="themeToggleBtn">
          <i class="fa-solid ${state.theme === "dark" ? "fa-sun" : "fa-moon"}"></i>
          Switch to ${state.theme === "dark" ? "Light" : "Dark"} Mode
        </button>
        <button class="logout-btn" id="logoutBtn">
          <i class="fa-solid fa-right-from-bracket"></i> Logout
        </button>
        <button class="reset-btn" id="resetBtn">
          <i class="fa-solid fa-trash-can"></i> Reset All Data
        </button>
      </div>
    </aside>`;
}

function renderNoProfileNotice() {
  return `
    <div class="card" style="text-align:center; padding: 60px 40px;">
      <h2>Setup Your Profile First</h2>
      <p class="page-sub" style="margin-bottom: 24px;">Please complete your student profile on the dashboard to unlock YUKTARA learning plan and quiz system.</p>
      <button class="btn-primary" data-nav="dashboard">Go to Dashboard</button>
    </div>`;
}

function renderProfileForm(errorMsg = null) {
  const todayStr = formatYMD(new Date());
  const cur = state.profile || {};
  const userName = (state.auth && state.auth.currentUser && state.auth.currentUser.fullName) || cur.name || "Student";
  const userEmail = (state.auth && state.auth.currentUser && state.auth.currentUser.email) || "";

  return `
    <section class="page">
      <header class="page-header">
        <h1>${cur.subject ? "Edit Your Learning Plan" : "Welcome, " + escapeHtml(userName)}</h1>
        <p class="page-sub">${cur.subject ? "Update your personal study goals, expertise level, or target completion date." : "Configure your personal study goals, expertise level, and target completion date."}</p>
      </header>

      <div class="auth-user-badge">
        <i class="fa-solid fa-circle-user"></i>
        <span>Student: <strong>${escapeHtml(userName)}</strong> ${userEmail ? `(${escapeHtml(userEmail)})` : ""}</span>
      </div>

      ${errorMsg ? `
        <div class="card" style="background:var(--danger-bg); border-color:var(--danger); color:var(--danger); margin-bottom:20px; padding:16px;">
          <i class="fa-solid fa-triangle-exclamation"></i> <strong>Date Error:</strong> ${escapeHtml(errorMsg)}
        </div>
      ` : ""}

      <form id="profileForm" class="card form-card">
        <div class="field">
          <label for="f-subject">Subject or Topic</label>
          <input id="f-subject" type="text" list="subjectSuggestions" placeholder="e.g. Python Programming" value="${escapeHtml(cur.subject || "")}" required />
          <datalist id="subjectSuggestions">
            ${SUBJECT_SUGGESTIONS.map(s => `<option value="${s}"></option>`).join("")}
          </datalist>
        </div>

        <div class="field-row">
          <div class="field">
            <label for="f-level">Current Knowledge Level</label>
            <select id="f-level" required>
              <option value="Beginner" ${cur.level === "Beginner" ? "selected" : ""}>Beginner</option>
              <option value="Intermediate" ${cur.level === "Intermediate" ? "selected" : ""}>Intermediate</option>
              <option value="Advanced" ${cur.level === "Advanced" ? "selected" : ""}>Advanced</option>
            </select>
          </div>
          <div class="field">
            <label for="f-time">Daily Study Time (Minutes)</label>
            <input id="f-time" type="number" min="15" step="5" value="${cur.studyTime || 45}" required />
          </div>
        </div>

        <div class="field">
          <label for="f-goal">Learning Goal</label>
          <input id="f-goal" type="text" placeholder="e.g. Pass exam / Build portfolio project" value="${escapeHtml(cur.goal || "")}" required />
        </div>

        <div class="field">
          <label for="f-date">Target Completion Date</label>
          <input id="f-date" type="date" min="${todayStr}" value="${cur.targetDate || ""}" required />
          <span class="field-hint">Select today or a future date for your target completion.</span>
        </div>

        <div style="display:flex; gap:12px; margin-top:10px;">
          <button type="submit" class="btn-primary" style="flex:1;">
            <i class="fa-solid fa-rocket"></i> ${cur.subject ? "Update YUKTARA Learning Plan" : "Create My YUKTARA Learning Plan"}
          </button>
          ${cur.subject ? `<button type="button" class="btn-secondary" id="cancelEditProfileBtn">Cancel</button>` : ""}
        </div>
      </form>
    </section>`;
}

function renderDashboard() {
  const stats = getOverallStats();
  const p = state.profile;
  const todayStr = formatYMD(new Date());
  const subject = getSubjectData(p.subject);

  const todayItems = state.plan.filter(i => i.date === todayStr);
  const nextItems = todayItems.length ? todayItems : state.plan.filter(i => !i.done).slice(0, 4);

  // Group completed subtopics by unit
  const unitsSummary = subject.topics.map(t => {
    const total = t.subtopics.length;
    const completed = t.subtopics.filter(st => state.progress.completedSubtopics[`${t.id}::${st}`]).length;
    const pct = total ? Math.round((completed / total) * 100) : 0;
    return { ...t, total, completed, pct };
  });

  return `
    <section class="page">
      <header class="page-header">
        <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:12px;">
          <div>
            <h1>Welcome back, ${escapeHtml(p.name.split(" ")[0])}!</h1>
            <p class="page-sub">${escapeHtml(p.subject)} · ${p.level} Level · ${p.studyTime} min/day · Target: ${formatDate(p.targetDate)} (${stats.daysCount} Active Days)</p>
          </div>
          <button class="btn-secondary" id="editProfileBtn"><i class="fa-solid fa-pen"></i> Edit Profile</button>
        </div>
      </header>

      <!-- Academic Curriculum & Quick Subject Switcher Banner -->
      <div class="subject-switcher-banner">
        <div>
          <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px; flex-wrap:wrap;">
            <span class="subject-badge-pill">${escapeHtml(subject.courseCode || "CURRICULUM")}</span>
            ${subject.semester ? `<span class="unit-tag" style="font-size:0.7rem;">${escapeHtml(subject.semester)}</span>` : ""}
            <strong style="color:var(--text-main); font-size:1rem;">${escapeHtml(subject.displayName)}</strong>
          </div>
          <p style="margin:0; font-size:0.82rem; color:var(--text-muted);">
            Official SPPU / SNJB Autonomous Syllabus · ${subject.topics.length} Academic Units
          </p>
        </div>
        <div class="subject-quick-select">
          ${SUBJECT_SUGGESTIONS.map(s => {
    const normalize = str => str.toLowerCase().replace(/&/g, "and").replace(/\s+/g, " ").trim();
    const isActive = normalize(s) === normalize(p.subject);
    return `<button class="subject-quick-btn ${isActive ? "active" : ""}" data-switch-subject="${escapeHtml(s)}">${escapeHtml(s)}</button>`;
  }).join("")}
        </div>
      </div>

      <div class="stat-grid">
        <div class="stat-card">
          <div class="stat-icon"><i class="fa-solid fa-circle-check"></i></div>
          <div>
            <div class="stat-value">${stats.percentComplete}%</div>
            <div class="stat-label">Plan Completed</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon"><i class="fa-solid fa-list-check"></i></div>
          <div>
            <div class="stat-value">${stats.completed} / ${stats.totalSubtopics}</div>
            <div class="stat-label">Subtopics Done</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon"><i class="fa-solid fa-award"></i></div>
          <div>
            <div class="stat-value">${stats.avgScore !== null ? stats.avgScore + "%" : "—"}</div>
            <div class="stat-label">Average Quiz Score</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon"><i class="fa-solid fa-clock"></i></div>
          <div>
            <div class="stat-value">${p.studyTime} Mins</div>
            <div class="stat-label">Daily Study Target</div>
          </div>
        </div>
      </div>

      <!-- Syllabus Units Progress Overview -->
      <div class="card" style="margin-bottom:24px;">
        <div class="card-title">
          <span><i class="fa-solid fa-book-bookmark" style="color:var(--accent);"></i> Academic Syllabus Units (${subject.topics.length} Units)</span>
          <button class="btn-secondary" data-nav="plan" style="padding:6px 14px; font-size:0.85rem;">
            <i class="fa-solid fa-magnifying-glass"></i> Explore Syllabus & Search
          </button>
        </div>
        <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(280px, 1fr)); gap:12px; margin-top:8px;">
          ${unitsSummary.map(u => `
            <div class="card" style="padding:12px 14px; background:var(--bg-elevated); border:1px solid var(--border-color); display:flex; flex-direction:column; gap:6px;">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <span style="font-size:0.85rem; font-weight:700; color:var(--text-main);">${escapeHtml(u.name.split(":")[0])}</span>
                <span class="pill ${pillClass(u.pct)}" style="font-size:0.75rem;">${u.pct}%</span>
              </div>
              <div style="font-size:0.8rem; color:var(--text-muted); text-overflow:ellipsis; overflow:hidden; white-space:nowrap;">
                ${escapeHtml(u.name.includes(":") ? u.name.split(":")[1].trim() : u.name)}
              </div>
              <div style="width:100%; height:4px; background:rgba(255,255,255,0.08); border-radius:2px; overflow:hidden; margin-top:4px;">
                <div style="width:${u.pct}%; height:100%; background:var(--primary); transition:width 0.3s ease;"></div>
              </div>
            </div>
          `).join("")}
        </div>
      </div>

      <div class="dash-grid">
        <div class="card">
          <div class="card-title">
            <span><i class="fa-solid fa-bullseye" style="color:var(--primary);"></i> Today's Study Focus (${formatDate(todayStr)})</span>
            <button class="btn-secondary" data-nav="plan" style="padding:6px 14px; font-size:0.85rem;">View Full Plan</button>
          </div>
          ${nextItems.length ? `
            <ul class="focus-list">
              ${nextItems.map(i => `
                <li class="focus-item ${i.done ? "done" : ""}">
                  <div>
                    <span class="focus-topic">${escapeHtml(i.topicName)}</span>
                    <span class="focus-subtopic">${escapeHtml(i.subtopic)}</span>
                  </div>
                  <span class="focus-badge">Day ${i.day} (${formatDate(i.date)}) · ${i.minutes}m</span>
                </li>
              `).join("")}
            </ul>
          ` : `<p class="page-sub">All subtopics completed! Check your learning plan for review options.</p>`}
        </div>

        <div class="card">
          <div class="card-title">
            <span><i class="fa-solid fa-fire" style="color:var(--danger);"></i> Weak Topics Alert</span>
          </div>
          ${stats.weakTopics.length ? `
            <ul class="weak-list">
              ${stats.weakTopics.map(w => `
                <li class="weak-item">
                  <span>${escapeHtml(w.topicName)}</span>
                  <span class="pill pill-low">${w.percent}%</span>
                </li>
              `).join("")}
            </ul>
            <button class="btn-primary" data-nav="tutor" style="width:100%; margin-top:12px;">
              <i class="fa-solid fa-robot"></i> Revise Weak Topics with YuktaraAI
            </button>
          ` : `<p class="page-sub">No weak topics! Excellent work maintaining high quiz mastery.</p>`}
        </div>
      </div>
    </section>`;
}

function renderPlan() {
  const subject = getSubjectData(state.profile ? state.profile.subject : "");
  const search = (state.ui.syllabusSearch || "").trim().toLowerCase();
  const unitFilter = state.ui.syllabusUnitFilter || "all";
  const viewMode = state.ui.planViewMode || "schedule";

  // Days grouping for schedule view
  const byDay = {};
  state.plan.forEach(item => {
    byDay[item.day] = byDay[item.day] || [];
    byDay[item.day].push(item);
  });
  const days = Object.keys(byDay).map(Number).sort((a, b) => a - b);
  const totalDays = days.length;

  // Filter for schedule view
  const filteredDays = days.map(day => {
    const items = byDay[day];
    const matchingItems = items.filter(i => {
      const matchUnit = unitFilter === "all" || i.topicName.toLowerCase().includes("unit " + unitFilter);
      const matchSearch = !search || i.topicName.toLowerCase().includes(search) || i.subtopic.toLowerCase().includes(search);
      return matchUnit && matchSearch;
    });
    return { day, items: matchingItems, originalCount: items.length, date: items[0].date };
  }).filter(d => d.items.length > 0);

  // Filter for syllabus explorer view
  const filteredTopics = subject.topics.filter(t => {
    const matchUnit = unitFilter === "all" || (t.unitNumber && String(t.unitNumber) === unitFilter) || t.name.toLowerCase().includes("unit " + unitFilter);
    const matchSearch = !search ||
      t.name.toLowerCase().includes(search) ||
      t.subtopics.some(st => st.toLowerCase().includes(search)) ||
      (t.caseStudy && t.caseStudy.toLowerCase().includes(search)) ||
      (t.formulas && t.formulas.some(f => f.toLowerCase().includes(search)));
    return matchUnit && matchSearch;
  });

  return `
    <section class="page">
      <header class="page-header">
        <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:12px;">
          <div>
            <h1>${viewMode === "syllabus" ? "Syllabus & Units Explorer" : "Personalized Study Plan"}</h1>
            <p class="page-sub">
              ${escapeHtml(subject.displayName)} ${subject.courseCode ? `(${escapeHtml(subject.courseCode)})` : ""} · 
              Daily Goal: <strong>${state.profile.studyTime} Mins/Day</strong> · Target: <strong>${formatDate(state.profile.targetDate)}</strong> (${totalDays} Days)
            </p>
          </div>
          <div class="view-mode-toggle">
            <button class="view-mode-btn ${viewMode === "schedule" ? "active" : ""}" data-plan-view="schedule">
              <i class="fa-solid fa-calendar-days"></i> Daily Schedule
            </button>
            <button class="view-mode-btn ${viewMode === "syllabus" ? "active" : ""}" data-plan-view="syllabus">
              <i class="fa-solid fa-book-open"></i> Syllabus Explorer (${subject.topics.length} Units)
            </button>
          </div>
        </div>
      </header>

      <!-- Syllabus Search & Filtering Toolbar -->
      <div class="syllabus-toolbar">
        <div class="syllabus-search-row">
          <div class="syllabus-search-box">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input 
              id="syllabusSearchInput" 
              type="text" 
              placeholder="Search topics, subtopics, concepts or keywords (e.g. Stack, BCNF, Dijkstra, CRC)..." 
              value="${escapeHtml(state.ui.syllabusSearch || "")}" 
            />
          </div>
          ${search || unitFilter !== "all" ? `
            <button class="btn-secondary" id="clearSyllabusFilterBtn" style="padding:8px 14px; font-size:0.85rem;">
              <i class="fa-solid fa-xmark"></i> Clear Filters
            </button>
          ` : ""}
        </div>

        <div class="unit-filter-pills">
          <button class="unit-filter-pill ${unitFilter === "all" ? "active" : ""}" data-unit-filter="all">All Units (${subject.topics.length})</button>
          ${subject.topics.map((t, idx) => {
    const uNum = String(t.unitNumber || idx + 1);
    return `<button class="unit-filter-pill ${unitFilter === uNum ? "active" : ""}" data-unit-filter="${uNum}">Unit ${uNum}</button>`;
  }).join("")}
        </div>
      </div>

      ${viewMode === "schedule" ? `
        <!-- Day-by-Day Schedule View -->
        ${filteredDays.length === 0 ? `
          <div class="card" style="text-align:center; padding: 50px 20px;">
            <i class="fa-solid fa-filter" style="font-size:2rem; color:var(--text-dim); margin-bottom:12px;"></i>
            <h3>No scheduled items matched your search</h3>
            <p class="page-sub" style="margin-bottom:16px;">Try adjusting your search terms or clearing the unit filter.</p>
            <button class="btn-primary" id="clearSyllabusFilterBtn">Reset Filters</button>
          </div>
        ` : `
          <div class="plan-days">
            ${filteredDays.map(d => {
    const items = d.items;
    const allDone = items.every(i => i.done);
    return `
                <div class="plan-day ${allDone ? "complete" : ""}">
                  <div class="plan-day-head">
                    <span class="plan-day-title">Day ${d.day}</span>
                    <span class="plan-day-date">${formatDate(d.date)} · ${items.reduce((s, i) => s + i.minutes, 0)} mins</span>
                  </div>
                  <ul class="plan-items">
                    ${items.map(i => `
                      <li class="plan-item ${i.done ? "done" : ""}">
                        <label>
                          <input type="checkbox" data-toggle-subtopic data-topic="${encodeURIComponent(i.topicId)}" data-subtopic="${encodeURIComponent(i.subtopic)}" ${i.done ? "checked" : ""} />
                          <div>
                            <span class="plan-item-topic">${escapeHtml(i.topicName)}</span>
                            <span class="plan-item-subtopic">${escapeHtml(i.subtopic)}</span>
                          </div>
                        </label>
                        <span class="focus-badge">${i.minutes}m</span>
                      </li>
                    `).join("")}
                  </ul>
                </div>`;
  }).join("")}
          </div>
        `}
      ` : `
        <!-- Syllabus & Units Explorer View -->
        ${filteredTopics.length === 0 ? `
          <div class="card" style="text-align:center; padding: 50px 20px;">
            <i class="fa-solid fa-book-open" style="font-size:2rem; color:var(--text-dim); margin-bottom:12px;"></i>
            <h3>No syllabus units matched your search</h3>
            <p class="page-sub" style="margin-bottom:16px;">Try searching for a different keyword or view all units.</p>
            <button class="btn-primary" id="clearSyllabusFilterBtn">View All Units</button>
          </div>
        ` : `
          <div class="syllabus-unit-grid">
            ${filteredTopics.map((t, idx) => {
    const uNum = t.unitNumber || (idx + 1);
    const completedCount = t.subtopics.filter(st => state.progress.completedSubtopics[`${t.id}::${st}`]).length;
    const pct = t.subtopics.length ? Math.round((completedCount / t.subtopics.length) * 100) : 0;
    const lvl = (state.profile.level || "Beginner").toLowerCase();
    const exp = (t.explanation && (t.explanation[lvl] || t.explanation.beginner)) || "";

    return `
                <div class="card syllabus-unit-card">
                  <div class="unit-header-meta">
                    <span class="unit-tag"><i class="fa-solid fa-layer-group"></i> Unit ${uNum} ${t.hours ? `· ${t.hours} Hours` : ""}</span>
                    <span class="pill ${pillClass(pct)}">${completedCount}/${t.subtopics.length} Done (${pct}%)</span>
                  </div>

                  <h3 style="margin:0; font-size:1.15rem; color:var(--text-main);">${escapeHtml(t.name)}</h3>

                  <p style="margin:0; font-size:0.86rem; color:var(--text-muted); line-height:1.5;">
                    ${escapeHtml(exp)}
                  </p>

                  ${t.caseStudy ? `
                    <div class="case-study-box">
                      <strong><i class="fa-solid fa-lightbulb"></i> Syllabus Case Study:</strong><br/>
                      ${escapeHtml(t.caseStudy)}
                    </div>
                  ` : ""}

                  <div>
                    <strong style="font-size:0.82rem; color:var(--text-main); display:block; margin-bottom:6px;">
                      Core Subtopics Checklist:
                    </strong>
                    <ul class="plan-items" style="margin:0; gap:6px;">
                      ${t.subtopics.map(st => {
      const isDone = !!state.progress.completedSubtopics[`${t.id}::${st}`];
      return `
                          <li class="plan-item ${isDone ? "done" : ""}" style="padding:6px 10px;">
                            <label style="font-size:0.83rem;">
                              <input type="checkbox" data-toggle-subtopic data-topic="${encodeURIComponent(t.id)}" data-subtopic="${encodeURIComponent(st)}" ${isDone ? "checked" : ""} />
                              <span>${escapeHtml(st)}</span>
                            </label>
                          </li>
                        `;
    }).join("")}
                    </ul>
                  </div>

                  ${t.formulas && t.formulas.length ? `
                    <div>
                      <strong style="font-size:0.82rem; color:var(--text-main); display:block; margin-bottom:6px;">
                        <i class="fa-solid fa-square-root-variable"></i> Key Formulas & Bounds:
                      </strong>
                      <div class="formulas-list">
                        ${t.formulas.map(f => `<span class="formula-tag">${escapeHtml(f)}</span>`).join("")}
                      </div>
                    </div>
                  ` : ""}

                  ${t.vivaQuestions && t.vivaQuestions.length ? `
                    <details class="viva-details">
                      <summary class="viva-toggle">
                        <i class="fa-solid fa-clipboard-question"></i> Viva & Oral Exam Questions (${t.vivaQuestions.length})
                      </summary>
                      <div class="viva-content">
                        ${t.vivaQuestions.map((vq, vIdx) => `
                          <div class="viva-item">
                            <div class="viva-q">Q${vIdx + 1}: ${escapeHtml(vq.q)}</div>
                            <div class="viva-a">A: ${escapeHtml(vq.a)}</div>
                          </div>
                        `).join("")}
                      </div>
                    </details>
                  ` : ""}

                  <div style="display:flex; gap:8px; margin-top:auto; padding-top:10px; border-top:1px solid var(--border-color); flex-wrap:wrap;">
                    <button class="btn-secondary" data-ask-tutor-topic="${t.id}" style="flex:1; font-size:0.82rem; padding:8px 10px;">
                      <i class="fa-solid fa-robot"></i> Ask Tutor
                    </button>
                    <button class="btn-primary" data-start-quiz="${t.id}" data-quiz-mode="practice" style="flex:1; font-size:0.82rem; padding:8px 10px;">
                      <i class="fa-solid fa-play"></i> 5 MCQs Quiz
                    </button>
                  </div>
                </div>
              `;
  }).join("")}
          </div>
        `}
      `}
    </section>`;
}

function renderTutor() {
  const subject = getSubjectData(state.profile ? state.profile.subject : "");
  const selectedId = state.ui.tutorTopicId || "";

  return `
    <section class="page">
      <header class="page-header">
        <h1>YuktaraAI</h1>
        <p class="page-sub">Your personal AI tutor — level-adjusted explanations (${state.profile.level} level)</p>
      </header>

      <div class="card tutor-card">
        <div class="chat-scroll" id="chatScroll">
          ${state.chat.length ? state.chat.map((m, msgIdx) => `
            <div class="chat-msg chat-${m.role}">
              <div class="chat-avatar"><i class="fa-solid ${m.role === "user" ? "fa-user" : "fa-robot"}"></i></div>
              <div class="chat-bubble-container">
                <div class="chat-bubble">${formatMarkdown(m.text)}</div>
                ${m.role === "tutor" ? `
                  <div class="chat-actions">
                    <div class="msg-menu-wrap">
                      <button class="msg-more-btn" data-toggle-msg-menu="${msgIdx}" title="Translate options">
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                      </button>
                      <div class="msg-dropdown" id="msgMenu-${msgIdx}">
                        <div class="msg-dropdown-header"><i class="fa-solid fa-language"></i> Translate / भाषांतर</div>
                        <button class="msg-dropdown-item ${m.currentLang === "en" || !m.currentLang ? "active" : ""}" data-translate-msg="${msgIdx}" data-lang="en">
                          English
                        </button>
                        <button class="msg-dropdown-item ${m.currentLang === "mr" ? "active" : ""}" data-translate-msg="${msgIdx}" data-lang="mr">
                          मराठी (Marathi)
                        </button>
                      </div>
                    </div>
                  </div>
                ` : ""}
              </div>
            </div>
          `).join("") : `
            <div class="page-sub" style="text-align:center; padding: 32px 16px;">
              <div style="font-size:2rem; margin-bottom:8px;">🤖</div>
              <h3 style="color:var(--text-main); margin-bottom:6px; font-size:1.15rem;">Hello ${escapeHtml(state.profile ? state.profile.name.split(" ")[0] : "Student")}! I am YuktaraAI.</h3>
              <p style="font-size:0.92rem; max-width:560px; margin:0 auto 12px; line-height:1.5;">I have full active memory of your profile, dates, course plan, today's schedule, and all features of YUKTARA. Ask me anything or tap the quick chips below!</p>
            </div>
          `}
        </div>

        <div class="chat-suggestions">
          <button class="suggestion-chip" data-send-text="What should I study today?">📅 Today's Plan</button>
          <button class="suggestion-chip" data-send-text="Show my course plan and how many days are scheduled">📊 Course Days & Plan</button>
          <button class="suggestion-chip" data-send-text="What is my profile and goal?">👤 My Profile & Goal</button>
          <button class="suggestion-chip" data-send-text="मराठीमध्ये सांगा (Explain in Marathi)">🇮🇳 मराठीमध्ये सांगा</button>
          <button class="suggestion-chip" data-send-text="What is YUKTARA and what features does this app have?">ℹ️ About YUKTARA App</button>
          <button class="suggestion-chip" data-send-text="Explain this simply with a real-world analogy">💡 Explain simply</button>
          <button class="suggestion-chip" data-send-text="Give me a practical code example for this topic">💻 Code example</button>
          <button class="suggestion-chip" data-send-text="What are common pitfalls and mistakes here?">⚠️ Common pitfalls</button>
        </div>

        <form id="chatForm" class="chat-form">
          <input id="chatInput" type="text" class="chat-input" placeholder="Ask about your schedule, profile, course concepts, quiz MCQs, or app features..." autocomplete="off" />
          <button type="submit" class="btn-primary"><i class="fa-solid fa-paper-plane"></i> Send</button>
        </form>
      </div>
    </section>`;
}

function renderQuiz() {
  const attempts = state.progress.quizAttempts;

  if (state.ui.activeReviewAttemptId) {
    const attempt = attempts.find(a => a.id === state.ui.activeReviewAttemptId);
    if (attempt) return renderQuizReviewScreen(attempt);
  }

  if (state.activeQuiz) {
    return renderActiveQuizScreen();
  }

  const subject = getSubjectData(state.profile ? state.profile.subject : "");
  const attemptsByTopic = {};
  attempts.forEach(a => { attemptsByTopic[a.topicId] = a; });

  return `
    <section class="page">
      <header class="page-header">
        <h1>Adaptive Quiz System</h1>
        <p class="page-sub">Test your knowledge across <strong>${subject.topics.length} Quiz Modules</strong> · Set <strong>5&ndash;20 questions</strong> per quiz · in ${escapeHtml(subject.displayName)}.</p>
      </header>

      <div class="quiz-topic-grid">
        ${subject.topics.map(t => {
    const last = attemptsByTopic[t.id];
    const totalMcq = t.quiz && t.quiz.mcq ? t.quiz.mcq.length : 5;
    const tid = t.id;
    return `
            <div class="card quiz-unit-card">
              <div class="quiz-card-head">
                <h3>${escapeHtml(t.name)}</h3>
                ${last ? `<span class="pill ${pillClass(last.percent)}">${last.percent}% Score</span>` : `<span class="pill pill-mid">Not Attempted</span>`}
              </div>
              <p class="page-sub" style="font-size:0.82rem; margin-bottom:12px;">
                <i class="fa-solid fa-list-check" style="opacity:0.7;"></i> ${totalMcq} Questions Available &nbsp;&middot;&nbsp; ${t.quiz.short ? t.quiz.short.length : 0} Short Answer
              </p>

              <div class="quiz-count-row">
                <div class="quiz-count-meta">
                  <span><i class="fa-solid fa-sliders"></i> Questions: <strong id="quiz-count-label-${tid}">10</strong></span>
                  <span class="quiz-time-badge"><i class="fa-regular fa-clock"></i> ~<span id="quiz-time-label-${tid}">15</span> min</span>
                </div>
                <input type="range" min="5" max="20" value="10" step="1"
                  class="quiz-count-slider"
                  id="quiz-count-${tid}"
                  oninput="
                    document.getElementById('quiz-count-label-${tid}').textContent = this.value;
                    document.getElementById('quiz-time-label-${tid}').textContent = Math.ceil(this.value * 90 / 60);
                  "
                />
                <div class="quiz-count-ticks">
                  <span>5</span><span style="margin-left:auto">10</span><span style="margin-left:auto">15</span><span style="margin-left:auto">20</span>
                </div>
              </div>

              <div style="display:flex; gap:10px; margin-top:14px;">
                <button class="btn-primary" data-start-quiz="${tid}" data-quiz-mode="practice" style="flex:1;">
                  <i class="fa-solid fa-play"></i> Practice
                </button>
                <button class="btn-secondary" data-start-quiz="${tid}" data-quiz-mode="timed">
                  <i class="fa-solid fa-stopwatch"></i> Timed
                </button>
              </div>
            </div>
          `;
  }).join("")}
      </div>
    </section>`;
}

function renderActiveQuizScreen() {
  const q = state.activeQuiz;

  return `
    <section class="page">
      <div class="quiz-header-bar">
        <div>
          <h2>Quiz: ${escapeHtml(q.topicName)}</h2>
          <span class="page-sub">Mode: ${q.mode.toUpperCase()} &middot; ${q.mcq.length} Questions &middot; ~${Math.ceil(q.mcq.length * 90 / 60)} min</span>
        </div>
        <div style="display:flex; align-items:center; gap:12px; flex-wrap:wrap;">
          <span class="quiz-anti-cheat-notice"><i class="fa-solid fa-shield-halved"></i> YuktaraAI disabled during test</span>
          ${q.mode === "timed" ? `
            <div class="quiz-timer">
              <i class="fa-solid fa-clock"></i> <span id="quizTimerDisplay">${Math.floor(q.timeLeft / 60)}:${q.timeLeft % 60 < 10 ? "0" : ""}${q.timeLeft % 60}</span>
            </div>
          ` : ""}
        </div>
      </div>

      <form id="quizForm">
        ${q.mcq.map((item, idx) => `
          <div class="quiz-question-box">
            <div class="quiz-q-num">Question ${idx + 1} of ${q.mcq.length} (Multiple Choice)</div>
            <div class="quiz-q-title">${escapeHtml(item.q)}</div>
            <div class="quiz-options">
              ${item.options.map((opt, oi) => {
    const userChoice = q.answers[item.id];
    const isSelected = (userChoice !== undefined && userChoice !== null && userChoice !== "") && Number(userChoice) === oi;
    return `
                  <label class="quiz-opt-card ${isSelected ? "selected" : ""}">
                    <input type="radio" name="${item.id}" value="${oi}" ${isSelected ? "checked" : ""} required />
                    <span>${escapeHtml(opt)}</span>
                  </label>
                `;
  }).join("")}
            </div>
          </div>
        `).join("")}

        ${q.short.map((item, idx) => `
          <div class="quiz-question-box">
            <div class="quiz-q-num">Question ${q.mcq.length + idx + 1} (Short Answer)</div>
            <div class="quiz-q-title">${escapeHtml(item.q)}</div>
            <textarea name="${item.id}" rows="3" placeholder="Type your response here..." required>${q.answers[item.id] || ""}</textarea>
          </div>
        `).join("")}

        <div style="display:flex; justify-content:space-between; margin-top:20px;">
          <button type="button" class="btn-secondary" id="cancelQuizBtn">Cancel Quiz</button>
          <button type="submit" class="btn-primary"><i class="fa-solid fa-paper-plane"></i> Submit Quiz</button>
        </div>
      </form>
    </section>`;
}

function renderQuizReviewScreen(attempt) {
  return `
    <section class="page">
      <header class="page-header">
        <button class="btn-secondary" id="backToQuizListBtn" style="margin-bottom:12px;">
          <i class="fa-solid fa-arrow-left"></i> Back to Quiz List
        </button>
        <h1>Quiz Review: ${escapeHtml(attempt.topicName)}</h1>
        <p class="page-sub">Score: <strong>${attempt.score} / ${attempt.total} (${attempt.percent}%)</strong> · Attempted on ${formatDate(attempt.date)}</p>
      </header>

      <div class="card" style="margin-bottom:28px;">
        <div style="display:flex; align-items:center; justify-content:space-between;">
          <div>
            <h3>Performance Evaluation</h3>
            <p class="page-sub">${attempt.percent >= 75 ? "Excellent mastery! You demonstrate strong comprehension." : attempt.percent >= 50 ? "Good effort. Review missed questions below to reinforce key ideas." : "Needs review. We recommend revising this topic with YuktaraAI."}</p>
          </div>
          <span class="pill ${pillClass(attempt.percent)}" style="font-size:1.1rem; padding:8px 16px;">${attempt.percent}% Score</span>
        </div>
      </div>

      <h2 style="margin-bottom:18px;">Detailed Answer Key & Explanations</h2>

      ${attempt.reviews.map((rev, idx) => {
    if (rev.type === "mcq") {
      const uChoice = (rev.userChoice !== undefined && rev.userChoice !== null && rev.userChoice !== "") ? Number(rev.userChoice) : null;
      const cChoice = Number(rev.correctChoice);

      return `
            <div class="review-box ${rev.isCorrect ? "correct-box" : "incorrect-box"}">
              <div class="review-header">
                <strong>Question ${idx + 1}: ${escapeHtml(rev.q)}</strong>
                <span class="review-status-badge ${rev.isCorrect ? "status-correct" : "status-incorrect"}">
                  <i class="fa-solid ${rev.isCorrect ? "fa-check" : "fa-xmark"}"></i> ${rev.isCorrect ? "Correct" : "Incorrect"}
                </span>
              </div>
              <div class="quiz-options">
                ${rev.options.map((opt, oi) => {
        let optStyle = "";
        if (oi === cChoice) optStyle = "border-color:var(--success); background:var(--success-bg); font-weight:700;";
        else if (uChoice !== null && oi === uChoice && !rev.isCorrect) optStyle = "border-color:var(--danger); background:var(--danger-bg);";
        return `
                    <div class="quiz-opt-card" style="${optStyle}">
                      <span>${escapeHtml(opt)} ${oi === cChoice ? "✓ (Correct Answer)" : (uChoice !== null && oi === uChoice) ? "✗ (Your Answer)" : ""}</span>
                    </div>`;
      }).join("")}
              </div>
              <div class="explanation-card">
                <div class="explanation-title"><i class="fa-solid fa-circle-info"></i> Explanation</div>
                <p>${escapeHtml(rev.explanation)}</p>
                <button class="btn-secondary" data-ask-tutor-mcq="${encodeURIComponent(rev.q)}" style="margin-top:10px; padding:6px 14px; font-size:0.85rem;">
                  <i class="fa-solid fa-robot"></i> Ask YuktaraAI to Explain Why This Choice is Correct
                </button>
              </div>
            </div>`;
    } else {
      return `
            <div class="review-box ${rev.score >= 0.75 ? "correct-box" : "incorrect-box"}">
              <div class="review-header">
                <strong>Question ${idx + 1}: ${escapeHtml(rev.q)}</strong>
                <span class="review-status-badge ${rev.score >= 0.75 ? "status-correct" : rev.score > 0 ? "status-partial" : "status-incorrect"}">
                  ${rev.score >= 0.75 ? "Full Credit" : rev.score > 0 ? "Partial Credit" : "Needs Work"}
                </span>
              </div>
              <p><strong>Your Answer:</strong> ${escapeHtml(rev.userText) || "<em>No answer provided</em>"}</p>
              <div class="keyword-chips">
                ${rev.matchedKeywords.map(k => `<span class="kw-chip kw-matched">✓ ${escapeHtml(k)}</span>`).join("")}
                ${rev.missedKeywords.map(k => `<span class="kw-chip kw-missed">✗ ${escapeHtml(k)}</span>`).join("")}
              </div>
              <div class="explanation-card">
                <div class="explanation-title"><i class="fa-solid fa-lightbulb"></i> Ideal Model Answer</div>
                <p>${escapeHtml(rev.modelAnswer)}</p>
              </div>
            </div>`;
    }
  }).join("")}

      <div style="text-align:center; margin-top:30px;">
        <button class="btn-primary" id="tutorReviseBtn" data-topic="${attempt.topicId}">
          <i class="fa-solid fa-robot"></i> Revise Missed Concepts with YuktaraAI
        </button>
      </div>
    </section>`;
}

function renderProgress() {
  const stats = getOverallStats();
  const attempts = [...state.progress.quizAttempts].reverse();
  const subject = getSubjectData(state.profile ? state.profile.subject : "");

  return `
    <section class="page">
      <header class="page-header">
        <h1>Analytics & Progress</h1>
        <p class="page-sub">Comprehensive overview of your quiz history and topic performance.</p>
      </header>

      <div class="stat-grid">
        <div class="stat-card">
          <div class="stat-icon"><i class="fa-solid fa-chart-pie"></i></div>
          <div>
            <div class="stat-value">${stats.percentComplete}%</div>
            <div class="stat-label">Plan Completion</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon"><i class="fa-solid fa-gauge-high"></i></div>
          <div>
            <div class="stat-value">${stats.avgScore !== null ? stats.avgScore + "%" : "—"}</div>
            <div class="stat-label">Average Score</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon"><i class="fa-solid fa-pen-ruler"></i></div>
          <div>
            <div class="stat-value">${stats.quizzesTaken}</div>
            <div class="stat-label">Quizzes Completed</div>
          </div>
        </div>
      </div>

      <div class="card chart-card">
        <h3>Performance Breakdown by Topic</h3>
        <div class="chart-bars">
          ${subject.topics.map(t => {
    const topicAttempts = state.progress.quizAttempts.filter(a => a.topicId === t.id);
    const latest = topicAttempts[topicAttempts.length - 1];
    const pct = latest ? latest.percent : 0;
    return `
              <div class="chart-bar-row">
                <div class="chart-bar-header">
                  <span>${escapeHtml(t.name)}</span>
                  <strong>${latest ? pct + "%" : "No Data"}</strong>
                </div>
                <div class="chart-bar-track">
                  <div class="chart-bar-fill" style="width:${pct}%; background:${pct >= 75 ? "var(--success)" : pct >= 50 ? "var(--warning)" : "var(--danger)"};"></div>
                </div>
              </div>`;
  }).join("")}
        </div>
      </div>

      <div class="card">
        <h3>Quiz History Log</h3>
        ${attempts.length ? `
          <table class="history-table">
            <thead>
              <tr><th>Topic</th><th>Score</th><th>Date</th><th>Mode</th><th>Action</th></tr>
            </thead>
            <tbody>
              ${attempts.map(a => `
                <tr>
                  <td><strong>${escapeHtml(a.topicName)}</strong></td>
                  <td><span class="pill ${pillClass(a.percent)}">${a.percent}%</span></td>
                  <td>${formatDate(a.date)}</td>
                  <td>${a.mode ? a.mode.toUpperCase() : "PRACTICE"}</td>
                  <td>
                    <button class="btn-secondary" data-view-review="${a.id}" style="padding:4px 10px; font-size:0.8rem;">
                      Review Key
                    </button>
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        ` : `<p class="page-sub">No quiz history recorded yet. Complete a quiz to log scores here.</p>`}
      </div>
    </section>`;
}

/* --------------------------------------------------------------------------
   Helpers & Event Handlers
   -------------------------------------------------------------------------- */
function pillClass(percent) {
  if (percent < 50) return "pill-low";
  if (percent <= 75) return "pill-mid";
  return "pill-high";
}

function escapeHtml(str) {
  return String(str || "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function formatDate(dateStr) {
  if (!dateStr) return "—";
  let d;
  if (typeof dateStr === "string" && dateStr.includes("-")) {
    d = parseYMD(dateStr);
  } else {
    d = new Date(dateStr);
  }
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
}

function formatMarkdown(text) {
  const codeBlocks = [];
  let safeText = String(text || "").replace(/```([\s\S]*?)```/g, (match, code) => {
    codeBlocks.push(code);
    return `___CODE_BLOCK_${codeBlocks.length - 1}___`;
  });

  safeText = escapeHtml(safeText)
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\n/g, "<br>");

  safeText = safeText.replace(/___CODE_BLOCK_(\d+)___/g, (match, index) => {
    return `<pre><code>${escapeHtml(codeBlocks[Number(index)])}</code></pre>`;
  });

  return safeText;
}

function attachHandlers() {
  document.querySelectorAll("[data-nav]").forEach(el => {
    el.addEventListener("click", () => {
      state.ui.activeReviewAttemptId = null;
      goTo(el.getAttribute("data-nav"));
    });
  });

  const themeBtn = document.getElementById("themeToggleBtn");
  if (themeBtn) themeBtn.addEventListener("click", toggleTheme);

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) logoutBtn.addEventListener("click", logoutUser);

  const resetBtn = document.getElementById("resetBtn");
  if (resetBtn) resetBtn.addEventListener("click", resetAllData);

  const editProfileBtn = document.getElementById("editProfileBtn");
  if (editProfileBtn) {
    editProfileBtn.addEventListener("click", () => {
      state.ui.editingProfile = true;
      saveState();
      render();
    });
  }

  const cancelEditProfileBtn = document.getElementById("cancelEditProfileBtn");
  if (cancelEditProfileBtn) {
    cancelEditProfileBtn.addEventListener("click", () => {
      state.ui.editingProfile = false;
      saveState();
      render();
    });
  }

  const profileForm = document.getElementById("profileForm");
  if (profileForm) {
    profileForm.addEventListener("submit", e => {
      e.preventDefault();
      const targetDateVal = document.getElementById("f-date").value;

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const targetDateObj = parseYMD(targetDateVal);
      targetDateObj.setHours(0, 0, 0, 0);

      if (isNaN(targetDateObj.getTime()) || targetDateObj < today) {
        root().querySelector(".main-content").innerHTML = renderProfileForm("Target date cannot be in the past! Please select today or a future date.");
        attachHandlers();
        return;
      }

      const resolvedName = (state.auth && state.auth.currentUser && state.auth.currentUser.fullName) || (state.profile && state.profile.name) || "Yuktara Scholar";

      const profile = {
        name: resolvedName,
        subject: document.getElementById("f-subject").value.trim(),
        level: document.getElementById("f-level").value,
        goal: document.getElementById("f-goal").value.trim(),
        studyTime: Number(document.getElementById("f-time").value),
        targetDate: targetDateVal,
        createdAt: (state.profile && state.profile.createdAt) ? state.profile.createdAt : new Date().toISOString()
      };

      state.ui.editingProfile = false;
      state.profile = profile;
      state.plan = generatePlan(profile);
      saveState();
      goTo("dashboard");
    });
  }

  document.querySelectorAll("[data-toggle-subtopic]").forEach(el => {
    el.addEventListener("change", () => {
      toggleSubtopic(decodeURIComponent(el.getAttribute("data-topic")), decodeURIComponent(el.getAttribute("data-subtopic")));
    });
  });

  // Syllabus Search Input
  const searchInput = document.getElementById("syllabusSearchInput");
  if (searchInput) {
    searchInput.addEventListener("input", e => {
      state.ui.syllabusSearch = e.target.value;
      render();
      const newSearch = document.getElementById("syllabusSearchInput");
      if (newSearch) {
        newSearch.focus();
        newSearch.selectionStart = newSearch.selectionEnd = newSearch.value.length;
      }
    });
  }

  // View Mode Toggle (Schedule vs Syllabus)
  document.querySelectorAll("[data-plan-view]").forEach(btn => {
    btn.addEventListener("click", () => {
      state.ui.planViewMode = btn.getAttribute("data-plan-view");
      saveState();
      render();
    });
  });

  // Unit Filter Pills
  document.querySelectorAll("[data-unit-filter]").forEach(btn => {
    btn.addEventListener("click", () => {
      state.ui.syllabusUnitFilter = btn.getAttribute("data-unit-filter");
      render();
    });
  });

  // Clear Filters Button
  document.querySelectorAll("#clearSyllabusFilterBtn").forEach(btn => {
    btn.addEventListener("click", () => {
      state.ui.syllabusSearch = "";
      state.ui.syllabusUnitFilter = "all";
      render();
    });
  });

  // Quick Subject Switcher
  document.querySelectorAll("[data-switch-subject]").forEach(btn => {
    btn.addEventListener("click", () => {
      const newSubject = btn.getAttribute("data-switch-subject");
      if (state.profile && state.profile.subject !== newSubject) {
        state.profile.subject = newSubject;
        state.plan = generatePlan(state.profile);
        state.ui.tutorTopicId = null;
        state.ui.quizTopicId = null;
        state.ui.activeReviewAttemptId = null;
        state.ui.syllabusSearch = "";
        state.ui.syllabusUnitFilter = "all";
        saveState();
        render();
      }
    });
  });

  // Ask Tutor Topic directly from Syllabus Explorer
  document.querySelectorAll("[data-ask-tutor-topic]").forEach(btn => {
    btn.addEventListener("click", () => {
      const topicId = btn.getAttribute("data-ask-tutor-topic");
      state.ui.tutorTopicId = topicId;
      saveState();
      goTo("tutor");
    });
  });

  const tutorTopicSelect = document.getElementById("tutorTopicSelect");
  if (tutorTopicSelect) {
    tutorTopicSelect.addEventListener("change", () => {
      state.ui.tutorTopicId = tutorTopicSelect.value || null;
      saveState();
    });
  }

  const chatForm = document.getElementById("chatForm");
  if (chatForm) {
    chatForm.addEventListener("submit", e => {
      e.preventDefault();
      const input = document.getElementById("chatInput");
      sendTutorMessage(input.value);
      input.value = "";
    });
  }

  document.querySelectorAll("[data-send-text]").forEach(el => {
    el.addEventListener("click", () => {
      sendTutorMessage(el.getAttribute("data-send-text"));
    });
  });

  document.querySelectorAll("[data-ask-tutor-mcq]").forEach(el => {
    el.addEventListener("click", () => {
      const qText = decodeURIComponent(el.getAttribute("data-ask-tutor-mcq"));
      state.ui.activeReviewAttemptId = null;
      goTo("tutor");
      sendTutorMessage(`Why is the correct answer to this question: "${qText}"?`);
    });
  });

  // 3-Dot Message Menu & Translation Toggle Handlers
  document.querySelectorAll("[data-toggle-msg-menu]").forEach(btn => {
    btn.addEventListener("click", e => {
      e.stopPropagation();
      const idx = btn.getAttribute("data-toggle-msg-menu");
      const menu = document.getElementById(`msgMenu-${idx}`);
      const isOpen = menu && menu.classList.contains("show");
      document.querySelectorAll(".msg-dropdown.show").forEach(m => m.classList.remove("show"));
      if (!isOpen && menu) menu.classList.add("show");
    });
  });

  document.querySelectorAll("[data-translate-msg]").forEach(btn => {
    btn.addEventListener("click", e => {
      e.stopPropagation();
      const idx = Number(btn.getAttribute("data-translate-msg"));
      const targetLang = btn.getAttribute("data-lang");
      const msg = state.chat[idx];
      if (msg) {
        // Capture exact scroll positions before re-render
        const currentWinScroll = window.scrollY;
        const chatBox = document.getElementById("chatScroll");
        const chatScrollTop = chatBox ? chatBox.scrollTop : 0;

        if (targetLang === "mr") {
          msg.translatedMr = translateToMarathi(msg.originalEn || msg.text);
          msg.text = msg.translatedMr;
          msg.currentLang = "mr";
        } else {
          msg.text = msg.originalEn || msg.text;
          msg.currentLang = "en";
        }
        saveState();
        render();

        // Restore exact scroll positions
        requestAnimationFrame(() => {
          window.scrollTo({ top: currentWinScroll, behavior: "instant" });
          const restoredChatBox = document.getElementById("chatScroll");
          if (restoredChatBox) {
            restoredChatBox.scrollTop = chatScrollTop;
          }
        });
      }
    });
  });

  // Close dropdowns on outside click
  document.addEventListener("click", () => {
    document.querySelectorAll(".msg-dropdown.show").forEach(m => m.classList.remove("show"));
  });

  document.querySelectorAll("[data-start-quiz]").forEach(el => {
    el.addEventListener("click", () => {
      const topicId = el.getAttribute("data-start-quiz");
      const mode = el.getAttribute("data-quiz-mode") || "practice";
      state.ui.activeReviewAttemptId = null;
      // Read the question count from the slider for this topic
      const sliderEl = document.getElementById(`quiz-count-${topicId}`);
      const questionCount = sliderEl ? parseInt(sliderEl.value, 10) : 10;
      startQuiz(topicId, mode, questionCount);
    });
  });

  const quizForm = document.getElementById("quizForm");
  if (quizForm) {
    quizForm.addEventListener("change", e => {
      const target = e.target;
      if (target.name) {
        const val = target.type === "radio" ? Number(target.value) : target.value;
        setQuizAnswer(target.name, val);
      }
    });
    quizForm.addEventListener("submit", e => {
      e.preventDefault();
      const formData = new FormData(quizForm);
      for (const [key, value] of formData.entries()) {
        const numeric = /^\d+$/.test(String(value).trim()) ? Number(value) : value;
        setQuizAnswer(key, numeric);
      }
      submitQuiz();
    });
  }

  const cancelQuizBtn = document.getElementById("cancelQuizBtn");
  if (cancelQuizBtn) cancelQuizBtn.addEventListener("click", exitQuiz);

  const backToQuizListBtn = document.getElementById("backToQuizListBtn");
  if (backToQuizListBtn) {
    backToQuizListBtn.addEventListener("click", () => {
      state.ui.activeReviewAttemptId = null;
      _tabScrollPositions["quiz"] = 0;
      saveState();
      render();
      requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "instant" }));
    });
  }

  const tutorReviseBtn = document.getElementById("tutorReviseBtn");
  if (tutorReviseBtn) {
    tutorReviseBtn.addEventListener("click", () => {
      state.ui.tutorTopicId = tutorReviseBtn.getAttribute("data-topic");
      state.ui.activeReviewAttemptId = null;
      goTo("tutor");
    });
  }

  document.querySelectorAll("[data-view-review]").forEach(el => {
    el.addEventListener("click", () => {
      state.ui.activeReviewAttemptId = el.getAttribute("data-view-review");
      goTo("quiz");
    });
  });

  // Attach backend handlers if we're on the backend page and user is admin
  if (state.ui.page === "backend" && isAdmin()) {
    attachBackendHandlers();
  }
}

/* --------------------------------------------------------------------------
   Backend & SQL Data Viewer
   -------------------------------------------------------------------------- */

function renderBackendDataView() {
  return `
    <section class="page" id="backendPage">
      <header class="page-header">
        <h1><i class="fa-solid fa-database" style="color:var(--accent);"></i> Backend & SQL Database Explorer</h1>
        <p class="page-sub">Live view of the YUKTARA PostgreSQL database — Users, Auth Logs, Quiz Attempts & Live SQL Runner.</p>
      </header>

      <!-- Summary Cards -->
      <div class="backend-stats-row" id="backendStatsRow">
        <div class="backend-stat-card">
          <div class="bsc-icon"><i class="fa-solid fa-users"></i></div>
          <div class="bsc-info"><span id="bsc-users">—</span><small>Registered Users</small></div>
        </div>
        <div class="backend-stat-card">
          <div class="bsc-icon" style="background:rgba(16,185,129,.15);color:#10b981;"><i class="fa-solid fa-key"></i></div>
          <div class="bsc-info"><span id="bsc-auth">—</span><small>Auth Log Entries</small></div>
        </div>
        <div class="backend-stat-card">
          <div class="bsc-icon" style="background:rgba(245,158,11,.15);color:#f59e0b;"><i class="fa-solid fa-graduation-cap"></i></div>
          <div class="bsc-info"><span id="bsc-quiz">—</span><small>Quiz Attempts</small></div>
        </div>
        <div class="backend-stat-card">
          <div class="bsc-icon" style="background:rgba(99,102,241,.15);color:#6366f1;"><i class="fa-solid fa-book-open"></i></div>
          <div class="bsc-info"><span id="bsc-sessions">—</span><small>Study Sessions</small></div>
        </div>
        <div class="backend-stat-card">
          <div class="bsc-icon" style="background:rgba(139,92,246,.15);color:#8b5cf6;"><i class="fa-solid fa-chart-bar"></i></div>
          <div class="bsc-info"><span id="bsc-avg">—</span><small>Avg Quiz Score %</small></div>
        </div>
        <div class="backend-stat-card">
          <div class="bsc-icon" style="background:rgba(236,72,153,.15);color:#ec4899;"><i class="fa-solid fa-hard-drive"></i></div>
          <div class="bsc-info"><span id="bsc-size">—</span><small>DB Size (KB)</small></div>
        </div>
      </div>

      <!-- Tab Nav -->
      <div class="backend-tab-nav">
        <button class="backend-tab active" data-btab="users"><i class="fa-solid fa-users"></i> Users</button>
        <button class="backend-tab" data-btab="profiles"><i class="fa-solid fa-id-card"></i> User Profiles</button>
        <button class="backend-tab" data-btab="auth"><i class="fa-solid fa-shield-halved"></i> Auth Logs</button>
        <button class="backend-tab" data-btab="quiz"><i class="fa-solid fa-graduation-cap"></i> Quiz Attempts</button>
        <button class="backend-tab" data-btab="sessions"><i class="fa-solid fa-book-open"></i> Study Sessions</button>
        <button class="backend-tab" data-btab="sql"><i class="fa-solid fa-terminal"></i> Live SQL</button>
        <div style="margin-left:auto; display:flex; gap:8px;">
          <button id="refreshBackendBtn" class="btn-secondary" style="padding:8px 14px; font-size:0.85rem;" title="Refresh live database data">
            <i class="fa-solid fa-rotate"></i> Refresh
          </button>
          <a href="/api/admin/export?adminEmail=${encodeURIComponent((state.auth && state.auth.currentUser && state.auth.currentUser.email) || '')}" class="btn-secondary" style="padding:8px 14px; font-size:0.85rem;" download>
            <i class="fa-solid fa-download"></i> Export JSON
          </a>
        </div>
      </div>

      <!-- Tab Panels -->
      <div id="btab-users" class="backend-table-wrap active-btab">
        <div class="backend-loading"><i class="fa-solid fa-spinner fa-spin"></i> Loading users…</div>
      </div>
      <div id="btab-profiles" class="backend-table-wrap" style="display:none;">
        <div class="backend-loading"><i class="fa-solid fa-spinner fa-spin"></i> Loading user profiles…</div>
      </div>
      <div id="btab-auth" class="backend-table-wrap" style="display:none;">
        <div class="backend-loading"><i class="fa-solid fa-spinner fa-spin"></i> Loading auth logs…</div>
      </div>
      <div id="btab-quiz" class="backend-table-wrap" style="display:none;">
        <div class="backend-loading"><i class="fa-solid fa-spinner fa-spin"></i> Loading quiz attempts…</div>
      </div>
      <div id="btab-sessions" class="backend-table-wrap" style="display:none;">
        <div class="backend-loading"><i class="fa-solid fa-spinner fa-spin"></i> Loading study sessions…</div>
      </div>

      <!-- Live SQL Runner -->
      <div id="btab-sql" class="backend-sql-panel" style="display:none;">
        <div class="sql-runner-header">
          <i class="fa-solid fa-terminal"></i> Live SQL Query Runner
          <span class="page-sub" style="font-size:0.8rem;">Run any SELECT query directly against the PostgreSQL database</span>
        </div>
        <div class="sql-editor-wrap">
          <textarea id="sqlQueryInput" class="sql-editor" rows="4" spellcheck="false" placeholder="SELECT * FROM users ORDER BY created_at DESC LIMIT 10;"></textarea>
          <div class="sql-editor-actions">
            <button id="sqlRunBtn" class="btn-primary"><i class="fa-solid fa-play"></i> Run Query</button>
            <button id="sqlClearBtn" class="btn-secondary"><i class="fa-solid fa-eraser"></i> Clear</button>
            <div class="sql-quick-btns">
              <button class="sql-quick" data-query="SELECT * FROM users ORDER BY id DESC;">users</button>
              <button class="sql-quick" data-query="SELECT * FROM auth_logs ORDER BY id DESC LIMIT 30;">auth_logs</button>
              <button class="sql-quick" data-query="SELECT * FROM quiz_attempts ORDER BY id DESC LIMIT 30;">quiz_attempts</button>
              <button class="sql-quick" data-query="SELECT * FROM study_sessions ORDER BY id DESC LIMIT 30;">study_sessions</button>
              <button class="sql-quick" data-query="SELECT table_name FROM information_schema.tables WHERE table_schema='public';">tables</button>
            </div>
          </div>
        </div>
        <div id="sqlResults" class="sql-results-area">
          <div style="color:var(--text-muted); font-size:0.9rem; text-align:center; padding:20px;"><i class="fa-solid fa-magnifying-glass"></i> Results will appear here</div>
        </div>
      </div>

      <!-- Connection Info Footer -->
      <div class="backend-footer-info">
        <i class="fa-solid fa-circle" style="color:#22c55e; font-size:0.6rem;"></i>
        Connected to <code>PostgreSQL</code> via Netlify Functions &middot; DATABASE_URL
      </div>
    </section>
  `;
}

function attachBackendHandlers() {
  // Load data on mount
  loadBackendData();

  // Tab switching
  document.querySelectorAll(".backend-tab").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".backend-tab").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const tab = btn.getAttribute("data-btab");
      document.querySelectorAll(".backend-table-wrap, .backend-sql-panel").forEach(el => {
        el.style.display = "none";
        el.classList.remove("active-btab");
      });
      const panel = document.getElementById(`btab-${tab}`);
      if (panel) {
        panel.style.display = "";
        panel.classList.add("active-btab");
      }
    });
  });

  // SQL Run button
  const sqlRunBtn = document.getElementById("sqlRunBtn");
  if (sqlRunBtn) {
    sqlRunBtn.addEventListener("click", runSqlQuery);
  }

  const sqlClearBtn = document.getElementById("sqlClearBtn");
  if (sqlClearBtn) {
    sqlClearBtn.addEventListener("click", () => {
      const inp = document.getElementById("sqlQueryInput");
      if (inp) inp.value = "";
      const res = document.getElementById("sqlResults");
      if (res) res.innerHTML = `<div style="color:var(--text-muted); font-size:0.9rem; text-align:center; padding:20px;"><i class="fa-solid fa-magnifying-glass"></i> Results will appear here</div>`;
    });
  }

  // Quick SQL buttons
  document.querySelectorAll(".sql-quick").forEach(btn => {
    btn.addEventListener("click", () => {
      const inp = document.getElementById("sqlQueryInput");
      if (inp) { inp.value = btn.getAttribute("data-query"); inp.focus(); }
    });
  });

  // Run on Ctrl+Enter in textarea
  const sqlInput = document.getElementById("sqlQueryInput");
  if (sqlInput) {
    sqlInput.addEventListener("keydown", e => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") { e.preventDefault(); runSqlQuery(); }
    });
  }

  // User profile expand/collapse buttons (delegated)
  const profTab = document.getElementById("btab-profiles");
  if (profTab) {
    profTab.addEventListener("click", e => {
      const btn = e.target.closest(".uprofile-expand-btn");
      if (btn) {
        const userId = btn.getAttribute("data-userid");
        fetchUserDetail(userId);
      }
    });
  }

  // Refresh backend live data button
  const refreshBtn = document.getElementById("refreshBackendBtn");
  if (refreshBtn) {
    refreshBtn.addEventListener("click", () => {
      refreshBtn.disabled = true;
      refreshBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Refreshing...`;
      loadBackendData().finally(() => {
        refreshBtn.disabled = false;
        refreshBtn.innerHTML = `<i class="fa-solid fa-rotate"></i> Refresh`;
      });
    });
  }
}

async function loadBackendData() {
  try {
    const adminEmail = (state.auth && state.auth.currentUser && state.auth.currentUser.email) || "";
    const res = await fetch("/api/admin/data", {
      headers: { "X-Admin-Email": adminEmail }
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error || "Failed to load");

    // Update stat cards
    const s = data.summary;
    const setText = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    setText("bsc-users", s.totalUsers);
    setText("bsc-auth", s.totalAuthLogs);
    setText("bsc-quiz", s.totalQuizAttempts);
    setText("bsc-sessions", s.totalStudySessions || 0);
    setText("bsc-avg", s.avgScore + "%");
    setText("bsc-size", s.dbSizeKb || s.dbInfo || "PostgreSQL");

    // Users table
    const usersPanel = document.getElementById("btab-users");
    if (usersPanel) {
      usersPanel.innerHTML = renderBackendTable(
        ["ID", "Name", "Email", "Role", "Created At", "Last Login"],
        data.users.map(u => [u.id, u.name, u.email,
        `<span class="pill ${u.role === 'admin' ? 'pill-high' : 'pill-mid'}">${u.role}</span>`,
        formatDbDate(u.created_at), u.last_login_at ? formatDbDate(u.last_login_at) : "—"])
      );
    }

    // User Profiles tab — rich per-user cards
    const profilesPanel = document.getElementById("btab-profiles");
    if (profilesPanel) {
      const studentUsers = data.users.filter(u => u.role === "student");
      if (studentUsers.length === 0) {
        profilesPanel.innerHTML = `<div style="text-align:center;padding:30px;color:var(--text-muted);">No student accounts registered yet.</div>`;
      } else {
        profilesPanel.innerHTML = studentUsers.map(u => `
          <div class="uprofile-card" id="uprofile-${u.id}">
            <div class="uprofile-header">
              <div class="uprofile-avatar">${escapeHtml((u.name || u.email)[0].toUpperCase())}</div>
              <div class="uprofile-info">
                <div class="uprofile-name">${escapeHtml(u.name)}</div>
                <div class="uprofile-email">${escapeHtml(u.email)}</div>
                <div class="uprofile-meta">
                  <span><i class="fa-solid fa-calendar"></i> Joined: ${formatDbDate(u.created_at)}</span>
                  <span><i class="fa-solid fa-clock"></i> Last Login: ${u.last_login_at ? formatDbDate(u.last_login_at) : "Never"}</span>
                  <span class="pill pill-mid" style="font-size:0.7rem;">${u.role}</span>
                </div>
              </div>
              <button class="uprofile-expand-btn btn-secondary" data-userid="${u.id}">
                <i class="fa-solid fa-magnifying-glass-chart"></i> View Full Details
              </button>
            </div>
            <div class="uprofile-detail" id="uprofile-detail-${u.id}" style="display:none;"></div>
          </div>
        `).join("");
      }
    }

    // Auth logs table
    const authPanel = document.getElementById("btab-auth");
    if (authPanel) {
      authPanel.innerHTML = renderBackendTable(
        ["ID", "Email", "Action", "IP Address", "Status", "Timestamp"],
        data.authLogs.map(l => [l.id, l.email,
        `<code style="font-size:0.8rem;">${l.action}</code>`,
        l.ip_address || "—",
        `<span class="pill ${l.status === 'SUCCESS' ? 'pill-high' : 'pill-low'}">${l.status}</span>`,
        formatDbDate(l.created_at)])
      );
    }

    // Quiz attempts table
    const quizPanel = document.getElementById("btab-quiz");
    if (quizPanel) {
      quizPanel.innerHTML = renderBackendTable(
        ["ID", "Student", "Subject", "Topic", "Qs", "Score", "Mode", "Time (s)", "Submitted"],
        data.quizAttempts.map(a => [a.id, a.user_name || a.user_email, a.subject, a.topic_name,
        a.question_count,
        `<span class="pill ${pillClass(a.percentage)}">${a.percentage}%</span>`,
        a.mode, a.time_spent_seconds, formatDbDate(a.submitted_at)])
      );
    }

    // Study Sessions table
    const sessPanel = document.getElementById("btab-sessions");
    if (sessPanel) {
      if (data.studySessions && data.studySessions.length > 0) {
        sessPanel.innerHTML = renderBackendTable(
          ["ID", "User / Email", "Subject", "Topic ID", "Subtopic", "Duration", "Status", "Recorded At"],
          data.studySessions.map(s => [
            s.id,
            s.user_email || `User #${s.user_id}`,
            s.subject,
            s.topic_id,
            s.subtopic,
            `${s.duration_minutes} min`,
            `<span class="pill pill-high">${s.status}</span>`,
            formatDbDate(s.created_at)
          ])
        );
      } else {
        sessPanel.innerHTML = `<div style="color:var(--text-muted);text-align:center;padding:24px;font-size:0.9rem;"><i class="fa-solid fa-info-circle"></i> No study sessions recorded yet. Study sessions are logged automatically into PostgreSQL when students mark syllabus topics complete.</div>`;
      }
    }

  } catch (err) {
    const errHtml = `<div class="backend-error"><i class="fa-solid fa-triangle-exclamation"></i> Cannot connect to backend server. Please run <code>npm start</code> (or <code>node server.js</code>) first. <br><small>${err.message}</small></div>`;
    ["btab-users", "btab-profiles", "btab-auth", "btab-quiz", "btab-sessions"].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.innerHTML = errHtml;
    });
  }
}

async function fetchUserDetail(userId) {
  const detailDiv = document.getElementById(`uprofile-detail-${userId}`);
  const btn = document.querySelector(`.uprofile-expand-btn[data-userid="${userId}"]`);
  if (!detailDiv) return;

  // Toggle if already loaded and visible
  if (detailDiv.style.display !== "none") {
    detailDiv.style.display = "none";
    if (btn) btn.innerHTML = `<i class="fa-solid fa-magnifying-glass-chart"></i> View Full Details`;
    return;
  }

  if (btn) btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Loading…`;
  detailDiv.style.display = "";
  detailDiv.innerHTML = `<div style="padding:16px;color:var(--text-muted);"><i class="fa-solid fa-spinner fa-spin"></i> Fetching user data…</div>`;

  try {
    const adminEmail = (state.auth && state.auth.currentUser && state.auth.currentUser.email) || "";
    const res = await fetch(`/api/admin/user-detail?userId=${userId}`, {
      headers: { "X-Admin-Email": adminEmail }
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error || "Failed to load");

    const { user, authLogs, quizAttempts, studySessions, stats } = data;

    detailDiv.innerHTML = `
      <div class="uprofile-stats-row">
        <div class="uprofile-stat"><span>${stats.totalQuizzes}</span><small>Quiz Attempts</small></div>
        <div class="uprofile-stat"><span>${stats.avgScore}%</span><small>Avg Score</small></div>
        <div class="uprofile-stat"><span>${stats.bestScore}%</span><small>Best Score</small></div>
        <div class="uprofile-stat"><span>${authLogs.length}</span><small>Auth Events</small></div>
        <div class="uprofile-stat"><span>${studySessions.length}</span><small>Study Sessions</small></div>
      </div>

      <div class="uprofile-section">
        <div class="uprofile-section-title"><i class="fa-solid fa-graduation-cap"></i> Quiz Attempt History</div>
        ${quizAttempts.length === 0
          ? `<div style="color:var(--text-muted);padding:12px;">No quiz attempts yet.</div>`
          : renderBackendTable(
              ["Subject", "Topic", "Score", "Mode", "Time (s)", "Date"],
              quizAttempts.map(a => [
                a.subject, a.topic_name,
                `<span class="pill ${pillClass(a.percentage)}">${a.percentage}%</span>`,
                a.mode, a.time_spent_seconds || "—", formatDbDate(a.submitted_at)
              ])
            )
        }
      </div>

      <div class="uprofile-section">
        <div class="uprofile-section-title"><i class="fa-solid fa-shield-halved"></i> Auth & Sign-In History</div>
        ${authLogs.length === 0
          ? `<div style="color:var(--text-muted);padding:12px;">No auth log entries.</div>`
          : renderBackendTable(
              ["Action", "IP Address", "Status", "Browser", "Timestamp"],
              authLogs.map(l => [
                `<code style="font-size:0.78rem;">${l.action}</code>`,
                l.ip_address || "—",
                `<span class="pill ${l.status === 'SUCCESS' ? 'pill-high' : 'pill-low'}">${l.status}</span>`,
                `<span style="font-size:0.72rem;color:var(--text-muted);">${(l.user_agent || "").substring(0, 60)}…</span>`,
                formatDbDate(l.created_at)
              ])
            )
        }
      </div>

      ${studySessions.length > 0 ? `
      <div class="uprofile-section">
        <div class="uprofile-section-title"><i class="fa-solid fa-book-open"></i> Study Sessions</div>
        ${renderBackendTable(
          ["Subject", "Topic", "Subtopic", "Duration (min)", "Status", "Date"],
          studySessions.map(s => [
            s.subject || "—", s.topic_id || "—", s.subtopic || "—",
            s.duration_minutes || "—", s.status,
            formatDbDate(s.created_at)
          ])
        )}
      </div>` : ""}
    `;

    if (btn) btn.innerHTML = `<i class="fa-solid fa-chevron-up"></i> Collapse`;
  } catch (err) {
    detailDiv.innerHTML = `<div class="backend-error"><i class="fa-solid fa-triangle-exclamation"></i> Failed to load user details: ${escapeHtml(err.message)}</div>`;
    if (btn) btn.innerHTML = `<i class="fa-solid fa-magnifying-glass-chart"></i> View Full Details`;
  }
}

function renderBackendTable(headers, rows) {
  if (!rows || rows.length === 0) {
    return `<div style="text-align:center; padding:30px; color:var(--text-muted);">No records found.</div>`;
  }
  const hdr = headers.map(h => `<th>${h}</th>`).join("");
  const body = rows.map(row =>
    `<tr>${row.map(cell => `<td>${cell !== null && cell !== undefined ? cell : "—"}</td>`).join("")}</tr>`
  ).join("");
  return `<div class="db-table-scroll"><table class="db-table"><thead><tr>${hdr}</tr></thead><tbody>${body}</tbody></table></div>`;
}

function formatDbDate(iso) {
  if (!iso) return "—";
  try {
    const d = new Date(iso);
    return d.toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
  } catch { return iso; }
}

async function runSqlQuery() {
  const input = document.getElementById("sqlQueryInput");
  const resultsDiv = document.getElementById("sqlResults");
  if (!input || !resultsDiv) return;

  const query = input.value.trim();
  if (!query) return;

  resultsDiv.innerHTML = `<div style="text-align:center; padding:20px; color:var(--text-muted);"><i class="fa-solid fa-spinner fa-spin"></i> Executing query…</div>`;

  try {
    const adminEmail = (state.auth && state.auth.currentUser && state.auth.currentUser.email) || "";
    const res = await fetch("/api/admin/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Admin-Email": adminEmail
      },
      body: JSON.stringify({ query })
    });
    const data = await res.json();

    if (!data.success) {
      resultsDiv.innerHTML = `<div class="sql-error"><i class="fa-solid fa-circle-xmark"></i> <strong>SQL Error:</strong> ${escapeHtml(data.error)}</div>`;
      return;
    }

    const infoBar = `<div class="sql-result-meta"><span><i class="fa-solid fa-table"></i> ${data.rowCount} row(s) returned</span><span><i class="fa-regular fa-clock"></i> ${data.durationMs}ms</span></div>`;
    resultsDiv.innerHTML = infoBar + renderBackendTable(data.columns, data.rows.map(r => data.columns.map(c => r[c])));
  } catch (err) {
    resultsDiv.innerHTML = `<div class="sql-error"><i class="fa-solid fa-triangle-exclamation"></i> Network error — make sure the backend server is running. <small>${escapeHtml(err.message)}</small></div>`;
  }
}

/* --------------------------------------------------------------------------
   Floating "Ask YuktaraAI" Selection Popup
   -------------------------------------------------------------------------- */
let _selectionPopup = null;

function createSelectionPopup() {
  if (_selectionPopup) return;
  const popup = document.createElement("div");
  popup.id = "yuktaraAiSelectionPopup";
  popup.className = "yuktara-selection-popup";
  popup.innerHTML = `<i class="fa-solid fa-robot"></i> Ask YuktaraAI`;
  popup.style.display = "none";
  document.body.appendChild(popup);
  _selectionPopup = popup;

  popup.addEventListener("mousedown", (e) => {
    e.preventDefault(); // Prevent losing selection
    e.stopPropagation();
    const selectedText = window.getSelection().toString().trim();
    if (selectedText) {
      // Clear selection and hide popup
      window.getSelection().removeAllRanges();
      popup.style.display = "none";

      // Navigate to YuktaraAI and send message
      goTo("tutor");
      sendTutorMessage(selectedText);
    }
  });
}

document.addEventListener("mouseup", (e) => {
  // Small delay to let selection finalize
  setTimeout(() => {
    // If not authenticated, do not show selection popup
    if (!state.auth || !state.auth.currentUser) {
      if (_selectionPopup) _selectionPopup.style.display = "none";
      return;
    }

    // IMPORTANT: Disable AI popup while a quiz is active and not submitted
    if (state.activeQuiz && !state.activeQuiz.submitted) {
      if (_selectionPopup) _selectionPopup.style.display = "none";
      return;
    }

    const sel = window.getSelection();
    const selectedText = sel ? sel.toString().trim() : "";

    if (!_selectionPopup) createSelectionPopup();

    if (selectedText.length > 2) {
      // Don't show inside chat input or form inputs
      const activeEl = document.activeElement;
      if (activeEl && (activeEl.tagName === "INPUT" || activeEl.tagName === "TEXTAREA" || activeEl.id === "chatInput")) {
        _selectionPopup.style.display = "none";
        return;
      }

      // Position popup near cursor
      const range = sel.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      const popupX = rect.left + (rect.width / 2);
      const popupY = rect.top - 10 + window.scrollY;

      _selectionPopup.style.left = `${Math.max(10, popupX)}px`;
      _selectionPopup.style.top = `${Math.max(10, popupY)}px`;
      _selectionPopup.style.display = "flex";
    } else {
      _selectionPopup.style.display = "none";
    }
  }, 10);
});

// Hide popup when clicking elsewhere
document.addEventListener("mousedown", (e) => {
  if (_selectionPopup && e.target !== _selectionPopup && !_selectionPopup.contains(e.target)) {
    _selectionPopup.style.display = "none";
  }
});

// Initial render call
render();