"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  User,
  CreditCard,
  Banknote,
  Smartphone,
  ShieldCheck,
  Lock,
  ShoppingBag,
  ArrowRight,
  Truck,
  CheckCircle2,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { formatPrice } from "@/lib/api";

const field =
  "w-full rounded-xl border border-stone-200 bg-white/70 px-4 py-3.5 text-sm text-stone-900 placeholder:text-stone-400 outline-none transition-all duration-300 focus:border-amber-600 focus:bg-white focus:ring-4 focus:ring-amber-100/50";

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const paymentMethods = [
  {
    value: "cod",
    label: "Cash on Delivery",
    description: "Pay when your order arrives",
    icon: Banknote,
  },
  {
    value: "upi",
    label: "UPI",
    description: "Google Pay, PhonePe, Paytm & more",
    icon: Smartphone,
  },
  {
    value: "card",
    label: "Credit / Debit Card",
    description: "Visa, Mastercard & RuPay",
    icon: CreditCard,
  },
];

export default function CheckoutPage() {
  const { cart, cartTotal, placeOrder } = useStore();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    payment: "cod",
  });

  const shipping = cartTotal > 2999 ? 0 : 149;
  const grandTotal = cartTotal + shipping;

  const set = (key) => (e) => {
    setForm((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

  const submit = (e) => {
    e.preventDefault();

    const order = placeOrder({
      shippingTo: form,
    });

    router.push(`/order-success?id=${order.id}`);
  };

  if (cart.length === 0) {
    return (
      <main className="flex min-h-[75vh] items-center justify-center bg-[#faf8f5] px-5">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md rounded-3xl border border-stone-200/70 bg-white/70 p-10 text-center shadow-[0_20px_70px_rgba(70,50,30,0.08)] backdrop-blur-xl"
        >
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-amber-100 via-rose-100 to-fuchsia-100">
            <ShoppingBag
              size={30}
              strokeWidth={1.5}
              className="text-stone-700"
            />
          </div>

          <p className="mt-7 text-[11px] uppercase tracking-[0.3em] text-amber-700">
            Maison
          </p>

          <h1 className="mt-3 font-display text-3xl text-stone-900">
            Your cart is empty
          </h1>

          <p className="mt-3 text-sm leading-6 text-stone-500">
            Add something beautiful to your cart before proceeding to
            checkout.
          </p>

          <button
            onClick={() => router.push("/shop")}
            className="group mt-7 inline-flex items-center gap-3 rounded-xl bg-stone-900 px-7 py-3.5 text-xs uppercase tracking-[0.18em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-700"
          >
            Explore Collection
            <ArrowRight
              size={15}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#faf8f5]">
      {/* Decorative background */}
      <div className="pointer-events-none absolute left-0 top-0 h-72 w-72 rounded-full bg-amber-200/10 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-72 h-80 w-80 rounded-full bg-rose-200/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-16">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mb-10"
        >
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-stone-400">
            <span>Bag</span>
            <span>/</span>
            <span className="text-stone-900">Checkout</span>
            <span>/</span>
            <span>Confirmation</span>
          </div>

          <div className="mt-5 flex items-end justify-between gap-5">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-amber-700">
                Almost yours
              </p>

              <h1 className="mt-2 font-display text-4xl text-stone-900 md:text-5xl">
                Checkout
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-stone-500">
                Complete your details below and get your Maison pieces
                delivered to your doorstep.
              </p>
            </div>

            <div className="hidden items-center gap-2 rounded-full border border-stone-200 bg-white/60 px-4 py-2 text-xs text-stone-500 shadow-sm backdrop-blur md:flex">
              <Lock size={13} />
              Secure Checkout
            </div>
          </div>
        </motion.div>

        <form
          onSubmit={submit}
          className="grid gap-8 lg:grid-cols-[1fr_390px]"
        >
          {/* LEFT */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="space-y-7"
          >
            {/* Shipping */}
            <motion.section
              variants={fadeUp}
              className="rounded-3xl border border-stone-200/70 bg-white/65 p-6 shadow-[0_15px_50px_rgba(70,50,30,0.05)] backdrop-blur-xl md:p-8"
            >
              <div className="mb-7 flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-100 to-rose-100">
                  <MapPin
                    size={20}
                    strokeWidth={1.6}
                    className="text-amber-700"
                  />
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-amber-700">
                    Step 01
                  </p>

                  <h2 className="mt-1 font-display text-2xl text-stone-900">
                    Shipping Details
                  </h2>

                  <p className="mt-1 text-xs text-stone-500">
                    Where should we deliver your order?
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                {/* Name */}
                <div>
                  <label className="mb-2 block text-xs font-medium uppercase tracking-[0.12em] text-stone-600">
                    Full Name
                  </label>

                  <div className="relative">
                    <User
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
                    />

                    <input
                      required
                      placeholder="Enter your full name"
                      className={`${field} pl-11`}
                      value={form.name}
                      onChange={set("name")}
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="mb-2 block text-xs font-medium uppercase tracking-[0.12em] text-stone-600">
                    Phone Number
                  </label>

                  <div className="relative">
                    <Phone
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
                    />

                    <input
                      required
                      type="tel"
                      placeholder="Enter your phone number"
                      className={`${field} pl-11`}
                      value={form.phone}
                      onChange={set("phone")}
                    />
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="mb-2 block text-xs font-medium uppercase tracking-[0.12em] text-stone-600">
                    Delivery Address
                  </label>

                  <textarea
                    required
                    placeholder="House no., building, street, area..."
                    rows={4}
                    className={`${field} resize-none`}
                    value={form.address}
                    onChange={set("address")}
                  />
                </div>

                {/* City / Pincode */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-xs font-medium uppercase tracking-[0.12em] text-stone-600">
                      City
                    </label>

                    <input
                      required
                      placeholder="Mumbai"
                      className={field}
                      value={form.city}
                      onChange={set("city")}
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-medium uppercase tracking-[0.12em] text-stone-600">
                      Pincode
                    </label>

                    <input
                      required
                      inputMode="numeric"
                      placeholder="400001"
                      className={field}
                      value={form.pincode}
                      onChange={set("pincode")}
                    />
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Payment */}
            <motion.section
              variants={fadeUp}
              className="rounded-3xl border border-stone-200/70 bg-white/65 p-6 shadow-[0_15px_50px_rgba(70,50,30,0.05)] backdrop-blur-xl md:p-8"
            >
              <div className="mb-7 flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-100 to-fuchsia-100">
                  <CreditCard
                    size={20}
                    strokeWidth={1.6}
                    className="text-rose-700"
                  />
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-rose-700">
                    Step 02
                  </p>

                  <h2 className="mt-1 font-display text-2xl text-stone-900">
                    Payment Method
                  </h2>

                  <p className="mt-1 text-xs text-stone-500">
                    Choose your preferred payment option.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {paymentMethods.map((method) => {
                  const Icon = method.icon;
                  const selected = form.payment === method.value;

                  return (
                    <label
                      key={method.value}
                      className={`group flex cursor-pointer items-center gap-4 rounded-2xl border p-4 transition-all duration-300 ${
                        selected
                          ? "border-amber-500 bg-amber-50/60 shadow-sm"
                          : "border-stone-200 bg-white/50 hover:border-stone-300 hover:bg-white"
                      }`}
                    >
                      <input
                        type="radio"
                        name="pay"
                        value={method.value}
                        checked={selected}
                        onChange={() =>
                          setForm((prev) => ({
                            ...prev,
                            payment: method.value,
                          }))
                        }
                        className="sr-only"
                      />

                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all ${
                          selected
                            ? "bg-stone-900 text-white"
                            : "bg-stone-100 text-stone-500 group-hover:bg-stone-200"
                        }`}
                      >
                        <Icon size={19} strokeWidth={1.7} />
                      </div>

                      <div className="flex-1">
                        <p className="text-sm font-medium text-stone-900">
                          {method.label}
                        </p>

                        <p className="mt-1 text-xs text-stone-500">
                          {method.description}
                        </p>
                      </div>

                      <div
                        className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                          selected
                            ? "border-amber-600 bg-amber-600"
                            : "border-stone-300"
                        }`}
                      >
                        {selected && (
                          <CheckCircle2
                            size={13}
                            className="text-white"
                            strokeWidth={3}
                          />
                        )}
                      </div>
                    </label>
                  );
                })}
              </div>

              {/* Security note */}
              <div className="mt-5 flex items-center gap-3 rounded-xl bg-stone-50 px-4 py-3">
                <ShieldCheck
                  size={18}
                  className="shrink-0 text-emerald-600"
                />

                <p className="text-[11px] leading-5 text-stone-500">
                  Your payment and personal information are protected with
                  secure checkout technology.
                </p>
              </div>
            </motion.section>
          </motion.div>

          {/* RIGHT - ORDER SUMMARY */}
          <motion.aside
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:sticky lg:top-24 lg:h-fit"
          >
            <div className="overflow-hidden rounded-3xl border border-stone-200/70 bg-white/80 shadow-[0_20px_70px_rgba(70,50,30,0.08)] backdrop-blur-xl">
              {/* Summary header */}
              <div className="border-b border-stone-200/70 bg-gradient-to-r from-amber-50/70 via-white to-rose-50/60 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.28em] text-amber-700">
                      Maison
                    </p>

                    <h2 className="mt-1 font-display text-2xl text-stone-900">
                      Your Order
                    </h2>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-sm">
                    <ShoppingBag
                      size={19}
                      className="text-stone-700"
                      strokeWidth={1.5}
                    />
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2 text-xs text-stone-500">
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-stone-900 px-1.5 text-[10px] text-white">
                    {cart.reduce((sum, item) => sum + item.qty, 0)}
                  </span>
                  items in your bag
                </div>
              </div>

              {/* Products */}
              <div className="max-h-[390px] space-y-5 overflow-y-auto p-6">
                {cart.map((item) => (
                  <div key={item.key} className="flex gap-4">
                    <div className="relative shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-20 w-[62px] rounded-xl object-cover"
                      />

                      <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-stone-900 px-1 text-[9px] text-white">
                        {item.qty}
                      </span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-stone-900">
                        {item.name}
                      </p>

                      <p className="mt-1 text-xs text-stone-500">
                        Size: {item.size}
                      </p>

                      <p className="mt-2 text-xs text-stone-400">
                        Qty {item.qty}
                      </p>
                    </div>

                    <p className="whitespace-nowrap text-sm font-medium text-stone-900">
                      {formatPrice(item.price * item.qty)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Free shipping message */}
              <div className="mx-6 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4">
                <div className="flex gap-3">
                  <Truck
                    size={18}
                    className="mt-0.5 shrink-0 text-emerald-600"
                  />

                  <div>
                    <p className="text-xs font-medium text-emerald-800">
                      {shipping === 0
                        ? "You've unlocked free shipping!"
                        : `Add ${formatPrice(
                            Math.max(0, 2999 - cartTotal)
                          )} for free shipping`}
                    </p>

                    <p className="mt-1 text-[10px] leading-4 text-emerald-700/70">
                      Free delivery on orders above ₹2,999
                    </p>
                  </div>
                </div>
              </div>

              {/* Price details */}
              <div className="m-6 border-t border-stone-200 pt-5">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-stone-500">
                    <span>Subtotal</span>
                    <span className="text-stone-800">
                      {formatPrice(cartTotal)}
                    </span>
                  </div>

                  <div className="flex justify-between text-stone-500">
                    <span>Shipping</span>
                    <span
                      className={
                        shipping === 0
                          ? "font-medium text-emerald-600"
                          : "text-stone-800"
                      }
                    >
                      {shipping ? formatPrice(shipping) : "Free"}
                    </span>
                  </div>
                </div>

                <div className="my-5 h-px bg-stone-200" />

                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-stone-400">
                      Total
                    </p>

                    <p className="mt-1 font-display text-2xl text-stone-900">
                      {formatPrice(grandTotal)}
                    </p>
                  </div>

                  <p className="pb-1 text-[10px] text-stone-400">
                    Inclusive of applicable taxes
                  </p>
                </div>

                <button
                  type="submit"
                  className="group mt-6 flex w-full items-center justify-center gap-3 rounded-xl bg-stone-900 py-4 text-xs uppercase tracking-[0.2em] text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-700 hover:shadow-xl"
                >
                  Place Order
                  <ArrowRight
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>

                <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-stone-400">
                  <Lock size={12} />
                  Safe & secure checkout
                </div>
              </div>
            </div>

            {/* Mini reassurance */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-stone-200/70 bg-white/50 p-4 text-center backdrop-blur">
                <ShieldCheck
                  size={18}
                  className="mx-auto text-stone-600"
                  strokeWidth={1.5}
                />
                <p className="mt-2 text-[9px] uppercase tracking-[0.15em] text-stone-500">
                  Secure
                </p>
              </div>

              <div className="rounded-2xl border border-stone-200/70 bg-white/50 p-4 text-center backdrop-blur">
                <Truck
                  size={18}
                  className="mx-auto text-stone-600"
                  strokeWidth={1.5}
                />
                <p className="mt-2 text-[9px] uppercase tracking-[0.15em] text-stone-500">
                  Fast Delivery
                </p>
              </div>
            </div>
          </motion.aside>
        </form>
      </div>
    </main>
  );
}