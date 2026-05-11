import { DS } from "@/theme/designSystem";
import { STATES } from "@/data/states";

const TOP_STATE_COUNT = 16;

export default function StateStrip({ selected, onSelect, stateCounts }) {
  const sorted = [...STATES]
    .sort((a, b) => (stateCounts[b.id] || 0) - (stateCounts[a.id] || 0))
    .slice(0, TOP_STATE_COUNT);

  return (
    <div style={{ padding: "12px 20px", borderBottom: `1px solid ${DS.border}`, background: DS.bg0, overflowX: "auto" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: "max-content" }}>
        <span style={{ fontSize: 10.5, color: DS.muted, fontWeight: 700, letterSpacing: 1, fontFamily: "'Outfit',sans-serif", flexShrink: 0 }}>TOP STATES:</span>
        <button
          onClick={() => onSelect(null)}
          style={{
            background: !selected ? "rgba(255,107,0,0.12)" : "transparent",
            border: `1px solid ${!selected ? "rgba(255,107,0,0.4)" : DS.border}`,
            borderRadius: 20,
            padding: "4px 14px",
            fontSize: 11.5,
            fontWeight: !selected ? 700 : 400,
            color: !selected ? DS.saffron : DS.mutedHi,
            cursor: "pointer",
            flexShrink: 0,
            fontFamily: "'Outfit',sans-serif",
            transition: "all 0.12s",
          }}
        >
          🇮🇳 All India
        </button>
        {sorted.map((s) => {
          const active = selected === s.id;
          return (
            <button
              key={s.id}
              onClick={() => onSelect(active ? null : s.id)}
              style={{
                background: active ? "rgba(255,107,0,0.12)" : "transparent",
                border: `1px solid ${active ? "rgba(255,107,0,0.4)" : DS.border}`,
                borderRadius: 20,
                padding: "4px 12px",
                fontSize: 11.5,
                fontWeight: active ? 700 : 400,
                color: active ? DS.saffron : DS.mutedHi,
                cursor: "pointer",
                flexShrink: 0,
                fontFamily: "'Outfit',sans-serif",
                whiteSpace: "nowrap",
                transition: "all 0.12s",
              }}
            >
              {s.ab}{" "}
              <span style={{ fontFamily: "'JetBrains Mono',monospace", color: active ? "#FFAA00" : DS.muted, fontSize: 9.5 }}>
                {((stateCounts[s.id] || 0) / 1000).toFixed(0)}K
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
