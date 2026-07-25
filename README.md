# 🚀 TaskFlow - AI Powered Task Management System

TaskFlow is a modern AI-powered task management application designed to help users organize, prioritize, and track their daily work efficiently.

Built with React, Spring Boot, Spring Security, JWT Authentication, MySQL, and Google Gemini AI, the application combines secure task management with AI-powered productivity features in a clean and responsive interface.

## ✨ Features

### 🔐 Authentication & Security
- User Registration
- Secure Login
- JWT Authentication
- Spring Security Authorization
- BCrypt Password Encryption
- User-specific Task Management
- Delete Account

---

### 📋 Task Management

- Create Tasks
- Edit Tasks
- Delete Tasks
- Search Tasks
- Filter Tasks
- Sort Tasks
- Task Priorities
- Due Dates
- Status Tracking
- User-specific Task Isolation

---

### 🤖 AI Features

Powered by Google Gemini AI to automate task creation and improve productivity.

- ✨ AI Description Generator
- 🔥 AI Priority Suggestion
- 🚀 Smart Fill (Automatically generates task details)

---

### 📊 Dashboard & Analytics

- Total Tasks
- Completed Tasks
- Pending Tasks
- In Progress Tasks
- Interactive Task Analytics Chart

---

### 🎨 User Experience

- Responsive Design
- Modern Glassmorphism UI
- Dark Theme
- Multiple Theme Colors
- Toast Notifications
- SweetAlert2 Confirmations

---

## 🛠️ Tech Stack

### Frontend

- React.js
- Axios
- React Router
- React Toastify
- SweetAlert2
- Recharts
- CSS3

### Backend

- Java 17
- Spring Boot
- Spring Security
- JWT Authentication
- Maven

### Database

- MySQL

### AI

- Google Gemini API

---

## 📂 Project Structure

```
TaskFlow
│
├── backend
│   ├── auth
│   ├── controller
│   ├── service
│   ├── repository
│   ├── entity
│   ├── security
│   └── resources
│
└── frontend
    ├── components
    ├── pages
    ├── services
    ├── api
    └── assets
```

---

## 🔒 Authentication Flow

```text
Register
      │
      ▼
Password Encryption (BCrypt)
      │
      ▼
Login
      │
      ▼
JWT Token Generation
      │
      ▼
Protected APIs
      │
      ▼
User Specific Tasks
```

---

## 🤖 AI Workflow

```text
User enters task title
        │
        ▼
Google Gemini API
        │
        ▼
Generate Description
Suggest Priority
Smart Fill
```

---

## 🚀 Getting Started

### Clone Repository

```bash
git clone https://github.com/yourusername/taskflow.git
```

---

### Backend

```bash
cd backend
mvn spring-boot:run
```

Backend runs on

```
http://localhost:8080
```

---
Configure your database and application properties before running the backend.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on

```
http://localhost:5173
```

---

## 📸 Screenshots

### Login

*(Screenshots will be added after deployment.)*

### Dashboard

*(Screenshots will be added after deployment.)*

### Analytics

*(Screenshots will be added after deployment.)*

### AI Smart Fill

*(Screenshots will be added after deployment.)*

### Task List

*(Screenshots will be added after deployment.)*

---

## 🎯 Future Improvements

- Email Notifications
- Recurring Tasks
- Calendar Integration
- File Attachments
- Team Collaboration
- Mobile Application

---

## 👩‍💻 Developer

**Dhanya Shree A**

B.Tech in Computer Science Engineering (AI & ML)

Alliance University

---

## ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.

Thank you for visiting the repository!

## 🌐 Live Demo

Frontend: https://taskflow.vercel.app

Backend API: https://taskflow.onrender.com