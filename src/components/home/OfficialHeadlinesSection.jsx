import { useMemo } from "react";
import { DS } from "@/theme/designSystem";
import { useOfficialFeed } from "@/hooks/useOfficialFeed";
import {
  filterOfficialItems,
  describeActiveFilters,
} from "@/utils/officialFilters";
import { sitesForStateAndCategory } from "@/data/officialSites";

/**
 * Shows items from `public/data/official-feed-items.json` produced by
 * `npm run fetch:official`, filtered by state / category / sidebar topic.
 *
 * When the live feed has no matches for the active filters, falls back to a
 * curated list of OFFICIAL portal deep-links so the user is never stuck.
 */
export default function OfficialHeadlinesSection({
  stateId = null,
  categoryId = null,
  topicKey = null,
  search = "",
  onClearTopic,
}) {
  const { items, generatedAt, error } = useOfficialFeed();

  const filtered = useMemo(
    () => filterOfficialItems(items, { stateId, categoryId, topicKey, search }),
    [items, stateId, categoryId, topicKey, search]
  );

  const fallbackSites = useMemo(
    () => sitesForStateAndCategory(stateId, categoryId),
    [stateId, categoryId]
  );

  const activeLabel = describeActiveFilters({ stateId, categoryId, topicKey, search });

  if (error && items.length === 0) {
    return (
      <section style={{ padding: "0 20px 28px", maxWidth: 1240, margin: "0 auto" }} aria-label="Official headlines">
        <div style={{ fontSize: 12, color: DS.muted, fontFamily: "'Outfit',sans-serif" }}>
          Official feed snapshot unavailable ({error}). Run <code style={{ fontSize: 11 }}>npm run fetch:official</code> locally to generate{" "}
          <code style={{ fontSize: 11 }}>public/data/official-feed-items.json</code>. Showing curated portals instead.
        </div>
        <OfficialPortalGrid sites={fallbackSites} />
      </section>
    );
  }

  if (items.length === 0 && !generatedAt) return null;

  const showFallback = filtered.length === 0;

  return (
    <section id="official-headlines" style={{ padding: "0 20px 32px", maxWidth: 1240, margin: "0 auto" }} aria-label="Official headlines">
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, marginBottom: 12, flexWrap: "wrap" }}>
        <div>
          <h2 style={{ fontSize: 16, fontWeight: 800, color: DS.white, fontFamily: "'Sora',sans-serif", margin: "0 0 4px" }}>
            Official wire & notices
          </h2>
          <p style={{ fontSize: 12, color: DS.muted, fontFamily: "'Outfit',sans-serif", margin: 0, maxWidth: 720, lineHeight: 1.5 }}>
            Headlines from official RSS feeds listed in{" "}
            <code style={{ fontSize: 10.5 }}>scripts/official-sources.json</code> (run{" "}
            <code style={{ fontSize: 10.5 }}>npm run fetch:official</code>).
            {activeLabel ? (
              <>
                {" "}Filtered by <strong style={{ color: DS.saffron }}>{activeLabel}</strong>.
              </>
            ) : null}
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          {topicKey && typeof onClearTopic === "function" && (
            <button
              type="button"
              onClick={onClearTopic}
              style={{
                background: "transparent",
                border: `1px solid ${DS.accentBorder}`,
                borderRadius: 8,
                padding: "4px 10px",
                fontSize: 11,
                color: DS.saffron,
                cursor: "pointer",
                fontFamily: "'Outfit',sans-serif",
              }}
            >
              ✕ Clear topic
            </button>
          )}
          {generatedAt && (
            <span style={{ fontSize: 10.5, color: DS.muted, fontFamily: "'JetBrains Mono',monospace" }}>
              Snapshot: {new Date(generatedAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
            </span>
          )}
        </div>
      </div>

      {showFallback ? (
        <>
          <div
            style={{
              background: DS.bg1,
              border: `1px solid ${DS.border}`,
              borderRadius: 12,
              padding: "10px 14px",
              fontSize: 12,
              color: DS.mutedHi,
              fontFamily: "'Outfit',sans-serif",
              marginBottom: 12,
              lineHeight: 1.55,
            }}
          >
            No matching items in the latest RSS snapshot{activeLabel ? ` for ${activeLabel}` : ""}. Browse the official portals below — each opens directly on the recruitment / notifications page.
          </div>
          <OfficialPortalGrid sites={fallbackSites} />
        </>
      ) : (
        <FeedList items={filtered} />
      )}
    </section>
  );
}

