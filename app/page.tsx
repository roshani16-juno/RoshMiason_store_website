
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import {
  Truck,
  RefreshCw,
  ShieldCheck,
  Headphones,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/api";

const categories = [
  {
    name: "Men",
    img: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=900&q=80&auto=format&fit=crop",
  },
  {
    name: "Women",
    img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&q=80&auto=format&fit=crop",
  },
  {
    name: "Accessories",
    img: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=900&q=80&auto=format&fit=crop",
  },
];

const features = [
  {
    icon: Truck,
    t: "Free Shipping",
    d: "On orders above ₹2,999",
  },
  {
    icon: RefreshCw,
    t: "Easy Returns",
    d: "30-day return policy",
  },
  {
    icon: ShieldCheck,
    t: "Secure Payment",
    d: "100% protected checkout",
  },
  {
    icon: Headphones,
    t: "24/7 Support",
    d: "We're always here",
  },
];

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

type Product = {
  id: string | number;
  [key: string]: unknown;
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  return (
    <main className="overflow-hidden bg-[#faf8f5]">

      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative h-[87vh] min-h-[560px] overflow-hidden">

        {/* Background Image */}
        <motion.img
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 1.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1800&q=80&auto=format&fit=crop"
          alt="Maison fashion collection"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Premium Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-900/55 to-stone-900/10" />

        {/* Warm Gradient Glow */}
        <div className="absolute -right-32 top-1/4 h-96 w-96 rounded-full bg-amber-400/20 blur-[120px]" />

        <div className="absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-rose-400/10 blur-[100px]" />

        {/* Hero Content */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="relative mx-auto flex h-full max-w-7xl items-center px-5"
        >
          <div className="max-w-xl text-white">

            <motion.div
              variants={fadeUp}
              className="mb-5 flex items-center gap-3"
            >
              <span className="h-px w-10 bg-gradient-to-r from-amber-300 to-rose-300" />

              <p className="text-xs uppercase tracking-[0.4em] text-amber-200">
                New Season Collection
              </p>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-display text-5xl leading-[1.05] md:text-7xl"
            >
              Dress with{" "}
              <span className="bg-gradient-to-r from-amber-200 via-rose-200 to-fuchsia-200 bg-clip-text italic text-transparent">
                elegance
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-lg leading-7 text-stone-200"
            >
              Discover timeless essentials, crafted from premium fabrics
              for the modern wardrobe.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-wrap gap-4"
            >

              {/* Shop Button */}
              <Link
                href="/shop"
                className="group relative overflow-hidden rounded-sm bg-gradient-to-r from-amber-500 via-amber-600 to-rose-500 px-8 py-4 text-sm uppercase tracking-widest text-white shadow-lg shadow-amber-900/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Shop Now

                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>

                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-white/0 via-white/25 to-white/0 transition-transform duration-700 group-hover:translate-x-full" />
              </Link>

              {/* Story Button */}
              <Link
                href="/about"
                className="group rounded-sm border border-white/60 bg-white/5 px-8 py-4 text-sm uppercase tracking-widest backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white hover:bg-white hover:text-stone-900"
              >
                Our Story
              </Link>
            </motion.div>

            {/* Small Hero Detail */}
            <motion.div
              variants={fadeUp}
              className="mt-10 flex items-center gap-3 text-xs text-stone-300"
            >
              <Sparkles size={14} className="text-amber-300" />

              <span>
                Curated pieces • Premium quality • Timeless style
              </span>
            </motion.div>

          </div>
        </motion.div>
      </section>


      {/* =====================================================
          PREMIUM MOVING FEATURES
      ===================================================== */}
      <section className="relative overflow-hidden border-b border-stone-200/70 bg-gradient-to-r from-[#faf8f5] via-white to-[#faf8f5] py-7">

        {/* Top Gradient Line */}
        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-300/70 to-transparent" />

        {/* Left Fade */}
        <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-20 bg-gradient-to-r from-[#faf8f5] via-[#faf8f5]/80 to-transparent md:w-32" />

        {/* Right Fade */}
        <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-20 bg-gradient-to-l from-[#faf8f5] via-[#faf8f5]/80 to-transparent md:w-32" />

        {/* Moving Track */}
        <motion.div
          className="flex w-max gap-5"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
          }}
        >

          {/* First Set */}
          {features.map(({ icon: Icon, t, d }, index) => (
            <motion.div
              key={`first-${t}`}
              whileHover={{
                y: -4,
                scale: 1.02,
              }}
              className="
                group relative flex w-[270px] shrink-0
                items-center gap-4
                overflow-hidden rounded-2xl
                border border-white/80
                bg-white/50
                px-5 py-4
                shadow-[0_8px_30px_rgba(120,90,50,0.08)]
                backdrop-blur-xl
                transition-all duration-300
                hover:border-amber-200
                hover:bg-white/70
                hover:shadow-[0_15px_40px_rgba(180,120,50,0.15)]
              "
            >

              {/* Gradient Glow */}
              <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-gradient-to-br from-amber-300/25 via-rose-300/20 to-fuchsia-300/15 blur-2xl transition duration-500 group-hover:scale-150" />

              {/* Icon */}
              <div
                className="
                  relative flex h-11 w-11 shrink-0
                  items-center justify-center
                  rounded-xl
                  border border-white/80
                  bg-gradient-to-br
                  from-amber-100/90
                  via-rose-100/80
                  to-fuchsia-100/70
                  shadow-sm
                  transition-all duration-300
                  group-hover:scale-110
                  group-hover:rotate-2
                "
              >
                <Icon
                  size={21}
                  strokeWidth={1.7}
                  className="text-amber-700 transition-colors duration-300 group-hover:text-rose-600"
                />
              </div>

              {/* Text */}
              <div className="relative">
                <p className="text-sm font-semibold tracking-wide text-stone-800">
                  {t}
                </p>

                <p className="mt-1 whitespace-nowrap text-[11px] text-stone-500">
                  {d}
                </p>
              </div>

              {/* Decorative Dot */}
              <span className="absolute right-4 top-3 h-1.5 w-1.5 rounded-full bg-gradient-to-r from-amber-400 to-rose-400 opacity-70" />
            </motion.div>
          ))}

          {/* Second Set - Required For Seamless Loop */}
          {features.map(({ icon: Icon, t, d }, index) => (
            <motion.div
              key={`second-${t}`}
              whileHover={{
                y: -4,
                scale: 1.02,
              }}
              className="
                group relative flex w-[270px] shrink-0
                items-center gap-4
                overflow-hidden rounded-2xl
                border border-white/80
                bg-white/50
                px-5 py-4
                shadow-[0_8px_30px_rgba(120,90,50,0.08)]
                backdrop-blur-xl
                transition-all duration-300
                hover:border-amber-200
                hover:bg-white/70
                hover:shadow-[0_15px_40px_rgba(180,120,50,0.15)]
              "
            >

              {/* Gradient Glow */}
              <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-gradient-to-br from-amber-300/25 via-rose-300/20 to-fuchsia-300/15 blur-2xl transition duration-500 group-hover:scale-150" />

              {/* Icon */}
              <div
                className="
                  relative flex h-11 w-11 shrink-0
                  items-center justify-center
                  rounded-xl
                  border border-white/80
                  bg-gradient-to-br
                  from-amber-100/90
                  via-rose-100/80
                  to-fuchsia-100/70
                  shadow-sm
                  transition-all duration-300
                  group-hover:scale-110
                  group-hover:rotate-2
                "
              >
                <Icon
                  size={21}
                  strokeWidth={1.7}
                  className="text-amber-700 transition-colors duration-300 group-hover:text-rose-600"
                />
              </div>

              {/* Text */}
              <div className="relative">
                <p className="text-sm font-semibold tracking-wide text-stone-800">
                  {t}
                </p>

                <p className="mt-1 whitespace-nowrap text-[11px] text-stone-500">
                  {d}
                </p>
              </div>

              {/* Decorative Dot */}
              <span className="absolute right-4 top-3 h-1.5 w-1.5 rounded-full bg-gradient-to-r from-amber-400 to-rose-400 opacity-70" />
            </motion.div>
          ))}

        </motion.div>

        {/* Bottom Gradient Line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rose-300/40 to-transparent" />
      </section>


      {/* =====================================================
          CATEGORIES
      ===================================================== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={stagger}
        className="mx-auto max-w-7xl px-5 pt-20"
      >

        <motion.div
          variants={fadeUp}
          className="text-center"
        >
          <p className="text-xs uppercase tracking-[0.35em] text-amber-700">
            Explore Collection
          </p>

          <h2 className="mt-3 font-display text-4xl text-stone-900 md:text-5xl">
            Shop by Category
          </h2>

          <div className="mx-auto mt-5 h-px w-16 bg-gradient-to-r from-amber-400 via-rose-400 to-fuchsia-400" />
        </motion.div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">

          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              variants={fadeUp}
              whileHover={{
                y: -6,
              }}
              transition={{
                duration: 0.35,
              }}
            >
              <Link
                href={`/shop?category=${category.name}`}
                className="group relative block aspect-[4/5] overflow-hidden rounded-2xl shadow-sm"
              >

                <img
                  src={category.img}
                  alt={category.name}
                  className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-110"
                />

                {/* Image Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/15 to-transparent transition duration-500 group-hover:from-stone-950/90" />

                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/0 via-rose-400/0 to-fuchsia-400/0 transition duration-500 group-hover:from-amber-500/10 group-hover:via-rose-400/10 group-hover:to-fuchsia-400/10" />

                <div className="absolute bottom-6 left-6 right-6 text-white">

                  <p className="mb-2 text-[10px] uppercase tracking-[0.3em] text-amber-300">
                    Collection 0{index + 1}
                  </p>

                  <div className="flex items-end justify-between">

                    <h3 className="font-display text-3xl">
                      {category.name}
                    </h3>

                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-white/10 backdrop-blur-sm transition-all duration-300 group-hover:bg-white group-hover:text-stone-900">
                      <ArrowRight size={15} />
                    </span>

                  </div>
                </div>

              </Link>
            </motion.div>
          ))}

        </div>
      </motion.section>


      {/* =====================================================
          TRENDING
      ===================================================== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.1,
        }}
        variants={stagger}
        className="mx-auto max-w-7xl px-5 pt-24"
      >

        <motion.div
          variants={fadeUp}
          className="flex items-end justify-between"
        >

          <div>

            <p className="text-xs uppercase tracking-[0.3em] text-amber-700">
              Curated for you
            </p>

            <h2 className="mt-2 font-display text-4xl text-stone-900">
              Trending Now
            </h2>

          </div>

          <Link
            href="/shop"
            className="group hidden items-center gap-2 text-sm uppercase tracking-widest text-stone-700 transition md:flex"
          >
            View All

            <ArrowRight
              size={15}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>

        </motion.div>

        <motion.div
          variants={stagger}
          className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4"
        >

          {products.slice(0, 4).map((product) => (
            <motion.div
              key={product.id}
              variants={fadeUp}
              whileHover={{
                y: -5,
              }}
              transition={{
                duration: 0.3,
              }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}

        </motion.div>
      </motion.section>


      {/* =====================================================
          PREMIUM BANNER
      ===================================================== */}
      <motion.section
        initial={{
          opacity: 0,
          scale: 0.97,
        }}
        whileInView={{
          opacity: 1,
          scale: 1,
        }}
        viewport={{
          once: true,
          amount: 0.2,
        }}
        transition={{
          duration: 0.8,
        }}
        className="mx-auto mt-24 max-w-7xl px-5"
      >

        <div className="group relative overflow-hidden rounded-2xl bg-stone-900 px-8 py-16 text-center text-white md:py-24">

          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-stone-950 via-stone-900 to-rose-950/70" />

          {/* Glow 1 */}
          <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-amber-500/20 blur-[100px] transition duration-700 group-hover:bg-amber-500/30" />

          {/* Glow 2 */}
          <div className="absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-fuchsia-500/20 blur-[110px] transition duration-700 group-hover:bg-fuchsia-500/30" />

          {/* Content */}
          <div className="relative z-10">

            <p className="text-xs uppercase tracking-[0.4em] text-amber-300">
              Limited Time
            </p>

            <h2 className="mx-auto mt-4 max-w-3xl font-display text-4xl leading-tight md:text-6xl">
              Flat{" "}
              <span className="bg-gradient-to-r from-amber-300 via-rose-300 to-fuchsia-300 bg-clip-text text-transparent">
                30% Off
              </span>{" "}
              on Winter Wear
            </h2>

            <p className="mt-5 text-stone-400">
              Use code{" "}
              <span className="font-medium text-amber-300">
                MAISON30
              </span>{" "}
              at checkout
            </p>

            <Link
              href="/shop"
              className="group/btn mt-8 inline-flex items-center gap-2 rounded-sm bg-gradient-to-r from-amber-500 via-rose-500 to-fuchsia-500 px-8 py-4 text-sm uppercase tracking-widest shadow-lg shadow-rose-900/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              Grab the Deal

              <ArrowRight
                size={16}
                className="transition-transform group-hover/btn:translate-x-1"
              />
            </Link>

          </div>
        </div>
      </motion.section>


      {/* =====================================================
          NEW ARRIVALS
      ===================================================== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.1,
        }}
        variants={stagger}
        className="mx-auto max-w-7xl px-5 pb-24 pt-24"
      >

        <motion.div
          variants={fadeUp}
          className="text-center"
        >

          <p className="text-xs uppercase tracking-[0.35em] text-amber-700">
            Just Arrived
          </p>

          <h2 className="mt-3 font-display text-4xl text-stone-900 md:text-5xl">
            New Arrivals
          </h2>

          <div className="mx-auto mt-5 h-px w-16 bg-gradient-to-r from-amber-400 via-rose-400 to-fuchsia-400" />

        </motion.div>

        <motion.div
          variants={stagger}
          className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4"
        >

          {products.slice(4, 8).map((product) => (
            <motion.div
              key={product.id}
              variants={fadeUp}
              whileHover={{
                y: -5,
              }}
              transition={{
                duration: 0.3,
              }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}

        </motion.div>
      </motion.section>

    </main>
  );
}
