import { DS } from "@/theme/designSystem";

const FOOTER_COLUMNS = {
  "Quick Links": ["Latest Jobs", "Results", "Admit Cards", "Syllabus", "Exam Calendar", "Answer Keys"],
  Categories: ["UPSC", "SSC", "Railways", "Banking", "Defence", "Police", "Teaching"],
  "Top States": ["Uttar Pradesh", "Bihar", "Rajasthan", "Maharashtra", "Madhya Pradesh", "Jharkhand"],
  Company: ["About Us", "Advertise", "Privacy Policy", "Terms of Service", "Contact", "Disclaimer"],
};

const SOCIAL_LINKS = ["Telegram", "YouTube", "X", "Instagram"];

export default function Footer() {
  return (
    <footer style={{ background: DS.bg0, borderTop: `1px solid ${DS.border}`, padding: "36px 20px 18px" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", gap: 28, marginBottom: 28 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{ width: 34, height: 34, background: DS.gradientBrand, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17 }}>🇮🇳</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 900, color: DS.white, letterSpacing: 1.5, lineHeight: 1, fontFamily: "'Sora',sans-serif" }}>
                  BHARAT<span style={{ color: DS.saffron }}>NAUKRI</span>
                </div>
                <div style={{ fontSize: 8, color: DS.muted, letterSpacing: 2, fontFamily: "monospace" }}>GOV JOBS PORTAL</div>
              </div>
            </div>
            <p style={{ fontSize: 12.5, color: DS.muted, fontFamily: "'Outfit',sans-serif", lineHeight: 1.7, marginBottom: 12 }}>
              India's most comprehensive government job portal. Real-time alerts, verified listings, all 28 states.
            </p>
            <div style={{ fontSize: 11, color: DS.mutedHi, fontFamily: "'Outfit',sans-serif", background: DS.bg2, border: `1px solid ${DS.border}`, borderRadius: 8, padding: "10px 12px", lineHeight: 1.6 }}>
              ⚠️ Disclaimer: Independent aggregator. Not affiliated with any government body. Verify at official sites.
            </div>
          </div>
          {Object.entries(FOOTER_COLUMNS).map(([heading, links]) => (
            <div key={heading}>
              <h4 style={{ fontSize: 11, fontWeight: 700, color: DS.white, letterSpacing: 1.5, marginBottom: 12, fontFamily: "'Outfit',sans-serif", textTransform: "uppercase" }}>{heading}</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 7 }}>
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      style={{ fontSize: 12.5, color: DS.muted, fontFamily: "'Outfit',sans-serif", textDecoration: "none", transition: "color 0.12s" }}
                      onMouseEnter={(e) => (e.target.style.color = DS.saffron)}
                      onMouseLeave={(e) => (e.target.style.color = DS.muted)}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ borderTop: `1px solid ${DS.border}`, paddingTop: 16, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
          <span style={{ fontSize: 11.5, color: "#1A2535", fontFamily: "'Outfit',sans-serif" }}>© 2025 BharatNaukri · Made with ❤️ in India · GST Registered</span>
          <div style={{ display: "flex", gap: 14 }}>
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s}
                href="#"
                style={{ fontSize: 11.5, color: "#1A2535", fontFamily: "'Outfit',sans-serif", textDecoration: "none", transition: "color 0.12s" }}
                onMouseEnter={(e) => (e.target.style.color = DS.saffron)}
                onMouseLeave={(e) => (e.target.style.color = "#1A2535")}
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
