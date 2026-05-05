import type { NeighborhoodId } from "./neighborhoods";

export type ListingCategory =
  | "vélo"
  | "mode"
  | "maison"
  | "high-tech"
  | "jardinage"
  | "loisirs"
  | "livres"
  | "enfant"
  | "services"
  | "location";

export type ListingStatus = "active" | "pending" | "sold" | "rejected" | "flagged" | "draft";
export type ListingType = "vente" | "service" | "location";

export type Listing = {
  id: string;
  title: string;
  category: ListingCategory;
  type: ListingType;
  price: number; // EUR
  priceUnit?: "jour" | "heure" | "session";
  distanceMeters: number;
  neighborhood: NeighborhoodId;
  sellerId: string;
  status: ListingStatus;
  featured?: boolean;
  views: number;
  saves: number;
  messages: number;
  createdAt: string;
  description: string;
  flags?: number;
  photo?: string;
};

// Mirrors MyStreet-Mobile/src/lib/fixtures.ts PHOTO map — same image per object
// across web and mobile so the brand stays consistent.
const PHOTO = {
  bike: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=800&q=80",
  baby: "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=800&q=80",
  nespresso: "https://images.unsplash.com/photo-1572119865084-43c285814d63?w=800&q=80",
  ps4: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&q=80",
  mower: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80",
  couch: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=80",
  books: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&q=80",
  tent: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80",
  drill: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=800&q=80",
  baby_sitting: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80",
};

