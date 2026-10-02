export async function getProducts(params = {}) {
  const qs = new URLSearchParams(params).toString();
  const res = await fetch(`/api/products${qs ? `?${qs}` : ""}`);
  return res.json();
}

export async function getProduct(id) {
  const res = await fetch(`/api/products/${id}`);
  if (!res.ok) return null;
  return res.json();
}

export const formatPrice = (n) => "₹" + n.toLocaleString("en-IN");