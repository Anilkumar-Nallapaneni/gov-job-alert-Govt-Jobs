import { useEffect, useState } from "react";
import { DS } from "@/theme/designSystem";

const NAV_ITEMS = ["Home", "Jobs", "Results", "Admit Card", "Alert"];

/** en-IN style: "12 May 2026" */
function formatNavDate(d) {
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }).replace(/,/g, "").trim();
}

/** "2:17:34 pm" */
function formatNavTime(d) {
  return d
    .toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit", second: "2-digit", hour12: true })
    .replace(/\s*a\.?m\.?/i, " am")
    .replace(/\s*p\.?m\.?/i, " pm")
    .toLowerCase();
}

const toViewId = (label) => label.toLowerCase().replace(" ", "-");

export default function Navbar({ view, setView, search, setSearch, onSearch, colorMode = "bw", onColorModeChange }) {
  const isLight = colorMode === "bw";
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <nav
      style={{
        background: DS.navScrim,
        borderBottom: `1px solid ${DS.border}`,
        backdropFilter: "blur(12px)",
        position: "sticky",
        top: 0,
        zIndex: 200,
        height: 58,
        display: "flex",
        alignItems: "center",
        padding: "0 20px",
        gap: 12,
        flexShrink: 0,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0, cursor: "pointer" }} onClick={() => setView("home")}>
        <div
          style={{
            width: 36,
            height: 36,
            background: DS.gradientBrand,
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
            flexShrink: 0,
          }}
        >
          🇮🇳
        </div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 900, color: DS.white, letterSpacing: 1.5, lineHeight: 1, fontFamily: "'Sora',sans-serif" }}>
            BHARAT<span style={{ color: DS.saffron }}>NAUKRI</span>
          </div>
          <div style={{ fontSize: 8, color: DS.muted, letterSpacing: 2, fontFamily: "monospace" }}>GOV JOBS PORTAL</div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 2, flex: 1, minWidth: 0, overflow: "hidden" }}>
        {NAV_ITEMS.map((label) => {
          const id = toViewId(label);
          const active = view === id;
          return (
            <button
              key={label}
              type="button"
              onClick={() => setView(id)}
              style={{
                background: active ? DS.accentSoftMid : "transparent",
                border: `1px solid ${active ? DS.accentBorderNav : "transparent"}`,
                borderRadius: 8,
                padding: "5px 10px",
                fontSize: 12.5,
                color: active ? DS.saffron : DS.mutedHi,
                cursor: "pointer",
                fontFamily: "'Outfit',sans-serif",
                fontWeight: 500,
                transition: "background 0.1s, border-color 0.1s, color 0.1s",
                flexShrink: 0,
              }}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div style={{ display: "flex", alignItems: "center", background: DS.bg2, border: `1px solid ${DS.borderHi}`, borderRadius: 10, padding: "6px 12px", gap: 8, width: 168, minWidth: 0 }}>
        <span style={{ color: DS.muted, fontSize: 13 }}>🔍</span>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSearch();
          }}
          placeholder="Search jobs, state, dept…"
          style={{ background: "transparent", border: "none", outline: "none", color: DS.white, fontSize: 12.5, width: "100%", fontFamily: "'Outfit',sans-serif" }}
        />
      </div>

      <div
        aria-live="polite"
        aria-atomic="true"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          flexShrink: 0,
          lineHeight: 1.15,
          minWidth: 0,
          paddingRight: 4,
        }}
      >
        <span
          style={{
            fontFamily: "Georgia, 'Times New Roman', Times, serif",
            fontWeight: 700,
            fontSize: 13,
            letterSpacing: 0.02,
            backgroundImage: "linear-gradient(180deg, #9A3412 0%, #EA580C 42%, #FBBF24 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            WebkitTextFillColor: "transparent",
          }}
        >
          {formatNavDate(now)}
        </span>
        <span
          style={{
            marginTop: 2,
            paddingLeft: 6,
            fontFamily: "Georgia, 'Times New Roman', Times, serif",
            fontWeight: 400,
            fontSize: 11,
            color: isLight ? "#6B7280" : "#9CA3AF",
            letterSpacing: 0.02,
          }}
        >
          {formatNavTime(now)}
        </span>
      </div>

      {typeof onColorModeChange === "function" && (
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }} title="Theme: light by default; toggle right for dark">
          <span style={{ fontSize: 10, fontWeight: 600, color: DS.muted, fontFamily: "'Outfit',sans-serif", letterSpacing: 0.2 }}>Light</span>
          <button
            type="button"
            role="switch"
            aria-checked={!isLight}
            aria-label={isLight ? "Switch to dark theme" : "Switch to light theme"}
            onClick={() => onColorModeChange(isLight ? "dark" : "bw")}
            style={{
              width: 46,
              height: 24,
              borderRadius: 12,
              border: `1px solid ${DS.borderHi}`,
              background: DS.bg2,
              padding: 0,
              cursor: "pointer",
              position: "relative",
              flexShrink: 0,
            }}
          >
            <span
              style={{
                position: "absolute",
                top: 2,
                left: 2,
                width: 18,
                height: 18,
                borderRadius: "50%",
                background: DS.gradientBrand,
                boxShadow: DS.switchKnobShadow,
                transform: isLight ? "translateX(0)" : "translateX(22px)",
                transition: "transform 0.09s cubic-bezier(0.33, 1, 0.68, 1)",
                willChange: "transform",
              }}
            />
          </button>
          <span style={{ fontSize: 10, fontWeight: 600, color: DS.muted, fontFamily: "'Outfit',sans-serif", letterSpacing: 0.2 }}>Dark</span>
        </div>
      )}

      <button
        type="button"
        onClick={() => setView("login")}
        style={{
          background: DS.gradientBrand,
          border: "none",
          borderRadius: 10,
          padding: "8px 16px",
          fontSize: 12.5,
          color: DS.inkOnBrand,
          cursor: "pointer",
          fontWeight: 700,
          fontFamily: "'Outfit',sans-serif",
          flexShrink: 0,
        }}
      >
        Login
      </button>
    </nav>
  );
}
