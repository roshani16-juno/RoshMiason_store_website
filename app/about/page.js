"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Heart,
  Sparkles,
  ShieldCheck,
  Leaf,
  Gem,
} from "lucide-react";

const stats = [
  ["10K+", "Happy Customers"],
  ["500+", "Styles"],
  ["25+", "Cities"],
  ["4.8", "Avg Rating"],
];

const values = [
  {
    icon: Gem,
    title: "Timeless Design",
    description:
      "We create pieces that go beyond trends and remain a part of your wardrobe for years.",
  },
  {
    icon: ShieldCheck,
    title: "Premium Quality",
    description:
      "Every fabric, stitch and finish is carefully selected to deliver comfort and lasting quality.",
  },
  {
    icon: Leaf,
    title: "Thoughtful Fashion",
    description:
      "Our approach focuses on thoughtful collections made for everyday elegance and effortless style.",
  },
];

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

export default function AboutPage() {
  return (
    <main className="overflow-hidden bg-[#faf8f5]">

      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative h-[55vh] min-h-[460px] overflow-hidden">

        {/* Background */}
        <motion.img
          initial={{
            scale: 1.08,
          }}
          animate={{
            scale: 1,
          }}
          transition={{
            duration: 1.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1800&q=80&auto=format&fit=crop"
          alt="MAISON fashion store"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/65 via-stone-950/45 to-stone-950/75" />

        {/* Warm Glow */}
        <div className="pointer-events-none absolute -right-24 top-1/4 h-72 w-72 rounded-full bg-amber-400/15 blur-[110px]" />

        <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-rose-400/10 blur-[100px]" />


        {/* Hero Content */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="relative mx-auto flex h-full max-w-5xl items-center justify-center px-5 text-center text-white"
        >

          <div>

            <motion.div
              variants={fadeUp}
              className="mb-5 flex items-center justify-center gap-3"
            >
              <span className="h-px w-10 bg-gradient-to-r from-transparent to-amber-300" />

              <p className="text-xs uppercase tracking-[0.45em] text-amber-200">
                The Maison Story
              </p>

              <span className="h-px w-10 bg-gradient-to-l from-transparent to-amber-300" />
            </motion.div>


            <motion.h1
              variants={fadeUp}
              className="font-display text-5xl leading-tight md:text-7xl"
            >
              Our{" "}
              <span className="bg-gradient-to-r from-amber-200 via-rose-200 to-fuchsia-200 bg-clip-text italic text-transparent">
                Story
              </span>
            </motion.h1>


            <motion.p
              variants={fadeUp}
              className="mx-auto mt-5 max-w-xl text-sm leading-7 text-stone-200 md:text-base"
            >
              A story built around timeless style, thoughtful design and
              the belief that fashion should feel as good as it looks.
            </motion.p>

          </div>

        </motion.div>

        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#faf8f5] to-transparent" />

      </section>


      {/* =====================================================
          STORY
      ===================================================== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.2,
        }}
        variants={stagger}
        className="mx-auto max-w-6xl px-5 py-20 md:py-24"
      >

        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-20">

          {/* Image */}
          <motion.div
            variants={fadeUp}
            className="group relative"
          >

            <div className="absolute -left-4 -top-4 h-24 w-24 rounded-full bg-amber-200/30 blur-2xl" />

            <div className="relative overflow-hidden rounded-3xl shadow-[0_25px_70px_rgba(90,70,40,0.12)]">
              <img
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1000&q=80&auto=format&fit=crop"
                alt="MAISON collection"
                className="h-[500px] w-full object-cover transition duration-700 ease-out group-hover:scale-105"
              />

              {/* Image Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/30 to-transparent" />
            </div>

            {/* Since Badge */}
            <div className="absolute -bottom-6 -right-4 rounded-2xl border border-white/80 bg-white/75 px-6 py-5 shadow-xl backdrop-blur-xl md:-right-7">
              <p className="text-[10px] uppercase tracking-[0.3em] text-amber-700">
                Since
              </p>

              <p className="mt-1 font-display text-3xl text-stone-900">
                2020
              </p>
            </div>

          </motion.div>


          {/* Content */}
          <motion.div variants={fadeUp}>

            <div className="flex items-center gap-3">
              <Sparkles
                size={15}
                className="text-amber-600"
              />

              <p className="text-xs uppercase tracking-[0.4em] text-amber-700">
                Who We Are
              </p>
            </div>


            <h2 className="mt-4 font-display text-4xl leading-tight text-stone-900 md:text-5xl">
              Crafted with passion,
              <br />
              <span className="italic text-amber-700">
                worn with pride.
              </span>
            </h2>


            <div className="mt-7 space-y-5 text-sm leading-7 text-stone-600 md:text-base">

              <p>
                MAISON started with a simple belief — great clothing should
                be timeless, comfortable and accessible.
              </p>

              <p>
                What began as a small idea in 2020 grew into a fashion
                destination for people who appreciate effortless style and
                quality craftsmanship.
              </p>

              <p>
                From carefully chosen fabrics to the smallest finishing
                details, every MAISON piece is created with intention.
              </p>

            </div>


            <div className="mt-8 flex items-center gap-3 text-sm text-stone-800">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-amber-100 to-rose-100">
                <Heart
                  size={16}
                  className="text-rose-600"
                />
              </div>

              <span className="font-medium">
                Made for those who wear their story.
              </span>
            </div>

          </motion.div>

        </div>
      </motion.section>


      {/* =====================================================
          STATS
      ===================================================== */}
      <section className="relative overflow-hidden bg-stone-900 py-16 md:py-20">

        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-stone-950 via-stone-900 to-rose-950/60" />

        {/* Glows */}
        <div className="absolute -left-24 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-amber-500/15 blur-[100px]" />

        <div className="absolute -right-24 top-0 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-[110px]" />


        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.2,
          }}
          variants={stagger}
          className="relative mx-auto grid max-w-5xl grid-cols-2 gap-5 px-5 md:grid-cols-4 md:gap-6"
        >

          {stats.map(([number, label]) => (
            <motion.div
              key={label}
              variants={fadeUp}
              whileHover={{
                y: -5,
              }}
              className="group rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-7 text-center backdrop-blur-sm transition-all duration-300 hover:border-amber-300/20 hover:bg-white/[0.07]"
            >

              <p className="font-display text-4xl text-amber-300 md:text-5xl">
                {number}
              </p>

              <div className="mx-auto mt-3 h-px w-8 bg-gradient-to-r from-amber-400 to-rose-400 opacity-70" />

              <p className="mt-3 text-xs uppercase tracking-[0.15em] text-stone-400">
                {label}
              </p>

            </motion.div>
          ))}

        </motion.div>
      </section>


      {/* =====================================================
          OUR VALUES
      ===================================================== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.15,
        }}
        variants={stagger}
        className="mx-auto max-w-6xl px-5 py-20 md:py-24"
      >

        {/* Heading */}
        <motion.div
          variants={fadeUp}
          className="mx-auto max-w-2xl text-center"
        >

          <p className="text-xs uppercase tracking-[0.35em] text-amber-700">
            What We Believe
          </p>

          <h2 className="mt-3 font-display text-4xl text-stone-900 md:text-5xl">
            The Maison Values
          </h2>

          <p className="mt-5 text-sm leading-6 text-stone-500">
            Everything we create is guided by a few simple principles that
            shape the way MAISON designs and delivers fashion.
          </p>

          <div className="mx-auto mt-5 h-px w-16 bg-gradient-to-r from-amber-400 via-rose-400 to-fuchsia-400" />

        </motion.div>


        {/* Value Cards */}
        <div className="mt-12 grid gap-5 md:grid-cols-3">

          {values.map((value) => {
            const Icon = value.icon;

            return (
              <motion.div
                key={value.title}
                variants={fadeUp}
                whileHover={{
                  y: -7,
                }}
                className="group relative overflow-hidden rounded-3xl border border-white/80 bg-white/60 p-7 shadow-[0_10px_40px_rgba(90,70,40,0.06)] backdrop-blur-xl transition-all duration-300 hover:shadow-[0_18px_50px_rgba(90,70,40,0.10)]"
              >

                {/* Card Glow */}
                <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-gradient-to-br from-amber-200/30 to-rose-200/20 blur-3xl transition duration-500 group-hover:scale-150" />


                {/* Icon */}
                <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-100 via-rose-100 to-fuchsia-100 shadow-sm transition duration-300 group-hover:scale-110">
                  <Icon
                    size={22}
                    strokeWidth={1.6}
                    className="text-amber-700"
                  />
                </div>


                <h3 className="relative mt-6 font-display text-2xl text-stone-900">
                  {value.title}
                </h3>

                <p className="relative mt-3 text-sm leading-6 text-stone-500">
                  {value.description}
                </p>

              </motion.div>
            );
          })}

        </div>

      </motion.section>


      {/* =====================================================
          CLOSING QUOTE
      ===================================================== */}
      <section className="px-5 pb-24">

        <motion.div
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
            duration: 0.7,
          }}
          className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-stone-900 px-7 py-16 text-center text-white md:px-10 md:py-20"
        >

          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-stone-950 via-stone-900 to-rose-950/70" />

          {/* Glow */}
          <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-amber-500/15 blur-[100px]" />

          <div className="absolute -bottom-24 -right-20 h-64 w-64 rounded-full bg-fuchsia-500/15 blur-[100px]" />


          <div className="relative z-10">

            <Sparkles
              size={22}
              className="mx-auto text-amber-300"
              strokeWidth={1.5}
            />

            <h2 className="mx-auto mt-5 max-w-3xl font-display text-3xl leading-tight md:text-5xl">
              Fashion changes.
              <br />
              <span className="bg-gradient-to-r from-amber-300 via-rose-300 to-fuchsia-300 bg-clip-text italic text-transparent">
                Style remains.
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-stone-400">
              Discover pieces designed to become part of your everyday
              story.
            </p>

            <Link
              href="/shop"
              className="group mt-8 inline-flex items-center gap-3 rounded-sm bg-gradient-to-r from-amber-500 via-rose-500 to-fuchsia-500 px-8 py-4 text-xs uppercase tracking-[0.2em] text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              Explore Collection

              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

          </div>

        </motion.div>

      </section>

    </main>
  );
}
