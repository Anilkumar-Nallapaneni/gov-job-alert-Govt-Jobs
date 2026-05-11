import { useMemo, useState } from "react";
import { DS, REGION_FILLS } from "@/theme/designSystem";
import { STATES, toSvgStateId } from "@/data/states";
import { CATS } from "@/data/categories";
import { ALL_JOBS } from "@/data/jobs";
import { IndiaMap as IndiaSvgMap } from "@/components/Maps";
import StateStrip from "@/components/jobs/StateStrip";
import CategoryGrid from "@/components/jobs/CategoryGrid";
import JobCard from "@/components/jobs/JobCard";
import AlertSection from "@/components/home/AlertSection";
import Footer from "@/components/layout/Footer";

const INITIAL_JOB_LIMIT = 8;
const QUICK_FILTERS = ["10th Pass", "12th Pass", "Graduate", "Engineering", "Defence", "Banking", "Police"];
const REGION_LABELS = { north: "North", south: "South", east: "East", west: "West", central: "Central", northeast: "NE" };

export default function HomePage({
  selectedState,
  setSelectedState,
  activeCat,
  setActiveCat,
  stateCounts,
  onJobClick,
  search,
  mapStateData,
}) {
  const [sort, setSort] = useState("lastDate");
  const [showAll, setShowAll] = useState(false);

  const filtered = useMemo(() => {
    let j = [...ALL_JOBS];

    if (search.trim()) {
      const q = search.toLowerCase();
      j = j.filter(
        (x) =>
          x.title.toLowerCase().includes(q) ||
          x.dept.toLowerCase().includes(q) ||
          x.state.toLowerCase().includes(q) ||
          x.category.toLowerCase().includes(q)
      );
    }

    if (selectedState) {
      const sn = STATES.find((s) => s.id === selectedState)?.n || "";
      j = j.filter((x) => x.stateIds?.includes(selectedState) || x.state === "All India" || x.state === sn);
    }

    if (activeCat) j = j.filter((x) => x.category === activeCat);

    if (sort === "vacancies") j.sort((a, b) => b.vacancies - a.vacancies);
    else if (sort === "lastDate") j.sort((a, b) => new Date(a.lastDate) - new Date(b.lastDate));

    return j;
  }, [selectedState, activeCat, sort, search]);

  const displayed = showAll ? filtered : filtered.slice(0, INITIAL_JOB_LIMIT);
  const totalVac = ALL_JOBS.reduce((s, j) => s + j.vacancies, 0);
  const stateName = selectedState ? STATES.find((s) => s.id === selectedState)?.n : "";

  const categoryCounts = useMemo(
    () => Object.fromEntries(CATS.map((c) => [c.id, ALL_JOBS.filter((j) => j.category === c.id).reduce((s, j) => s + j.vacancies, 0)])),
    []
  );

  return (
    <div>
      <style>{`
        @media (max-width: 900px) {
          .home-hero-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <section style={{ padding: "36px 20px 28px", maxWidth: 1240, margin: "0 auto" }}>
        <div
          className="home-hero-grid"
          style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", gap: 40, alignItems: "start" }}
        >
          {/* Left – Hero copy */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
              <div style={{ height: 2, width: 28, background: "linear-gradient(to right,#FF6B00,#FFAA00)" }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: DS.saffron, letterSpacing: 3, fontFamily: "monospace" }}>INDIA'S #1 GOVT JOBS PORTAL</span>
            </div>
            <h1 style={{ fontSize: 44, fontWeight: 900, color: DS.white, fontFamily: "'Sora',sans-serif", lineHeight: 1.05, marginBottom: 10, letterSpacing: 0.5 }}>
              FIND YOUR<br />
              <span style={{ WebkitTextStroke: "2px #FF6B00", WebkitTextFillColor: "transparent" }}>SARKARI</span>
              <br />
              <span style={{ color: DS.saffron }}>NAUKRI</span>
            </h1>
            <p style={{ fontSize: 14.5, color: DS.mutedHi, marginBottom: 24, lineHeight: 1.65, maxWidth: 440, fontFamily: "'Outfit',sans-serif" }}>
              Real-time government job alerts from UPSC, SSC, Railways, Banking, Police & more. {totalVac.toLocaleString()} active vacancies across all 28 states.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 20 }}>
              {[
                { v: totalVac.toLocaleString(), l: "Active Vacancies", i: "📋" },
                { v: `${ALL_JOBS.filter((j) => j.status).length}`, l: "Hot/New Today", i: "🔥" },
                { v: "28", l: "States Covered", i: "🗺️" },
                { v: "10L+", l: "Monthly Users", i: "👥" },
              ].map(({ v, l, i }) => (
                <div key={l} style={{ background: DS.bg1, border: `1px solid ${DS.border}`, borderRadius: 12, padding: "12px 10px", textAlign: "center" }}>
                  <div style={{ fontSize: 16, marginBottom: 4 }}>{i}</div>
                  <div style={{ fontSize: 17, fontWeight: 800, color: DS.saffron, fontFamily: "'JetBrains Mono',monospace", lineHeight: 1 }}>{v}</div>
                  <div style={{ fontSize: 9.5, color: DS.muted, marginTop: 4, fontFamily: "'Outfit',sans-serif" }}>{l}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {QUICK_FILTERS.map((f) => (
                <button
                  key={f}
                  style={{ background: DS.bg2, border: `1px solid ${DS.border}`, borderRadius: 20, padding: "5px 13px", fontSize: 11.5, color: DS.muted, cursor: "pointer", fontFamily: "'Outfit',sans-serif", transition: "all 0.12s" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.border = `1px solid rgba(255,107,0,0.4)`;
                    e.currentTarget.style.color = DS.saffron;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.border = `1px solid ${DS.border}`;
                    e.currentTarget.style.color = DS.muted;
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Right – Map */}
          <div style={{ width: "100%", maxWidth: "100%", margin: "0 auto" }}>
            <div style={{ width: "100%" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: DS.saffron, boxShadow: `0 0 8px ${DS.saffron}` }} />
                  <span style={{ fontSize: 12, fontWeight: 700, color: DS.white, fontFamily: "'Outfit',sans-serif" }}>{stateName || "All India"} — Job Map</span>
                </div>
                {selectedState && (
                  <button
                    onClick={() => setSelectedState(null)}
                    style={{ background: "transparent", border: `1px solid ${DS.border}`, borderRadius: 7, padding: "3px 10px", fontSize: 11, color: DS.muted, cursor: "pointer", fontFamily: "'Outfit',sans-serif" }}
                  >
                    ✕ Clear
                  </button>
                )}
              </div>

              {selectedState && (
                <div style={{ background: "linear-gradient(135deg,#1A0E00,#0A1228)", border: `1px solid rgba(255,107,0,0.35)`, borderRadius: 12, padding: "10px 14px", marginBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: 12, color: DS.saffron, fontWeight: 600, marginBottom: 2 }}>📍 {stateName}</div>
                    <div style={{ fontSize: 10.5, color: DS.muted }}>Region: {STATES.find((s) => s.id === selectedState)?.reg}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 22, fontWeight: 800, color: DS.saffron, fontFamily: "'JetBrains Mono',monospace", lineHeight: 1 }}>
                      {(stateCounts[selectedState] || 0).toLocaleString()}
                    </div>
                    <div style={{ fontSize: 9.5, color: DS.muted }}>Active Jobs</div>
                  </div>
                </div>
              )}

              <div style={{ background: DS.bg1, border: `1px solid ${DS.border}`, borderRadius: 14, padding: 10, overflow: "visible" }}>
                <IndiaSvgMap
                  stateData={mapStateData}
                  onStateClick={(svgId) => {
                    const matched = STATES.find((state) => toSvgStateId(state.id) === svgId);
                    setSelectedState(matched ? matched.id : null);
                  }}
                />
              </div>

              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 10, justifyContent: "center" }}>
                {Object.entries(REGION_LABELS).map(([k, l]) => (
                  <div key={k} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10, color: DS.muted, fontFamily: "'Outfit',sans-serif" }}>
                    <div style={{ width: 9, height: 9, borderRadius: 2, background: REGION_FILLS[k].base, border: `1px solid ${REGION_FILLS[k].border}` }} />
                    {l}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <StateStrip selected={selectedState} onSelect={setSelectedState} stateCounts={stateCounts} />

      <section style={{ padding: "20px 20px 40px", maxWidth: 1240, margin: "0 auto" }}>
        <CategoryGrid activeCat={activeCat} setActiveCat={setActiveCat} counts={categoryCounts} />

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <div>
            <h2 style={{ fontSize: 16, fontWeight: 800, color: DS.white, fontFamily: "'Sora',sans-serif", margin: "0 0 3px" }}>
              {stateName ? `Jobs in ${stateName}` : activeCat ? `${CATS.find((c) => c.id === activeCat)?.name || ""} Jobs` : search ? "Search Results" : "Latest Government Jobs"}
            </h2>
            <p style={{ fontSize: 12, color: DS.muted, fontFamily: "'Outfit',sans-serif", margin: 0 }}>
              {filtered.length} jobs · {filtered.reduce((s, j) => s + j.vacancies, 0).toLocaleString()} total vacancies
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 11.5, color: DS.muted, fontFamily: "'Outfit',sans-serif" }}>Sort:</span>
            {["lastDate", "vacancies"].map((s) => (
              <button
                key={s}
                onClick={() => setSort(s)}
                style={{
                  background: sort === s ? "rgba(255,107,0,0.12)" : "transparent",
                  border: `1px solid ${sort === s ? "rgba(255,107,0,0.35)" : DS.border}`,
                  borderRadius: 8,
                  padding: "5px 12px",
                  fontSize: 11.5,
                  color: sort === s ? DS.saffron : DS.muted,
                  cursor: "pointer",
                  fontFamily: "'Outfit',sans-serif",
                }}
              >
                {s === "lastDate" ? "Deadline" : "Vacancies"}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: DS.muted, fontFamily: "'Outfit',sans-serif" }}>
            <div style={{ fontSize: 44, marginBottom: 12 }}>📭</div>
            <div style={{ fontSize: 17, fontWeight: 600, marginBottom: 6, color: DS.mutedHi }}>No jobs found</div>
            <div style={{ fontSize: 13 }}>Try removing filters or selecting a different state</div>
          </div>
        ) : (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {displayed.map((job) => (
                <JobCard key={job.id} job={job} onClick={() => onJobClick(job)} />
              ))}
            </div>
            {!showAll && filtered.length > INITIAL_JOB_LIMIT && (
              <div style={{ textAlign: "center", marginTop: 20 }}>
                <button
                  onClick={() => setShowAll(true)}
                  style={{ background: DS.bg1, border: `1px solid rgba(255,107,0,0.35)`, borderRadius: 12, padding: "12px 32px", fontSize: 13, fontWeight: 600, color: DS.saffron, cursor: "pointer", fontFamily: "'Outfit',sans-serif" }}
                >
                  Load More Jobs ({filtered.length - INITIAL_JOB_LIMIT} more) ↓
                </button>
              </div>
            )}
          </>
        )}
      </section>

      <AlertSection />
      <Footer />
    </div>
  );
}
