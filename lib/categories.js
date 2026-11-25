export const PRODUCT_CATEGORIES = [
  "Grains & Flours",
  "Cold-Pressed Oils",
  "Spices & Masalas",
  "Ghee & Dairy",
  "Dry Fruits & Snacks",
  "Beverages & Honey",
];

export const DEFAULT_CATEGORY = PRODUCT_CATEGORIES[0];

export function isValidCategory(category) {
  return typeof category === "string" && PRODUCT_CATEGORIES.includes(category.trim());
}