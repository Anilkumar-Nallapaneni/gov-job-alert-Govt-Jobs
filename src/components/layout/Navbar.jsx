import { DS } from "@/theme/designSystem";

const NAV_ITEMS = ["Home", "Jobs", "Results", "Admit Card", "Alert"];

const toViewId = (label) => label.toLowerCase().replace(" ", "-");

export default function Navbar({ view, setView, search, setSearch, onSearch }) {
  return (
    <nav style={{ background: "rgba(3,6,13,0.97)", borderBottom: `1px solid ${DS.border}`, backdropFilter: "blur(12px)", position: "sticky", top: 0, zIndex: 200, height: 58, display: "flex", alignItems: "center", padding: "0 20px", gap: 16, flexShrink: 0 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0, cursor: "pointer" }} onClick={() => setView("home")}>
        <div style={{ width: 36, height: 36, background: "linear-gradient(135deg,#FF6B00,#FFAA00)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>🇮🇳</div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 900, color: DS.white, letterSpacing: 1.5, lineHeight: 1, fontFamily: "'Sora',sans-serif" }}>
            BHARAT<span style={{ color: DS.saffron }}>NAUKRI</span>
          </div>
          <div style={{ fontSize: 8, color: DS.muted, letterSpacing: 2, fontFamily: "monospace" }}>GOV JOBS PORTAL</div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 2, flex: 1 }}>
        {NAV_ITEMS.map((label) => {
          const id = toViewId(label);
          const active = view === id;
          return (
            <button
              key={label}
              onClick={() => setView(id)}
              style={{
                background: active ? "rgba(255,107,0,0.1)" : "transparent",
                border: `1px solid ${active ? "rgba(255,107,0,0.3)" : "transparent"}`,
                borderRadius: 8,
                padding: "5px 12px",
                fontSize: 12.5,
                color: active ? DS.saffron : DS.mutedHi,
                cursor: "pointer",
                fontFamily: "'Outfit',sans-serif",
                fontWeight: 500,
                transition: "all 0.12s",
              }}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div style={{ display: "flex", alignItems: "center", background: DS.bg2, border: `1px solid ${DS.borderHi}`, borderRadius: 10, padding: "6px 12px", gap: 8, width: 210 }}>
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

      <button
        onClick={() => setView("login")}
        style={{ background: "linear-gradient(135deg,#FF6B00,#FFAA00)", border: "none", borderRadius: 10, padding: "8px 16px", fontSize: 12.5, color: "#060A00", cursor: "pointer", fontWeight: 700, fontFamily: "'Outfit',sans-serif", flexShrink: 0 }}
      >
        Login
      </button>
    </nav>
  );
}
