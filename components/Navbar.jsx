"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";

const links = [
  { href: "/shop", label: "Shop All" },
  { href: "/shop?category=Men", label: "Men" },
  { href: "/shop?category=Women", label: "Women" },
  { href: "/shop?category=Accessories", label: "Accessories" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { cartCount, wishlist, user } = useStore();

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top Announcement */}
      <div className="bg-stone-950 px-4 py-2 text-center text-[10px] font-medium uppercase tracking-[0.22em] text-amber-100 sm:text-xs">
        <span className="inline-flex items-center gap-2">
          <Sparkles size={11} />
          Free Shipping on Orders Above ₹2,999
        </span>
      </div>

      {/* Main Navbar */}
      <nav className="border-b border-stone-200/80 bg-[#faf8f5]/95 shadow-[0_4px_25px_rgba(28,25,23,0.04)] backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-[82px] lg:px-8">
          
          {/* Mobile Menu */}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-white/70 text-stone-800 transition-all hover:border-stone-400 hover:bg-white md:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Logo */}
          <Link
  href="/"
  aria-label="RoshMaison Home"
  className="group flex items-center"
>
  <span
    className="
      bg-gradient-to-r
      from-amber-700
      via-amber-500
      to-yellow-700
      bg-clip-text
      font-serif
      text-transparent
      transition-all
      duration-300
      leading-none
      whitespace-nowrap
    "
  >
    <span className="text-[29px] font-bold tracking-[-0.04em]">
      Rosh
    </span>
    <span className="ml-[2px] text-[25px] font-medium italic tracking-[-0.04em]">
      Maison
    </span>
  </span>
</Link>

          {/* Desktop Navigation */}
          <ul className="hidden items-center gap-7 md:flex lg:gap-9">
            {links.map((link) => (
              <li key={link.label} className="group relative">
                <Link
                  href={link.href}
                  className="flex items-center gap-1 py-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-stone-600 transition-colors duration-200 hover:text-stone-950"
                >
                  {link.label}

                  {link.label === "Shop All" && (
                    <ChevronDown
                      size={12}
                      className="transition-transform duration-200 group-hover:rotate-180"
                    />
                  )}
                </Link>

                {/* Animated underline */}
                <span className="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 bg-amber-700 transition-all duration-300 group-hover:w-full" />
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Account */}
            <Link
              href={user ? "/account" : "/login"}
              aria-label="Account"
              className="group flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 hover:bg-stone-100"
            >
              <User
                size={19}
                strokeWidth={1.7}
                className="text-stone-700 transition-transform group-hover:scale-110"
              />
            </Link>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className="group relative flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 hover:bg-stone-100"
            >
              <Heart
                size={19}
                strokeWidth={1.7}
                className="text-stone-700 transition-transform group-hover:scale-110 group-hover:text-rose-600"
              />

              {wishlist.length > 0 && (
                <span className="absolute right-0.5 top-0.5 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-rose-600 px-1 text-[9px] font-bold text-white shadow-sm">
                  {wishlist.length > 9 ? "9+" : wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              aria-label="Cart"
              className="group relative flex h-10 w-10 items-center justify-center rounded-full bg-stone-900 text-white transition-all duration-200 hover:bg-amber-700"
            >
              <ShoppingBag
                size={18}
                strokeWidth={1.7}
                className="transition-transform group-hover:scale-110"
              />

              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-amber-500 px-1 text-[9px] font-bold text-stone-950 shadow-sm ring-2 ring-[#faf8f5]">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`overflow-hidden border-t border-stone-200/70 bg-white/90 transition-all duration-300 md:hidden ${
            open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 pb-5 pt-2">
            {links.map((link, index) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="group flex items-center justify-between border-b border-stone-100 py-4"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[9px] font-semibold text-stone-400">
                    0{index + 1}
                  </span>

                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-700 transition-colors group-hover:text-amber-700">
                    {link.label}
                  </span>
                </div>

                <span className="text-stone-400 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-amber-700">
                  →
                </span>
              </Link>
            ))}

            {/* Mobile Account */}
            <div className="mt-4 flex items-center justify-between rounded-2xl bg-stone-50 p-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-stone-400">
                  Welcome to
                </p>
                <p className="mt-1 font-display text-lg tracking-wider text-stone-900">
                  MAISON
                </p>
              </div>

              <Link
                href={user ? "/account" : "/login"}
                onClick={() => setOpen(false)}
                className="rounded-full bg-stone-900 px-4 py-2 text-[10px] font-semibold uppercase tracking-widest text-white transition hover:bg-amber-700"
              >
                {user ? "Account" : "Login"}
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
