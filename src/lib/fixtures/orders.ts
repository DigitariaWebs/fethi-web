export type OrderStatus =
  | "completed"
  | "shipped"
  | "in_transit"
  | "pending_payment"
  | "disputed"
  | "refunded"
  | "cancelled";

export type Order = {
  id: string;
  ref: string;
  buyerId: string;
  sellerId: string;
  listingId: string;
  amount: number;
  fee: number;
  net: number;
  status: OrderStatus;
  createdAt: string;
  paidAt?: string;
  completedAt?: string;
  payoutAt?: string;
  shippingMethod: "remise_main" | "colissimo" | "mondial_relay" | "à_pied";
};

export const orders: Order[] = [
  {
    id: "o_001",
    ref: "MS-26-04-1041",
    buyerId: "u_tom_r",
    sellerId: "u_marie_l",
    listingId: "l_velo_peugeot",
    amount: 120,
    fee: 6.0,
    net: 114.0,
    status: "completed",
    createdAt: "2026-04-23T11:00:00Z",
    paidAt: "2026-04-23T11:01:00Z",
    completedAt: "2026-04-24T17:32:00Z",
    payoutAt: "2026-04-26T08:00:00Z",
    shippingMethod: "remise_main",
  },
  {
    id: "o_002",
    ref: "MS-26-04-1287",
    buyerId: "u_sophie_d",
    sellerId: "u_lea_m",
    listingId: "l_nespresso",
    amount: 45,
    fee: 2.25,
    net: 42.75,
    status: "shipped",
    createdAt: "2026-04-30T18:14:00Z",
    paidAt: "2026-04-30T18:15:00Z",
    shippingMethod: "mondial_relay",
  },
  {
    id: "o_003",
    ref: "MS-26-05-0042",
    buyerId: "u_camille_b",
    sellerId: "u_karim_b",
    listingId: "l_ps4",
    amount: 180,
    fee: 9.0,
    net: 171.0,
    status: "in_transit",
    createdAt: "2026-05-02T10:00:00Z",
    paidAt: "2026-05-02T10:01:00Z",
    shippingMethod: "colissimo",
  },
  {
    id: "o_004",
    ref: "MS-26-05-0089",
    buyerId: "u_olivier_t",
    sellerId: "u_anais_c",
    listingId: "l_tondeuse_bosch",
    amount: 60,
    fee: 3.0,
    net: 57.0,
    status: "pending_payment",
    createdAt: "2026-05-04T08:30:00Z",
    shippingMethod: "à_pied",
  },
  {
    id: "o_005",
    ref: "MS-26-05-0017",
    buyerId: "u_julien_p",
    sellerId: "u_pierre_v",
    listingId: "l_velo_enfant",
    amount: 35,
    fee: 1.75,
    net: 33.25,
    status: "disputed",
    createdAt: "2026-05-01T19:42:00Z",
    paidAt: "2026-05-01T19:43:00Z",
    shippingMethod: "remise_main",
  },
  {
    id: "o_006",
    ref: "MS-26-04-0987",
    buyerId: "u_nora_k",
    sellerId: "u_olivier_t",
    listingId: "l_canape_ikea",
    amount: 90,
    fee: 4.5,
    net: 85.5,
    status: "completed",
    createdAt: "2026-04-21T13:00:00Z",
    paidAt: "2026-04-21T13:01:00Z",
    completedAt: "2026-04-23T16:00:00Z",
    payoutAt: "2026-04-25T08:00:00Z",
    shippingMethod: "remise_main",
  },
  {
    id: "o_007",
    ref: "MS-26-04-1502",
    buyerId: "u_marie_l",
    sellerId: "u_sophie_d",
    listingId: "l_livres_poche",
    amount: 20,
    fee: 1.0,
    net: 19.0,
    status: "completed",
    createdAt: "2026-05-02T11:00:00Z",
    paidAt: "2026-05-02T11:01:00Z",
    completedAt: "2026-05-03T09:30:00Z",
    payoutAt: "2026-05-04T08:00:00Z",
    shippingMethod: "mondial_relay",
  },
  {
    id: "o_008",
    ref: "MS-26-04-0772",
    buyerId: "u_anais_c",
    sellerId: "u_lea_m",
    listingId: "l_robe_zara",
    amount: 25,
    fee: 1.25,
    net: 23.75,
    status: "refunded",
    createdAt: "2026-04-15T14:00:00Z",
    paidAt: "2026-04-15T14:01:00Z",
    shippingMethod: "à_pied",
  },
];

export function getOrder(id: string) {
  return orders.find((o) => o.id === id);
}
