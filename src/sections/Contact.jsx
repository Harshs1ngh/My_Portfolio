import { useState } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "../components/ScrollReveal";
import { portfolioData } from "../data/portfolio";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null); // null | "sending" | "success" | "error"

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(
        process.env.REACT_APP_API_URL
          ? `${process.env.REACT_APP_API_URL}/api/contact`
          : "http://localhost:5000/api/contact",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else throw new Error();
    } catch {
      setStatus("error");
    }
  };

  const { email, github, linkedin, githubUrl, linkedinUrl } = portfolioData;

  return (
    <section id="contact" style={{
      padding: "120px 4vw 80px",
      background: "var(--bg)",
      minHeight: "80vh",
    }}>
      <ScrollReveal>
        <p style={{
          fontSize: 11, letterSpacing: "3px",
          textTransform: "uppercase", color: "var(--accent)", marginBottom: 16,
        }}>// 05 — Contact</p>
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <h2 style={{
          fontFamily: "var(--font-disp)",
          fontSize: "clamp(56px, 9vw, 110px)",
          lineHeight: 0.88, letterSpacing: "2px",
          color: "var(--text)", marginBottom: 64,
        }}>LET'S<br/>BUILD.</h2>
      </ScrollReveal>

      <div className="contact-grid">
        {/* Info */}
        <ScrollReveal delay={0.15}>
          <div>
            {[
              ["Email", email, `mailto:${email}`],
              ["GitHub", github, githubUrl],
              ["LinkedIn", linkedin, linkedinUrl],
            ].map(([label, val, href]) => (
              <div key={label} style={{ marginBottom: 32 }}>
                <p style={{
                  fontSize: 11, letterSpacing: "2px", textTransform: "uppercase",
                  color: "var(--text-dim)", marginBottom: 6,
                }}>{label}</p>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  data-cursor-hover
                  style={{
                    fontSize: 14, color: "var(--accent)",
                    letterSpacing: "0.5px",
                    borderBottom: "1px solid rgba(78,154,241,0.25)",
                    paddingBottom: 2,
                    transition: "color 0.2s",
                  }}
                >{val}</a>
              </div>
            ))}
            <div style={{ marginTop: 48, padding: "24px", border: "1px solid var(--border)" }}>
              <p style={{ fontSize: 11, letterSpacing: "2px", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: 8 }}>
                Response time
              </p>
              <p style={{ fontSize: 14, color: "#4ade80" }}>Usually within 24 hours</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Form */}
        <ScrollReveal delay={0.3}>
          <form onSubmit={handleSubmit} noValidate>
            {[
              { name: "name", label: "Name", type: "text", placeholder: "Your name" },
              { name: "email", label: "Email", type: "email", placeholder: "your@email.com" },
            ].map((field) => (
              <div key={field.name} style={{ marginBottom: 24 }}>
                <label style={{
                  display: "block", fontSize: 11, letterSpacing: "2px",
                  textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 8,
                }}>{field.label}</label>
                <input
                  name={field.name}
                  type={field.type}
                  value={form[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  required
                  style={{
                    width: "100%", background: "var(--bg2)",
                    border: "1px solid var(--border)",
                    color: "var(--text)", fontSize: 14,
                    padding: "14px 16px", outline: "none",
                    transition: "border-color 0.2s",
                    fontFamily: "var(--font-body)",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
                  onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                />
              </div>
            ))}

            <div style={{ marginBottom: 24 }}>
              <label style={{
                display: "block", fontSize: 11, letterSpacing: "2px",
                textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 8,
              }}>Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about your project..."
                required
                rows={6}
                style={{
                  width: "100%", background: "var(--bg2)",
                  border: "1px solid var(--border)",
                  color: "var(--text)", fontSize: 14,
                  padding: "14px 16px", outline: "none",
                  resize: "none",
                  transition: "border-color 0.2s",
                  fontFamily: "var(--font-body)",
                }}
                onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              data-cursor-hover
              className="submit-btn"
              style={{
                width: "100%", padding: 16,
                background: "transparent",
                border: "1px solid var(--accent)",
                color: "var(--accent)",
                fontSize: 12, letterSpacing: "3px",
                textTransform: "uppercase",
                fontFamily: "var(--font-body)",
                position: "relative", overflow: "hidden",
                transition: "color 0.3s",
                opacity: status === "sending" ? 0.7 : 1,
              }}
            >
              <span style={{ position: "relative", zIndex: 1 }}>
                {status === "sending" ? "Sending..." : "Send Message →"}
              </span>
            </button>

            {status === "success" && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ marginTop: 16, fontSize: 13, color: "#4ade80", letterSpacing: "0.5px" }}
              >
                ✓ Message sent! I'll get back to you soon.
              </motion.p>
            )}
            {status === "error" && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ marginTop: 16, fontSize: 13, color: "#f87171", letterSpacing: "0.5px" }}
              >
                ✗ Couldn't send. Email me at {email}
              </motion.p>
            )}
          </form>
        </ScrollReveal>
      </div>

      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          gap: 80px;
          align-items: start;
        }
        .submit-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--accent);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.35s cubic-bezier(0.16,1,0.3,1);
          z-index: 0;
        }
        .submit-btn:hover::before { transform: scaleX(1); }
        .submit-btn:hover { color: var(--bg) !important; }
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr; gap: 48px; }
        }
      `}</style>
    </section>
  );
}