import { DS } from "@/theme/designSystem";

const NAV_ITEMS = ["Home", "Jobs", "Results", "Admit Card", "Alert"];

const toViewId = (label) => label.toLowerCase().replace(" ", "-");

export default function Navbar({ view, setView, search, setSearch, onSearch, colorMode = "dark", onColorModeChange }) {
  const isBw = colorMode === "bw";

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

      {typeof onColorModeChange === "function" && (
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }} title="Theme">
          <span style={{ fontSize: 10, fontWeight: 600, color: DS.muted, fontFamily: "'Outfit',sans-serif", letterSpacing: 0.2 }}>Dark</span>
          <button
            type="button"
            role="switch"
            aria-checked={isBw}
            aria-label={isBw ? "Use dark theme" : "Use black and white theme"}
            onClick={() => onColorModeChange(isBw ? "dark" : "bw")}
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
                transform: isBw ? "translateX(22px)" : "translateX(0)",
                transition: "transform 0.14s cubic-bezier(0.4, 0, 0.2, 1)",
                willChange: "transform",
              }}
            />
          </button>
          <span style={{ fontSize: 10, fontWeight: 600, color: DS.muted, fontFamily: "'Outfit',sans-serif", letterSpacing: 0.2 }}>B&amp;W</span>
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
