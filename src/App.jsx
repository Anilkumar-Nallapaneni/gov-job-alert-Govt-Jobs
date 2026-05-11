import { useEffect, useMemo, useState } from "react";
import { DS } from "@/theme/designSystem";
import { STATES, toSvgStateId } from "@/data/states";
import { ALL_JOBS } from "@/data/jobs";
import { FEED_POOL } from "@/data/feed";
import Ticker from "@/components/layout/Ticker";
import Navbar from "@/components/layout/Navbar";
import HomePage from "@/components/home/HomePage";
import JobDetail from "@/components/jobs/JobDetail";

const FEED_TICK_MS = 18_000;
const INITIAL_FEED_SIZE = 6;
const FEED_MAX = 30;

export default function App() {
  const [view, setView] = useState("home");
  const [selectedState, setSelectedState] = useState(null);
  const [activeCat, setActiveCat] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [search, setSearch] = useState("");

  const [feedItems, setFeedItems] = useState(() =>
    FEED_POOL.slice(0, INITIAL_FEED_SIZE).map((f, i) => ({ ...f, time: Date.now() - i * 120_000 }))
  );

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

  const stateCounts = useMemo(() => {
    const c = {};
    ALL_JOBS.forEach((j) => {
      j.stateIds?.forEach((sid) => {
        c[sid] = (c[sid] || 0) + j.vacancies;
      });
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
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800;900&family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        html,body{background:${DS.bg0};color:${DS.white};}
        ::-webkit-scrollbar{width:5px;height:5px;}
        ::-webkit-scrollbar-track{background:${DS.bg0};}
        ::-webkit-scrollbar-thumb{background:${DS.saffron};border-radius:3px;}
        input::placeholder{color:${DS.muted}!important;}
        a{color:inherit;}
        @keyframes pulse{0%,100%{opacity:1;}50%{opacity:0.4;}}
        @keyframes slideIn{from{opacity:0;transform:translateY(-8px);}to{opacity:1;transform:translateY(0);}}
      `}</style>
      <div style={{ minHeight: "100vh", background: DS.bg0, fontFamily: "'Outfit',sans-serif", display: "flex", flexDirection: "column" }}>
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
