import { useState } from "react";
import { DS } from "@/theme/designSystem";

const CHANNELS = ["Email", "WhatsApp", "Telegram", "Push"];

export default function AlertSection() {
  const [email, setEmail] = useState("");
  const [sub, setSub] = useState(false);
  const [channels, setChannels] = useState(["Email"]);

  const toggleCh = (c) =>
    setChannels((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));

  return (
    <div style={{ padding: "40px 20px", background: DS.bg0, borderTop: `1px solid ${DS.border}` }}>
      <div style={{ maxWidth: 800, margin: "0 auto", background: DS.alertPanelBg, border: `1px solid ${DS.accentBorderLo}`, borderRadius: 22, padding: "42px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 50% 0%,${DS.accentGlow},transparent 60%)`, pointerEvents: "none" }} />
        <div style={{ position: "relative" }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🔔</div>
          <h2 style={{ fontSize: 26, fontWeight: 900, color: DS.white, fontFamily: "'Sora',sans-serif", marginBottom: 8, letterSpacing: 0.5 }}>Never Miss a Sarkari Naukri</h2>
          <p style={{ fontSize: 13.5, color: DS.mutedHi, marginBottom: 26, lineHeight: 1.6, maxWidth: 440, margin: "0 auto 24px" }}>
            Instant alerts when new vacancies open. Customised by state, category, and qualification level.
          </p>

          <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 18, flexWrap: "wrap" }}>
            {CHANNELS.map((c) => {
              const active = channels.includes(c);
              return (
                <button
                  key={c}
                  onClick={() => toggleCh(c)}
                  style={{
                    background: active ? DS.accentChipActiveBg : DS.bg2,
                    border: `1px solid ${active ? DS.accentChipActiveBorder : DS.borderHi}`,
                    borderRadius: 10,
                    padding: "7px 16px",
                    fontSize: 12.5,
                    fontWeight: active ? 700 : 400,
                    color: active ? DS.saffron : DS.mutedHi,
                    cursor: "pointer",
                    fontFamily: "'Outfit',sans-serif",
                    transition: "all 0.12s",
                  }}
                >
                  {c}
                </button>
              );
            })}
          </div>

          {sub ? (
            <p style={{ color: "#22C55E", fontSize: 14, fontFamily: "'Outfit',sans-serif", padding: "14px 0" }}>
              ✅ You're subscribed! Alerts will arrive on {channels.join(", ")}.
            </p>
          ) : (
            <div style={{ display: "flex", gap: 10, maxWidth: 460, margin: "0 auto" }}>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                style={{ flex: 1, background: DS.bg2, border: `1px solid ${DS.borderHi}`, borderRadius: 12, padding: "12px 16px", fontSize: 13, color: DS.white, outline: "none", fontFamily: "'Outfit',sans-serif" }}
              />
              <button
                onClick={() => {
                  if (email.includes("@")) setSub(true);
                }}
                style={{ background: DS.gradientBrand, border: "none", borderRadius: 12, padding: "12px 22px", fontSize: 13, fontWeight: 700, color: DS.inkOnBrand, cursor: "pointer", flexShrink: 0, fontFamily: "'Outfit',sans-serif" }}
              >
                Get Alerts
              </button>
            </div>
          )}

          <p style={{ fontSize: 10.5, color: DS.muted, marginTop: 12, fontFamily: "'Outfit',sans-serif" }}>
            Free · No spam · Unsubscribe anytime · 4,80,000+ subscribers
          </p>
        </div>
      </div>
    </div>
  );
}
