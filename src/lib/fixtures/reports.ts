export type ReportReason =
  | "contrefaçon"
  | "annonce_trompeuse"
  | "objet_volé"
  | "interdiction_légale"
  | "harcèlement"
  | "spam"
  | "autre";

export type ReportPriority = "low" | "medium" | "high" | "critical";
export type ReportStatus = "open" | "in_review" | "resolved" | "dismissed";

export type Report = {
  id: string;
  targetType: "listing" | "user" | "message";
  targetId: string;
  targetTitle: string;
  reporterId: string;
  reason: ReportReason;
  detail: string;
  priority: ReportPriority;
  status: ReportStatus;
  createdAt: string;
  assignedTo?: string;
};

export const reports: Report[] = [
  {
    id: "r_001",
    targetType: "listing",
    targetId: "l_montre_pas_cher",
    targetTitle: "Rolex Submariner réplique — neuve",
    reporterId: "u_marie_l",
    reason: "contrefaçon",
    detail:
      "Le titre indique 'réplique' et l'image montre clairement une contrefaçon. Vente illégale en France.",
    priority: "critical",
    status: "in_review",
    createdAt: "2026-04-19T09:14:00Z",
    assignedTo: "admin",
  },
  {
    id: "r_002",
    targetType: "listing",
    targetId: "l_iphone_signal",
    targetTitle: "iPhone 13 Pro 256Go, signalé",
    reporterId: "u_olivier_t",
    reason: "objet_volé",
    detail:
      "Le numéro de série visible dans une photo correspond à un téléphone déclaré volé sur Reedoo.",
    priority: "high",
    status: "open",
    createdAt: "2026-05-03T14:42:00Z",
  },
  {
    id: "r_003",
    targetType: "user",
    targetId: "u_julien_p",
    targetTitle: "Julien Picard",
    reporterId: "u_camille_b",
    reason: "annonce_trompeuse",
    detail:
      "Plusieurs annonces avec les mêmes photos mais des descriptions différentes. Comportement suspect.",
    priority: "high",
    status: "in_review",
    createdAt: "2026-04-30T19:00:00Z",
    assignedTo: "admin",
  },
  {
    id: "r_004",
    targetType: "message",
    targetId: "m_4521",
    targetTitle: "Conversation avec Hugo Faure",
    reporterId: "u_lea_m",
    reason: "harcèlement",
    detail:
      "Plusieurs messages insistants après refus poli de vente. Demande blocage.",
    priority: "high",
    status: "resolved",
    createdAt: "2026-04-28T22:11:00Z",
    assignedTo: "admin",
  },
  {
    id: "r_005",
    targetType: "listing",
    targetId: "l_tente_4p",
    targetTitle: "Tente 4 places, état neuf",
    reporterId: "u_anais_c",
    reason: "annonce_trompeuse",
    detail: "L'annonceur a refusé deux acheteurs sans raison.",
    priority: "medium",
    status: "open",
    createdAt: "2026-05-03T08:30:00Z",
  },
  {
    id: "r_006",
    targetType: "user",
    targetId: "u_hugo_f",
    targetTitle: "Hugo Faure",
    reporterId: "u_marie_l",
    reason: "spam",
    detail: "Envoie le même message à plusieurs vendeurs.",
    priority: "low",
    status: "dismissed",
    createdAt: "2026-04-25T11:20:00Z",
    assignedTo: "admin",
  },
  {
    id: "r_007",
    targetType: "listing",
    targetId: "l_velo_peugeot",
    targetTitle: "Vélo de ville Peugeot, années 80, bon état",
    reporterId: "u_tom_r",
    reason: "autre",
    detail: "Photo trompeuse — l'objet réel a plus de rouille que sur les photos.",
    priority: "low",
    status: "dismissed",
    createdAt: "2026-04-26T10:05:00Z",
  },
];