export const listings: Listing[] = [
  {
    id: "l_velo_peugeot",
    title: "Vélo de ville Peugeot, années 80, bon état",
    category: "vélo",
    type: "vente",
    price: 120,
    distanceMeters: 180,
    neighborhood: "vieux-lille",
    sellerId: "u_marie_l",
    status: "active",
    featured: true,
    views: 412,
    saves: 38,
    messages: 12,
    createdAt: "2026-04-22T10:30:00Z",
    description:
      "Vélo de ville Peugeot vintage, années 80. Cadre acier, dérailleur Simplex. Pneus changés cette année. Selle d'origine en cuir patiné. Idéal pour rouler dans le Vieux-Lille.",
    photo: PHOTO.bike,
  },
  {
    id: "l_vetements_bebe",
    title: "Lot vêtements bébé 6–9 mois",
    category: "enfant",
    type: "vente",
    price: 15,
    distanceMeters: 320,
    neighborhood: "wazemmes",
    sellerId: "u_tom_r",
    status: "active",
    views: 187,
    saves: 14,
    messages: 5,
    createdAt: "2026-04-28T16:12:00Z",
    description:
      "Lot de 18 pièces : 6 bodies, 4 pyjamas, 3 pantalons, 5 hauts. Marques Petit Bateau, DPAM, Kiabi. Très bon état, peu portés.",
    photo: PHOTO.baby,
  },
  {
    id: "l_nespresso",
    title: "Machine Nespresso + 40 capsules",
    category: "maison",
    type: "vente",
    price: 45,
    distanceMeters: 410,
    neighborhood: "vauban",
    sellerId: "u_lea_m",
    status: "active",
    views: 256,
    saves: 22,
    messages: 8,
    createdAt: "2026-04-30T09:00:00Z",
    description:
      "Machine Nespresso Pixie, parfait état de marche. Détartrée le mois dernier. Vendue avec 40 capsules variées (Arpeggio, Volluto, Linizio).",
    photo: PHOTO.nespresso,
  },
  {
    id: "l_ps4",
    title: "PS4 + 5 jeux + 2 manettes",
    category: "high-tech",
    type: "vente",
    price: 180,
    distanceMeters: 240,
    neighborhood: "moulins",
    sellerId: "u_karim_b",
    status: "active",
    featured: true,
    views: 894,
    saves: 67,
    messages: 24,
    createdAt: "2026-04-15T19:30:00Z",
    description:
      "PS4 Slim 1To, 2 manettes officielles, 5 jeux : FIFA 23, GTA V, Red Dead 2, The Last of Us 2, Spider-Man. Console nettoyée intérieurement, état impeccable.",
    photo: PHOTO.ps4,
  },
  {
    id: "l_tondeuse_bosch",
    title: "Tondeuse électrique Bosch",
    category: "jardinage",
    type: "vente",
    price: 60,
    distanceMeters: 510,
    neighborhood: "saint-maurice",
    sellerId: "u_anais_c",
    status: "active",
    views: 142,
    saves: 9,
    messages: 3,
    createdAt: "2026-04-26T14:00:00Z",
    description:
      "Tondeuse Bosch Rotak 32 R, 1200W, largeur de coupe 32cm. Bac de 31L. Achetée en 2024, très peu utilisée (petit jardin).",
    photo: PHOTO.mower,
  },
  {
    id: "l_canape_ikea",
    title: "Canapé 2 places, IKEA, beige",
    category: "maison",
    type: "vente",
    price: 90,
    distanceMeters: 690,
    neighborhood: "bois-blancs",
    sellerId: "u_olivier_t",
    status: "active",
    views: 318,
    saves: 41,
    messages: 11,
    createdAt: "2026-04-19T11:20:00Z",
    description:
      "Canapé IKEA Klippan 2 places, housse beige (déhoussable et lavable). Acheté il y a 2 ans, utilisé dans un salon non-fumeur. À enlever sur place — j'aide à descendre.",
    photo: PHOTO.couch,
  },
  {
    id: "l_livres_poche",
    title: "Lot de 12 livres de poche",
    category: "livres",
    type: "vente",
    price: 20,
    distanceMeters: 280,
    neighborhood: "fives",
    sellerId: "u_sophie_d",
    status: "active",
    views: 96,
    saves: 6,
    messages: 2,
    createdAt: "2026-05-01T08:45:00Z",
    description:
      "12 romans en très bon état. Auteurs : Modiano, Annie Ernaux, Houellebecq, Despentes, Eric Vuillard. Liste détaillée en photo.",
    photo: PHOTO.books,
  },
  {
    id: "l_tente_4p",
    title: "Tente 4 places, état neuf",
    category: "loisirs",
    type: "vente",
    price: 75,
    distanceMeters: 450,
    neighborhood: "lille-sud",
    sellerId: "u_hugo_f",
    status: "pending",
    views: 73,
    saves: 4,
    messages: 1,
    flags: 2,
    createdAt: "2026-05-02T17:30:00Z",
    description:
      "Tente Quechua Arpenaz 4.1, montée une seule fois pour test. Servie zéro nuit. Vendue avec sac de transport.",
    photo: PHOTO.tent,
  },
  {
    id: "l_perceuse_loc",
    title: "Perceuse-visseuse Bosch en location",
    category: "location",
    type: "location",
    price: 8,
    priceUnit: "jour",
    distanceMeters: 230,
    neighborhood: "vieux-lille",
    sellerId: "u_camille_b",
    status: "active",
    views: 124,
    saves: 11,
    messages: 4,
    createdAt: "2026-04-25T10:00:00Z",
    description:
      "Perceuse-visseuse 18V Bosch GSR avec 2 batteries et chargeur. Parfaite pour montage IKEA, fixation murale, petits travaux.",
    photo: PHOTO.drill,
  },
  {
    id: "l_baby_sit_serv",
    title: "Babysitting le week-end (étudiante CAP petite enfance)",
    category: "services",
    type: "service",
    price: 12,
    priceUnit: "heure",
    distanceMeters: 380,
    neighborhood: "wazemmes",
    sellerId: "u_nora_k",
    status: "active",
    views: 162,
    saves: 18,
    messages: 7,
    createdAt: "2026-04-29T20:15:00Z",
    description:
      "Étudiante en CAP petite enfance (3e année), expérience avec enfants 1-8 ans. Disponible vendredi soir, samedi & dimanche journée.",
    photo: PHOTO.baby_sitting,
  },
  {
    id: "l_velo_enfant",
    title: "Vélo enfant 6 ans, garçon, bleu",
    category: "enfant",
    type: "vente",
    price: 35,
    distanceMeters: 540,
    neighborhood: "moulins",
    sellerId: "u_pierre_v",
    status: "active",
    views: 211,
    saves: 19,
    messages: 6,
    createdAt: "2026-04-21T13:00:00Z",
    description:
      "Vélo Btwin 16 pouces, taille 4-6 ans. Petites rayures sur le cadre, sinon bon état. Roulettes incluses.",
    photo: PHOTO.bike,
  },
  {
    id: "l_robe_zara",
    title: "Robe Zara, taille 38, jamais portée",
    category: "mode",
    type: "vente",
    price: 25,
    distanceMeters: 190,
    neighborhood: "vauban",
    sellerId: "u_lea_m",
    status: "active",
    views: 89,
    saves: 7,
    messages: 2,
    createdAt: "2026-05-03T15:40:00Z",
    description: "Robe d'été Zara, taille 38, étiquette encore présente. Achetée trop petite.",
    photo: PHOTO.couch,
  },
  {
    id: "l_iphone_signal",
    title: "iPhone 13 Pro 256Go, signalé",
    category: "high-tech",
    type: "vente",
    price: 320,
    distanceMeters: 720,
    neighborhood: "fives",
    sellerId: "u_julien_p",
    status: "flagged",
    views: 1842,
    saves: 124,
    messages: 41,
    flags: 6,
    createdAt: "2026-04-30T22:00:00Z",
    description:
      "iPhone 13 Pro 256Go, débloqué tout opérateur. État correct, batterie 88%. (Annonce signalée — en cours de revue.)",
    photo: PHOTO.ps4,
  },
  {
    id: "l_montre_pas_cher",
    title: "Rolex Submariner réplique — neuve",
    category: "mode",
    type: "vente",
    price: 95,
    distanceMeters: 880,
    neighborhood: "lille-sud",
    sellerId: "u_julien_p",
    status: "rejected",
    views: 314,
    saves: 8,
    messages: 1,
    flags: 9,
    createdAt: "2026-04-18T11:11:00Z",
    description: "(Annonce rejetée — contrefaçon)",
  },
];

export { PHOTO };

export function getListing(id: string) {
  return listings.find((l) => l.id === id);
}
