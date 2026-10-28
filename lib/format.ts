// Prices are stored in santim (1 birr = 100 santim)
export function formatPrice(santim: number) {
  return `ETB ${(santim / 100).toLocaleString("en-US")}`;
}
