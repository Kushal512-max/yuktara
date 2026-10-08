# YUKTARA — Personalized Learning Assistant & PostgreSQL Backend

A state-of-the-art GUI study planner, adaptive AI tutor, and intelligent quiz platform built with modern web standards and powered by a serverless **PostgreSQL** backend deployed on **Netlify Functions**.

---

## 🏗️ Architecture

```
GitHub Repository
       ↓
    Netlify
   ┌───┴──────────────────────────────┐
   │                                  │
   ▼                                  ▼
Frontend (HTML5 / CSS / Vanilla JS)   Netlify Functions (/api/*)
   - Glassmorphic UI                  - auth-register (bcrypt hashing)
   - Adaptive Quiz Engine             - auth-login (bcrypt verification)
   - YuktaraAI Tutor & Planner        - quiz-attempt & study-session
   - Backend & DB Admin Dashboard     - admin-data & admin-query
                                      - admin-export & admin-user-detail
                                      - health & init-db
                                                 │
                                                 ▼
                                        PostgreSQL Database
                                  (Cloud: Neon / Supabase / Railway)
                                  ┌──────────────┼──────────────┐
                                  ▼              ▼              ▼
                                users        auth_logs     quiz_attempts
                                                 │
                                                 ▼
                                           study_sessions
```

- **PostgreSQL as the Single Source of Truth**: All user registrations, logins, quiz attempts, and study sessions are stored directly in PostgreSQL with no local database file fallbacks.
- **Serverless API**: Netlify Functions handle all API endpoints under `/api/*`.
- **Identical Local & Production Environment**: The local development server (`server.js`) uses the exact same Netlify Function handlers to ensure 100% feature and behavioral parity.

---

## 🌟 Key Features

### 1. Robust Authentication & Account Persistence
- **Secure Password Hashing**: Passwords hashed with `bcryptjs` (salt rounds: 12) before storage.
- **Live User Registration**: Validates name, email, and password, and immediately persists records to PostgreSQL `users`.
- **Audit Logging**: Every registration and login attempt (success or failure) is logged to `auth_logs` with timestamps, IP address, and status.
- **Demo Mode**: 1-click demo login available for quick testing.

### 2. Live Backend & Database Admin Dashboard
- **Real-Time Analytics**:
  - Registered Users count
  - Auth Log Entries count
  - Quiz Attempts count
  - Study Sessions count
  - Average Quiz Score percentage
- **Interactive Data Views**:
  - **Users Table**: User ID, full name, email, role, joined date, and last login.
  - **User Profiles**: Expandable profile cards showing deep analytics per student.
  - **Auth Logs Table**: Timestamped audit trail of auth activity.
  - **Quiz Attempts Table**: Subject, topic, score, percentage, mode, and completion time.
  - **Study Sessions Table**: Subject, subtopic, duration, and status.
- **Live SQL Query Runner**:
  - Direct execution of `SELECT` queries against PostgreSQL.
  - Built-in SQL injection and mutation safeguards (blocks `DROP`, `DELETE`, `TRUNCATE`, `UPDATE`, `INSERT`, `ALTER`).
  - Pre-set shortcut queries for fast inspection.
- **Data Export**: 1-click JSON export of the entire database (`/api/admin/export`).

### 3. Adaptive Quiz Engine
- **5 MCQs Per Quiz**: Every quiz module contains 5 Multiple Choice Questions + Short Answer evaluations.
- **Practice & Timed Quiz Modes**: Choose between un-timed practice with hints or timed evaluation mode.
- **Answer Key & Review**: Option-by-option breakdowns, keyword extraction, and score persistence in PostgreSQL.

### 4. Dynamic AI Tutor & Study Planner
- **Exact Daily Study Time Scheduler**: Dynamically allocates daily study schedules.
- **Quiz MCQ Explainer Engine**: Deep explanation of questions and options.
- **Level-Adaptive Tutor**: Tailors explanations to Beginner, Intermediate, or Advanced expertise.

---

## 🚀 Local Development Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- A cloud PostgreSQL database URL (from [Neon](https://neon.tech), [Supabase](https://supabase.com), [Railway](https://railway.app), or local PostgreSQL)

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Open `.env` and fill in your PostgreSQL connection string:
```ini
DATABASE_URL=postgresql://username:password@your-db-host.neon.tech/yuktara?sslmode=require
INIT_TOKEN=your_optional_secret_token
```

### 3. Initialize the Database Schema (Optional)
The schema is automatically created on first function run using idempotent `CREATE TABLE IF NOT EXISTS` statements. You can also run it explicitly:
```bash
npm run init-db
```

### 4. Start the Local Server
```bash
npm run dev
# or
npm start
```
Navigate to `http://localhost:3000` in your browser.

---

## 🌐 Netlify Deployment

1. **Push your code to GitHub** (ensure `.env` is NOT committed; `.gitignore` already protects it).
2. **Import into Netlify**:
   - Go to [Netlify](https://app.netlify.com/) → **Add new site** → **Import an existing project**.
   - Select your GitHub repository.
3. **Configure Build Settings**:
   - **Build command**: (leave blank or `npm run build:bank`)
   - **Publish directory**: `.`
   - **Functions directory**: `netlify/functions` (automatically read from `netlify.toml`)
4. **Add Environment Variables in Netlify**:
   - Go to **Site Configuration** → **Environment variables**.
   - Add `DATABASE_URL`: Your full cloud PostgreSQL connection string (`postgresql://...`).
   - Add `INIT_TOKEN`: (Optional) Secret token for manually triggering `/api/init-db`.
5. **Deploy**:
   - Click **Deploy Site**. Netlify will build and deploy the frontend and serverless functions.
   - All `/api/*` endpoints will route directly to the respective functions as configured in `netlify.toml`.

---

## 🔒 Security Best Practices
- **No Stored Plaintext Passwords**: Passwords hashed with bcrypt cost factor 12.
- **SQL Injection Immune**: All queries use parameterized statements (`$1`, `$2`, ...).
- **Environment Secrets Protected**: `.env` and SQLite files are strictly listed in `.gitignore`.
- **Admin Isolation**: Admin queries and endpoints require admin role authorization (`X-Admin-Email`).
- **SELECT-Only SQL Console**: Mutation queries are blocked on the SQL runner endpoint to protect data integrity.

---

## 📄 License
MIT
