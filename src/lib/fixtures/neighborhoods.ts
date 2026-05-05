export const neighborhoods = [
  { id: "vieux-lille", name: "Vieux-Lille", lat: 50.643, lng: 3.066 },
  { id: "wazemmes", name: "Wazemmes", lat: 50.628, lng: 3.054 },
  { id: "vauban", name: "Vauban", lat: 50.633, lng: 3.045 },
  { id: "moulins", name: "Moulins", lat: 50.617, lng: 3.075 },
  { id: "saint-maurice", name: "Saint-Maurice-Pellevoisin", lat: 50.643, lng: 3.092 },
  { id: "bois-blancs", name: "Bois-Blancs", lat: 50.634, lng: 3.025 },
  { id: "lille-sud", name: "Lille-Sud", lat: 50.611, lng: 3.057 },
  { id: "fives", name: "Fives", lat: 50.633, lng: 3.094 },
] as const;

export type NeighborhoodId = (typeof neighborhoods)[number]["id"];

export function neighborhoodName(id: NeighborhoodId) {
  return neighborhoods.find((n) => n.id === id)?.name ?? id;
}
