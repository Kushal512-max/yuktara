# Implementation Plan: Authentication (Login & Registration) & Dashboard Profile Refinement

This plan details the addition of a client-side authentication system (Login & Registration) with persistent local accounts, default demo credentials, session handling, and the removal of the redundant "Your Full Name" field from the main dashboard profile form.

---

## 1. Requirements & User Specifications

1. **Authentication System (Login & Register)**:
   - Provide a dedicated, glassmorphic Authentication screen shown when no user session is active.
   - **Login Form**:
     - Email and Password input fields.
     - Default credentials: `email: abc@gmail.com`, `password: 123456`.
     - 1-Click "Fill Demo Credentials" helper button for instant testing.
     - Error banner for incorrect credentials.
     - "Register" button/toggle to transition to the Registration form.
   - **Registration Form**:
     - Form fields:
       1. **Full Name**
       2. **Email**
       3. **Password**
       4. **Confirm Password**
     - Client-side validation:
       - All fields required.
       - Password and Confirm Password must match.
       - Email format validation & duplicate account check.
       - Password length requirement (minimum 6 characters).
     - Upon registration: save account to `state.auth.users` in `localStorage`, set as `currentUser`, and seamlessly transition to the main application.
     - "Back to Login" button/toggle to switch back.
   - **Session & Logout**:
     - Persist `currentUser` in `localStorage` (`pla_pro_state_v2`).
     - Display logged-in user identity (Full Name & Email) in the sidebar.
     - Provide a **Logout** button that terminates the session and returns to the Login screen.

2. **Dashboard Profile Form Refinement**:
   - Remove the **"Your Full Name"** input field (`#f-name`) from `renderProfileForm()`.
   - Bind the user's name automatically from `state.auth.currentUser.fullName`.
   - Display a subtle badge/header indicating *"Profile for: [Full Name]"*.

---

## 2. Architecture & State Design

### State Schema Additions in [app.js](file:///c:/Users/kusha/OneDrive/Desktop/YUKTARA_Extended/js/app.js)
```javascript
const DEFAULT_STATE = {
  theme: "dark",
  auth: {
    currentUser: null, // { email: string, fullName: string }
    users: [
      {
        fullName: "Yuktara Scholar",
        email: "abc@gmail.com",
        password: "123456"
      }
    ],
    mode: "login", // "login" | "register"
    error: null
  },
  profile: null, // { name: string (from currentUser), subject, level, goal, studyTime, targetDate, createdAt }
  plan: [],
  progress: { completedSubtopics: {}, quizAttempts: [] },
  chat: [],
  activeQuiz: null,
  ui: {
    page: "dashboard",
    // ...
  }
};
```

---

## 3. Proposed Code Modifications

### File 1: [js/app.js](file:///c:/Users/kusha/OneDrive/Desktop/YUKTARA_Extended/js/app.js)

1. **State & Default User Initialization**:
   - Update `DEFAULT_STATE` with `auth` structure.
   - In `loadState()`: ensure `merged.auth` is populated and seed the default user `abc@gmail.com` / `123456` if not already present in `users`.
   - Preserve existing user profiles if already stored.

2. **Authentication Views & Controller**:
   - `renderAuthPage()`:
     - Centered glassmorphic card with YUKTARA logo, theme toggle, and status alerts.
     - Renders `renderLoginForm()` when `state.auth.mode === "login"`.
     - Renders `renderRegisterForm()` when `state.auth.mode === "register"`.
   - `renderLoginForm()`:
     - Email & Password fields.
     - Demo credential callout chip (`abc@gmail.com` / `123456`) with a 1-click "Use Demo Credentials" button.
     - "Sign In" button with loading/hover states.
     - Toggle link: *"Don't have an account? Create one now"*.
   - `renderRegisterForm()`:
     - Full Name, Email, Password, and Confirm Password fields with show/hide password toggles.
     - "Create Account" submit button.
     - Toggle link: *"Already have an account? Sign in here"*.
   - Event Handlers in `attachHandlers()`:
     - `loginForm` submission: validates against `state.auth.users`. On match, sets `state.auth.currentUser`, clears error, saves state, and calls `render()`.
     - `registerForm` submission: checks password match, minimum 6 characters, uniqueness of email. On success, pushes to `state.auth.users`, logs in immediately, initializes profile name, saves state, and calls `render()`.
     - `authToggleBtn`: switches between `"login"` and `"register"`.
     - `fillDemoBtn`: auto-fills `abc@gmail.com` and `123456` into the login form.
     - `logoutBtn`: clears `currentUser`, resets UI error states, saves state, and returns to login.

3. **App Shell Routing in `render()`**:
   - Guard check: If `!state.auth || !state.auth.currentUser`, render `renderAuthPage()` instead of `.app-shell`.
   - Once logged in, render the normal SPA navigation and main content.

4. **Sidebar Enhancements (`renderSidebar()`)**:
   - Show `state.auth.currentUser.fullName` and email in the sidebar user card.
   - Add a styled **Logout** button (`#logoutBtn`) in the sidebar footer alongside theme toggle and reset data.

5. **Dashboard Profile Form (`renderProfileForm()`)**:
   - Remove `<div class="field"><label for="f-name">Your Full Name</label>...</div>`.
   - Update form submission handler to use `state.auth.currentUser.fullName` directly as `profile.name`.

---

### File 2: [css/style.css](file:///c:/Users/kusha/OneDrive/Desktop/YUKTARA_Extended/css/style.css)

1. **Authentication Container & Cards**:
   - `.auth-wrapper`: Full-height flexbox container with centered glassmorphic card, subtle radial gradients, and responsive padding.
   - `.auth-card`: Glass backdrop blur, glowing borders, brand header, and smooth entry animation.
   - `.auth-toggle-link`: Interactive switch button between Login and Registration.
   - `.demo-chip`: Clean, clickable helper badge highlighting default credentials.
   - `.auth-error-alert`: High-contrast error message badge.
2. **Sidebar Logout Button**:
   - `.logout-btn`: Styled red/warning tint glassmorphic button with icon for intuitive logout.

---

## 4. User Journey & Verification Plan

### Test Scenarios
1. **Initial State (Unauthenticated)**:
   - Launch app -> App presents the Login screen with demo credentials hint.
   - Verify theme toggle works on the login screen (Dark / Light).
2. **Default Login Flow**:
   - Click "Use Demo Credentials" (or type `abc@gmail.com` / `123456`) -> Click "Sign In".
   - App transitions into the main Dashboard.
3. **Invalid Login Flow**:
   - Enter `wrong@email.com` / `invalid` -> Verify clear error message is displayed: *"Invalid email or password. Please try again."*.
4. **Registration Flow**:
   - Click "Register here" -> Registration form opens with 4 fields: Full Name, Email, Password, Confirm Password.
   - Test password mismatch -> Shows error *"Passwords do not match."*.
   - Test valid registration -> Account is saved in `localStorage`, user is immediately logged in with their Full Name reflected across the app.
5. **Dashboard Profile Setup without "Your Full Name"**:
   - On first login or editing profile, verify that "Your Full Name" field is gone.
   - Fill in Subject, Level, Daily Study Time, Goal, and Target Date -> Submit.
   - Verify study plan and YuktaraAI accurately associate with the logged-in user's registered name.
6. **Logout Flow**:
   - Click "Logout" in sidebar -> Session ends, redirected to Login screen.
   - Verify page reload preserves logged-out status until re-authenticated.
