import { useEffect, useRef } from "react";
import { DS } from "@/theme/designSystem";

const BASE_TICKER = [
  "🔴 SSC CGL 2025 — 17,727 posts | Apply by 31 Jul",
  "🟠 UP Police 60,244 Constable posts | Last date 10 Jun",
  "🟡 RRB NTPC 11,558 posts | rrbapply.gov.in",
  "🟢 UPSC CSE Prelims 25 May 2025 | Notification live",
  "🔵 IBPS PO 2025 – 4,455 posts | Apply from 15 Jul",
  "🟣 Army Agniveer 25,000 posts | No fee | Join now",
  "⚪ SSC GD Constable 39,481 CAPFs posts | Apply 31 Aug",
];

export default function Ticker({ feedItems }) {
  const ref = useRef(null);

  useEffect(() => {
    let x = 0;
    let raf;
    const run = () => {
      x -= 0.55;
      if (ref.current) {
        const hw = ref.current.scrollWidth / 2;
        if (Math.abs(x) >= hw) x = 0;
        ref.current.style.transform = `translateX(${x}px)`;
      }
      raf = requestAnimationFrame(run);
    };
    raf = requestAnimationFrame(run);
    return () => cancelAnimationFrame(raf);
  }, [feedItems]);

  const liveFeeds = feedItems
    .slice(0, 5)
    .map((f) => `🔴 LIVE: ${f.title}${f.vacancies ? ` — ${f.vacancies.toLocaleString()} posts` : ""}`);
  const all = [...liveFeeds, ...BASE_TICKER, ...liveFeeds, ...BASE_TICKER];

  return (
    <div style={{ height: 32, background: "#060A14", borderBottom: `1px solid ${DS.border}`, display: "flex", alignItems: "center", overflow: "hidden", flexShrink: 0 }}>
      <div style={{ background: DS.saffron, padding: "0 14px", height: "100%", display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#000", animation: "pulse 1s infinite" }} />
        <span style={{ fontSize: 11, fontWeight: 700, color: "#000", fontFamily: "'JetBrains Mono',monospace", letterSpacing: 1 }}>LIVE</span>
      </div>
      <div style={{ overflow: "hidden", flex: 1 }}>
        <div ref={ref} style={{ display: "flex", whiteSpace: "nowrap", willChange: "transform" }}>
          {all.map((t, i) => (
            <span key={i} style={{ fontSize: 11.5, color: DS.mutedHi, padding: "0 24px", borderRight: `1px solid ${DS.border}`, flexShrink: 0, fontFamily: "'Outfit',sans-serif" }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
