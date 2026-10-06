# YUKTARA — Personalized Learning Assistant

A state-of-the-art, high-level GUI study planner, adaptive AI tutor, and intelligent quiz platform built with modern web standards — running completely client-side in the browser with `localStorage` state persistence.

---

## 🌟 Key Features

### 1. High-Level GUI & Modern Visual Design
- **Glassmorphic UI**: HSL color tokens, backdrop blur filters, smooth card transitions, glowing accents, and micro-interactions.
- **Dark / Light Theme Toggle**: Instant client-side theme switching with persistent user preference.
- **Typography & Icons**: Styled with Google Fonts (`Outfit` + `Inter`) and Font Awesome 6 icons.
- **Responsive Layout**: Adapts smoothly across mobile, tablet, and widescreen desktop monitors.

### 2. Corrected & Enhanced Adaptive Quiz Engine
- **5 MCQs Per Quiz**: Every quiz module contains 5 Multiple Choice Questions + Short Answer evaluations.
- **Practice & Timed Quiz Modes**: Choose between un-timed practice with instant hints or a high-intensity timed evaluation mode with countdown timer.
- **Draft Auto-Save**: Quiz responses automatically update in `localStorage` — refreshing or navigating away mid-quiz preserves your active answers.
- **Comprehensive Answer Key & Review Screen**:
  - Displays every question post-submission with correct answers vs your choices.
  - Highlights *why* options are correct or incorrect.
  - Short-answer keyword extraction: displays green chips for matched concepts and orange chips for missed key terms.
  - One-click **"Ask YuktaraAI Tutor to Explain Why This Choice is Correct"** button.

### 3. Dynamic AI Tutor & Study Planner
- **Exact Daily Study Time Scheduler**: Dynamically allocates your exact daily study time preference (e.g. 45 mins/day).
- **Quiz MCQ Explainer Engine**: Paste or ask any quiz question in the AI Tutor to receive a full option-by-option breakdown.
- **Level-Adaptive Tutor**: Tailors explanations to Beginner, Intermediate, or Advanced expertise.

### 4. Client-Side Authentication & Session Management
- **Login & Registration Flow**: Full authentication system with persistent local user accounts.
- **Default Demo Credentials**: Pre-configured with email `abc@gmail.com` and password `123456` with a 1-click **"Use Demo"** button.
- **Self-Registration Form**: Allows new users to sign up with Full Name, Email, Password, and Confirm Password (with client-side validation).
- **Seamless Profile Binding**: User's registered full name automatically links with their learning plan and YuktaraAI tutor interactions, removing redundant name input on the dashboard.
- **Session Logout**: Sidebar logout action safely ends active session and returns to login screen.

---

## 🚀 How to Run Locally

You can open `index.html` directly in any web browser, or serve it locally:

```bash
# Using Python 3 HTTP Server
python3 -m http.server 8080
```
Then navigate to `http://localhost:8080` in your browser.
