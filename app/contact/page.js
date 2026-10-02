"use client";
import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

const field = "w-full border border-stone-300 bg-transparent px-4 py-3 text-sm outline-none focus:border-stone-900";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <h1 className="text-center font-display text-5xl">Get in Touch</h1>
      <div className="mt-14 grid gap-12 md:grid-cols-2">
        <div className="space-y-6">
          <p className="flex items-center gap-4"><MapPin className="text-amber-700" /> Bandra West, Mumbai, India</p>
          <p className="flex items-center gap-4"><Phone className="text-amber-700" /> +91 98765 43210</p>
          <p className="flex items-center gap-4"><Mail className="text-amber-700" /> hello@maison.com</p>
        </div>
        {sent ? (
          <p className="text-lg text-green-700">Thanks! We'll get back to you soon.</p>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-4">
            <input required placeholder="Name" className={field} />
            <input required type="email" placeholder="Email" className={field} />
            <textarea required rows={5} placeholder="Message" className={field} />
            <button className="bg-stone-900 px-8 py-4 text-sm uppercase tracking-widest text-white hover:bg-amber-700">Send Message</button>
          </form>
        )}
      </div>
    </div>
  );
}