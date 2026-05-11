import { useState } from "react";
import { DS } from "@/theme/designSystem";

const CHANNELS = ["Email", "WhatsApp", "Telegram", "Push"];

export default function AlertSection() {
  const [email, setEmail] = useState("");
  const [sub, setSub] = useState(false);
  /** Single channel at a time (radio-style) — clearer than multi-select for this UI. */
  const [channel, setChannel] = useState("Email");

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

          <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 18, flexWrap: "wrap" }} role="radiogroup" aria-label="Alert channel">
            {CHANNELS.map((c) => {
              const active = channel === c;
              return (
                <button
                  key={c}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => setChannel(c)}
                  style={{
                    background: active ? DS.accentChipActiveBg : DS.bg1,
                    border: `1px solid ${active ? DS.accentChipActiveBorder : DS.border}`,
                    borderRadius: 10,
                    padding: "7px 16px",
                    fontSize: 12.5,
                    fontWeight: active ? 700 : 500,
                    color: active ? DS.saffron : DS.muted,
                    cursor: "pointer",
                    fontFamily: "'Outfit',sans-serif",
                    transition: "background 0.12s, border-color 0.12s, color 0.12s",
                    boxShadow: active ? `0 0 0 1px ${DS.accentBorderLo}` : "none",
                  }}
                >
                  {c}
                </button>
              );
            })}
          </div>

          {sub ? (
            <p style={{ color: DS.green, fontSize: 14, fontFamily: "'Outfit',sans-serif", padding: "14px 0" }}>
              {"✅ You're subscribed! Alerts will arrive on "}
              <strong style={{ color: DS.white }}>{channel}</strong>.
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
