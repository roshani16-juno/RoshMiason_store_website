"use client";
import { createContext, useContext, useEffect, useState } from "react";

const StoreContext = createContext(null);
export const useStore = () => useContext(StoreContext);

export function StoreProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      setCart(JSON.parse(localStorage.getItem("cart") || "[]"));
      setWishlist(JSON.parse(localStorage.getItem("wishlist") || "[]"));
      setUser(JSON.parse(localStorage.getItem("user") || "null"));
      setOrders(JSON.parse(localStorage.getItem("orders") || "[]"));
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [cart, wishlist, user, orders, ready]);

  const addToCart = (product, size, qty = 1) => {
    const key = `${product.id}-${size}`;
    setCart((prev) => {
      const found = prev.find((i) => i.key === key);
      if (found) return prev.map((i) => (i.key === key ? { ...i, qty: i.qty + qty } : i));
      return [...prev, { key, id: product.id, name: product.name, price: product.price, image: product.image, size, qty }];
    });
  };

  const updateQty = (key, qty) =>
    setCart((prev) => prev.map((i) => (i.key === key ? { ...i, qty: Math.max(1, qty) } : i)));

  const removeFromCart = (key) => setCart((prev) => prev.filter((i) => i.key !== key));
  const clearCart = () => setCart([]);

  const toggleWishlist = (product) =>
    setWishlist((prev) =>
      prev.find((p) => p.id === product.id) ? prev.filter((p) => p.id !== product.id) : [...prev, product]
    );
  const isWished = (id) => wishlist.some((p) => p.id === id);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.qty * i.price, 0);

  const login = (u) => setUser(u);
  const logout = () => setUser(null);
  const placeOrder = (details) => {
    const order = {
      id: "MSN" + Date.now().toString().slice(-6),
      date: new Date().toLocaleDateString("en-IN"),
      items: cart, total: cartTotal, status: "Processing", ...details,
    };
    setOrders((prev) => [order, ...prev]);
    clearCart();
    return order;
  };

  return (
    <StoreContext.Provider
      value={{ cart, addToCart, updateQty, removeFromCart, clearCart, cartCount, cartTotal,
        wishlist, toggleWishlist, isWished, user, login, logout, orders, placeOrder }}
    >
      {children}
    </StoreContext.Provider>
  );
}