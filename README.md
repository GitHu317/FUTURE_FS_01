# FUTURE_FS_01 | Personal Professional Portfolio

**Internship Track:** Full Stack Web Development  
**Organization:** [Future Interns](https://www.linkedin.com/company/future-interns/)  
**Task 1:** Personal Professional Portfolio Website  

## 🚀 Project Overview
This project is a high-performance, full-stack personal portfolio designed to showcase my technical skills and professional journey. It features a modern interactive frontend built with React and a robust Node.js backend to manage user inquiries.

### ✨ Key Features
* **Interactive 3D Background:** A custom-built HTML5 Canvas particle system that responds to scrolling and user interaction.
* **Full-Stack Contact System:** A functional "Contact Me" section that validates user input and stores messages in a MySQL database.
* **Automated Email Notifications:** Integrated with the **Resend API** to send real-time email alerts whenever a new inquiry is submitted.
* **SEO Optimized:** Semantic HTML and meta tags configured for maximum search engine visibility.
* **Responsive Design:** Fully fluid layout that works perfectly on mobile, tablet, and desktop.

---

## 🛠️ Tech Stack

### Frontend
* **Framework:** React 18 (Vite)
* **Styling:** Custom CSS3 with Glassmorphism effects
* **Interactions:** HTML5 Canvas API (Hero Animation)

### Backend
* **Runtime:** Node.js
* **Framework:** Express.js
* **Email Service:** Resend API
* **Database:** MySQL

---

## 📂 Project Structure
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

---

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MySQL Database
- Resend API Key (for email notifications)

### Local Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd FUTURE_FS_01
   ```

2. **Configure the Backend:**
   - Navigate to the `server` directory.
   - Copy `.env.example` to `.env`.
   - Fill in your database credentials and Resend API key.
   ```bash
   cd server
   npm install
   cp .env.example .env
   ```

3. **Configure the Frontend:**
   - Navigate to the `client` directory.
   - Copy `.env.example` to `.env`.
   - Update `VITE_API_BASE_URL` if necessary.
   ```bash
   cd ../client
   npm install
   cp .env.example .env
   ```

4. **Initialize the Database:**
   - Run the provided `database_schema.sql` in your MySQL environment to set up the required tables.

5. **Run the Application:**
   - Start the backend server:
     ```bash
     cd ../server
     npm start
     ```
   - Start the frontend development server:
     ```bash
     cd ../client
     npm run dev
     ```

## 🚀 Deployment

### Backend
- Deploy the `server` directory to a platform like Render, Railway, or Heroku.
- Set all environment variables defined in `server/.env.example` on your hosting platform.

### Frontend
- Build the project using `npm run build`.
- Deploy the resulting `dist` folder to Vercel, Netlify, or GitHub Pages.
- Ensure `VITE_API_BASE_URL` is set to your deployed backend URL during the build process.

### Database
- Use a managed MySQL service like Aiven (recommended for its easy SSL setup) or PlanetScale.