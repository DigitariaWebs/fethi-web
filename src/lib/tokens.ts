// Single source of truth for brand tokens used outside Tailwind config
// (e.g., chart colors, dynamic styles). Tailwind classes still drive UI.

export const colors = {
  primary: "#C8553D",
  primaryHover: "#B14732",
  primaryPressed: "#9A3C2B",
  primarySoft: "#FBE9E2",
  primaryInk: "#5C2419",

  accent: "#2F6B5E",
  accentSoft: "#E4EDE9",

  paper: "#FBF8F4",
  surface: "#FFFFFF",
  ink: "#1F2421",

  n50: "#F5F1EB",
  n100: "#ECE6DD",
  n200: "#DDD5C8",
  n300: "#C2B7A4",
  n400: "#9C907C",
  n500: "#76695A",
  n600: "#574E42",
  n700: "#3B342C",
  n800: "#272320",

  success: "#3F7D5C",
  successSoft: "#E2EFE7",
  warning: "#C68A2E",
  warningSoft: "#F7ECD6",
  danger: "#B23A2A",
  dangerSoft: "#F7E1DC",
  info: "#3A6BA3",
  infoSoft: "#E1EAF4",
} as const;

// Sequence used in chart palettes — terracotta-led with warm/cool spread.
export const chartPalette = [
  "#C8553D",
  "#2F6B5E",
  "#C68A2E",
  "#3A6BA3",
  "#76695A",
  "#9A3C2B",
  "#3F7D5C",
  "#574E42",
] as const;

export const motionEase = [0.22, 1, 0.36, 1] as const;
