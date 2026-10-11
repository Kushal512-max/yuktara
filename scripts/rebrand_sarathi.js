// scripts/rebrand_sarathi.js
const fs = require('fs');
const path = require('path');

const appJsPath = path.join(__dirname, '..', 'js', 'app.js');
let appJs = fs.readFileSync(appJsPath, 'utf8');

// Replacements for user-facing strings
// YuktaraAI -> sArathI AI
// YUKTARA -> sArathI
// Yuktara -> sArathI
// युक्ताराAI -> सारथीAI (sArathI AI)
// युक्तारा -> सारथी (sArathI)

appJs = appJs.replace(/YuktaraAI/g, 'sArathI AI');
appJs = appJs.replace(/युक्ताराAI/g, 'सारथीAI');
appJs = appJs.replace(/युक्तारा/g, 'सारथी');
appJs = appJs.replace(/YUKTARA/g, 'sArathI');
// Be careful with lowercase yuktara in intent checks: allow both sarathi and yuktara so legacy queries still work
appJs = appJs.replace(/cleanQ === "hi yuktara"/g, 'cleanQ === "hi sarathi" || cleanQ === "hi yuktara"');
appJs = appJs.replace(/cleanQ === "hello yuktara"/g, 'cleanQ === "hello sarathi" || cleanQ === "hello yuktara"');
appJs = appJs.replace(/qLower\.includes\("yuktara"\)/g, '(qLower.includes("sarathi") || qLower.includes("yuktara"))');
appJs = appJs.replace(/qLower === "ask yuktara"/g, '(qLower === "ask sarathi" || qLower === "ask yuktara")');
appJs = appJs.replace(/qLower\.includes\("ask yuktara"\)/g, '(qLower.includes("ask sarathi") || qLower.includes("ask yuktara"))');

fs.writeFileSync(appJsPath, appJs, 'utf8');
console.log('Successfully updated js/app.js');

// Also update health.js
const healthPath = path.join(__dirname, '..', 'netlify', 'functions', 'health.js');
if (fs.existsSync(healthPath)) {
  let health = fs.readFileSync(healthPath, 'utf8');
  health = health.replace(/YUKTARA Backend/g, 'sArathI Backend');
  fs.writeFileSync(healthPath, health, 'utf8');
  console.log('Successfully updated health.js');
}

// Also update admin-export.js
const exportPath = path.join(__dirname, '..', 'netlify', 'functions', 'admin-export.js');
if (fs.existsSync(exportPath)) {
  let exp = fs.readFileSync(exportPath, 'utf8');
  exp = exp.replace(/YUKTARA/g, 'sArathI');
  exp = exp.replace(/yuktara_postgres_export/g, 'sarathi_postgres_export');
  fs.writeFileSync(exportPath, exp, 'utf8');
  console.log('Successfully updated admin-export.js');
}

// Update question_bank.js aliases
const qbPath = path.join(__dirname, '..', 'js', 'question_bank.js');
if (fs.existsSync(qbPath)) {
  let qb = fs.readFileSync(qbPath, 'utf8');
  if (!qb.includes('SARATHI_QUESTION_BANK')) {
    qb = qb.replace('window.YUKTARA_QUESTION_BANK = QUESTION_BANK;', 'window.YUKTARA_QUESTION_BANK = QUESTION_BANK;\n    window.SARATHI_QUESTION_BANK = QUESTION_BANK;');
    qb = qb.replace('global.YUKTARA_QUESTION_BANK = QUESTION_BANK;', 'global.YUKTARA_QUESTION_BANK = QUESTION_BANK;\n    global.SARATHI_QUESTION_BANK = QUESTION_BANK;');
    fs.writeFileSync(qbPath, qb, 'utf8');
    console.log('Successfully updated question_bank.js with SARATHI aliases');
  }
}
