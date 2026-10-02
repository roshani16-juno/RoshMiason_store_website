"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Package,
  LogOut,
  ArrowRight,
  ShoppingBag,
  CalendarDays,
  CreditCard,
  CheckCircle2,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { formatPrice } from "@/lib/api";

export default function AccountPage() {
  const { user, logout, orders } = useStore();
  const router = useRouter();

  /* =====================================================
      NOT LOGGED IN
  ===================================================== */
  if (!user) {
    return (
      <main className="min-h-[80vh] bg-[#faf8f5] px-5 py-20">
        <div className="mx-auto flex min-h-[60vh] max-w-xl items-center justify-center">

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full rounded-3xl border border-white/80 bg-white/70 p-10 text-center shadow-[0_20px_60px_rgba(90,70,40,0.08)] backdrop-blur-xl"
          >

            {/* Icon */}
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-amber-100 via-rose-100 to-fuchsia-100 shadow-sm">
              <User
                size={32}
                strokeWidth={1.5}
                className="text-amber-700"
              />
            </div>

            <p className="mt-7 text-xs uppercase tracking-[0.35em] text-amber-700">
              Welcome to Maison
            </p>

            <h1 className="mt-3 font-display text-4xl text-stone-900">
              Your Account
            </h1>

            <p className="mx-auto mt-4 max-w-sm leading-6 text-stone-500">
              Please login to access your profile, orders and shopping
              information.
            </p>

            <Link
              href="/login"
              className="group mt-8 inline-flex items-center gap-3 rounded-sm bg-stone-900 px-8 py-4 text-xs uppercase tracking-[0.2em] text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-amber-700 hover:shadow-xl"
            >
              Login to Account

              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

          </motion.div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#faf8f5] px-5 py-12 md:py-16">

      <div className="mx-auto max-w-6xl">

        {/* =====================================================
            PAGE HEADER
        ===================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <p className="text-xs uppercase tracking-[0.35em] text-amber-700">
            My Maison
          </p>

          <h1 className="mt-2 font-display text-4xl text-stone-900 md:text-5xl">
            My Account
          </h1>

          <div className="mt-4 h-px w-16 bg-gradient-to-r from-amber-400 via-rose-400 to-fuchsia-400" />
        </motion.div>


        {/* =====================================================
            PROFILE CARD
        ===================================================== */}
        <motion.section
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.1,
          }}
          className="relative overflow-hidden rounded-3xl border border-white/80 bg-white/65 shadow-[0_20px_60px_rgba(90,70,40,0.07)] backdrop-blur-xl"
        >

          {/* Decorative Glow */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-amber-200/25 blur-[80px]" />

          <div className="relative flex flex-col gap-8 p-7 md:flex-row md:items-center md:justify-between md:p-9">

            {/* User Info */}
            <div className="flex items-center gap-5">

              {/* Avatar */}
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-stone-900 via-stone-800 to-stone-700 text-xl font-medium text-white shadow-lg">
                {user.name?.charAt(0)?.toUpperCase() || "U"}
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-amber-700">
                  Welcome back
                </p>

                <h2 className="mt-1 font-display text-2xl text-stone-900 md:text-3xl">
                  Hello, {user.name}
                </h2>

                <div className="mt-2 flex items-center gap-2 text-sm text-stone-500">
                  <Mail size={14} />
                  <span>{user.email}</span>
                </div>
              </div>

            </div>


            {/* Logout */}
            <button
              onClick={() => {
                logout();
                router.push("/");
              }}
              className="group flex w-full items-center justify-center gap-2 rounded-sm border border-stone-300 bg-white/60 px-6 py-3 text-xs uppercase tracking-[0.18em] text-stone-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-stone-900 hover:bg-stone-900 hover:text-white md:w-auto"
            >
              <LogOut
                size={15}
                className="transition-transform duration-300 group-hover:-translate-x-0.5"
              />

              Logout
            </button>

          </div>
        </motion.section>


        {/* =====================================================
            ACCOUNT QUICK STATS
        ===================================================== */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3">

          {/* Orders */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.2,
            }}
            className="group rounded-2xl border border-white/80 bg-white/60 p-5 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-center justify-between">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-amber-100 to-rose-100">
                <Package
                  size={20}
                  strokeWidth={1.6}
                  className="text-amber-700"
                />
              </div>

              <span className="text-2xl font-semibold text-stone-800">
                {orders.length}
              </span>

            </div>

            <p className="mt-4 text-xs uppercase tracking-[0.2em] text-stone-500">
              Total Orders
            </p>
          </motion.div>


          {/* Account */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.3,
            }}
            className="group rounded-2xl border border-white/80 bg-white/60 p-5 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-center justify-between">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-rose-100 to-fuchsia-100">
                <User
                  size={20}
                  strokeWidth={1.6}
                  className="text-rose-700"
                />
              </div>

              <CheckCircle2
                size={21}
                className="text-emerald-600"
                strokeWidth={1.7}
              />

            </div>

            <p className="mt-4 text-xs uppercase tracking-[0.2em] text-stone-500">
              Account Status
            </p>

            <p className="mt-1 text-sm font-medium text-stone-800">
              Active
            </p>
          </motion.div>


          {/* Shopping */}
          <Link
            href="/shop"
            className="group rounded-2xl border border-white/80 bg-white/60 p-5 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-center justify-between">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-100 to-amber-100">
                <ShoppingBag
                  size={20}
                  strokeWidth={1.6}
                  className="text-fuchsia-700"
                />
              </div>

              <ArrowRight
                size={18}
                className="text-stone-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-stone-800"
              />

            </div>

            <p className="mt-4 text-xs uppercase tracking-[0.2em] text-stone-500">
              Continue Shopping
            </p>

            <p className="mt-1 text-sm font-medium text-stone-800">
              Explore Collection
            </p>
          </Link>

        </div>


        {/* =====================================================
            ORDERS HEADER
        ===================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          className="mt-14 flex items-end justify-between"
        >

          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-amber-700">
              Your purchases
            </p>

            <h2 className="mt-2 font-display text-3xl text-stone-900 md:text-4xl">
              My Orders
            </h2>
          </div>

          {orders.length > 0 && (
            <div className="hidden items-center gap-2 text-xs text-stone-500 sm:flex">
              <Package size={14} />
              {orders.length} {orders.length === 1 ? "order" : "orders"}
            </div>
          )}

        </motion.div>


        <div className="mt-6 h-px bg-gradient-to-r from-amber-200 via-stone-200 to-transparent" />


        {/* =====================================================
            EMPTY ORDERS
        ===================================================== */}
        {orders.length === 0 ? (
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            className="mt-8 rounded-3xl border border-white/80 bg-white/60 px-6 py-16 text-center shadow-sm backdrop-blur-xl"
          >

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-amber-100 to-rose-100">
              <ShoppingBag
                size={27}
                strokeWidth={1.5}
                className="text-amber-700"
              />
            </div>

            <h3 className="mt-5 font-display text-2xl text-stone-900">
              No orders yet
            </h3>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-stone-500">
              Your order history will appear here once you make your first
              purchase.
            </p>

            <Link
              href="/shop"
              className="group mt-7 inline-flex items-center gap-2 bg-stone-900 px-7 py-3.5 text-xs uppercase tracking-[0.18em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-700"
            >
              Start Shopping

              <ArrowRight
                size={15}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

          </motion.div>
        ) : (

          /* =====================================================
              ORDER LIST
          ===================================================== */
          <div className="mt-8 space-y-5">

            {orders.map((o, index) => (
              <motion.div
                key={o.id}
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.15,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                className="group relative overflow-hidden rounded-3xl border border-white/80 bg-white/65 p-5 shadow-[0_10px_35px_rgba(90,70,40,0.06)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(90,70,40,0.10)] md:p-7"
              >

                {/* Card Glow */}
                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br from-amber-200/20 to-rose-200/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />


                {/* Order Header */}
                <div className="relative flex flex-col gap-4 border-b border-stone-200/70 pb-5 sm:flex-row sm:items-center sm:justify-between">

                  <div className="flex items-center gap-4">

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-stone-100">
                      <Package
                        size={20}
                        strokeWidth={1.6}
                        className="text-stone-700"
                      />
                    </div>

                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-stone-400">
                        Order
                      </p>

                      <p className="mt-0.5 text-sm font-semibold text-stone-800">
                        #{o.id}
                      </p>
                    </div>

                  </div>


                  {/* Status */}
                  <span className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3.5 py-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-amber-800">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                    {o.status}
                  </span>

                </div>


                {/* Order Details */}
                <div className="relative mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-stone-500">

                  <div className="flex items-center gap-2">
                    <CalendarDays size={14} />
                    <span>{o.date}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <CreditCard size={14} />
                    <span>Secure Payment</span>
                  </div>

                </div>


                {/* Products */}
                <div className="relative mt-5 flex gap-3 overflow-x-auto pb-1">

                  {o.items.map((i) => (
                    <div
                      key={i.key}
                      className="group/item relative h-24 w-[76px] shrink-0 overflow-hidden rounded-xl border border-stone-200 bg-stone-100"
                    >
                      <img
                        src={i.image}
                        alt=""
                        className="h-full w-full object-cover transition duration-500 group-hover/item:scale-110"
                      />
                    </div>
                  ))}

                </div>


                {/* Bottom */}
                <div className="relative mt-6 flex flex-col gap-4 border-t border-stone-200/70 pt-5 sm:flex-row sm:items-center sm:justify-between">

                  <p className="text-xs text-stone-500">
                    {o.items.length}{" "}
                    {o.items.length === 1 ? "item" : "items"} in this order
                  </p>

                  <p className="text-right text-sm text-stone-500">
                    Total{" "}
                    <span className="ml-2 text-lg font-semibold text-stone-900">
                      {formatPrice(o.total)}
                    </span>
                  </p>

                </div>

              </motion.div>
            ))}

          </div>
        )}

      </div>
    </main>
  );
}
