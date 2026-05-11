import { useEffect, useMemo, useState } from "react";
import { DS } from "@/theme/designSystem";
import { STATES, toSvgStateId } from "@/data/states";
import { CATS } from "@/data/categories";
import { ALL_JOBS } from "@/data/jobs";
import { isNationwideAllStatesJob, jobMatchesStateFilter } from "@/data/jobRegion";
import { IndiaMap as IndiaSvgMap } from "@/components/Maps";
import StateStrip from "@/components/jobs/StateStrip";
import CategoryGrid from "@/components/jobs/CategoryGrid";
import JobCard from "@/components/jobs/JobCard";
import AlertSection from "@/components/home/AlertSection";
import Footer from "@/components/layout/Footer";
import "./HomePage.css";

const INITIAL_JOB_LIMIT = 8;
const QUICK_FILTERS = ["10th Pass", "12th Pass", "Graduate", "Engineering", "Defence", "Banking", "Police"];

/** Narrow state-mode job list by the quick pill (qualification / sector). */
const jobMatchesQuickFilter = (job, filter) => {
  const q = `${job.qual || ""} ${job.title || ""} ${job.dept || ""}`.toLowerCase();
  const cat = job.category;
  switch (filter) {
    case "10th Pass":
      return /\b10th\b|10\s*th|class\s*10|matric/i.test(q);
    case "12th Pass":
      return /12th|10\s*\+\s*2|intermediate|10\+2|hsc\b/i.test(q);
    case "Graduate":
      return /graduate|grad\.|b\.a|b\.sc|b\.com|b\.ed|degree|pg|post\s*grad|master/i.test(q);
    case "Engineering":
      return /engineer|b\.tech|b\.e\.|m\.tech|gate|diploma\s*\(eng|ece|cse|mechanical|civil/i.test(q);
    case "Defence":
      return cat === "defence";
    case "Banking":
      return cat === "banking";
    case "Police":
      return cat === "police";
    default:
      return true;
  }
};

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
  /** Quick qualification / sector pills — filter job list (All India or state). */
  const [quickFilter, setQuickFilter] = useState(null);

  useEffect(() => {
    setShowAll(false);
  }, [selectedState, activeCat, search, quickFilter]);

  useEffect(() => {
    setQuickFilter(null);
  }, [selectedState]);

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
      j = j.filter((x) => jobMatchesStateFilter(x, selectedState));
    }

    if (activeCat) j = j.filter((x) => x.category === activeCat);

    if (quickFilter) {
      j = j.filter((x) => jobMatchesQuickFilter(x, quickFilter));
    }

    if (sort === "vacancies") j.sort((a, b) => b.vacancies - a.vacancies);
    else if (sort === "lastDate") j.sort((a, b) => new Date(a.lastDate) - new Date(b.lastDate));

    return j;
  }, [selectedState, activeCat, sort, search, quickFilter]);

  const displayed = showAll ? filtered : filtered.slice(0, INITIAL_JOB_LIMIT);
  const totalVac = ALL_JOBS.reduce((s, j) => s + j.vacancies, 0);
  const totalListings = ALL_JOBS.length;
  const hotNewCount = ALL_JOBS.filter((j) => j.status === "hot" || j.status === "new").length;
  const stateName = selectedState ? STATES.find((s) => s.id === selectedState)?.n : "";
  const stateFilteredVac = selectedState ? filtered.reduce((s, j) => s + j.vacancies, 0) : 0;

  const categoryCounts = useMemo(
    () => Object.fromEntries(CATS.map((c) => [c.id, ALL_JOBS.filter((j) => j.category === c.id).reduce((s, j) => s + j.vacancies, 0)])),
    []
  );

  return (
    <div>
      {/* Row 1 — state strip only (under navbar) */}
      <div
        className="home-subheader"
        style={{
          borderBottom: `1px solid ${DS.border}`,
          background: DS.sheetBg,
          backdropFilter: "blur(10px)",
        }}
      >
        <div
          className="home-subheader__inner"
          style={{
            maxWidth: 1240,
            margin: "0 auto",
            padding: "10px 20px",
            width: "100%",
            minWidth: 0,
            overflowX: "auto",
          }}
        >
          <StateStrip variant="subheader" selected={selectedState} onSelect={setSelectedState} stateCounts={stateCounts} />
        </div>
      </div>

      {/* Row 2 — tagline (hidden while a state is selected — “jobs scroll” mode) */}
      <section style={{ padding: "0 20px 28px", maxWidth: 1240, margin: "0 auto" }}>
        {!selectedState && (
          <div
            className="home-hero-tagline"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              padding: "8px 0 14px",
              marginBottom: 16,
              width: "100%",
            }}
          >
            <div style={{ height: 2, width: 28, background: DS.gradientRule, flexShrink: 0 }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: DS.saffron, letterSpacing: 3, fontFamily: "monospace" }}>
              {"INDIA'S #1 GOVT JOBS PORTAL"}
            </span>
          </div>
        )}

        {selectedState && (
          <div
            style={{
              marginBottom: 20,
              paddingBottom: 16,
              borderBottom: `1px solid ${DS.border}`,
              width: "100%",
            }}
          >
            <div style={{ fontSize: 10.5, fontWeight: 700, color: DS.muted, letterSpacing: 1, fontFamily: "'Outfit',sans-serif", marginBottom: 10 }}>
              FILTER LISTINGS
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
              {QUICK_FILTERS.map((f) => {
                const on = quickFilter === f;
                return (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setQuickFilter((prev) => (prev === f ? null : f))}
                    style={{
                      background: on ? DS.accentSoft : DS.bg2,
                      border: `1px solid ${on ? DS.accentBorderHi : DS.border}`,
                      borderRadius: 20,
                      padding: "5px 13px",
                      fontSize: 11.5,
                      color: on ? DS.saffron : DS.muted,
                      fontWeight: on ? 700 : 400,
                      cursor: "pointer",
                      fontFamily: "'Outfit',sans-serif",
                      transition: "all 0.12s",
                    }}
                  >
                    {f}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div
          className="home-hero-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
            gap: 40,
            alignItems: selectedState ? "stretch" : "start",
          }}
        >
          {/* Left – Map */}
          <div style={{ width: "100%", maxWidth: "100%", margin: "0 auto" }}>
            <div style={{ width: "100%" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: DS.saffron, boxShadow: `0 0 8px ${DS.saffron}` }} />
                  <span style={{ fontSize: 12, fontWeight: 700, color: DS.white, fontFamily: "'Outfit',sans-serif" }}>{stateName || "All India"} — Job Map</span>
                </div>
                {selectedState && (
                  <button
                    type="button"
                    onClick={() => setSelectedState(null)}
                    style={{ background: "transparent", border: `1px solid ${DS.border}`, borderRadius: 7, padding: "3px 10px", fontSize: 11, color: DS.muted, cursor: "pointer", fontFamily: "'Outfit',sans-serif" }}
                  >
                    ✕ Clear
                  </button>
                )}
              </div>

              {selectedState && (
                <div style={{ background: DS.panelWarm, border: `1px solid ${DS.accentBorder}`, borderRadius: 12, padding: "10px 14px", marginBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: 12, color: DS.saffron, fontWeight: 600, marginBottom: 2 }}>📍 {stateName}</div>
                    <div style={{ fontSize: 10.5, color: DS.muted }}>Region: {STATES.find((s) => s.id === selectedState)?.reg}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 22, fontWeight: 800, color: DS.saffron, fontFamily: "'JetBrains Mono',monospace", lineHeight: 1 }}>
                      {stateFilteredVac.toLocaleString("en-IN")}
                    </div>
                    <div style={{ fontSize: 9.5, color: DS.muted }}>Vacancies (current filters)</div>
                    <div style={{ fontSize: 9, color: DS.muted, marginTop: 2 }}>{filtered.length} listing{filtered.length !== 1 ? "s" : ""}</div>
                  </div>
                </div>
              )}

              <div style={{ background: DS.bg1, border: `1px solid ${DS.border}`, borderRadius: 14, padding: 10, overflow: "visible" }}>
                <IndiaSvgMap
                  stateData={mapStateData}
                  selectionSyncKey={selectedState ?? ""}
                  onStateClick={(svgId) => {
                    const matched = STATES.find((state) => toSvgStateId(state.id) === svgId);
                    setSelectedState(matched ? matched.id : null);
                  }}
                />
              </div>
            </div>
          </div>

          {/* Right — marketing hero OR scrollable state jobs only */}
          <div
            style={
              selectedState
                ? {
                    display: "flex",
                    flexDirection: "column",
                    minHeight: 0,
                    minWidth: 0,
                    maxHeight: "min(calc(100vh - 160px), 720px)",
                  }
                : {}
            }
          >
            {!selectedState ? (
              <>
                <header style={{ marginBottom: 16, width: "100%" }}>
                  <h1
                    id="dream-job-heading"
                    style={{
                      fontSize: "clamp(24px, 3.4vw, 34px)",
                      fontWeight: 900,
                      color: DS.white,
                      fontFamily: "'Sora',sans-serif",
                      lineHeight: 1.12,
                      marginBottom: 10,
                      letterSpacing: 0.3,
                    }}
                  >
                    Find your <span style={{ color: DS.saffron }}>dream job</span>
                  </h1>
                  <p
                    style={{
                      fontSize: 14,
                      color: DS.mutedHi,
                      lineHeight: 1.65,
                      maxWidth: "none",
                      fontFamily: "'Outfit',sans-serif",
                      margin: 0,
                    }}
                  >
                    Real-time government job alerts from UPSC, SSC, Railways, Banking, Police & more. {totalVac.toLocaleString("en-IN")} vacancies across {totalListings} active recruitments in our catalog.
                  </p>
                </header>

                <div style={{ marginBottom: 20 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 10 }}>
                    {[
                      { v: totalVac.toLocaleString("en-IN"), l: "Active Vacancies", i: "📋" },
                      { v: hotNewCount.toLocaleString("en-IN"), l: "Hot / New tags", i: "🔥" },
                      { v: STATES.length.toLocaleString("en-IN"), l: "States & UTs (map)", i: "🗺️" },
                      { v: totalListings.toLocaleString("en-IN"), l: "Live listings", i: "📰" },
                    ].map(({ v, l, i }) => (
                      <div key={l} style={{ background: DS.bg1, border: `1px solid ${DS.border}`, borderRadius: 12, padding: "12px 10px", textAlign: "center" }}>
                        <div style={{ fontSize: 16, marginBottom: 4 }}>{i}</div>
                        <div style={{ fontSize: 17, fontWeight: 800, color: DS.saffron, fontFamily: "'JetBrains Mono',monospace", lineHeight: 1 }}>{v}</div>
                        <div style={{ fontSize: 9.5, color: DS.muted, marginTop: 4, fontFamily: "'Outfit',sans-serif" }}>{l}</div>
                      </div>
                    ))}
                  </div>

                  <div
                    style={{
                      background: DS.bg1,
                      border: `1px solid ${DS.border}`,
                      borderRadius: 12,
                      padding: "12px 14px 14px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10, gap: 12 }}>
                      <h2 style={{ fontSize: 13, fontWeight: 800, color: DS.white, fontFamily: "'Sora',sans-serif", margin: 0, letterSpacing: 0.2 }}>Browse by Education</h2>
                      {quickFilter && (
                        <button
                          type="button"
                          onClick={() => setQuickFilter(null)}
                          style={{
                            background: "transparent",
                            border: `1px solid ${DS.borderHi}`,
                            borderRadius: 8,
                            padding: "4px 10px",
                            fontSize: 10.5,
                            color: DS.mutedHi,
                            cursor: "pointer",
                            fontFamily: "'Outfit',sans-serif",
                            flexShrink: 0,
                          }}
                        >
                          Clear filter
                        </button>
                      )}
                    </div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                      {QUICK_FILTERS.map((f) => {
                        const on = quickFilter === f;
                        return (
                          <button
                            key={f}
                            type="button"
                            onClick={() => setQuickFilter((prev) => (prev === f ? null : f))}
                            style={{
                              background: on ? DS.accentSoft : DS.bg2,
                              border: `1px solid ${on ? DS.accentBorderHi : DS.border}`,
                              borderRadius: 20,
                              padding: "6px 14px",
                              fontSize: 11.5,
                              color: on ? DS.saffron : DS.mutedHi,
                              fontWeight: on ? 700 : 500,
                              cursor: "pointer",
                              fontFamily: "'Outfit',sans-serif",
                              transition: "background 0.12s, border-color 0.12s, color 0.12s",
                            }}
                          >
                            {f}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div style={{ marginTop: 10 }}>
                    <CategoryGrid activeCat={activeCat} setActiveCat={setActiveCat} counts={categoryCounts} />
                  </div>
                </div>
              </>
            ) : (
              <>
                <h2 style={{ fontSize: 18, fontWeight: 800, color: DS.white, fontFamily: "'Sora',sans-serif", margin: "0 0 6px", flexShrink: 0 }}>
                  {`Jobs in ${stateName}`}
                </h2>
                <p style={{ fontSize: 12, color: DS.muted, fontFamily: "'Outfit',sans-serif", margin: "0 0 12px", flexShrink: 0 }}>
                  {filtered.length} listing{filtered.length !== 1 ? "s" : ""} ·{" "}
                  {filtered.reduce((s, j) => s + j.vacancies, 0).toLocaleString()} vacancies
                  {quickFilter ? ` · ${quickFilter}` : ""}
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: 8,
                    marginBottom: 10,
                    flexShrink: 0,
                  }}
                >
                  <span style={{ fontSize: 11.5, color: DS.muted, fontFamily: "'Outfit',sans-serif" }}>Sort:</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    {["lastDate", "vacancies"].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSort(s)}
                        style={{
                          background: sort === s ? DS.accentSoft : "transparent",
                          border: `1px solid ${sort === s ? DS.accentBorder : DS.border}`,
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
                <div
                  className="home-state-jobs-scroll"
                  style={{
                    flex: 1,
                    minHeight: 0,
                    overflowY: "auto",
                    overflowX: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    paddingRight: 6,
                    WebkitOverflowScrolling: "touch",
                  }}
                >
                  {filtered.length === 0 ? (
                    <div
                      style={{
                        background: DS.bg1,
                        border: `1px solid ${DS.border}`,
                        borderRadius: 12,
                        padding: "16px 14px",
                        fontSize: 12.5,
                        color: DS.mutedHi,
                        fontFamily: "'Outfit',sans-serif",
                        lineHeight: 1.55,
                      }}
                    >
                      No state-specific listings in the sample data for this region. Use ✕ Clear on the map or pick All India in the state strip to return to the full homepage.
                    </div>
                  ) : (
                    filtered.map((job) => <JobCard key={job.id} job={job} onClick={() => onJobClick(job)} />)
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {!selectedState && (
        <section id="main-jobs" style={{ padding: "12px 20px 40px", maxWidth: 1240, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <div>
              <h2 style={{ fontSize: 16, fontWeight: 800, color: DS.white, fontFamily: "'Sora',sans-serif", margin: "0 0 3px" }}>
                {activeCat ? `${CATS.find((c) => c.id === activeCat)?.name || ""} Jobs` : search ? "Search Results" : "Latest Government Jobs"}
              </h2>
              <p style={{ fontSize: 12, color: DS.muted, fontFamily: "'Outfit',sans-serif", margin: 0 }}>
                {filtered.length} jobs · {filtered.reduce((s, j) => s + j.vacancies, 0).toLocaleString()} total vacancies
                {quickFilter ? ` · ${quickFilter}` : ""}
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 11.5, color: DS.muted, fontFamily: "'Outfit',sans-serif" }}>Sort:</span>
              {["lastDate", "vacancies"].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSort(s)}
                  style={{
                    background: sort === s ? DS.accentSoft : "transparent",
                    border: `1px solid ${sort === s ? DS.accentBorder : DS.border}`,
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
                    type="button"
                    onClick={() => setShowAll(true)}
                    style={{ background: DS.bg1, border: `1px solid ${DS.accentBorder}`, borderRadius: 12, padding: "12px 32px", fontSize: 13, fontWeight: 600, color: DS.saffron, cursor: "pointer", fontFamily: "'Outfit',sans-serif" }}
                  >
                    Load More Jobs ({filtered.length - INITIAL_JOB_LIMIT} more) ↓
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      )}

      <AlertSection />
      <Footer />
    </div>
  );
}
