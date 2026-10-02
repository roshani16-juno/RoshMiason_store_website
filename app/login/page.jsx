"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  LockKeyhole,
  Mail,
  User,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";

export default function LoginPage() {
  const [mode, setMode] = useState("login");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { login } = useStore();
  const router = useRouter();

  const set = (k) => (e) =>
    setForm({
      ...form,
      [k]: e.target.value,
    });

  const submit = (e) => {
    e.preventDefault();

    // Dummy auth - koi real check nahi
    login({
      name: form.name || form.email.split("@")[0],
      email: form.email,
    });

    router.push("/account");
  };

  const isLogin = mode === "login";

  return (
    <main className="relative flex min-h-screen items-center overflow-hidden bg-[#faf8f5] px-4 py-12 sm:px-6 md:px-8">
      {/* ==================================================
          BACKGROUND DECORATION
      ================================================== */}

      <div className="pointer-events-none absolute left-[-180px] top-[-100px] h-96 w-96 rounded-full bg-amber-200/25 blur-[120px]" />

      <div className="pointer-events-none absolute right-[-180px] top-[20%] h-[30rem] w-[30rem] rounded-full bg-rose-200/20 blur-[130px]" />

      <div className="pointer-events-none absolute bottom-[-150px] left-[30%] h-96 w-96 rounded-full bg-fuchsia-200/15 blur-[120px]" />

      {/* ==================================================
          MAIN CARD
      ================================================== */}

      <div className="relative mx-auto w-full max-w-5xl">
        <div className="grid overflow-hidden rounded-[2rem] border border-white/80 bg-white/55 shadow-[0_30px_100px_rgba(70,50,30,0.10)] backdrop-blur-2xl md:grid-cols-2 md:rounded-[2.5rem]">
          {/* ==================================================
              LEFT BRAND PANEL
          ================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              x: -30,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.65,
            }}
            className="
              relative
              hidden
              min-h-[620px]
              overflow-hidden
              bg-stone-900
              p-10
              text-white
              md:flex
              md:flex-col
              md:justify-between
              lg:p-12
            "
          >
            {/* Decorative circles */}
            <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full border border-white/10" />

            <div className="pointer-events-none absolute -bottom-28 -left-20 h-72 w-72 rounded-full border border-white/10" />

            <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400/10 blur-[80px]" />

            <div className="relative">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-amber-300">
                <Sparkles size={13} />
                Maison
              </div>

              <h2 className="mt-8 max-w-sm font-display text-5xl leading-[1.05] lg:text-6xl">
                Style that
                <br />
                stays with you.
              </h2>

              <p className="mt-6 max-w-sm text-sm leading-7 text-white/55">
                Discover timeless pieces designed for
                effortless elegance, everyday comfort and
                your personal style.
              </p>
            </div>

            {/* Bottom info */}
            <div className="relative">
              <div className="mb-6 h-px w-full bg-white/10" />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-display text-2xl">
                    500+
                  </p>
                  <p className="mt-1 text-[9px] uppercase tracking-[0.2em] text-white/40">
                    Styles
                  </p>
                </div>

                <div>
                  <p className="font-display text-2xl">
                    10K+
                  </p>
                  <p className="mt-1 text-[9px] uppercase tracking-[0.2em] text-white/40">
                    Customers
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ==================================================
              FORM PANEL
          ================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              x: 30,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.65,
              delay: 0.05,
            }}
            className="
              flex
              min-h-[600px]
              flex-col
              justify-center
              px-5
              py-10
              sm:px-10
              sm:py-12
              lg:px-14
            "
          >
            {/* Mobile brand */}
            <div className="mb-8 text-center md:hidden">
              <div className="flex items-center justify-center gap-2 text-[9px] uppercase tracking-[0.35em] text-amber-700">
                <Sparkles size={12} />
                Maison
              </div>
            </div>

            {/* Heading */}
            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -10,
                }}
                transition={{
                  duration: 0.25,
                }}
              >
                <p className="text-center text-[9px] font-medium uppercase tracking-[0.3em] text-stone-400">
                  {isLogin
                    ? "Welcome to Maison"
                    : "Join the Maison"}
                </p>

                <h1 className="mt-2 text-center font-display text-4xl text-stone-900 sm:text-5xl">
                  {isLogin
                    ? "Welcome Back"
                    : "Create Account"}
                </h1>

                <p className="mx-auto mt-3 max-w-sm text-center text-xs leading-5 text-stone-500 sm:text-sm">
                  {isLogin
                    ? "Sign in to access your account, orders and wishlist."
                    : "Create your account and start building your personal collection."}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* FORM */}
            <form
              onSubmit={submit}
              className="mx-auto mt-8 w-full max-w-md space-y-4 sm:mt-9"
            >
              {/* NAME */}
              <AnimatePresence initial={false}>
                {!isLogin && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      height: 0,
                      y: -8,
                    }}
                    animate={{
                      opacity: 1,
                      height: "auto",
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      height: 0,
                      y: -8,
                    }}
                    className="overflow-hidden"
                  >
                    <div className="relative">
                      <User
                        size={16}
                        strokeWidth={1.6}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
                      />

                      <input
                        required
                        placeholder="Full Name"
                        value={form.name}
                        onChange={set("name")}
                        className="
                          h-13
                          w-full
                          rounded-xl
                          border
                          border-stone-200
                          bg-white/60
                          pl-11
                          pr-4
                          text-sm
                          text-stone-900
                          outline-none
                          transition-all
                          placeholder:text-stone-400
                          focus:border-amber-500
                          focus:bg-white
                          focus:ring-4
                          focus:ring-amber-100/50
                        "
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* EMAIL */}
              <div className="relative">
                <Mail
                  size={16}
                  strokeWidth={1.6}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
                />

                <input
                  required
                  type="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={set("email")}
                  className="
                    h-13
                    w-full
                    rounded-xl
                    border
                    border-stone-200
                    bg-white/60
                    pl-11
                    pr-4
                    text-sm
                    text-stone-900
                    outline-none
                    transition-all
                    placeholder:text-stone-400
                    focus:border-amber-500
                    focus:bg-white
                    focus:ring-4
                    focus:ring-amber-100/50
                  "
                />
              </div>

              {/* PASSWORD */}
              <div className="relative">
                <LockKeyhole
                  size={16}
                  strokeWidth={1.6}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
                />

                <input
                  required
                  type="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={set("password")}
                  className="
                    h-13
                    w-full
                    rounded-xl
                    border
                    border-stone-200
                    bg-white/60
                    pl-11
                    pr-4
                    text-sm
                    text-stone-900
                    outline-none
                    transition-all
                    placeholder:text-stone-400
                    focus:border-amber-500
                    focus:bg-white
                    focus:ring-4
                    focus:ring-amber-100/50
                  "
                />
              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                className="
                  group
                  flex
                  h-13
                  w-full
                  items-center
                  justify-center
                  gap-3
                  rounded-xl
                  bg-stone-900
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  text-white
                  shadow-lg
                  transition-all
                  duration-300
                  hover:bg-amber-700
                  hover:shadow-xl
                  active:scale-[0.99]
                "
              >
                {isLogin ? "Login" : "Create Account"}

                <ArrowRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </form>

            {/* SWITCH MODE */}
            <div className="mt-7 text-center">
              <p className="text-xs text-stone-500">
                {isLogin
                  ? "New to Maison?"
                  : "Already have an account?"}
              </p>

              <button
                type="button"
                onClick={() =>
                  setMode(isLogin ? "register" : "login")
                }
                className="
                  mt-1
                  text-xs
                  font-semibold
                  text-amber-700
                  underline
                  underline-offset-4
                  transition
                  hover:text-amber-900
                "
              >
                {isLogin
                  ? "Create your account"
                  : "Login to your account"}
              </button>
            </div>

            {/* SECURITY */}
            <div className="mx-auto mt-8 flex max-w-md items-center justify-center gap-2 border-t border-stone-200/70 pt-6 text-center">
              <ShieldCheck
                size={14}
                strokeWidth={1.5}
                className="text-emerald-600"
              />

              <p className="text-[9px] uppercase tracking-[0.12em] text-stone-400">
                Your information is kept secure
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom text */}
        <p className="mt-5 text-center text-[9px] uppercase tracking-[0.25em] text-stone-400">
          Fashion changes. Style remains.
        </p>
      </div>
    </main>
  );
}
