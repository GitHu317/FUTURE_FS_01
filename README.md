# FUTURE_FS_01 | Personal Professional Portfolio

**Internship Track:** Full Stack Web Development  
**Organization:** [Future Interns](https://www.linkedin.com/company/future-interns/)  
**Task 1:** Personal Professional Portfolio Website  

[![Live Portfolio](https://img.shields.io/badge/Live%20Demo-Available-brightgreen)](https://lincoln-portfolio-frontend.onrender.com/)

---

## 🚀 Project Overview

Welcome to my personal professional portfolio website!  

---

## 🎨 Design Philosophy

Inspired by the best on [Dribbble](https://dribbble.com), [Behance](https://www.behance.net), and [Awwwards](https://www.awwwards.com), the site combines interactive 3D backgrounds, elegant UI, and smooth experience across devices.

---

## ✨ Key Features

- **Professional Home Page:** Briefly introduces who I am and my value as a developer.
- **Projects Showcase:** Highlights real projects (incl. Future Interns tasks) with descriptions, tech stack, and links to code/live demos.
- **About / Resume Section:** Lists my technical skills, work background, interests, and career goals.
- **Contact Form:** Validates visitor input and lets anyone reach out—messages are securely stored in a MySQL DB, with real-time notification via email.
- **Interactive & Responsive:** 3D hero animation, glassmorphism styling, and full mobile/tablet/desktop support.
- **SEO Optimized:** Clean semantic markup and meta tags help me get found.
- **Scalable Backend:** Node.js/Express.js API is ready for more features like a blog if needed.
- **Deployment:** [Live site on Render](https://lincoln-portfolio-frontend.onrender.com/).
<!-- Optionally: Custom domain can be added -->

---

## 🛠️ Tech Stack

### Frontend
- **React 18 (Vite)**
- **HTML5 / CSS3**
- **JavaScript (69.8%) / CSS (25.6%) / HTML (4.6%)**
- Glassmorphism; Custom animations; Responsive layout

### Backend
- **Node.js / Express.js**
- **Email Service:** Resend API
- **Database:** MySQL
- Designed for easy feature expansion (e.g., adding a blog or storing more user data)

---
## 🔑 Environment Variables

To run this project locally or deploy to Render, you must configure a `.env` file in the `/server` directory with the following variables:

| Key | Description | Random Example Value |
| :--- | :--- | :--- |
| `PORT` | Port for the Express server | `8080` |
| `DB_HOST` | Database Hostname | `db-cluster-99.provider.net` |
| `DB_USER` | Database Username | `admin_user_x` |
| `DB_PASSWORD`| Database Password | `p@ssw0rd_Str0ng_99` |
| `DB_NAME` | Database Name | `app_production_db` |
| `DB_PORT` | Connection Port | `3306` |
| `RESEND_API_KEY`| API Key for Email | `re_xyz_9876543210abc` |
## 🗂️ Project Structure

```text
FUTURE_FS_01/
├── client/              # React frontend (Vite)
│   ├── src/             # Application logic & components
│   └── package.json     # Frontend dependencies
├── server/              # Node.js backend
│   ├── server.js        # API & Server logic
│   └── package.json     # Backend dependencies
├── .gitignore           # Root ignore file (excludes node_modules & .env)
└── database_schema.sql  # SQL script to replicate the MySQL database
```

---

## 💻 How to Run Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/GitHu317/FUTURE_FS_01.git
   cd FUTURE_FS_01
   ```

2. **Setup the front-end**
   ```bash
   cd client
   npm install
   npm run dev
   ```

3. **Setup the back-end**
   ```bash
   cd ../server
   npm install
   # Create a `.env` per the sample and set credentials for MySQL & Resend API.
   npm start
   ```

4. **Database**
   - Run the SQL script in `database_schema.sql` to create required tables in your MySQL server.

5. **Visit locally**
   - Client: [http://localhost:5173](http://localhost:5173)
   - Server defaults to: [http://localhost:5000](http://localhost:5000)

---

## 🌍 Live Demo

[https://lincoln-portfolio-frontend.onrender.com/](https://lincoln-portfolio-frontend.onrender.com/)

---

## 📦 Real-World Motivation

I built this as my "real" portfolio site—not just for an internship, but as my digital resume and proof of work for recruiters, clients, and hiring managers.  
- All examples, projects, and skills are real
- Descriptions are honest and up-to-date
- Developed with production-ready tools and professional rigor

---

## 📢 Showcase

- **Push your code to GitHub** (✓ Done!)
- **Share on LinkedIn, tag [Future Interns](https://www.linkedin.com/company/future-interns/)**

---

> Many developers get interviews only because their portfolio impresses someone.  
> Treat your site as your digital business card!

---

## 🙏 Thanks & Credits

- [Dribbble](https://dribbble.com) and [Behance](https://www.behance.net) for UI inspiration
- [Awwwards](https://www.awwwards.com) for best-in-class web design ideas
- [GitHub Portfolio Examples](https://github.com/topics/portfolio-website) for reference architectures

---
