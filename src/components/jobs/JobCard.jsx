import { useState } from "react";
import { useTranslation } from "react-i18next";
import { DS } from "@/theme/designSystem";
import { CATS } from "@/data/categories";

const DAY_MS = 1000 * 60 * 60 * 24;

export default function JobCard({ job, onClick }) {
  const { t, i18n } = useTranslation();
  const [hov, setHov] = useState(false);
  const daysLeft = Math.ceil((new Date(job.lastDate) - new Date()) / DAY_MS);
  const isUrgent = daysLeft >= 0 && daysLeft <= 7;
  const isExp = daysLeft < 0;
  const catColor = (CATS.find((c) => c.id === job.category) || { color: DS.saffron }).color;
  const dateLocale = i18n.language === "en" ? "en-IN" : i18n.language;

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
        boxShadow: hov ? DS.shadowCardHover : "none",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: `linear-gradient(to bottom,${catColor},transparent)`, borderRadius: "16px 0 0 16px" }} />
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 10 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 7 }}>
            <span style={{ fontSize: 9.5, fontWeight: 700, padding: "2px 8px", borderRadius: 20, background: `${catColor}18`, color: catColor, border: `1px solid ${catColor}30`, letterSpacing: 0.4 }}>
              {t(`category.${job.category}`).toUpperCase()}
            </span>
            {job.status === "new" && (
              <span style={{ fontSize: 9.5, fontWeight: 700, padding: "2px 8px", borderRadius: 20, background: DS.greenSoftBg, color: DS.green, border: `1px solid ${DS.greenSoftBorder}` }}>
                {t("job.new")}
              </span>
            )}
            {job.status === "hot" && (
              <span style={{ fontSize: 9.5, fontWeight: 700, padding: "2px 8px", borderRadius: 20, background: DS.redSoftBg, color: DS.red, border: `1px solid ${DS.redSoftBorder}` }}>
                🔥 {t("job.hot")}
              </span>
            )}
          </div>
          <div style={{ fontSize: 14, fontWeight: 700, color: DS.white, fontFamily: "'Sora',sans-serif", lineHeight: 1.35, marginBottom: 3 }}>{job.title}</div>
          <div style={{ fontSize: 11.5, color: DS.muted, fontFamily: "'Outfit',sans-serif" }}>{job.dept}</div>
        </div>
        <div style={{ background: DS.bg3, border: `1px solid ${DS.borderHi}`, borderRadius: 12, padding: "8px 12px", textAlign: "center", flexShrink: 0, marginLeft: 12 }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: DS.saffron, fontFamily: "'JetBrains Mono',monospace", lineHeight: 1 }}>{job.vacancies.toLocaleString()}</div>
          <div style={{ fontSize: 8, color: DS.muted, letterSpacing: 0.5, marginTop: 2 }}>{t("job.posts")}</div>
        </div>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 11 }}>
        {[
          { i: "📍", v: job.state },
          { i: "🎓", v: job.qual },
          { i: "👤", v: t("common.age", { age: job.age }) },
          { i: "💰", v: job.salary },
        ].map(({ i, v }) => (
          <span key={`${i}-${v}`} style={{ fontSize: 10.5, color: DS.mutedHi, background: DS.bg3, border: `1px solid ${DS.borderHi}`, borderRadius: 6, padding: "3px 8px", display: "flex", alignItems: "center", gap: 4, fontFamily: "'Outfit',sans-serif" }}>
            {i} {v}
          </span>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: `1px solid ${DS.border}`, paddingTop: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 11, color: isUrgent ? DS.red : isExp ? DS.muted : DS.muted }}>
            {isExp ? `❌ ${t("job.expired")}` : isUrgent ? "⚠️" : ""}
            {!isExp &&
              ` ${t("jobDetail.lastDate")} ${new Date(job.lastDate).toLocaleDateString(dateLocale, { day: "numeric", month: "short", year: "numeric" })}`}
          </span>
          {!isExp && daysLeft <= 30 && (
            <span style={{ fontSize: 9.5, padding: "1px 6px", borderRadius: 5, background: isUrgent ? DS.redSoftBg : DS.bg3, color: isUrgent ? DS.red : DS.muted }}>
              {t("job.daysLeft", { count: daysLeft })}
            </span>
          )}
        </div>
        <span style={{ fontSize: 11, fontWeight: 700, color: hov ? DS.saffronHi : DS.saffron, fontFamily: "'Outfit',sans-serif" }}>{t("jobDetail.viewDetails")}</span>
      </div>
    </div>
  );
}
