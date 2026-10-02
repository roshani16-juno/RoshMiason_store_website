"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  Heart,
  Star,
  Truck,
  RefreshCw,
  ShieldCheck,
  Minus,
  Plus,
  ShoppingBag,
  Check,
  ChevronRight,
  ArrowLeft,
  Lock,
  Sparkles,
} from "lucide-react";
import { getProduct, getProducts, formatPrice } from "@/lib/api";
import { useStore } from "@/context/StoreContext";
import ProductCard from "@/components/ProductCard";

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 25,
  },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.07,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const paymentBadges = [
  {
    icon: Truck,
    title: "Free Delivery",
    subtitle: "On orders above ₹2,999",
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    subtitle: "30-day return policy",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payment",
    subtitle: "100% protected checkout",
  },
];

export default function ProductPage() {
  const { id } = useParams();

  const { addToCart, toggleWishlist, isWished } = useStore();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [size, setSize] = useState("");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("description");

  // --------------------------------------------------
  // 3D IMAGE TILT
  // --------------------------------------------------

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(my, [-0.5, 0.5], [5, -5]),
    {
      stiffness: 160,
      damping: 20,
    }
  );

  const rotateY = useSpring(
    useTransform(mx, [-0.5, 0.5], [-5, 5]),
    {
      stiffness: 160,
      damping: 20,
    }
  );

  const onMove = (e) => {
    if (window.innerWidth < 768) return;

    const rect = e.currentTarget.getBoundingClientRect();

    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  // --------------------------------------------------
  // FETCH PRODUCT
  // --------------------------------------------------

  useEffect(() => {
    setLoading(true);
    setSize("");
    setQty(1);
    setAdded(false);
    setError("");

    getProduct(id).then(async (p) => {
      setProduct(p);
      setLoading(false);

      if (p) {
        const all = await getProducts({
          category: p.category,
        });

        setRelated(
          all
            .filter((x) => x.id !== p.id)
            .slice(0, 4)
        );
      }
    });
  }, [id]);

  // --------------------------------------------------
  // BACKGROUND
  // --------------------------------------------------

  const Background = () => (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#faf8f5]">
      <div className="absolute -left-32 top-0 h-80 w-80 rounded-full bg-fuchsia-200/25 blur-[110px]" />

      <div className="absolute right-[-120px] top-[20%] h-[30rem] w-[30rem] rounded-full bg-amber-200/25 blur-[120px]" />

      <div className="absolute bottom-[-150px] left-[35%] h-96 w-96 rounded-full bg-rose-200/20 blur-[110px]" />
    </div>
  );

  // --------------------------------------------------
  // LOADING
  // --------------------------------------------------

  if (loading) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-[#faf8f5] px-4 pb-20 pt-24 sm:px-6 md:px-8 md:pt-32">
        <Background />

        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 md:gap-12">
          {/* Image skeleton */}
          <div className="overflow-hidden rounded-[2rem] border border-white/80 bg-white/60 p-2 shadow-xl backdrop-blur-xl sm:p-3">
            <div className="aspect-[4/5] animate-pulse rounded-[1.5rem] bg-stone-200/70 sm:aspect-[3/4]" />
          </div>

          {/* Content skeleton */}
          <div className="space-y-5 pt-2 md:pt-8">
            <div className="h-4 w-28 animate-pulse rounded-full bg-stone-200" />

            <div className="h-12 w-4/5 animate-pulse rounded-xl bg-stone-200 md:h-16" />

            <div className="h-20 animate-pulse rounded-2xl bg-stone-200" />

            <div className="h-32 animate-pulse rounded-2xl bg-stone-200" />

            <div className="h-14 w-full animate-pulse rounded-2xl bg-stone-200" />
          </div>
        </div>
      </main>
    );
  }

  // --------------------------------------------------
  // NOT FOUND
  // --------------------------------------------------

  if (!product) {
    return (
      <main className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-[#faf8f5] px-5">
        <Background />

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="w-full max-w-md rounded-[2rem] border border-white/80 bg-white/70 p-8 text-center shadow-[0_25px_80px_rgba(70,50,30,0.1)] backdrop-blur-xl sm:p-12"
        >
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-amber-100 via-rose-100 to-fuchsia-100">
            <ShoppingBag
              size={30}
              strokeWidth={1.4}
              className="text-stone-700"
            />
          </div>

          <p className="mt-7 text-[10px] uppercase tracking-[0.3em] text-amber-700">
            Maison
          </p>

          <h1 className="mt-3 font-display text-3xl text-stone-900">
            Product not found
          </h1>

          <p className="mt-3 text-sm leading-6 text-stone-500">
            The product you're looking for may have been removed or is
            currently unavailable.
          </p>

          <Link
            href="/shop"
            className="group mt-7 inline-flex items-center gap-3 rounded-xl bg-stone-900 px-7 py-3.5 text-xs uppercase tracking-[0.18em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-700"
          >
            <ArrowLeft size={15} />
            Back to Shop
          </Link>
        </motion.div>
      </main>
    );
  }

  // --------------------------------------------------
  // ADD TO CART
  // --------------------------------------------------

  const handleAdd = () => {
    if (!size) {
      setError("Please select a size");
      return;
    }

    setError("");

    addToCart(product, size, qty);

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 2000);
  };

  // --------------------------------------------------
  // PRICE
  // --------------------------------------------------

  const discount = product.oldPrice
    ? Math.round(
        (1 - product.price / product.oldPrice) * 100
      )
    : 0;

  // --------------------------------------------------
  // TABS
  // --------------------------------------------------

  const tabs = {
    description:
      product.description ||
      "A beautifully crafted Maison essential designed for effortless everyday style.",

    details:
      "Premium breathable fabric • Tailored modern fit • Machine washable • Designed for all-day comfort.",

    shipping:
      "Free delivery in 3–5 business days. 30-day hassle-free returns and exchanges on all orders.",
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#faf8f5] pb-24 pt-24 text-stone-900 md:pb-16 md:pt-32">
      <Background />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        {/* ==================================================
            BREADCRUMB
        ================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: -10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="mb-7 flex items-center gap-1.5 overflow-hidden text-[10px] uppercase tracking-[0.18em] text-stone-400 sm:mb-10 sm:text-xs"
        >
          <Link
            href="/"
            className="shrink-0 transition-colors hover:text-stone-900"
          >
            Home
          </Link>

          <ChevronRight size={12} />

          <Link
            href="/shop"
            className="shrink-0 transition-colors hover:text-stone-900"
          >
            Shop
          </Link>

          <ChevronRight size={12} />

          <span className="truncate text-stone-700">
            {product.name}
          </span>
        </motion.div>

        {/* ==================================================
            PRODUCT SECTION
        ================================================== */}

        <div className="grid items-start gap-8 md:grid-cols-2 md:gap-10 lg:gap-16">
          {/* ==================================================
              PRODUCT IMAGE
          ================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.75,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              perspective: 1200,
            }}
            className="md:sticky md:top-28"
          >
            <motion.div
              onMouseMove={onMove}
              onMouseLeave={onLeave}
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
              className="relative rounded-[2rem] border border-white/90 bg-white/65 p-2 shadow-[0_25px_80px_rgba(70,50,30,0.1)] backdrop-blur-xl sm:p-3"
            >
              <div className="group relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-stone-100 sm:aspect-[3/4] sm:rounded-[1.7rem]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover object-center transition duration-700 ease-out group-hover:scale-[1.045]"
                />

                {/* Image overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/5" />

                {/* Discount */}
                {discount > 0 && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      scale: 0.7,
                      rotate: -10,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      rotate: 0,
                    }}
                    transition={{
                      delay: 0.4,
                      type: "spring",
                      stiffness: 250,
                      damping: 16,
                    }}
                    className="absolute left-4 top-4 rounded-full bg-gradient-to-r from-amber-300 via-rose-400 to-fuchsia-500 px-3.5 py-2 text-[10px] font-bold uppercase tracking-wider text-stone-900 shadow-lg sm:left-5 sm:top-5 sm:px-4"
                  >
                    {discount}% Off
                  </motion.div>
                )}

                {/* Wishlist on image */}
                <motion.button
                  whileTap={{
                    scale: 0.85,
                  }}
                  onClick={() => toggleWishlist(product)}
                  aria-label="Add to wishlist"
                  className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-white/70 text-stone-700 shadow-lg backdrop-blur-xl transition hover:bg-white sm:right-5 sm:top-5"
                >
                  <motion.span
                    key={String(isWished(product.id))}
                    initial={{
                      scale: 0.4,
                    }}
                    animate={{
                      scale: 1,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 15,
                    }}
                  >
                    <Heart
                      size={19}
                      strokeWidth={1.7}
                      className={
                        isWished(product.id)
                          ? "fill-rose-500 text-rose-500"
                          : "text-stone-700"
                      }
                    />
                  </motion.span>
                </motion.button>

                {/* Rating */}
                <motion.div
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 4,
                    ease: "easeInOut",
                  }}
                  className="absolute bottom-4 left-4 flex items-center gap-2 rounded-2xl border border-white/30 bg-black/30 px-3.5 py-2.5 text-xs text-white shadow-xl backdrop-blur-xl sm:bottom-5 sm:left-5"
                >
                  <Star
                    size={15}
                    className="fill-amber-300 text-amber-300"
                  />

                  <span className="font-semibold">
                    {product.rating}
                  </span>

                  <span className="text-white/60">
                    ({product.reviews})
                  </span>
                </motion.div>
              </div>
            </motion.div>

            {/* Image caption */}
            <div className="mt-4 hidden items-center justify-center gap-2 text-[10px] uppercase tracking-[0.2em] text-stone-400 md:flex">
              <Sparkles size={12} />
              Crafted for everyday elegance
            </div>
          </motion.div>

          {/* ==================================================
              PRODUCT INFORMATION
          ================================================== */}

          <motion.div
            initial="hidden"
            animate="show"
            className="min-w-0"
          >
            {/* Category */}
            <motion.p
              custom={0}
              variants={fadeUp}
              className="text-[10px] font-semibold uppercase tracking-[0.35em] text-amber-700 sm:text-xs"
            >
              {product.category}
            </motion.p>

            {/* Title */}
            <motion.h1
              custom={1}
              variants={fadeUp}
              className="mt-3 max-w-2xl font-display text-3xl leading-[1.08] text-stone-900 sm:text-4xl md:text-5xl lg:text-6xl"
            >
              {product.name}
            </motion.h1>

            {/* Rating mobile */}
            <motion.div
              custom={1}
              variants={fadeUp}
              className="mt-4 flex items-center gap-2 md:hidden"
            >
              <div className="flex items-center gap-1">
                <Star
                  size={14}
                  className="fill-amber-500 text-amber-500"
                />

                <span className="text-sm font-semibold">
                  {product.rating}
                </span>
              </div>

              <span className="text-xs text-stone-400">
                {product.reviews} reviews
              </span>
            </motion.div>

            {/* Price Card */}
            <motion.div
              custom={2}
              variants={fadeUp}
              className="mt-6 rounded-2xl border border-white/90 bg-white/65 p-4 shadow-[0_12px_40px_rgba(70,50,30,0.05)] backdrop-blur-xl sm:p-5"
            >
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="font-display text-3xl text-stone-900 sm:text-4xl">
                  {formatPrice(product.price)}
                </span>

                {product.oldPrice && (
                  <span className="text-base text-stone-400 line-through sm:text-lg">
                    {formatPrice(product.oldPrice)}
                  </span>
                )}

                {discount > 0 && (
                  <span className="rounded-full bg-rose-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-rose-600">
                    Save {discount}%
                  </span>
                )}
              </div>

              <div className="mt-3 flex items-center gap-2 text-xs text-emerald-600">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                In stock & ready to ship
              </div>
            </motion.div>

            {/* ==================================================
                TABS
            ================================================== */}

            <motion.div
              custom={3}
              variants={fadeUp}
              className="mt-6 rounded-2xl border border-white/90 bg-white/60 p-4 shadow-sm backdrop-blur-xl sm:p-5"
            >
              <div className="relative flex gap-5 overflow-x-auto border-b border-stone-200 text-xs sm:gap-7 sm:text-sm">
                {Object.keys(tabs).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTab(t)}
                    className={`relative shrink-0 pb-3 capitalize transition-colors ${
                      tab === t
                        ? "font-medium text-stone-900"
                        : "text-stone-400 hover:text-stone-700"
                    }`}
                  >
                    {t}

                    {tab === t && (
                      <motion.span
                        layoutId="product-tab"
                        className="absolute inset-x-0 -bottom-px h-0.5 bg-gradient-to-r from-amber-500 via-rose-500 to-fuchsia-500"
                      />
                    )}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.p
                  key={tab}
                  initial={{
                    opacity: 0,
                    y: 8,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -8,
                  }}
                  transition={{
                    duration: 0.25,
                  }}
                  className="pt-4 text-sm leading-6 text-stone-500"
                >
                  {tabs[tab]}
                </motion.p>
              </AnimatePresence>
            </motion.div>

            {/* ==================================================
                SIZE
            ================================================== */}

            <motion.div
              custom={4}
              variants={fadeUp}
              className="mt-7"
            >
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-700">
                  Select Size
                </p>

                <span className="text-[10px] text-stone-400">
                  {size
                    ? `Selected: ${size}`
                    : "Choose your size"}
                </span>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {product.sizes.map((s) => {
                  const selected = size === s;

                  return (
                    <motion.button
                      key={s}
                      type="button"
                      whileHover={{
                        y: -2,
                      }}
                      whileTap={{
                        scale: 0.94,
                      }}
                      onClick={() => {
                        setSize(s);
                        setError("");
                      }}
                      className={`relative flex h-12 min-w-12 items-center justify-center overflow-hidden rounded-xl border px-4 text-sm transition-all duration-300 ${
                        selected
                          ? "border-stone-900 bg-stone-900 text-white shadow-lg"
                          : "border-stone-200 bg-white/70 text-stone-700 hover:border-stone-400 hover:bg-white"
                      }`}
                    >
                      {selected && (
                        <motion.span
                          layoutId="selected-size"
                          className="absolute inset-0 bg-stone-900"
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 30,
                          }}
                        />
                      )}

                      <span className="relative font-medium">
                        {s}
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{
                      opacity: 0,
                      x: -8,
                    }}
                    animate={{
                      opacity: 1,
                      x: [0, -5, 5, -3, 3, 0],
                    }}
                    exit={{
                      opacity: 0,
                    }}
                    className="mt-3 text-xs font-medium text-rose-600"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            {/* ==================================================
                QUANTITY + CART
            ================================================== */}

            <motion.div
              custom={5}
              variants={fadeUp}
              className="mt-7 flex gap-2.5 sm:gap-3"
            >
              {/* Quantity */}
              <div className="flex h-14 shrink-0 items-center rounded-xl border border-stone-200 bg-white/75 shadow-sm">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() =>
                    setQty(Math.max(1, qty - 1))
                  }
                  className="flex h-full w-11 items-center justify-center text-stone-500 transition hover:text-stone-900 sm:w-12"
                >
                  <Minus size={15} />
                </button>

                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={qty}
                    initial={{
                      y: -8,
                      opacity: 0,
                    }}
                    animate={{
                      y: 0,
                      opacity: 1,
                    }}
                    exit={{
                      y: 8,
                      opacity: 0,
                    }}
                    className="w-6 text-center text-sm font-semibold text-stone-900"
                  >
                    {qty}
                  </motion.span>
                </AnimatePresence>

                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => setQty(qty + 1)}
                  className="flex h-full w-11 items-center justify-center text-stone-500 transition hover:text-stone-900 sm:w-12"
                >
                  <Plus size={15} />
                </button>
              </div>

              {/* Add to cart */}
              <motion.button
                type="button"
                whileHover={{
                  y: -2,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                onClick={handleAdd}
                className={`group flex h-14 min-w-0 flex-1 items-center justify-center gap-2 rounded-xl px-4 text-xs font-semibold uppercase tracking-[0.13em] text-stone-900 shadow-lg transition-all duration-300 sm:text-sm sm:tracking-[0.16em] ${
                  added
                    ? "bg-gradient-to-r from-emerald-300 to-teal-400 shadow-emerald-200"
                    : "bg-gradient-to-r from-amber-300 via-rose-400 to-fuchsia-500 shadow-rose-200"
                }`}
              >
                <AnimatePresence mode="wait">
                  {added ? (
                    <motion.span
                      key="added"
                      initial={{
                        opacity: 0,
                        scale: 0.8,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.8,
                      }}
                      className="flex items-center gap-2"
                    >
                      <Check size={17} />
                      Added to Cart
                    </motion.span>
                  ) : (
                    <motion.span
                      key="add"
                      initial={{
                        opacity: 0,
                      }}
                      animate={{
                        opacity: 1,
                      }}
                      exit={{
                        opacity: 0,
                      }}
                      className="flex items-center gap-2"
                    >
                      <ShoppingBag size={17} />
                      Add to Cart
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Wishlist */}
              <motion.button
                type="button"
                whileTap={{
                  scale: 0.85,
                }}
                onClick={() => toggleWishlist(product)}
                aria-label="Wishlist"
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-stone-200 bg-white/75 text-stone-600 shadow-sm transition hover:border-stone-300 hover:bg-white"
              >
                <motion.span
                  key={String(isWished(product.id))}
                  initial={{
                    scale: 0.5,
                  }}
                  animate={{
                    scale: 1,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 450,
                    damping: 14,
                  }}
                >
                  <Heart
                    size={20}
                    strokeWidth={1.6}
                    className={
                      isWished(product.id)
                        ? "fill-rose-500 text-rose-500"
                        : ""
                    }
                  />
                </motion.span>
              </motion.button>
            </motion.div>

            {/* ==================================================
                TRUST FEATURES
            ================================================== */}

            <motion.div
              custom={6}
              variants={fadeUp}
              className="mt-7 grid grid-cols-1 gap-3 min-[400px]:grid-cols-3"
            >
              {paymentBadges.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="group rounded-2xl border border-white/90 bg-white/60 p-4 text-center shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/80"
                  >
                    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-100 via-rose-100 to-fuchsia-100">
                      <Icon
                        size={18}
                        strokeWidth={1.6}
                        className="text-stone-700"
                      />
                    </div>

                    <p className="mt-3 text-[11px] font-semibold text-stone-800">
                      {item.title}
                    </p>

                    <p className="mt-1 text-[9px] leading-4 text-stone-400">
                      {item.subtitle}
                    </p>
                  </div>
                );
              })}
            </motion.div>

            {/* Secure note */}
            <motion.div
              custom={7}
              variants={fadeUp}
              className="mt-5 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.14em] text-stone-400"
            >
              <Lock size={12} />
              Secure & protected checkout
            </motion.div>
          </motion.div>
        </div>

        {/* ==================================================
            RELATED PRODUCTS
        ================================================== */}

        {related.length > 0 && (
          <motion.section
            initial={{
              opacity: 0,
              y: 40,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              margin: "-80px",
            }}
            transition={{
              duration: 0.7,
            }}
            className="mt-24 sm:mt-28 md:mt-36"
          >
            <div className="text-center">
              <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-amber-700 sm:text-xs">
                Curated for you
              </p>

              <h2 className="mt-3 font-display text-3xl text-stone-900 sm:text-4xl md:text-5xl">
                You May Also Like
              </h2>

              <p className="mx-auto mt-3 max-w-md text-xs leading-5 text-stone-400 sm:text-sm">
                Discover more pieces selected to complement your style.
              </p>
            </div>

            <div className="mt-8 rounded-[2rem] border border-white/90 bg-white/45 p-4 shadow-[0_20px_60px_rgba(70,50,30,0.05)] backdrop-blur-xl sm:mt-10 sm:p-6 md:p-8">
              <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 sm:gap-y-10 md:grid-cols-4">
                {related.map((p, i) => (
                  <motion.div
                    key={p.id}
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
                    }}
                    transition={{
                      delay: i * 0.08,
                      duration: 0.5,
                    }}
                    className="min-w-0"
                  >
                    <ProductCard product={p} />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        )}
      </div>

      {/* ==================================================
          MOBILE STICKY CART BAR
      ================================================== */}

      <motion.div
        initial={{
          y: 100,
        }}
        animate={{
          y: 0,
        }}
        transition={{
          delay: 0.8,
          duration: 0.5,
        }}
        className="fixed inset-x-3 bottom-3 z-40 flex items-center gap-3 rounded-2xl border border-white/80 bg-white/85 p-2.5 shadow-[0_15px_50px_rgba(50,40,30,0.15)] backdrop-blur-2xl md:hidden"
      >
        <div className="min-w-0 flex-1 pl-2">
          <p className="text-[9px] uppercase tracking-[0.18em] text-stone-400">
            Total
          </p>

          <p className="truncate font-display text-lg text-stone-900">
            {formatPrice(product.price * qty)}
          </p>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className={`flex h-12 items-center justify-center gap-2 rounded-xl px-5 text-[10px] font-bold uppercase tracking-[0.12em] text-stone-900 shadow-md transition-all ${
            added
              ? "bg-gradient-to-r from-emerald-300 to-teal-400"
              : "bg-gradient-to-r from-amber-300 via-rose-400 to-fuchsia-500"
          }`}
        >
          {added ? (
            <>
              <Check size={15} />
              Added
            </>
          ) : (
            <>
              <ShoppingBag size={15} />
              Add to Cart
            </>
          )}
        </button>
      </motion.div>
    </main>
  );
}

