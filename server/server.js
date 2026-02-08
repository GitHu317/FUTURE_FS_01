const express = require('express');
const mysql = require('mysql2/promise'); 
const cors = require('cors');
const { Resend } = require('resend'); //
require('dotenv').config();

const app = express();

const resend = new Resend(process.env.RESEND_API_KEY);

app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

(async () => {
    try {
        const connection = await pool.getConnection();
        console.log("✅ Connected to MySQL Database!");
        connection.release();
    } catch (err) {
        console.error("❌ MySQL Connection Failed:", err);
    }
})();


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
        const query = `
            INSERT INTO messages 
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

      
        await resend.emails.send({
            from: 'Portfolio Contact <onboarding@resend.dev>',
            to: 'lincolnalexyv86@gmail.com',
            subject: `🚀 New Project Inquiry: ${name}`,
            html: `
                <h2>You have a new message from your portfolio!</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
                <p><strong>Company:</strong> ${company || 'N/A'}</p>
                <p><strong>Project Type:</strong> ${projectType}</p>
                <p><strong>Budget:</strong> ${budget}</p>
                <hr />
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `
        });
        
        console.log(`📩 Message saved to DB (ID: ${result.insertId}) and Email sent for ${name}`);
        
        res.status(201).json({ 
            message: "Message sent successfully!", 
            id: result.insertId 
        });

    } catch (error) {
        console.error("❌ Server Error:", error);
        res.status(500).json({ error: "Failed to process your message." });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));