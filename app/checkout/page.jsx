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
      <main className="flex min-h-[75vh] items-center justify-center bg-[#faf8f5] px-4 sm:px-5">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md rounded-3xl border border-stone-200/70 bg-white/70 p-6 text-center shadow-[0_20px_70px_rgba(70,50,30,0.08)] backdrop-blur-xl sm:p-10"
        >
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-amber-100 via-rose-100 to-fuchsia-100">
            <ShoppingBag
              size={30}
              strokeWidth={1.5}
              className="text-stone-700"
            />
          </div>

          <p className="mt-7 text-[10px] uppercase tracking-[0.25em] text-amber-700 sm:text-[11px] sm:tracking-[0.3em]">
            Maison
          </p>

          <h1 className="mt-3 font-display text-2xl text-stone-900 sm:text-3xl">
            Your cart is empty
          </h1>

          <p className="mt-3 text-sm leading-6 text-stone-500">
            Add something beautiful to your cart before proceeding to
            checkout.
          </p>

          <button
            onClick={() => router.push("/shop")}
            className="group mt-7 inline-flex w-full items-center justify-center gap-3 rounded-xl bg-stone-900 px-6 py-3.5 text-xs uppercase tracking-[0.15em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-700 sm:w-auto sm:px-7 sm:tracking-[0.18em]"
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
      <div className="pointer-events-none absolute left-0 top-0 h-56 w-56 rounded-full bg-amber-200/10 blur-3xl sm:h-72 sm:w-72" />
      <div className="pointer-events-none absolute right-0 top-72 h-64 w-64 rounded-full bg-rose-200/10 blur-3xl sm:h-80 sm:w-80" />

      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-5 sm:py-10 md:px-8 md:py-16">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mb-8 sm:mb-10"
        >
          <div className="flex flex-wrap items-center gap-1.5 text-[9px] uppercase tracking-[0.22em] text-stone-400 sm:gap-2 sm:text-[10px] sm:tracking-[0.3em]">
            <span>Bag</span>
            <span>/</span>
            <span className="text-stone-900">Checkout</span>
            <span>/</span>
            <span>Confirmation</span>
          </div>

          <div className="mt-5 flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-[0.25em] text-amber-700 sm:text-xs sm:tracking-[0.3em]">
                Almost yours
              </p>

              <h1 className="mt-2 font-display text-3xl text-stone-900 sm:text-4xl md:text-5xl">
                Checkout
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-stone-500">
                Complete your details below and get your Maison pieces
                delivered to your doorstep.
              </p>
            </div>

            <div className="hidden shrink-0 items-center gap-2 rounded-full border border-stone-200 bg-white/60 px-4 py-2 text-xs text-stone-500 shadow-sm backdrop-blur md:flex">
              <Lock size={13} />
              Secure Checkout
            </div>
          </div>
        </motion.div>

        <form
          onSubmit={submit}
          className="grid min-w-0 gap-6 sm:gap-8 lg:grid-cols-[minmax(0,1fr)_390px]"
        >
          {/* LEFT */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="min-w-0 space-y-6 sm:space-y-7"
          >
            {/* Shipping */}
            <motion.section
              variants={fadeUp}
              className="rounded-3xl border border-stone-200/70 bg-white/65 p-5 shadow-[0_15px_50px_rgba(70,50,30,0.05)] backdrop-blur-xl sm:p-6 md:p-8"
            >
              <div className="mb-6 flex items-start gap-3 sm:mb-7 sm:gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-100 to-rose-100 sm:h-11 sm:w-11">
                  <MapPin
                    size={20}
                    strokeWidth={1.6}
                    className="text-amber-700"
                  />
                </div>

                <div className="min-w-0">
                  <p className="text-[9px] uppercase tracking-[0.22em] text-amber-700 sm:text-[10px] sm:tracking-[0.25em]">
                    Step 01
                  </p>

                  <h2 className="mt-1 font-display text-xl text-stone-900 sm:text-2xl">
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
                  <label className="mb-2 block text-[10px] font-medium uppercase tracking-[0.1em] text-stone-600 sm:text-xs sm:tracking-[0.12em]">
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
                  <label className="mb-2 block text-[10px] font-medium uppercase tracking-[0.1em] text-stone-600 sm:text-xs sm:tracking-[0.12em]">
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
                  <label className="mb-2 block text-[10px] font-medium uppercase tracking-[0.1em] text-stone-600 sm:text-xs sm:tracking-[0.12em]">
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
                  <div className="min-w-0">
                    <label className="mb-2 block text-[10px] font-medium uppercase tracking-[0.1em] text-stone-600 sm:text-xs sm:tracking-[0.12em]">
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

                  <div className="min-w-0">
                    <label className="mb-2 block text-[10px] font-medium uppercase tracking-[0.1em] text-stone-600 sm:text-xs sm:tracking-[0.12em]">
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
              className="rounded-3xl border border-stone-200/70 bg-white/65 p-5 shadow-[0_15px_50px_rgba(70,50,30,0.05)] backdrop-blur-xl sm:p-6 md:p-8"
            >
              <div className="mb-6 flex items-start gap-3 sm:mb-7 sm:gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-100 to-fuchsia-100 sm:h-11 sm:w-11">
                  <CreditCard
                    size={20}
                    strokeWidth={1.6}
                    className="text-rose-700"
                  />
                </div>

                <div className="min-w-0">
                  <p className="text-[9px] uppercase tracking-[0.22em] text-rose-700 sm:text-[10px] sm:tracking-[0.25em]">
                    Step 02
                  </p>

                  <h2 className="mt-1 font-display text-xl text-stone-900 sm:text-2xl">
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
                      className={`group flex min-w-0 cursor-pointer items-center gap-3 rounded-2xl border p-3 transition-all duration-300 sm:gap-4 sm:p-4 ${
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
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all sm:h-11 sm:w-11 ${
                          selected
                            ? "bg-stone-900 text-white"
                            : "bg-stone-100 text-stone-500 group-hover:bg-stone-200"
                        }`}
                      >
                        <Icon size={19} strokeWidth={1.7} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="break-words text-sm font-medium text-stone-900">
                          {method.label}
                        </p>

                        <p className="mt-1 break-words text-[11px] leading-5 text-stone-500 sm:text-xs">
                          {method.description}
                        </p>
                      </div>

                      <div
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
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
              <div className="mt-5 flex items-start gap-3 rounded-xl bg-stone-50 px-3 py-3 sm:px-4">
                <ShieldCheck
                  size={18}
                  className="mt-0.5 shrink-0 text-emerald-600"
                />

                <p className="text-[10px] leading-5 text-stone-500 sm:text-[11px]">
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
            className="min-w-0 lg:sticky lg:top-24 lg:h-fit"
          >
            <div className="overflow-hidden rounded-3xl border border-stone-200/70 bg-white/80 shadow-[0_20px_70px_rgba(70,50,30,0.08)] backdrop-blur-xl">
              {/* Summary header */}
              <div className="border-b border-stone-200/70 bg-gradient-to-r from-amber-50/70 via-white to-rose-50/60 p-5 sm:p-6">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[9px] uppercase tracking-[0.25em] text-amber-700 sm:text-[10px] sm:tracking-[0.28em]">
                      Maison
                    </p>

                    <h2 className="mt-1 font-display text-xl text-stone-900 sm:text-2xl">
                      Your Order
                    </h2>
                  </div>

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm sm:h-11 sm:w-11">
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
              <div className="max-h-[390px] space-y-5 overflow-y-auto p-5 sm:p-6">
                {cart.map((item) => (
                  <div key={item.key} className="flex min-w-0 gap-3 sm:gap-4">
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
                      <p className="break-words text-sm font-medium text-stone-900">
                        {item.name}
                      </p>

                      <p className="mt-1 text-xs text-stone-500">
                        Size: {item.size}
                      </p>

                      <p className="mt-2 text-xs text-stone-400">
                        Qty {item.qty}
                      </p>
                    </div>

                    <p className="shrink-0 whitespace-nowrap text-sm font-medium text-stone-900">
                      {formatPrice(item.price * item.qty)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Free shipping message */}
              <div className="mx-5 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-3.5 sm:mx-6 sm:p-4">
                <div className="flex items-start gap-3">
                  <Truck
                    size={18}
                    className="mt-0.5 shrink-0 text-emerald-600"
                  />

                  <div className="min-w-0">
                    <p className="break-words text-xs font-medium text-emerald-800">
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
              <div className="m-5 border-t border-stone-200 pt-5 sm:m-6">
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between gap-4 text-stone-500">
                    <span>Subtotal</span>
                    <span className="shrink-0 text-stone-800">
                      {formatPrice(cartTotal)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4 text-stone-500">
                    <span>Shipping</span>
                    <span
                      className={`shrink-0 ${
                        shipping === 0
                          ? "font-medium text-emerald-600"
                          : "text-stone-800"
                      }`}
                    >
                      {shipping ? formatPrice(shipping) : "Free"}
                    </span>
                  </div>
                </div>

                <div className="my-5 h-px bg-stone-200" />

                <div className="flex items-end justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-stone-400">
                      Total
                    </p>

                    <p className="mt-1 font-display text-xl text-stone-900 sm:text-2xl">
                      {formatPrice(grandTotal)}
                    </p>
                  </div>

                  <p className="max-w-[150px] pb-1 text-right text-[9px] leading-4 text-stone-400 sm:text-[10px]">
                    Inclusive of applicable taxes
                  </p>
                </div>

                <button
                  type="submit"
                  className="group mt-6 flex min-h-12 w-full items-center justify-center gap-3 rounded-xl bg-stone-900 px-4 py-4 text-xs uppercase tracking-[0.16em] text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-700 hover:shadow-xl sm:min-h-13 sm:tracking-[0.2em]"
                >
                  Place Order
                  <ArrowRight
                    size={15}
                    className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
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
              <div className="rounded-2xl border border-stone-200/70 bg-white/50 p-3 text-center backdrop-blur sm:p-4">
                <ShieldCheck
                  size={18}
                  className="mx-auto text-stone-600"
                  strokeWidth={1.5}
                />
                <p className="mt-2 text-[9px] uppercase tracking-[0.12em] text-stone-500 sm:tracking-[0.15em]">
                  Secure
                </p>
              </div>

              <div className="rounded-2xl border border-stone-200/70 bg-white/50 p-3 text-center backdrop-blur sm:p-4">
                <Truck
                  size={18}
                  className="mx-auto text-stone-600"
                  strokeWidth={1.5}
                />
                <p className="mt-2 text-[9px] uppercase tracking-[0.12em] text-stone-500 sm:tracking-[0.15em]">
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