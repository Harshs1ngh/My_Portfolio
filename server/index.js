require("dotenv").config();

const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const app = express();

app.set("trust proxy", 1);
app.use(express.json({ limit: "10kb" }));

// CORS configuration
const allowedOrigins = [
  "http://localhost:3000",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
  })
);

// Rate limiting
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    error: "Too many requests. Please try again later.",
  },
});

// Gmail transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Escape HTML to prevent HTML injection
const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (char) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[char];
  });

// Contact endpoint
app.post("/api/contact", contactLimiter, async (req, res) => {
  const { name, email, message } = req.body || {};

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof message !== "string" ||
    !name.trim() ||
    !email.trim() ||
    !message.trim()
  ) {
    return res.status(400).json({
      error: "All fields are required.",
    });
  }

  const cleanName = name.trim();
  const cleanEmail = email.trim();
  const cleanMessage = message.trim();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(cleanEmail)) {
    return res.status(400).json({
      error: "Invalid email address.",
    });
  }

  if (cleanName.length > 100 || cleanEmail.length > 254) {
    return res.status(400).json({
      error: "Name or email is too long.",
    });
  }

  if (cleanMessage.length > 2000) {
    return res.status(400).json({
      error: "Message too long (2000 chars max).",
    });
  }

  const safeName = escapeHtml(cleanName);
  const safeEmail = escapeHtml(cleanEmail);
  const safeMessage = escapeHtml(cleanMessage).replace(/\n/g, "<br/>");

  const mailOptions = {
    from: `"${cleanName.replace(/["\r\n]/g, "")}" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    replyTo: cleanEmail,
    subject: `Portfolio Contact — ${cleanName}`,
    html: `
      <div style="font-family:monospace;max-width:600px;padding:36px;
                  background:#0f1117;color:#f1f1f1;
                  border:1px solid rgba(78,154,241,0.3);">

        <h2 style="font-size:22px;letter-spacing:4px;color:#4e9af1;margin-bottom:28px;">
          NEW MESSAGE
        </h2>

        <p style="margin-bottom:8px;">
          <strong style="color:#e6b980;">FROM:</strong>&nbsp;&nbsp;${safeName}
        </p>

        <p style="margin-bottom:8px;">
          <strong style="color:#e6b980;">EMAIL:</strong>&nbsp;&nbsp;
          <a href="mailto:${safeEmail}" style="color:#4e9af1;">${safeEmail}</a>
        </p>

        <hr style="border:1px solid rgba(241,241,241,0.08);margin:24px 0;"/>

        <p style="line-height:1.75;color:rgba(241,241,241,0.8);">
          ${safeMessage}
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

    console.log(`[contact] Email sent: ${cleanName} <${cleanEmail}>`);

    return res.status(200).json({
      success: true,
      message: "Email sent successfully.",
    });
  } catch (err) {
    console.error("[contact] Send failed:", err.message);

    return res.status(500).json({
      error: "Failed to send email. Please try again.",
    });
  }
});

// Health check
app.get("/api/health", (_, res) => {
  res.json({
    status: "ok",
    ts: new Date().toISOString(),
  });
});

// 404 fallback
app.use((_, res) => {
  res.status(404).json({
    error: "Not found",
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("[server] Error:", err.message);

  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({
      error: "Origin not allowed.",
    });
  }

  res.status(500).json({
    error: "Internal server error.",
  });
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});