function FeedList({ items }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        maxHeight: 380,
        overflowY: "auto",
        paddingRight: 4,
        WebkitOverflowScrolling: "touch",
      }}
    >
      {items.slice(0, 60).map((it) => (
        <article
          key={it.id}
          style={{
            background: DS.bg1,
            border: `1px solid ${DS.border}`,
            borderRadius: 12,
            padding: "10px 12px",
            fontFamily: "'Outfit',sans-serif",
          }}
        >
          <div
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: DS.saffron,
              letterSpacing: 0.6,
              marginBottom: 4,
              textTransform: "uppercase",
              display: "flex",
              alignItems: "center",
              gap: 8,
              flexWrap: "wrap",
            }}
          >
            <span>{it.sourceName || it.sourceId}</span>
            {it.state && it.state !== "All India" && (
              <span style={{ color: DS.mutedHi, fontWeight: 600 }}>· {it.state}</span>
            )}
          </div>
          <a
            href={it.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: 13.5,
              fontWeight: 600,
              color: DS.white,
              textDecoration: "none",
              lineHeight: 1.45,
            }}
          >
            {it.title}
            <span style={{ color: DS.muted, fontWeight: 400 }}> ↗</span>
          </a>
          {it.pdfUrls?.length > 0 && (
            <div style={{ marginTop: 8, display: "flex", flexWrap: "wrap", gap: 6 }}>
              {it.pdfUrls.map((pdf, pi) => {
                let label = "PDF";
                try {
                  const seg = decodeURIComponent(pdf.split("/").pop() || "");
                  if (seg && seg.length < 42) label = seg;
                } catch {
                  /* ignore */
                }
                return (
                  <a
                    key={pdf}
                    href={pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={pdf}
                    style={{
                      fontSize: 11,
                      color: DS.saffron,
                      textDecoration: "none",
                      border: `1px solid ${DS.accentBorder}`,
                      borderRadius: 8,
                      padding: "3px 8px",
                      maxWidth: 200,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {it.pdfUrls.length > 1 ? `${label} (${pi + 1})` : `${label}`} ↗
                  </a>
                );
              })}
            </div>
          )}
        </article>
      ))}
    </div>
  );
}

function OfficialPortalGrid({ sites }) {
  if (!sites.length) {
    return (
      <div
        style={{
          background: DS.bg1,
          border: `1px solid ${DS.border}`,
          borderRadius: 12,
          padding: "14px 16px",
          fontSize: 12.5,
          color: DS.mutedHi,
          fontFamily: "'Outfit',sans-serif",
        }}
      >
        No curated portals found for this filter combination. Clear the state or category to see all official sites.
      </div>
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: 10,
      }}
    >
      {sites.map((s) => (
        <a
          key={s.id}
          href={s.latestUrl || s.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: DS.bg1,
            border: `1px solid ${DS.border}`,
            borderRadius: 12,
            padding: "10px 12px",
            textDecoration: "none",
            fontFamily: "'Outfit',sans-serif",
            color: DS.white,
            display: "flex",
            flexDirection: "column",
            gap: 4,
            transition: "border-color 0.15s, background 0.15s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = DS.accentBorderHi;
            e.currentTarget.style.background = DS.bg2;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = DS.border;
            e.currentTarget.style.background = DS.bg1;
          }}
        >
          <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: 0.6, color: DS.saffron, textTransform: "uppercase" }}>
            {s.scope}
          </span>
          <span style={{ fontSize: 13, fontWeight: 700, lineHeight: 1.35 }}>
            {s.name} <span style={{ color: DS.muted, fontWeight: 400 }}>↗</span>
          </span>
          <span style={{ fontSize: 10.5, color: DS.mutedHi, wordBreak: "break-all" }}>
            {hostFromUrl(s.latestUrl || s.url)}
          </span>
        </a>
      ))}
    </div>
  );
}

function hostFromUrl(u) {
  try {
    return new URL(u).host;
  } catch {
    return u;
  }
}
