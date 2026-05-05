import { format, formatDistanceToNow, differenceInDays } from "date-fns";
import { fr } from "date-fns/locale";

export function formatEuro(value: number, opts: { withSymbol?: boolean; decimals?: number } = {}) {
  const { withSymbol = true, decimals = 0 } = opts;
  const formatter = new Intl.NumberFormat("fr-FR", {
    style: withSymbol ? "currency" : "decimal",
    currency: "EUR",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return formatter.format(value);
}

export function formatDistance(meters: number): string {
  if (meters < 1000) return `${Math.round(meters)} m`;
  return `${(meters / 1000).toFixed(1).replace(".", ",")} km`;
}

export function formatNumber(n: number) {
  return new Intl.NumberFormat("fr-FR").format(n);
}

export function formatDate(d: Date | string, pattern = "d MMM yyyy") {
  const date = typeof d === "string" ? new Date(d) : d;
  return format(date, pattern, { locale: fr });
}

export function formatDateTime(d: Date | string) {
  const date = typeof d === "string" ? new Date(d) : d;
  return format(date, "d MMM yyyy · HH:mm", { locale: fr });
}

export function timeAgo(d: Date | string) {
  const date = typeof d === "string" ? new Date(d) : d;
  return formatDistanceToNow(date, { locale: fr, addSuffix: true });
}

export function daysAgo(d: Date | string) {
  const date = typeof d === "string" ? new Date(d) : d;
  return differenceInDays(new Date(), date);
}

export function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase();
}

export function pluralize(n: number, singular: string, plural: string) {
  return n === 1 ? `${n} ${singular}` : `${n} ${plural}`;
}
