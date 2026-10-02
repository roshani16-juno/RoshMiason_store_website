
"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trash2,
  Minus,
  Plus,
  ShoppingBag,
  ArrowRight,
  Truck,
  ShieldCheck,
  Sparkles,
  ChevronLeft,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { formatPrice } from "@/lib/api";

export default function CartPage() {
  const { cart, updateQty, removeFromCart, cartTotal } = useStore();

  const shipping =
    cartTotal > 2999 || cartTotal === 0 ? 0 : 149;

  /* =========================
     EMPTY CART
  ========================= */

  if (cart.length === 0) {
    return (
      <main className="relative flex min-h-[75vh] items-center justify-center overflow-hidden bg-[#faf8f5] px-4 py-12 sm:px-6 sm:py-16 md:px-8">
        {/* Background decoration */}
        <div className="pointer-events-none absolute left-[-140px] top-10 h-80 w-80 rounded-full bg-amber-200/20 blur-[110px]" />

        <div className="pointer-events-none absolute bottom-0 right-[-140px] h-96 w-96 rounded-full bg-rose-200/20 blur-[120px]" />

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative w-full max-w-lg px-1 text-center"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 0.15,
              type: "spring",
              stiffness: 200,
            }}
            className="
              mx-auto flex
              h-20 w-20
              items-center justify-center
              rounded-full
              border border-white
              bg-white/70
              shadow-[0_20px_60px_rgba(70,50,30,0.08)]
              backdrop-blur-xl
              sm:h-24
              sm:w-24
            "
          >
            <ShoppingBag
              size={30}
              strokeWidth={1.4}
              className="text-stone-700 sm:h-8 sm:w-8"
            />
          </motion.div>

          <p className="mt-6 text-[9px] font-medium uppercase tracking-[0.3em] text-amber-700 sm:mt-7 sm:text-[10px]">
            Maison Collection
          </p>

          <h1 className="mt-3 font-display text-3xl leading-tight text-stone-900 sm:text-5xl">
            Your cart is empty
          </h1>

          <p className="mx-auto mt-4 max-w-sm text-xs leading-6 text-stone-500 sm:text-sm">
            Your next favorite piece is waiting. Explore our
            collection and find something made for you.
          </p>

          <Link
            href="/shop"
            className="
              group
              mt-7
              inline-flex
              items-center
              gap-3
              rounded-xl
              bg-stone-900
              px-6
              py-3.5
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.18em]
              text-white
              shadow-lg
              transition-all
              duration-300
              hover:bg-amber-700
              hover:shadow-xl
              sm:mt-8
              sm:px-7
            "
          >
            Continue Shopping
            <ArrowRight
              size={14}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      </main>
    );
  }

  /* =========================
     CART
  ========================= */

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#faf8f5]">
      {/* Background decoration */}
      <div className="pointer-events-none absolute left-[-180px] top-10 h-96 w-96 rounded-full bg-amber-200/20 blur-[120px]" />

      <div className="pointer-events-none absolute right-[-180px] top-[35%] h-[30rem] w-[30rem] rounded-full bg-rose-200/20 blur-[130px]" />

      <div className="pointer-events-none absolute bottom-0 left-[35%] h-80 w-80 rounded-full bg-fuchsia-200/15 blur-[110px]" />

      <div
        className="
          relative
          mx-auto
          max-w-7xl
          px-4
          pb-16
          pt-12
          sm:px-6
          sm:pb-20
          sm:pt-20
          md:px-8
          md:pt-24
        "
      >
        {/* =========================
            HEADER
        ========================= */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-[9px] font-medium uppercase tracking-[0.3em] text-amber-700 sm:text-[10px]">
              <Sparkles size={12} />
              Maison
            </div>

            <h1 className="mt-2 font-display text-3xl leading-tight text-stone-900 sm:text-5xl md:text-6xl">
              Shopping Cart
            </h1>

            <p className="mt-2 text-xs text-stone-500 sm:text-sm">
              {cart.length}{" "}
              {cart.length === 1 ? "item" : "items"} in your
              collection
            </p>
          </div>

          <Link
            href="/shop"
            className="
              group
              inline-flex
              w-fit
              items-center
              gap-2
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.15em]
              text-stone-500
              transition
              hover:text-amber-700
            "
          >
            <ChevronLeft
              size={14}
              className="transition-transform group-hover:-translate-x-1"
            />
            Continue Shopping
          </Link>
        </motion.div>

        {/* =========================
            MAIN GRID
        ========================= */}

        <div className="mt-7 grid gap-7 lg:mt-10 lg:grid-cols-[minmax(0,1fr)_360px] xl:grid-cols-[minmax(0,1fr)_390px] lg:gap-8">
          {/* =========================
              CART ITEMS
          ========================= */}

          <section className="min-w-0">
            {/* Header */}
            <div
              className="
                mb-3
                hidden
                items-center
                justify-between
                border-b
                border-stone-200/70
                px-1
                pb-3
                text-[9px]
                uppercase
                tracking-[0.2em]
                text-stone-400
                sm:flex
              "
            >
              <span>Your Items</span>
              <span>{cart.length} Products</span>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <AnimatePresence mode="popLayout">
                {cart.map((i) => (
                  <motion.div
                    key={i.key}
                    layout
                    initial={{
                      opacity: 0,
                      y: 15,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      x: -30,
                      height: 0,
                      marginBottom: 0,
                    }}
                    transition={{
                      duration: 0.35,
                    }}
                    className="
                      group
                      overflow-hidden
                      rounded-2xl
                      border
                      border-white
                      bg-white/65
                      p-2.5
                      shadow-[0_10px_35px_rgba(70,50,30,0.05)]
                      backdrop-blur-xl
                      sm:rounded-3xl
                      sm:p-3
                    "
                  >
                    <div className="flex min-w-0 gap-3 sm:gap-5">
                      {/* IMAGE */}
                      <Link
                        href={`/product/${i.id}`}
                        className="
                          relative
                          h-32
                          w-24
                          shrink-0
                          overflow-hidden
                          rounded-xl
                          bg-stone-100
                          sm:h-40
                          sm:w-32
                          sm:rounded-2xl
                        "
                      >
                        <img
                          src={i.image}
                          alt={i.name}
                          className="
                            h-full
                            w-full
                            object-cover
                            transition-transform
                            duration-700
                            group-hover:scale-105
                          "
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      </Link>

                      {/* DETAILS */}
                      <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5 sm:py-1">
                        {/* TOP */}
                        <div className="min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0 flex-1">
                              <p className="text-[8px] uppercase tracking-[0.2em] text-stone-400 sm:text-[10px]">
                                Maison Collection
                              </p>

                              <Link
                                href={`/product/${i.id}`}
                                className="
                                  mt-1
                                  block
                                  break-words
                                  font-display
                                  text-base
                                  leading-snug
                                  text-stone-800
                                  transition
                                  hover:text-amber-700
                                  sm:text-xl
                                "
                              >
                                {i.name}
                              </Link>
                            </div>

                            {/* DELETE */}
                            <button
                              type="button"
                              onClick={() =>
                                removeFromCart(i.key)
                              }
                              aria-label={`Remove ${i.name}`}
                              className="
                                flex
                                h-8
                                w-8
                                shrink-0
                                items-center
                                justify-center
                                rounded-full
                                text-stone-400
                                transition
                                hover:bg-rose-50
                                hover:text-rose-600
                                sm:h-9
                                sm:w-9
                              "
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>

                          {/* SIZE */}
                          <div className="mt-2 flex flex-wrap items-center gap-2">
                            <span className="text-[9px] uppercase tracking-wider text-stone-400">
                              Size
                            </span>

                            <span className="rounded-md bg-stone-100 px-2 py-1 text-[10px] font-medium text-stone-700">
                              {i.size}
                            </span>
                          </div>
                        </div>

                        {/* BOTTOM */}
                        <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
                          {/* QUANTITY */}
                          <div>
                            <p className="mb-1.5 text-[8px] uppercase tracking-[0.15em] text-stone-400 sm:text-[9px]">
                              Quantity
                            </p>

                            <div className="flex h-8 items-center rounded-lg border border-stone-200 bg-white sm:h-9">
                              <button
                                type="button"
                                onClick={() =>
                                  updateQty(
                                    i.key,
                                    i.qty - 1
                                  )
                                }
                                className="
                                  flex
                                  h-full
                                  w-8
                                  items-center
                                  justify-center
                                  text-stone-500
                                  transition
                                  hover:bg-stone-50
                                  hover:text-stone-900
                                "
                                aria-label="Decrease quantity"
                              >
                                <Minus size={12} />
                              </button>

                              <span className="w-7 text-center text-xs font-medium text-stone-800">
                                {i.qty}
                              </span>

                              <button
                                type="button"
                                onClick={() =>
                                  updateQty(
                                    i.key,
                                    i.qty + 1
                                  )
                                }
                                className="
                                  flex
                                  h-full
                                  w-8
                                  items-center
                                  justify-center
                                  text-stone-500
                                  transition
                                  hover:bg-stone-50
                                  hover:text-stone-900
                                "
                                aria-label="Increase quantity"
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                          </div>

                          {/* PRICE */}
                          <div className="ml-auto min-w-0 text-right">
                            <p className="text-[8px] uppercase tracking-[0.12em] text-stone-400 sm:text-[9px]">
                              Total
                            </p>

                            <p className="mt-0.5 break-words text-sm font-bold text-stone-900 sm:text-base">
                              {formatPrice(i.price * i.qty)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* FREE SHIPPING MESSAGE */}
            {cartTotal < 2999 && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="
                  mt-4
                  flex
                  items-start
                  gap-3
                  rounded-2xl
                  border
                  border-amber-100
                  bg-amber-50/70
                  px-4
                  py-3
                  text-xs
                  text-amber-900
                  sm:mt-5
                  sm:items-center
                  sm:px-5
                "
              >
                <Truck
                  size={17}
                  className="mt-0.5 shrink-0 text-amber-600 sm:mt-0"
                />

                <p>
                  Add{" "}
                  <span className="font-semibold">
                    {formatPrice(2999 - cartTotal)}
                  </span>{" "}
                  more to unlock free shipping.
                </p>
              </motion.div>
            )}

            {cartTotal >= 2999 && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="
                  mt-4
                  flex
                  items-start
                  gap-3
                  rounded-2xl
                  border
                  border-emerald-100
                  bg-emerald-50/70
                  px-4
                  py-3
                  text-xs
                  text-emerald-800
                  sm:items-center
                "
              >
                <Truck
                  size={17}
                  className="mt-0.5 shrink-0 text-emerald-600 sm:mt-0"
                />

                <p>
                  Congratulations! You have unlocked{" "}
                  <span className="font-semibold">
                    free shipping.
                  </span>
                </p>
              </motion.div>
            )}
          </section>

          {/* =========================
              ORDER SUMMARY
          ========================= */}

          <aside className="min-w-0 lg:sticky lg:top-24 lg:h-fit">
            <div
              className="
                overflow-hidden
                rounded-3xl
                border
                border-white
                bg-white/70
                p-5
                shadow-[0_20px_60px_rgba(70,50,30,0.08)]
                backdrop-blur-xl
                sm:p-7
              "
            >
              {/* SUMMARY HEADER */}
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[9px] font-medium uppercase tracking-[0.25em] text-amber-700">
                    Maison
                  </p>

                  <h2 className="mt-1 font-display text-2xl leading-tight text-stone-900 sm:text-3xl">
                    Order Summary
                  </h2>
                </div>

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-stone-100">
                  <ShoppingBag
                    size={17}
                    className="text-stone-700"
                  />
                </div>
              </div>

              {/* PRICE DETAILS */}
              <div className="mt-7 space-y-4 text-xs sm:text-sm">
                <div className="flex justify-between gap-4 text-stone-500">
                  <span>Subtotal</span>
                  <span className="shrink-0 font-medium text-stone-800">
                    {formatPrice(cartTotal)}
                  </span>
                </div>

                <div className="flex justify-between gap-4 text-stone-500">
                  <span>Shipping</span>

                  <span
                    className={
                      shipping === 0
                        ? "shrink-0 font-medium text-emerald-600"
                        : "shrink-0 font-medium text-stone-800"
                    }
                  >
                    {shipping
                      ? formatPrice(shipping)
                      : "Free"}
                  </span>
                </div>

                <div className="border-t border-stone-200 pt-5">
                  <div className="flex items-end justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-[9px] uppercase tracking-[0.15em] text-stone-400">
                        Total
                      </p>

                      <p className="mt-1 break-words font-display text-2xl text-stone-900 sm:text-3xl">
                        {formatPrice(
                          cartTotal + shipping
                        )}
                      </p>
                    </div>

                    <span className="mb-1 shrink-0 text-right text-[9px] text-stone-400">
                      Inclusive of all charges
                    </span>
                  </div>
                </div>
              </div>

              {/* CHECKOUT */}
              <Link
                href="/checkout"
                className="
                  group
                  mt-7
                  flex
                  min-h-12
                  w-full
                  items-center
                  justify-center
                  gap-3
                  rounded-xl
                  bg-stone-900
                  px-4
                  py-3.5
                  text-center
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-white
                  shadow-lg
                  transition-all
                  duration-300
                  hover:bg-amber-700
                  hover:shadow-xl
                  sm:min-h-13
                "
              >
                Proceed to Checkout

                <ArrowRight
                  size={14}
                  className="shrink-0 transition-transform group-hover:translate-x-1"
                />
              </Link>

              {/* TRUST */}
              <div className="mt-6 grid grid-cols-2 gap-2">
                <div className="rounded-xl bg-stone-50 p-3 text-center">
                  <ShieldCheck
                    size={16}
                    className="mx-auto text-stone-600"
                    strokeWidth={1.5}
                  />

                  <p className="mt-1.5 text-[8px] uppercase tracking-wider text-stone-400">
                    Secure Payment
                  </p>
                </div>

                <div className="rounded-xl bg-stone-50 p-3 text-center">
                  <Truck
                    size={16}
                    className="mx-auto text-stone-600"
                    strokeWidth={1.5}
                  />

                  <p className="mt-1.5 text-[8px] uppercase tracking-wider text-stone-400">
                    Fast Delivery
                  </p>
                </div>
              </div>
            </div>

            {/* BRAND MESSAGE */}
            <div className="mt-5 hidden text-center lg:block">
              <p className="font-display text-lg text-stone-400">
                Fashion changes.
              </p>

              <p className="font-display text-lg text-stone-700">
                Style remains.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

