export const CATEGORY_INFO = {
  women: { title: "Women", tagline: "Elegant. Traditional. Timeless." },
  men: { title: "Men", tagline: "Stylish. Traditional. Proud." },
  kids: { title: "Kids", tagline: "Small Outfits. Big Heritage." },
} as const;

export type CategorySlug = keyof typeof CATEGORY_INFO;

// hasOwn, not `in`: "constructor" in obj is true and would slip through
export function isCategory(value: string): value is CategorySlug {
  return Object.hasOwn(CATEGORY_INFO, value);
}

// Search params can be a string, an array (?size=S&size=M), or missing
export function toArray(value: string | string[] | undefined): string[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

// Swatch colors for the filter dots. Unknown names fall back to grey.
export const COLOR_HEX: Record<string, string> = {
  maroon: "#9A2E3B",
  gold: "#D4A73B",
  charcoal: "#332822",
  white: "#FFFFFF",
  green: "#4C7059",
  black: "#000000",
  red: "#C0392B",
  blue: "#2F5D8C",
};
