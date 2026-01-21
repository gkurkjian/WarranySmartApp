export function makeWarrantyItem({
  product,
  platform,
  category,
  purchaseDate,
  expiresAt,
  notes = "",
}) {
  return {
    id: crypto.randomUUID(),
    product: product.trim(),
    platform: platform.trim(),
    category: category.trim(),
    purchaseDate, // "YYYY-MM-DD"
    expiresAt,    // "YYYY-MM-DD"
    notes,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}
