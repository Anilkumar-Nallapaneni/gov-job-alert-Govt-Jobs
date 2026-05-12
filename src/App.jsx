import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from "react";
import { applyColorMode } from "@/theme/designSystem";
import { STATES, toSvgStateId } from "@/data/states";
import { ALL_JOBS } from "@/data/jobs";
import { vacanciesForStateId } from "@/data/jobRegion";
import { FEED_POOL } from "@/data/feed";
import Ticker from "@/components/layout/Ticker";
import Navbar from "@/components/layout/Navbar";
import HomePage from "@/components/home/HomePage";
import JobDetail from "@/components/jobs/JobDetail";

const FEED_TICK_MS = 18_000;
const INITIAL_FEED_SIZE = 6;
const FEED_MAX = 30;

const COLOR_MODE_KEY = "bharatnaukri-color-mode";

export default function App() {
  const [view, setView] = useState("home");
  const [selectedState, setSelectedState] = useState(null);
  const [activeCat, setActiveCat] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [search, setSearch] = useState("");
  const [colorMode, setColorMode] = useState(() => {
    try {
      const v = localStorage.getItem(COLOR_MODE_KEY);
      if (v === "night") {
        localStorage.setItem(COLOR_MODE_KEY, "dark");
        return "dark";
      }
      if (v === "bw") return "bw";
      if (v === "dark") return "dark";
      return "bw";
    } catch {
      return "bw";
    }
  });

  const onColorModeChange = useCallback((next) => {
    try {
      localStorage.setItem(COLOR_MODE_KEY, next);
    } catch {
      /* ignore */
    }
    // Apply before setState so the next paint uses updated `DS` (effects run after paint).
    applyColorMode(next);
    setColorMode(next);
  }, []);

  useLayoutEffect(() => {
    applyColorMode(colorMode);
    document.documentElement.dataset.colorMode = colorMode;
  }, [colorMode]);

  const [feedItems, setFeedItems] = useState(() =>
    FEED_POOL.slice(0, INITIAL_FEED_SIZE).map((f, i) => ({ ...f, time: Date.now() - i * 120_000 }))
  );

  /** Prepend latest official RSS snapshot (from `npm run fetch:official`) into the ticker when present. */
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/data/official-feed-items.json", { cache: "no-store" });
        if (!res.ok || cancelled) return;
        const json = await res.json();
        const rows = Array.isArray(json.items) ? json.items : [];
        if (!rows.length || cancelled) return;
        const extra = rows.slice(0, 12).map((it, i) => ({
          title: it.title,
          dept: it.sourceName || it.dept || "Official",
          type: "new",
          state: it.state || "All India",
          time: Date.now() - (i + 1) * 90_000,
        }));
        setFeedItems((prev) => [...extra, ...prev].slice(0, FEED_MAX));
      } catch {
        /* ignore */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Auto job feed - rotates through FEED_POOL every FEED_TICK_MS.
  useEffect(() => {
    let idx = INITIAL_FEED_SIZE;
    const t = setInterval(() => {
      const item = { ...FEED_POOL[idx % FEED_POOL.length], time: Date.now() };
      setFeedItems((prev) => [item, ...prev].slice(0, FEED_MAX));
      idx++;
    }, FEED_TICK_MS);
    return () => clearInterval(t);
  }, []);

  /** Per-state vacancy totals — same attribution as the state-filtered job list (nationwide-all-states jobs excluded). */
  const stateCounts = useMemo(() => {
    const c = {};
    STATES.forEach((s) => {
      c[s.id] = ALL_JOBS.reduce((sum, j) => sum + vacanciesForStateId(j, s.id), 0);
    });
    return c;
  }, []);

  const mapStateData = useMemo(
    () =>
      STATES.map((state) => ({
        id: toSvgStateId(state.id),
        name: state.n,
        fill: "#ffffff",
        customData: {
          name: state.n,
          jobs: (stateCounts[state.id] || 0).toLocaleString(),
        },
      })),
    [stateCounts]
  );

  const handleJobClick = (job) => {
    setSelectedJob(job);
    window.scrollTo(0, 0);
  };
  const handleSearch = () => setView("home");

  return (
    <>
      <div className="app-shell">
        <Ticker feedItems={feedItems} />
        <Navbar
          view={view}
          setView={(v) => {
            setView(v);
            setSelectedJob(null);
          }}
          search={search}
          setSearch={setSearch}
          onSearch={handleSearch}
          colorMode={colorMode}
          onColorModeChange={onColorModeChange}
        />
        <div style={{ flex: 1 }}>
          {selectedJob ? (
            <JobDetail job={selectedJob} onClose={() => setSelectedJob(null)} />
          ) : (
            <HomePage
              selectedState={selectedState}
              setSelectedState={setSelectedState}
              activeCat={activeCat}
              setActiveCat={setActiveCat}
              stateCounts={stateCounts}
              onJobClick={handleJobClick}
              search={search}
              mapStateData={mapStateData}
            />
          )}
        </div>
      </div>
    </>
  );
}
