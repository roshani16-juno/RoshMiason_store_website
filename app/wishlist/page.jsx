"use client";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import ProductCard from "@/components/ProductCard";

export default function WishlistPage() {
  const { wishlist } = useStore();
  return (
    <div className="mx-auto max-w-7xl px-5 py-12">
      <h1 className="font-display text-4xl">My Wishlist</h1>
      {wishlist.length === 0 ? (
        <div className="py-24 text-center">
          <p className="text-stone-500">Nothing saved yet.</p>
          <Link href="/shop" className="mt-6 inline-block bg-stone-900 px-8 py-4 text-sm uppercase tracking-widest text-white">
            Explore Products
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4">
          {wishlist.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}