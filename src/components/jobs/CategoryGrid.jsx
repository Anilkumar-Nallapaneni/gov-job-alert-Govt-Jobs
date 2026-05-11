import { DS } from "@/theme/designSystem";
import { CATS } from "@/data/categories";

export default function CategoryGrid({ activeCat, setActiveCat, counts }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <h2 style={{ fontSize: 16, fontWeight: 800, color: DS.white, fontFamily: "'Sora',sans-serif", margin: 0 }}>Browse by Category</h2>
        {activeCat && (
          <button
            onClick={() => setActiveCat(null)}
            style={{ background: "transparent", border: `1px solid ${DS.borderHi}`, borderRadius: 8, padding: "4px 12px", fontSize: 11, color: DS.mutedHi, cursor: "pointer", fontFamily: "'Outfit',sans-serif" }}
          >
            ✕ Clear filter
          </button>
        )}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 8 }}>
        {CATS.map((c) => {
          const active = activeCat === c.id;
          const cnt = counts[c.id] || parseInt(c.total.replace(",", ""), 10) || 0;
          return (
            <button
              key={c.id}
              onClick={() => setActiveCat(active ? null : c.id)}
              style={{
                background: active ? `${c.color}18` : DS.bg1,
                border: `1px solid ${active ? c.color + "50" : DS.border}`,
                borderRadius: 12,
                padding: "13px 10px",
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.15s",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                if (!active) {
                  e.currentTarget.style.border = `1px solid ${c.color}30`;
                  e.currentTarget.style.background = `${c.color}0A`;
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  e.currentTarget.style.border = `1px solid ${DS.border}`;
                  e.currentTarget.style.background = DS.bg1;
                }
              }}
            >
              {active && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(to right,${c.color},transparent)` }} />}
              <div style={{ fontSize: 20, marginBottom: 6 }}>{c.icon}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: active ? c.color : DS.white, fontFamily: "'Outfit',sans-serif", marginBottom: 3 }}>{c.name}</div>
              <div style={{ fontSize: 13, fontWeight: 800, color: c.color, fontFamily: "'JetBrains Mono',monospace", lineHeight: 1 }}>{cnt.toLocaleString()}</div>
              <div style={{ fontSize: 8.5, color: DS.muted, letterSpacing: 0.5, marginTop: 1 }}>VACANCIES</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
