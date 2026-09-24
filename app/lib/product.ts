export const TRIADE_PRICE = 1490;
export const PURCHASES_ENABLED = false;

export function formatEuro(value: number, language: "it" | "en" = "it") {
  return new Intl.NumberFormat(language === "en" ? "en-GB" : "it-IT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}
