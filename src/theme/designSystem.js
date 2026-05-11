/* Centralized design tokens — dark (default) and black & white (light monochrome). */

const DARK = {
  bg0: "#03060D",
  bg1: "#080D1A",
  bg2: "#0C1220",
  bg3: "#101828",
  border: "#131D2E",
  borderHi: "#1E2D42",
  saffron: "#FF6B00",
  saffronHi: "#FF8C35",
  gold: "#FFAA00",
  white: "#EDF2FF",
  muted: "#3D5068",
  mutedHi: "#6B829A",
  green: "#22C55E",
  red: "#EF4444",
  blue: "#38BDF8",
  /* Semantic UI (no hardcoded orange in components) */
  accentSoft: "rgba(255,107,0,0.12)",
  accentSoftMid: "rgba(255,107,0,0.1)",
  accentBorder: "rgba(255,107,0,0.35)",
  accentBorderHi: "rgba(255,107,0,0.45)",
  accentBorderLo: "rgba(255,107,0,0.25)",
  accentBorderNav: "rgba(255,107,0,0.3)",
  accentGlow: "rgba(255,107,0,0.07)",
  gradientBrand: "linear-gradient(135deg,#FF6B00,#FFAA00)",
  gradientRule: "linear-gradient(to right,#FF6B00,#FFAA00)",
  inkOnBrand: "#060A00",
  panelWarm: "linear-gradient(135deg,#1A0E00,#0A1228)",
  sheetBg: "rgba(3,6,13,0.98)",
  navScrim: "rgba(3,6,13,0.97)",
  jobCardHoverBg: "#0E1828",
  alertPanelBg: "linear-gradient(135deg,#0C1828,#1A0E00)",
  switchKnobShadow: "0 0 8px rgba(255,107,0,0.35)",
  accentChipActiveBg: "rgba(255,107,0,0.15)",
  accentChipActiveBorder: "rgba(255,107,0,0.5)",
};

/** Light monochrome — neutral grays, no orange. */
const BW = {
  bg0: "#E8E9ED",
  bg1: "#FFFFFF",
  bg2: "#F3F4F7",
  bg3: "#E2E3E9",
  border: "#B8BAC4",
  borderHi: "#9FA2AE",
  saffron: "#1C1C22",
  saffronHi: "#2E2E36",
  gold: "#45454E",
  white: "#0E0E12",
  muted: "#5E6068",
  mutedHi: "#3A3C44",
  green: "#3D3D44",
  red: "#2A2A2E",
  blue: "#45454D",
  accentSoft: "rgba(20,22,30,0.07)",
  accentSoftMid: "rgba(20,22,30,0.09)",
  accentBorder: "rgba(20,22,30,0.2)",
  accentBorderHi: "rgba(20,22,30,0.32)",
  accentBorderLo: "rgba(20,22,30,0.14)",
  accentBorderNav: "rgba(20,22,30,0.22)",
  accentGlow: "rgba(20,22,30,0.05)",
  gradientBrand: "linear-gradient(135deg,#2C2C34,#5C5C68)",
  gradientRule: "linear-gradient(to right,#24242A,#6A6A76)",
  inkOnBrand: "#F6F6F8",
  panelWarm: "linear-gradient(135deg,#FBFBFC,#EEEEF2)",
  sheetBg: "rgba(255,255,255,0.94)",
  navScrim: "rgba(255,255,255,0.94)",
  jobCardHoverBg: "#F0F1F5",
  alertPanelBg: "linear-gradient(135deg,#F6F6F8,#EBECF0)",
  switchKnobShadow: "0 1px 3px rgba(0,0,0,0.2)",
  accentChipActiveBg: "rgba(20,22,30,0.1)",
  accentChipActiveBorder: "rgba(20,22,30,0.38)",
};

let active = { ...DARK };

/**
 * @param {"dark" | "bw"} mode
 */
export function applyColorMode(mode) {
  active = mode === "bw" ? { ...BW } : { ...DARK };
}

export const DS = new Proxy(
  {},
  {
    get(_, prop) {
      return active[prop];
    },
  }
);

export const REGION_FILLS = {
  north: { base: "#0A1E3C", hover: "#142E55", border: "#163258" },
  south: { base: "#071A14", hover: "#0D2E1E", border: "#113824" },
  east: { base: "#160C04", hover: "#281408", border: "#2E1A08" },
  west: { base: "#180A14", hover: "#2C1225", border: "#341530" },
  central: { base: "#0C0C1E", hover: "#161638", border: "#1C1C44" },
  northeast: { base: "#061618", hover: "#0C282C", border: "#10303A" },
};
