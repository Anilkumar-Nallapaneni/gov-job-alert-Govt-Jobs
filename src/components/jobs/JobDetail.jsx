import { DS } from "@/theme/designSystem";
import { CATS } from "@/data/categories";

const DAY_MS = 1000 * 60 * 60 * 24;

function Section({ title, children }) {
  return (
    <div style={{ background: DS.bg1, border: `1px solid ${DS.border}`, borderRadius: 14, padding: "16px 18px", marginBottom: 12 }}>
      <h3 style={{ fontSize: 11, fontWeight: 700, color: DS.saffron, letterSpacing: 1.5, marginBottom: 12, paddingBottom: 10, borderBottom: `1px solid ${DS.border}`, fontFamily: "'Outfit',sans-serif", textTransform: "uppercase", margin: "0 0 12px" }}>
        {title}
      </h3>
      {children}
    </div>
  );
}

export default function JobDetail({ job, onClose }) {
  const catColor = (CATS.find((c) => c.id === job.category) || { color: DS.saffron }).color;
  const daysLeft = Math.ceil((new Date(job.lastDate) - new Date()) / DAY_MS);
  const isUrgent = daysLeft >= 0 && daysLeft <= 7;

  return (
    <div
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.88)", zIndex: 500, overflow: "auto", backdropFilter: "blur(4px)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div style={{ maxWidth: 780, margin: "30px auto", padding: "0 16px 40px" }}>
        <button
          onClick={onClose}
          style={{ background: DS.bg2, border: `1px solid ${DS.borderHi}`, borderRadius: 10, padding: "8px 16px", fontSize: 12, color: DS.mutedHi, cursor: "pointer", marginBottom: 14, fontFamily: "'Outfit',sans-serif", display: "flex", alignItems: "center", gap: 6 }}
        >
          ← Back to Jobs
        </button>

        <div style={{ background: DS.bg1, border: `1px solid ${DS.border}`, borderRadius: 18, padding: "22px 24px", marginBottom: 12 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
            <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20, background: `${catColor}18`, color: catColor, border: `1px solid ${catColor}40` }}>{job.category.toUpperCase()}</span>
            <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20, background: DS.bg3, color: DS.mutedHi, border: `1px solid ${DS.borderHi}` }}>{job.type}</span>
            {job.status === "hot" && (
              <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20, background: "rgba(239,68,68,0.12)", color: "#EF4444", border: "1px solid rgba(239,68,68,0.3)" }}>🔥 HOT</span>
            )}
            {isUrgent && (
              <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20, background: "rgba(239,68,68,0.12)", color: "#EF4444", border: "1px solid rgba(239,68,68,0.3)" }}>
                ⚠️ Closing in {daysLeft} days!
              </span>
            )}
          </div>
          <h1 style={{ fontSize: 21, fontWeight: 900, color: DS.white, fontFamily: "'Sora',sans-serif", lineHeight: 1.25, marginBottom: 6 }}>{job.title}</h1>
          <p style={{ fontSize: 13, color: DS.muted, fontFamily: "'Outfit',sans-serif", marginBottom: 16 }}>{job.dept}</p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 18 }}>
            {[
              { l: "Total Posts", v: job.vacancies.toLocaleString(), i: "📋" },
              { l: "Last Date", v: job.lastDate, i: "📅" },
              { l: "Salary", v: job.salary, i: "💰" },
              { l: "Age Limit", v: job.age, i: "👤" },
            ].map(({ l, v, i }) => (
              <div key={l} style={{ background: DS.bg3, border: `1px solid ${DS.borderHi}`, borderRadius: 12, padding: "12px", textAlign: "center" }}>
                <div style={{ fontSize: 18, marginBottom: 5 }}>{i}</div>
                <div style={{ fontSize: 12, fontWeight: 800, color: DS.saffron, fontFamily: "'JetBrains Mono',monospace", lineHeight: 1.2 }}>{v}</div>
                <div style={{ fontSize: 9.5, color: DS.muted, marginTop: 4, fontFamily: "'Outfit',sans-serif" }}>{l}</div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            <a
              href={job.applyUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", gap: 7, background: "linear-gradient(135deg,#FF6B00,#FFAA00)", border: "none", borderRadius: 12, padding: "11px 22px", fontSize: 13, fontWeight: 700, color: "#060A00", cursor: "pointer", textDecoration: "none", fontFamily: "'Outfit',sans-serif" }}
            >
              🌐 Apply on Official Website ↗
            </a>
            {job.pdfUrl && (
              <a
                href={job.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: 7, background: DS.bg3, border: `1px solid ${DS.borderHi}`, borderRadius: 12, padding: "11px 20px", fontSize: 13, fontWeight: 600, color: DS.white, cursor: "pointer", textDecoration: "none", fontFamily: "'Outfit',sans-serif", transition: "background 0.12s" }}
              >
                📄 Download Notification PDF
              </a>
            )}
            <a
              href={job.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: DS.muted, padding: "11px 14px", borderRadius: 12, border: `1px solid ${DS.border}`, textDecoration: "none", fontFamily: "'Outfit',sans-serif", transition: "color 0.12s" }}
            >
              🔗 Official Website
            </a>
          </div>
        </div>

        <Section title="About this Recruitment">
          <p style={{ fontSize: 13, color: "#8FA8C8", lineHeight: 1.7, margin: 0, fontFamily: "'Outfit',sans-serif" }}>{job.about}</p>
        </Section>

        <Section title="Important Dates">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
            {Object.entries(job.dates || {}).map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${DS.border}` }}>
                <span style={{ fontSize: 12, color: DS.muted, fontFamily: "'Outfit',sans-serif" }}>{k}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: DS.white, fontFamily: "'JetBrains Mono',monospace" }}>{v}</span>
              </div>
            ))}
          </div>
        </Section>

        {job.posts?.length > 0 && (
          <Section title="Post-wise Vacancy Details">
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${DS.border}` }}>
                    <th style={{ textAlign: "left", padding: "6px 8px", color: DS.muted, fontFamily: "'Outfit',sans-serif", fontWeight: 600 }}>Post Name</th>
                    <th style={{ textAlign: "right", padding: "6px 8px", color: DS.muted, fontFamily: "'Outfit',sans-serif", fontWeight: 600 }}>Vacancies</th>
                    <th style={{ textAlign: "right", padding: "6px 8px", color: DS.muted, fontFamily: "'Outfit',sans-serif", fontWeight: 600 }}>Pay Level</th>
                  </tr>
                </thead>
                <tbody>
                  {job.posts.map((p, i) => (
                    <tr key={i} style={{ borderBottom: `1px solid rgba(19,29,46,0.6)` }}>
                      <td style={{ padding: "9px 8px", color: "#8FA8C8", fontFamily: "'Outfit',sans-serif" }}>{p.post}</td>
                      <td style={{ padding: "9px 8px", textAlign: "right", color: DS.saffron, fontFamily: "'JetBrains Mono',monospace", fontWeight: 700 }}>{(p.vacancies || 0).toLocaleString()}</td>
                      <td style={{ padding: "9px 8px", textAlign: "right", color: DS.muted, fontSize: 11 }}>{p.pay}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>
        )}

        <Section title="Selection Process">
          <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
            {(job.selection || []).map((step, i) => (
              <li key={i} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 13 }}>
                <span style={{ width: 24, height: 24, borderRadius: "50%", background: `${DS.saffron}18`, border: `1px solid ${DS.saffron}40`, color: DS.saffron, fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{i + 1}</span>
                <span style={{ color: "#8FA8C8", fontFamily: "'Outfit',sans-serif" }}>{step}</span>
              </li>
            ))}
          </ol>
        </Section>

        <Section title="How to Apply – Step by Step">
          <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
            {(job.howApply || []).map((step, i) => (
              <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13 }}>
                <span style={{ color: DS.saffron, fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, flexShrink: 0, marginTop: 1 }}>0{i + 1}</span>
                <span style={{ color: "#8FA8C8", fontFamily: "'Outfit',sans-serif", lineHeight: 1.5 }}>{step}</span>
              </li>
            ))}
          </ol>
        </Section>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <Section title="Application Fee">
            {Object.entries(job.fee || {}).map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: `1px solid ${DS.border}` }}>
                <span style={{ fontSize: 12, color: DS.muted, fontFamily: "'Outfit',sans-serif" }}>{k}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: DS.white, fontFamily: "'Outfit',sans-serif" }}>{v}</span>
              </div>
            ))}
          </Section>
          <Section title="Eligibility Details">
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ fontSize: 12, fontFamily: "'Outfit',sans-serif" }}>
                <span style={{ color: DS.muted }}>Qualification: </span>
                <span style={{ color: "#8FA8C8" }}>{job.qual}</span>
              </div>
              <div style={{ fontSize: 12, fontFamily: "'Outfit',sans-serif" }}>
                <span style={{ color: DS.muted }}>Nationality: </span>
                <span style={{ color: "#8FA8C8" }}>{job.nationality}</span>
              </div>
              <div style={{ fontSize: 12, fontFamily: "'Outfit',sans-serif" }}>
                <span style={{ color: DS.muted }}>Age Relaxation: </span>
                <span style={{ color: "#8FA8C8" }}>{job.ageRelax}</span>
              </div>
              <div style={{ fontSize: 12, fontFamily: "'Outfit',sans-serif" }}>
                <span style={{ color: DS.muted }}>Attempts: </span>
                <span style={{ color: "#8FA8C8" }}>{job.attempts}</span>
              </div>
              {job.syllabus && (
                <div style={{ fontSize: 12, fontFamily: "'Outfit',sans-serif" }}>
                  <span style={{ color: DS.muted }}>Syllabus: </span>
                  <span style={{ color: "#8FA8C8" }}>{job.syllabus}</span>
                </div>
              )}
            </div>
          </Section>
        </div>

        <div style={{ background: `${DS.saffron}08`, border: `1px solid ${DS.saffron}25`, borderRadius: 12, padding: "14px 18px", display: "flex", gap: 20, flexWrap: "wrap" }}>
          <div>
            <span style={{ fontSize: 11, color: DS.muted }}>📞 Helpdesk: </span>
            <span style={{ fontSize: 12, fontWeight: 600, color: DS.white, fontFamily: "monospace" }}>{job.helpdesk}</span>
          </div>
          <div>
            <span style={{ fontSize: 11, color: DS.muted }}>📧 Email: </span>
            <a href={`mailto:${job.email}`} style={{ fontSize: 12, fontWeight: 600, color: DS.saffron, fontFamily: "monospace", textDecoration: "none" }}>
              {job.email}
            </a>
          </div>
        </div>

        <div style={{ marginTop: 14, padding: "12px 16px", background: DS.bg3, border: `1px solid ${DS.borderHi}`, borderRadius: 10, fontSize: 11.5, color: DS.muted, lineHeight: 1.6, fontFamily: "'Outfit',sans-serif" }}>
          ⚠️ Disclaimer: BharatNaukri is an independent aggregator. Always verify details at the official website before applying. We are not responsible for any errors or changes in information.
        </div>
      </div>
    </div>
  );
}
