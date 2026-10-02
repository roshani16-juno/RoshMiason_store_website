"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  Sparkles,
  X,
} from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/api";

const cats = ["All", "Men", "Women", "Accessories"];

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

function ProductSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[3/4] rounded-2xl bg-stone-200/70" />
      <div className="mt-4 h-3 w-2/3 rounded bg-stone-200" />
      <div className="mt-2 h-4 w-1/2 rounded bg-stone-200" />
      <div className="mt-3 h-4 w-1/3 rounded bg-stone-200" />
    </div>
  );
}

function ShopContent() {
  const params = useSearchParams();

  const [category, setCategory] = useState(
    params.get("category") || "All"
  );

  const [sort, setSort] = useState("featured");
  const [q, setQ] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setCategory(params.get("category") || "All");
  }, [params]);

  useEffect(() => {
    setLoading(true);

    getProducts({
      category,
      q,
    }).then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, [category, q]);

  const sorted = [...products].sort((a, b) =>
    sort === "low"
      ? a.price - b.price
      : sort === "high"
      ? b.price - a.price
      : sort === "rating"
      ? b.rating - a.rating
      : 0
  );

  const currentCategory =
    category === "All" ? "All Collection" : category;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#faf8f5]">
      {/* Background decoration */}
      <div className="pointer-events-none absolute left-[-180px] top-10 h-80 w-80 rounded-full bg-amber-200/20 blur-[110px]" />

      <div className="pointer-events-none absolute right-[-160px] top-[30%] h-[28rem] w-[28rem] rounded-full bg-rose-200/20 blur-[120px]" />

      <div className="pointer-events-none absolute bottom-0 left-[35%] h-72 w-72 rounded-full bg-fuchsia-200/15 blur-[100px]" />

      {/* MAIN CONTAINER */}
      <div
        className="
          relative mx-auto max-w-7xl
          px-4
          pb-16
          pt-16
          sm:px-6
          sm:pb-20
          sm:pt-20
          md:px-8
          md:pt-6
        "
      >
        {/* ==================================================
            HERO / HEADER
        ================================================== */}

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="text-center"
        >
          <motion.div
            variants={fadeUp}
            className="
              flex items-center justify-center gap-2
              text-[9px]
              font-medium
              uppercase
              tracking-[0.3em]
              text-amber-700
              sm:text-[10px]
              md:text-xs
            "
          >
            <Sparkles size={12} />
            Maison Collection
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="
              mt-2
              font-display
              text-3xl
              leading-tight
              text-stone-900
              sm:mt-1
              sm:text-5xl
              md:text-6xl
              lg:text-7xl
            "
          >
            {currentCategory}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="
              mx-auto
              mt-4
              max-w-xl
              text-[11px]
              leading-5
              text-stone-500
              sm:mt-1
              sm:text-sm
              sm:leading-6
            "
          >
            Discover thoughtfully selected pieces designed for
            effortless style, comfort and everyday elegance.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="
              mx-auto
              mt-4
              flex
              w-fit
              items-center
              gap-2
              rounded-full
              border
              border-stone-200
              bg-white/60
              px-3
              py-1.5
              text-[9px]
              uppercase
              tracking-[0.15em]
              text-stone-500
              shadow-sm
              backdrop-blur
              sm:mt-5
              sm:px-4
              sm:py-2
              sm:text-[10px]
            "
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

            {sorted.length}{" "}
            {sorted.length === 1 ? "Product" : "Products"}
          </motion.div>
        </motion.div>

        {/* ==================================================
            CATEGORY NAVIGATION
        ================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.25,
            duration: 0.5,
          }}
          className="
            mt-6
            overflow-hidden
            rounded-2xl
            border
            border-white/90
            bg-white/55
            p-1.5
            shadow-[0_15px_50px_rgba(70,50,30,0.05)]
            backdrop-blur-xl
            sm:mt-8
            sm:p-2
          "
        >
          <div className="flex gap-1 overflow-x-auto scrollbar-none">
            {cats.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                className={`
                  relative
                  shrink-0
                  rounded-xl
                  px-4
                  py-2.5
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.15em]
                  transition-all
                  duration-300
                  sm:px-6
                  sm:py-3
                  sm:text-xs
                  ${
                    category === c
                      ? "bg-stone-900 text-white shadow-md"
                      : "text-stone-500 hover:bg-white hover:text-stone-900"
                  }
                `}
              >
                {c}
              </button>
            ))}
          </div>
        </motion.div>

        {/* ==================================================
            FILTER / SEARCH
        ================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.3,
            duration: 0.5,
          }}
          className="
            mt-3
            rounded-2xl
            border
            border-stone-200/70
            bg-white/60
            p-2.5
            shadow-sm
            backdrop-blur-xl
            sm:mt-4
            sm:p-4
          "
        >
          <div className="flex flex-col gap-2.5 lg:flex-row lg:items-center lg:justify-between">
            {/* Search */}
            <div className="relative w-full lg:max-w-md">
              <Search
                size={16}
                strokeWidth={1.7}
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-stone-400
                "
              />

              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search products..."
                className="
                  h-11
                  w-full
                  rounded-xl
                  border
                  border-stone-200
                  bg-white/70
                  pl-11
                  pr-10
                  text-sm
                  text-stone-900
                  outline-none
                  transition-all
                  placeholder:text-stone-400
                  focus:border-amber-500
                  focus:bg-white
                  focus:ring-4
                  focus:ring-amber-100/50
                  sm:h-12
                "
              />

              {q && (
                <button
                  type="button"
                  onClick={() => setQ("")}
                  className="
                    absolute
                    right-3
                    top-1/2
                    flex
                    h-7
                    w-7
                    -translate-y-1/2
                    items-center
                    justify-center
                    rounded-full
                    bg-stone-100
                    text-stone-500
                    transition
                    hover:bg-stone-200
                    hover:text-stone-900
                  "
                >
                  <X size={13} />
                </button>
              )}
            </div>

            {/* Desktop sort */}
            <div className="hidden items-center gap-3 sm:flex">
              <span className="text-[10px] uppercase tracking-[0.15em] text-stone-400">
                Sort by
              </span>

              <div className="relative">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="
                    h-11
                    min-w-[190px]
                    appearance-none
                    rounded-xl
                    border
                    border-stone-200
                    bg-white/70
                    px-4
                    pr-10
                    text-xs
                    text-stone-700
                    outline-none
                    transition
                    focus:border-amber-500
                    focus:ring-4
                    focus:ring-amber-100/50
                    sm:h-12
                  "
                >
                  <option value="featured">Featured</option>
                  <option value="low">Price: Low to High</option>
                  <option value="high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>

                <ChevronDown
                  size={15}
                  className="
                    pointer-events-none
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    text-stone-400
                  "
                />
              </div>
            </div>

            {/* Mobile filter */}
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="
                flex
                h-11
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-stone-200
                bg-white/70
                px-5
                text-xs
                font-medium
                uppercase
                tracking-[0.12em]
                text-stone-700
                transition
                hover:bg-white
                sm:hidden
              "
            >
              <SlidersHorizontal size={15} />
              Sort & Filter
            </button>
          </div>

          {/* Mobile sorting */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{
                  height: 0,
                  opacity: 0,
                }}
                animate={{
                  height: "auto",
                  opacity: 1,
                }}
                exit={{
                  height: 0,
                  opacity: 0,
                }}
                className="overflow-hidden sm:hidden"
              >
                <div className="mt-3 border-t border-stone-200 pt-3">
                  <label className="mb-2 block text-[10px] uppercase tracking-[0.15em] text-stone-400">
                    Sort products
                  </label>

                  <div className="relative">
                    <select
                      value={sort}
                      onChange={(e) => setSort(e.target.value)}
                      className="
                        h-11
                        w-full
                        appearance-none
                        rounded-xl
                        border
                        border-stone-200
                        bg-white
                        px-4
                        pr-10
                        text-sm
                        text-stone-700
                        outline-none
                      "
                    >
                      <option value="featured">Featured</option>
                      <option value="low">Price: Low to High</option>
                      <option value="high">Price: High to Low</option>
                      <option value="rating">Top Rated</option>
                    </select>

                    <ChevronDown
                      size={15}
                      className="
                        pointer-events-none
                        absolute
                        right-4
                        top-1/2
                        -translate-y-1/2
                        text-stone-400
                      "
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ==================================================
            RESULT INFO
        ================================================== */}

        <div className="mt-5 flex items-center justify-between border-b border-stone-200/70 pb-3 sm:mt-7 sm:pb-4">
          <p className="text-[9px] uppercase tracking-[0.18em] text-stone-400 sm:text-xs">
            {q ? `Results for "${q}"` : `Showing ${category}`}
          </p>

          <p className="text-[9px] text-stone-400 sm:text-xs">
            {sorted.length} items
          </p>
        </div>

        {/* ==================================================
            PRODUCTS
        ================================================== */}

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="
                mt-6
                grid
                grid-cols-2
                gap-x-3
                gap-y-7
                sm:mt-8
                sm:gap-x-5
                sm:gap-y-10
                md:grid-cols-3
                lg:grid-cols-4
              "
            >
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </motion.div>
          ) : sorted.length === 0 ? (
            <motion.div
              key="empty"
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="py-20 text-center sm:py-28"
            >
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-amber-100 via-rose-100 to-fuchsia-100">
                <Search
                  size={28}
                  strokeWidth={1.5}
                  className="text-stone-600"
                />
              </div>

              <h2 className="mt-6 font-display text-2xl text-stone-900 sm:text-3xl">
                No products found
              </h2>

              <p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-stone-400 sm:text-sm">
                We couldn't find anything matching your
                search. Try another keyword or explore
                our full collection.
              </p>

              <button
                type="button"
                onClick={() => {
                  setQ("");
                  setCategory("All");
                }}
                className="
                  mt-6
                  rounded-xl
                  bg-stone-900
                  px-6
                  py-3
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.16em]
                  text-white
                  transition
                  hover:bg-amber-700
                "
              >
                View All Products
              </button>
            </motion.div>
          ) : (
            <motion.div
              key={`${category}-${sort}-${q}`}
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 0.4,
              }}
              className="
                mt-6
                grid
                grid-cols-2
                gap-x-3
                gap-y-8
                sm:mt-8
                sm:gap-x-5
                sm:gap-y-11
                md:grid-cols-3
                lg:grid-cols-4
              "
            >
              {sorted.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: Math.min(i * 0.045, 0.35),
                    duration: 0.45,
                  }}
                  className="min-w-0"
                >
                  <ProductCard product={p} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ==================================================
            BOTTOM BRAND MESSAGE
        ================================================== */}

        {!loading && sorted.length > 0 && (
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
            className="
              mt-20
              border-t
              border-stone-200/70
              pt-10
              text-center
              sm:mt-28
              sm:pt-12
            "
          >
            <Sparkles
              size={18}
              className="mx-auto text-amber-600"
              strokeWidth={1.5}
            />

            <p className="mt-4 font-display text-2xl text-stone-800 sm:text-3xl">
              Fashion changes.
            </p>

            <p className="font-display text-2xl text-stone-400 sm:text-3xl">
              Style remains.
            </p>
          </motion.div>
        )}
      </div>
    </main>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-[70vh] items-center justify-center bg-[#faf8f5]">
          <div className="text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-stone-200 border-t-stone-900" />

            <p className="mt-4 text-[10px] uppercase tracking-[0.2em] text-stone-400">
              Loading collection
            </p>
          </div>
        </main>
      }
    >
      <ShopContent />
    </Suspense>
  );
}