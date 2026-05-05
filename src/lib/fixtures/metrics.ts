// Plausible launch metrics for a Lille-only marketplace, ~6 months post launch.
// Used by admin dashboard, analytics, finance.

export const summary = {
  users: 5184,
  usersDelta: 0.082, // +8.2%
  activeUsers7d: 1842,
  activeUsersDelta: 0.115,
  listings: 1248,
  listingsDelta: 0.043,
  liveListings: 982,
  gmvMonth: 42180,
  gmvDelta: 0.124,
  revenueMonth: 2109, // 5% take rate on GMV + ~360 € of MyStreet+ + boosts
  revenueDelta: 0.124,
  pendingReviews: 7,
  openDisputes: 3,
  pendingKyc: 40,
  pendingPayouts: 14580,
  payoutCycleDays: 2,
  ordersMonth: 640,
  averageOrderValue: 65,
  plusSubscribers: 180,
  reportsThisWeek: 25,
} as const;

// Daily series — last 30 days. Realistic small-town shape: weekend dips, weekday volume.
export const dailyGmv = [
  { date: "2026-04-05", value: 1184 },
  { date: "2026-04-06", value: 1320 },
  { date: "2026-04-07", value: 1402 },
  { date: "2026-04-08", value: 1518 },
  { date: "2026-04-09", value: 1632 },
  { date: "2026-04-10", value: 980 },
  { date: "2026-04-11", value: 842 },
  { date: "2026-04-12", value: 1224 },
  { date: "2026-04-13", value: 1390 },
  { date: "2026-04-14", value: 1456 },
  { date: "2026-04-15", value: 1574 },
  { date: "2026-04-16", value: 1610 },
  { date: "2026-04-17", value: 1064 },
  { date: "2026-04-18", value: 924 },
  { date: "2026-04-19", value: 1308 },
  { date: "2026-04-20", value: 1442 },
  { date: "2026-04-21", value: 1518 },
  { date: "2026-04-22", value: 1684 },
  { date: "2026-04-23", value: 1742 },
  { date: "2026-04-24", value: 1142 },
  { date: "2026-04-25", value: 1018 },
  { date: "2026-04-26", value: 1430 },
  { date: "2026-04-27", value: 1582 },
  { date: "2026-04-28", value: 1648 },
  { date: "2026-04-29", value: 1712 },
  { date: "2026-04-30", value: 1820 },
  { date: "2026-05-01", value: 1182 },
  { date: "2026-05-02", value: 1064 },
  { date: "2026-05-03", value: 1542 },
  { date: "2026-05-04", value: 1684 },
];

export const newSignups = [
  { date: "2026-04-05", value: 38 },
  { date: "2026-04-06", value: 42 },
  { date: "2026-04-07", value: 51 },
  { date: "2026-04-08", value: 47 },
  { date: "2026-04-09", value: 56 },
  { date: "2026-04-10", value: 28 },
  { date: "2026-04-11", value: 22 },
  { date: "2026-04-12", value: 44 },
  { date: "2026-04-13", value: 49 },
  { date: "2026-04-14", value: 53 },
  { date: "2026-04-15", value: 61 },
  { date: "2026-04-16", value: 58 },
  { date: "2026-04-17", value: 31 },
  { date: "2026-04-18", value: 26 },
  { date: "2026-04-19", value: 47 },
  { date: "2026-04-20", value: 52 },
  { date: "2026-04-21", value: 55 },
  { date: "2026-04-22", value: 64 },
  { date: "2026-04-23", value: 67 },
  { date: "2026-04-24", value: 38 },
  { date: "2026-04-25", value: 30 },
  { date: "2026-04-26", value: 51 },
  { date: "2026-04-27", value: 60 },
  { date: "2026-04-28", value: 63 },
  { date: "2026-04-29", value: 68 },
  { date: "2026-04-30", value: 72 },
  { date: "2026-05-01", value: 41 },
  { date: "2026-05-02", value: 33 },
  { date: "2026-05-03", value: 56 },
  { date: "2026-05-04", value: 64 },
];

// Categories breakdown — % of GMV
export const categoryMix = [
  { name: "Maison & déco", value: 27 },
  { name: "Mode", value: 19 },
  { name: "High-tech", value: 18 },
  { name: "Enfant", value: 12 },
  { name: "Vélo", value: 8 },
  { name: "Loisirs", value: 7 },
  { name: "Jardinage", value: 5 },
  { name: "Livres", value: 4 },
];

// Engagement funnel — last 30 days
export const funnel = [
  { step: "Visites annonce", value: 84210 },
  { step: "Sauvegardes", value: 12420 },
  { step: "Messages envoyés", value: 4180 },
  { step: "Achats initiés", value: 1842 },
  { step: "Achats payés", value: 1604 },
  { step: "Achats finalisés", value: 1518 },
];

// Geo heatmap — quartier mass
export const geoBreakdown = [
  { neighborhood: "Vieux-Lille", users: 842, listings: 218, gmv: 9120 },
  { neighborhood: "Wazemmes", users: 712, listings: 182, gmv: 6480 },
  { neighborhood: "Vauban", users: 624, listings: 158, gmv: 5340 },
  { neighborhood: "Moulins", users: 588, listings: 144, gmv: 4920 },
  { neighborhood: "Saint-Maurice-Pellevoisin", users: 502, listings: 122, gmv: 4180 },
  { neighborhood: "Bois-Blancs", users: 484, listings: 118, gmv: 3960 },
  { neighborhood: "Lille-Sud", users: 462, listings: 110, gmv: 3680 },
  { neighborhood: "Fives", users: 441, listings: 104, gmv: 3500 },
];
