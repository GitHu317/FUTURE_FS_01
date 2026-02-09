const express = require('express');
const mysql = require('mysql2/promise'); 
const cors = require('cors');
const { Resend } = require('resend');
require('dotenv').config();

const app = express();

// --- INITIALIZE SERVICES ---
const resend = new Resend(process.env.RESEND_API_KEY);

app.use(cors());
app.use(express.json());

// --- DATABASE CONNECTION (Optimized for Aiven Cloud) ---
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD, 
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 18980,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: { rejectUnauthorized: false } // Crucial for Aiven/DigitalOcean
});

// --- AUTO-CREATE TABLE & TEST CONNECTION ---
(async () => {
    try {
        const connection = await pool.getConnection();
        console.log("✅ Database Engine: Connected & Ready");

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
        console.log("✅ Data Infrastructure: Table verified");
        
        connection.release();
    } catch (err) {
        console.error("❌ System Setup Failed:", err.message);
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

    // Basic Validation
    if (!name || !email || !message) {
        return res.status(400).json({ error: "Missing required fields: name, email, or message." });
    }

    try {
        // 1. Persist Data to MySQL
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

        // 2. Trigger AI-driven Notification (via Resend)
        try {
            await resend.emails.send({
                from: 'Growth Lead <onboarding@resend.dev>',
                to: 'lincolnalexyv86@gmail.com',
                subject: `🚀 New Growth Opportunity: ${name}`,
                html: `
                    <div style="font-family: sans-serif; line-height: 1.6;">
                        <h2>New Inquiry Received</h2>
                        <p><strong>Lead Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Interest:</strong> ${projectType}</p>
                        <p><strong>Budget Range:</strong> ${budget}</p>
                        <hr />
                        <p><strong>Message:</strong><br />${message}</p>
                    </div>
                `
            });
            console.log("📧 Notification sent to owner.");
        } catch (emailErr) {
            console.error("⚠️ Email Dispatch Failed:", emailErr.message);
            // We don't return an error to the user here because the data is already saved in the DB.
        }
        
        res.status(201).json({ 
            success: true,
            message: "Inquiry received. Our systems have logged your request.", 
            id: result.insertId 
        });

    } catch (error) {
        console.error("❌ Transaction Error:", error);
        res.status(500).json({ error: "Internal server error during data persistence." });
    }
});

// Health Check Route
app.get('/', (req, res) => {
    res.status(200).send('Core API Systems: Operational');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 AI-Growth Engine running on port ${PORT}`);
});
