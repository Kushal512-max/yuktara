// scripts/compile_question_bank.js
const fs = require('fs');
const path = require('path');

const dsa = require('./data_dsa');
const dbms = require('./data_dbms');
const cn = require('./data_cn');
const pyWeb = require('./data_py_web');
const dm = require('./data_dm');
const cga = require('./data_cga');
const linux = require('./data_linux');

const allTopics = {
  ...dsa,
  ...dbms,
  ...cn,
  ...pyWeb,
  ...dm,
  ...cga,
  ...linux
};

const topicCount = Object.keys(allTopics).length;
let totalQuestions = 0;
for (const [topicId, questions] of Object.entries(allTopics)) {
  totalQuestions += questions.length;
}

console.log(`Aggregated ${topicCount} topics with a total of ${totalQuestions} MCQs.`);

// Generate the client-side question_bank.js script
const outputScript = `/* ==========================================================================
   js/question_bank.js — Comprehensive Academic Question Bank for YUKTARA
   Provides 20+ syllabus-aligned MCQs per unit for all 8 subjects.
   Auto-augments SUBJECT_LIBRARY upon load.
   ========================================================================== */

(function () {
  const QUESTION_BANK = ${JSON.stringify(allTopics, null, 2)};

  // Expose to window for browser access
  if (typeof window !== "undefined") {
    window.YUKTARA_QUESTION_BANK = QUESTION_BANK;
  }
  if (typeof global !== "undefined") {
    global.YUKTARA_QUESTION_BANK = QUESTION_BANK;
  }
  if (typeof module !== "undefined" && module.exports) {
    module.exports = QUESTION_BANK;
  }

  // Augment SUBJECT_LIBRARY in browser
  function augmentSubjectLibrary() {
    const lib = (typeof SUBJECT_LIBRARY !== "undefined") ? SUBJECT_LIBRARY : (typeof window !== "undefined" ? window.SUBJECT_LIBRARY : null);
    if (!lib) return;

    for (const [subjKey, subjData] of Object.entries(lib)) {
      if (!subjData || !Array.isArray(subjData.topics)) continue;
      subjData.topics.forEach(topic => {
        if (QUESTION_BANK[topic.id] && Array.isArray(QUESTION_BANK[topic.id])) {
          topic.quiz = topic.quiz || {};
          topic.quiz.mcq = QUESTION_BANK[topic.id];
        }
      });
    }
    console.log("YUKTARA Question Bank successfully loaded: 20+ MCQs active per unit across all subjects.");
  }

  if (typeof document !== "undefined") {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", augmentSubjectLibrary);
    } else {
      augmentSubjectLibrary();
    }
  } else {
    augmentSubjectLibrary();
  }
})();
`;

fs.writeFileSync(path.join(__dirname, '../js/question_bank.js'), outputScript, 'utf8');
console.log('Successfully written js/question_bank.js!');
