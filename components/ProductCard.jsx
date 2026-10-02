"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Star, Eye } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { formatPrice } from "@/lib/api";

export default function ProductCard({ product }) {
  const { toggleWishlist, isWished } = useStore();

  const wished = isWished(product.id);

  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : 0;

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="
        group w-full overflow-hidden
        rounded-2xl sm:rounded-3xl
        border border-white/60
        bg-white/70
        p-1.5 sm:p-2
        shadow-[0_8px_30px_rgba(0,0,0,0.05)]
        backdrop-blur-xl
        transition-shadow duration-500
        hover:shadow-[0_20px_50px_rgba(251,113,133,0.18)]
      "
    >
      {/* IMAGE */}
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl sm:rounded-2xl">
        <Link
          href={`/product/${product.id}`}
          className="block h-full w-full"
        >
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="
              h-full w-full object-cover
              transition-transform duration-700
              ease-out
              group-hover:scale-105
            "
          />
        </Link>

        {/* Bottom Gradient */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-70" />

        {/* TAG */}
        {product.tag && (
          <span
            className="
              glass absolute left-2 top-2
              max-w-[65%]
              truncate
              rounded-full
              px-2.5 py-1
              text-[8px] font-semibold
              uppercase tracking-[0.15em]
              text-amber-600
              sm:left-3 sm:top-3
              sm:px-3 sm:py-1.5
              sm:text-[10px]
            "
          >
            {product.tag}
          </span>
        )}

        {/* DISCOUNT */}
        {discount > 0 && (
          <span
            className="
              absolute bottom-2 left-2
              rounded-full
              bg-gradient-to-r from-amber-300 to-rose-400
              px-2.5 py-1
              text-[8px] font-bold
              text-stone-900
              shadow-lg
              sm:bottom-3 sm:left-3
              sm:px-3 sm:py-1.5
              sm:text-[10px]
            "
          >
            {discount}% OFF
          </span>
        )}

        {/* WISHLIST */}
        <motion.button
          whileTap={{ scale: 0.8 }}
          onClick={() => toggleWishlist(product)}
          className="
            glass absolute right-2 top-2
            flex h-8 w-8 items-center justify-center
            rounded-full
            transition-all duration-300
            hover:bg-white/30
            sm:right-3 sm:top-3
            sm:h-10 sm:w-10
          "
          aria-label={
            wished ? "Remove from wishlist" : "Add to wishlist"
          }
        >
          <motion.span
            key={String(wished)}
            initial={{ scale: 0.4, rotate: -15 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 12,
            }}
            className="flex"
          >
            <Heart
              size={15}
              className={
                wished
                  ? "fill-rose-500 text-rose-500"
                  : "text-white"
              }
            />
          </motion.span>
        </motion.button>

        {/* QUICK VIEW */}
        <Link
          href={`/product/${product.id}`}
          className="
            glass-strong absolute
            inset-x-2 bottom-2
            flex translate-y-[130%]
            items-center justify-center
            gap-1.5
            rounded-lg
            py-2.5
            text-[9px]
            font-semibold
            uppercase
            tracking-[0.15em]
            text-white
            opacity-0
            transition-all duration-500
            group-hover:translate-y-0
            group-hover:opacity-100
            sm:inset-x-3 sm:bottom-3
            sm:gap-2
            sm:rounded-xl
            sm:py-3
            sm:text-[10px]
            sm:tracking-widest
          "
        >
          <Eye size={13} />
          <span>Quick View</span>
        </Link>
      </div>

      {/* PRODUCT INFO */}
      <div className="px-1.5 pb-2 pt-3 sm:px-2 sm:pb-2.5 sm:pt-4">
        {/* CATEGORY */}
        <p
          className="
            truncate
            text-[8px]
            uppercase
            tracking-[0.18em]
            text-black/45
            sm:text-[10px]
            sm:tracking-[0.25em]
          "
        >
          {product.category}
        </p>

        {/* NAME */}
        <Link
          href={`/product/${product.id}`}
          className="
            mt-1 block
            truncate
            font-display
            text-sm
            leading-tight
            text-black/70
            transition-colors duration-300
            group-hover:text-amber-700
            sm:text-base
            md:text-lg
          "
        >
          {product.name}
        </Link>

        {/* PRICE + RATING */}
        <div
          className="
            mt-2
            flex
            flex-col
            gap-1.5
            sm:mt-2.5
            sm:flex-row
            sm:items-center
            sm:justify-between
            sm:gap-2
          "
        >
          {/* PRICE */}
          <div className="flex min-w-0 items-baseline gap-1.5 sm:gap-2">
            <span
              className="
                text-gradient
                text-sm
                font-bold
                sm:text-base
                md:text-lg
              "
            >
              {formatPrice(product.price)}
            </span>

            {product.oldPrice && (
              <span
                className="
                  truncate
                  text-[10px]
                  text-black/35
                  line-through
                  sm:text-xs
                  md:text-sm
                "
              >
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>

          {/* RATING */}
          <div
            className="
              flex
              items-center
              gap-1
              self-start
              text-[9px]
              text-black/55
              sm:self-auto
              sm:text-xs
            "
          >
            <Star
              size={11}
              className="fill-amber-400 text-amber-400 sm:h-3 sm:w-3"
            />

            <span>{product.rating}</span>

            <span className="text-black/40">
              ({product.reviews})
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

