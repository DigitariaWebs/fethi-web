export type ActivityType =
  | "listing_published"
  | "listing_sold"
  | "user_signup"
  | "kyc_submitted"
  | "kyc_verified"
  | "report_filed"
  | "dispute_opened"
  | "payout_completed"
  | "user_suspended"
  | "listing_rejected";

export type ActivityEvent = {
  id: string;
  type: ActivityType;
  actor: string;
  target?: string;
  amount?: number;
  at: string;
};

export const activity: ActivityEvent[] = [
  {
    id: "a_001",
    type: "listing_sold",
    actor: "Marie Lambert",
    target: "Vélo de ville Peugeot",
    amount: 120,
    at: "2026-05-04T13:42:00Z",
  },
  {
    id: "a_002",
    type: "user_signup",
    actor: "Camille Bernard",
    at: "2026-05-04T13:25:00Z",
  },
  {
    id: "a_003",
    type: "report_filed",
    actor: "Olivier Thibault",
    target: "iPhone 13 Pro 256Go, signalé",
    at: "2026-05-04T12:08:00Z",
  },
  {
    id: "a_004",
    type: "kyc_verified",
    actor: "Nora Khaled",
    at: "2026-05-04T11:55:00Z",
  },
  {
    id: "a_005",
    type: "listing_published",
    actor: "Léa Marchand",
    target: "Robe Zara, taille 38",
    at: "2026-05-04T10:30:00Z",
  },
  {
    id: "a_006",
    type: "payout_completed",
    actor: "Pierre Vasseur",
    amount: 184.4,
    at: "2026-05-04T08:00:00Z",
  },
  {
    id: "a_007",
    type: "dispute_opened",
    actor: "Julien Picard",
    target: "Vélo enfant 6 ans",
    at: "2026-05-03T22:14:00Z",
  },
  {
    id: "a_008",
    type: "listing_rejected",
    actor: "système",
    target: "Rolex Submariner réplique",
    at: "2026-05-03T20:42:00Z",
  },
  {
    id: "a_009",
    type: "kyc_submitted",
    actor: "Hugo Faure",
    at: "2026-05-03T19:00:00Z",
  },
  {
    id: "a_010",
    type: "user_suspended",
    actor: "système",
    target: "Julien Picard",
    at: "2026-05-03T18:30:00Z",
  },
  {
    id: "a_011",
    type: "listing_sold",
    actor: "Sophie Dupont",
    target: "Lot de 12 livres de poche",
    amount: 20,
    at: "2026-05-02T11:00:00Z",
  },
  {
    id: "a_012",
    type: "listing_sold",
    actor: "Olivier Thibault",
    target: "Canapé 2 places IKEA",
    amount: 90,
    at: "2026-04-21T13:00:00Z",
  },
];
