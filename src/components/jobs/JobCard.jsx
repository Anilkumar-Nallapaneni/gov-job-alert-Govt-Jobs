import { useState } from "react";
import { DS } from "@/theme/designSystem";
import { CATS } from "@/data/categories";

const DAY_MS = 1000 * 60 * 60 * 24;

export default function JobCard({ job, onClick }) {
  const [hov, setHov] = useState(false);
  const daysLeft = Math.ceil((new Date(job.lastDate) - new Date()) / DAY_MS);
  const isUrgent = daysLeft >= 0 && daysLeft <= 7;
  const isExp = daysLeft < 0;
  const catColor = (CATS.find((c) => c.id === job.category) || { color: DS.saffron }).color;

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? DS.jobCardHoverBg : DS.bg1,
        border: `1px solid ${hov ? DS.borderHi : DS.border}`,
        borderRadius: 16,
        padding: "16px 18px",
        cursor: "pointer",
        transition: "all 0.17s ease",
        transform: hov ? "translateY(-2px)" : "none",
        boxShadow: hov ? "0 10px 30px rgba(0,0,0,0.5)" : "none",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: `linear-gradient(to bottom,${catColor},transparent)`, borderRadius: "16px 0 0 16px" }} />
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 10 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 7 }}>
            <span style={{ fontSize: 9.5, fontWeight: 700, padding: "2px 8px", borderRadius: 20, background: `${catColor}18`, color: catColor, border: `1px solid ${catColor}30`, letterSpacing: 0.4 }}>
              {job.category.toUpperCase()}
            </span>
            {job.status === "new" && (
              <span style={{ fontSize: 9.5, fontWeight: 700, padding: "2px 8px", borderRadius: 20, background: "rgba(34,197,94,0.12)", color: "#22C55E", border: "1px solid rgba(34,197,94,0.3)" }}>NEW</span>
            )}
            {job.status === "hot" && (
              <span style={{ fontSize: 9.5, fontWeight: 700, padding: "2px 8px", borderRadius: 20, background: "rgba(239,68,68,0.12)", color: "#EF4444", border: "1px solid rgba(239,68,68,0.3)" }}>🔥 HOT</span>
            )}
          </div>
          <div style={{ fontSize: 14, fontWeight: 700, color: DS.white, fontFamily: "'Sora',sans-serif", lineHeight: 1.35, marginBottom: 3 }}>{job.title}</div>
          <div style={{ fontSize: 11.5, color: DS.muted, fontFamily: "'Outfit',sans-serif" }}>{job.dept}</div>
        </div>
        <div style={{ background: DS.bg3, border: `1px solid ${DS.borderHi}`, borderRadius: 12, padding: "8px 12px", textAlign: "center", flexShrink: 0, marginLeft: 12 }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: DS.saffron, fontFamily: "'JetBrains Mono',monospace", lineHeight: 1 }}>{job.vacancies.toLocaleString()}</div>
          <div style={{ fontSize: 8, color: DS.muted, letterSpacing: 0.5, marginTop: 2 }}>POSTS</div>
        </div>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 11 }}>
        {[
          { i: "📍", v: job.state },
          { i: "🎓", v: job.qual },
          { i: "👤", v: `Age ${job.age}` },
          { i: "💰", v: job.salary },
        ].map(({ i, v }) => (
          <span key={v} style={{ fontSize: 10.5, color: DS.mutedHi, background: DS.bg3, border: `1px solid ${DS.borderHi}`, borderRadius: 6, padding: "3px 8px", display: "flex", alignItems: "center", gap: 4, fontFamily: "'Outfit',sans-serif" }}>
            {i} {v}
          </span>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: `1px solid ${DS.border}`, paddingTop: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 11, color: isUrgent ? "#EF4444" : isExp ? "#3D5068" : DS.muted }}>
            {isExp ? "❌ Expired" : isUrgent ? "⚠️" : ""}
            {!isExp && ` Last: ${new Date(job.lastDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}`}
          </span>
          {!isExp && daysLeft <= 30 && (
            <span style={{ fontSize: 9.5, padding: "1px 6px", borderRadius: 5, background: isUrgent ? "rgba(239,68,68,0.12)" : DS.bg3, color: isUrgent ? "#EF4444" : DS.muted }}>
              {daysLeft}d
            </span>
          )}
        </div>
        <span style={{ fontSize: 11, fontWeight: 700, color: hov ? "#FF8C35" : DS.saffron, fontFamily: "'Outfit',sans-serif" }}>View Details →</span>
      </div>
    </div>
  );
}
