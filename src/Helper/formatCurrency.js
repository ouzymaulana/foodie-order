export function formatCurrency(value) {
  return Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(value);
}
