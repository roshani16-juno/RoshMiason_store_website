"use client";
import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle } from "lucide-react";

function Content() {
  const id = useSearchParams().get("id");
  return (
    <div className="mx-auto max-w-xl px-5 py-32 text-center">
      <CheckCircle size={64} className="mx-auto text-green-600" />
      <h1 className="mt-6 font-display text-4xl">Thank you for your order!</h1>
      <p className="mt-4 text-stone-600">
        Your order <span className="font-medium text-stone-900">#{id}</span> has been placed successfully.
      </p>
      <div className="mt-10 flex justify-center gap-4">
        <Link href="/account" className="bg-stone-900 px-6 py-3 text-sm uppercase tracking-widest text-white">My Orders</Link>
        <Link href="/shop" className="border border-stone-900 px-6 py-3 text-sm uppercase tracking-widest">Continue Shopping</Link>
      </div>
    </div>
  );
}

export default function OrderSuccess() {
  return <Suspense fallback={null}><Content /></Suspense>;
}