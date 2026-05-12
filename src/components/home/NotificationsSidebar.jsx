import { DS } from "@/theme/designSystem";

/**
 * Compact sidebar that appears to the left of the India map on the homepage.
 * Mirrors the classic "Sarkari-result" style three-section navigation:
 *   1) Notifications   2) Latest Announcements   3) Others
 *
 * Each item is a button that bubbles up a `key` to the parent so the homepage
 * can drive filters / route changes. Items with `href` open as anchors instead.
 */

const SECTIONS = [
  {
    id: "notifications",
    title: "Notifications",
    items: [
      { key: "latest", label: "Latest Notifications", highlight: true },
      { key: "employment-news", label: "Employment News" },
      { key: "search-jobs", label: "Search Jobs" },
      { key: "sarkari-job", label: "Sarkari Job" },
      { key: "sarkari-naukri", label: "Sarkari Naukri" },
      { key: "anganwadi", label: "Anganwadi Recruitment" },
      { key: "forest", label: "Forest Jobs" },
      { key: "education", label: "EDUCATION" },
      { key: "mock-test", label: "Free Mock Test" },
    ],
  },
  {
    id: "announcements",
    title: "Latest Announcements",
    items: [
      { key: "sarkari-result", label: "Sarkari Result" },
      { key: "admit-card", label: "Admit Card" },
      { key: "exam-results", label: "Exam Results" },
      { key: "answer-key", label: "Answer Key" },
      { key: "cutoff", label: "Cutoff Marks" },
      { key: "written-marks", label: "Written Marks" },
      { key: "interview", label: "Interview Results" },
      { key: "last-date", label: "Last Date Reminder" },
    ],
  },
  {
    id: "others",
    title: "Others",
    items: [
      { key: "eligibility", label: "Eligibility" },
      { key: "syllabus", label: "Syllabus" },
      { key: "exam-pattern", label: "Exam Pattern" },
      { key: "selection", label: "Selection Process" },
      { key: "previous-papers", label: "Previous Papers" },
      { key: "games", label: "Games" },
      { key: "image-resizer", label: "Image Resizer" },
      { key: "pdf-to-word", label: "PDF to Word Converter" },
      { key: "image-to-pdf", label: "Image to PDF Converter" },
      { key: "word-to-pdf", label: "Word to PDF Converter" },
      { key: "ai-interview", label: "Free AI Interview Tool" },
    ],
  },
];

export default function NotificationsSidebar({ activeKey = null, onSelect }) {
  const handleClick = (item) => {
    if (typeof onSelect === "function") onSelect(item.key, item);
  };

  return (
    <aside
      className="home-notifications-sidebar"
      aria-label="Notifications and quick links"
      style={{
        background: DS.bg1,
        border: `1px solid ${DS.border}`,
        borderRadius: 14,
        overflow: "hidden",
        fontFamily: "'Outfit',sans-serif",
        alignSelf: "start",
        position: "sticky",
        top: 96,
        maxHeight: "calc(100vh - 120px)",
        overflowY: "auto",
      }}
    >
      {SECTIONS.map((section, idx) => (
        <section key={section.id} style={{ borderTop: idx === 0 ? "none" : `1px solid ${DS.border}` }}>
          <header
            style={{
              background: DS.gradientBrand,
              color: DS.inkOnBrand,
              padding: "8px 12px",
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: 0.3,
              fontFamily: "'Sora',sans-serif",
              textTransform: "none",
            }}
          >
            {section.title}
          </header>

          <ul style={{ listStyle: "none", padding: "6px 4px 8px", margin: 0 }}>
            {section.items.map((item) => {
              const isActive = activeKey === item.key;
              const baseColor = item.highlight ? DS.saffron : DS.mutedHi;
              return (
                <li key={item.key} style={{ margin: 0 }}>
                  <button
                    type="button"
                    onClick={() => handleClick(item)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      width: "100%",
                      textAlign: "left",
                      background: isActive ? DS.accentSoft : "transparent",
                      border: "none",
                      borderRadius: 8,
                      padding: "6px 10px",
                      fontSize: 12.5,
                      lineHeight: 1.35,
                      color: isActive ? DS.saffron : baseColor,
                      fontWeight: item.highlight || isActive ? 700 : 500,
                      cursor: "pointer",
                      fontFamily: "'Outfit',sans-serif",
                      transition: "background 0.12s, color 0.12s",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background = DS.bg2;
                        e.currentTarget.style.color = DS.saffron;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color = baseColor;
                      }
                    }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: DS.saffron,
                        boxShadow: `0 0 6px ${DS.accentBorder}`,
                        flexShrink: 0,
                      }}
                    />
                    <span style={{ flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {item.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </aside>
  );
}
