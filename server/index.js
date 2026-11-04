// server/index.js
// Run: node index.js  |  Dev: nodemon index.js
// Install deps: npm install

require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const app = express();
app.use(express.json());

// ── CORS: allow your deployed frontend origin ──
const allowedOrigins = [
  "http://localhost:3000",
  process.env.FRONTEND_URL, // set this in .env for production
].filter(Boolean);

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
      cb(new Error("Not allowed by CORS"));
    },
  })
);

// ── Rate limit: 5 contact attempts per 15 min per IP ──
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: "Too many requests. Please try again later." },
});

// ── Nodemailer transporter ──
// Gmail setup:
//   1. Google Account → Security → Enable 2-Step Verification
//   2. Search "App Passwords" → Mail → generate 16-char password
//   3. Set EMAIL_USER and EMAIL_PASS in .env
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ── POST /api/contact ──
app.post("/api/contact", contactLimiter, async (req, res) => {
  const { name, email, message } = req.body;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return res.status(400).json({ error: "Invalid email address." });
  }

  if (message.length > 2000) {
    return res.status(400).json({ error: "Message too long (2000 chars max)." });
  }

  const mailOptions = {
    from: `"${name}" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    replyTo: email.trim(),
    subject: `Portfolio Contact — ${name}`,
    html: `
      <div style="font-family:monospace;max-width:600px;padding:36px;
                  background:#0f1117;color:#f1f1f1;
                  border:1px solid rgba(78,154,241,0.3);">
        <h2 style="font-size:22px;letter-spacing:4px;color:#4e9af1;margin-bottom:28px;">
          NEW MESSAGE
        </h2>
        <p style="margin-bottom:8px;">
          <strong style="color:#e6b980;">FROM:</strong>&nbsp;&nbsp;${name}
        </p>
        <p style="margin-bottom:8px;">
          <strong style="color:#e6b980;">EMAIL:</strong>&nbsp;&nbsp;
          <a href="mailto:${email}" style="color:#4e9af1;">${email}</a>
        </p>
        <hr style="border:1px solid rgba(241,241,241,0.08);margin:24px 0;"/>
        <p style="line-height:1.75;color:rgba(241,241,241,0.8);">
          ${message.replace(/\n/g, "<br/>")}
        </p>
        <p style="margin-top:32px;font-size:11px;color:rgba(241,241,241,0.3);
                  letter-spacing:2px;text-transform:uppercase;">
          Sent from harsh-portfolio contact form
        </p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`[contact] ✓ ${name} <${email}>`);
    res.status(200).json({ success: true, message: "Email sent successfully." });
  } catch (err) {
    console.error("[contact] ✗ Send failed:", err.message);
    res.status(500).json({ error: "Failed to send email. Please try again." });
  }
});

// ── Health check ──
app.get("/api/health", (_, res) =>
  res.json({ status: "ok", ts: new Date().toISOString() })
);

// ── 404 fallback ──
app.use((_, res) => res.status(404).json({ error: "Not found" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`\n Server running → http://localhost:${PORT}\n`)
);