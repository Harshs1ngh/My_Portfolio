import { portfolioData } from "../data/portfolio";

export default function Footer() {
  const { name, githubUrl, linkedinUrl, email } = portfolioData;
  const year = new Date().getFullYear();

  return (
    <footer style={{
      padding: "40px 4vw",
      borderTop: "1px solid var(--border)",
      background: "var(--bg)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}
    className="footer"
    >
      <p style={{
        fontSize: 12, letterSpacing: "1px",
        color: "var(--text-dim)",
      }}>
        © {year} {name}. Designed & built with React.
      </p>
      <div style={{ display: "flex", gap: 24 }}>
        {[
          ["GitHub", githubUrl],
          ["LinkedIn", linkedinUrl],
          ["Email", `mailto:${email}`],
        ].map(([label, href]) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            data-cursor-hover
            style={{
              fontSize: 12, letterSpacing: "2px",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.target.style.color = "var(--accent)")}
            onMouseLeave={(e) => (e.target.style.color = "var(--text-muted)")}
          >{label}</a>
        ))}
      </div>
      <style>{`
        @media (max-width: 640px) {
          .footer { flex-direction: column; gap: 16px; text-align: center; }
        }
      `}</style>
    </footer>
  );
}