const express = require('express');
const mysql = require('mysql2/promise'); 
const cors = require('cors');
const { Resend } = require('resend');
require('dotenv').config();

const app = express();

// Initialize Resend (Optional: Only works if you have a RESEND_API_KEY in .env)
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

app.use(cors());
app.use(express.json());

// --- DATABASE CONNECTION (Updated for Aiven SSL) ---
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD, // Make sure this matches your .env key
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 18980,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: { rejectUnauthorized: false } // REQUIRED for Aiven
});

// --- AUTO-CREATE TABLE & TEST CONNECTION ---
(async () => {
    try {
        const connection = await pool.getConnection();
        console.log("✅ Connected to MySQL Database!");

        const createTableQuery = `
        CREATE TABLE IF NOT EXISTS portfolio_messages (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            phone VARCHAR(50),
            company VARCHAR(255),
            projectType VARCHAR(100) DEFAULT 'General',
            budget VARCHAR(100) DEFAULT 'Not Specified',
            message TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );`;
        
        await connection.query(createTableQuery);
        console.log("✅ Table 'portfolio_messages' verified/created.");
        
        connection.release();
    } catch (err) {
        console.error("❌ MySQL Setup Failed:", err);
    }
})();

// --- API ROUTES ---

app.post('/api/contact', async (req, res) => {
    const { 
        name, 
        email, 
        phone, 
        company, 
        projectType, 
        budget, 
        message 
    } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: "Name, email, and message are required." });
    }

    try {
        // 1. Save to Database
        const query = `
            INSERT INTO portfolio_messages 
            (name, email, phone, company, projectType, budget, message) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        
        const [result] = await pool.execute(query, [
            name, 
            email, 
            phone || null,
            company || null, 
            projectType || 'General', 
            budget || 'Not Specified', 
            message
        ]);

        // 2. Send Email via Resend (Only if API Key exists)
        if (resend) {
            try {
                await resend.emails.send({
                    from: 'Portfolio Contact <onboarding@resend.dev>',
                    to: 'lincolnalexyv86@gmail.com',
                    subject: `🚀 New Project Inquiry: ${name}`,
                    html: `
                        <h2>New Portfolio Message</h2>
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Project Type:</strong> ${projectType}</p>
                        <p><strong>Message:</strong> ${message}</p>
                    `
                });
                console.log("📧 Email sent successfully");
            } catch (emailErr) {
                console.error("⚠️ Email failed to send, but data was saved to DB.");
            }
        }
        
        console.log(`📩 Message saved to DB (ID: ${result.insertId})`);
        
        res.status(201).json({ 
            message: "Message sent successfully!", 
            id: result.insertId 
        });

    } catch (error) {
        console.error("❌ Server Error:", error);
        res.status(500).json({ error: "Failed to process your message." });
    }
});

// Handle the root path to avoid "Cannot GET /"
app.get('/', (req, res) => {
    res.send('Portfolio Backend is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
