import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-24 bg-[#171513] text-stone-300">

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">

        <div className="grid gap-12 md:grid-cols-4">

          {/* Brand */}
          <div className="md:pr-8">
            <Link href="/" className="group inline-block">
              <div
                className="
                  bg-gradient-to-r
                  from-amber-700
                  via-amber-400
                  to-yellow-600
                  bg-clip-text
                  font-serif
                  leading-none
                  text-transparent
                  transition-all
                  duration-300
                  group-hover:from-amber-500
                  group-hover:via-yellow-300
                  group-hover:to-amber-500
                "
              >
                <span className="text-3xl font-bold tracking-[-0.07em]">
                  Rosh
                </span>
                <span className="ml-1 text-2xl font-medium italic tracking-[-0.05em]">
                  Maison
                </span>
              </div>
            </Link>

            <div className="mt-5 h-px w-20 bg-gradient-to-r from-amber-600 to-transparent" />

            <p className="mt-5 max-w-xs text-sm leading-7 text-stone-400">
              Timeless pieces, crafted with care. Fashion that feels as good
              as it looks.
            </p>

            <p className="mt-5 text-xs uppercase tracking-[0.25em] text-amber-500/80">
              Designed for timeless living
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4
              className="
                mb-5
                bg-gradient-to-r
                from-amber-300
                to-yellow-600
                bg-clip-text
                text-sm
                font-semibold
                uppercase
                tracking-[0.2em]
                text-transparent
              "
            >
              Shop
            </h4>

            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/shop"
                  className="transition-colors duration-300 hover:text-amber-400"
                >
                  Shop All
                </Link>
              </li>

              <li>
                <Link
                  href="/shop?category=Men"
                  className="transition-colors duration-300 hover:text-amber-400"
                >
                  Men
                </Link>
              </li>

              <li>
                <Link
                  href="/shop?category=Women"
                  className="transition-colors duration-300 hover:text-amber-400"
                >
                  Women
                </Link>
              </li>

              <li>
                <Link
                  href="/shop?category=Accessories"
                  className="transition-colors duration-300 hover:text-amber-400"
                >
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4
              className="
                mb-5
                bg-gradient-to-r
                from-amber-300
                to-yellow-600
                bg-clip-text
                text-sm
                font-semibold
                uppercase
                tracking-[0.2em]
                text-transparent
              "
            >
              Help
            </h4>

            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/contact"
                  className="transition-colors duration-300 hover:text-amber-400"
                >
                  Contact Us
                </Link>
              </li>

              <li>
                <Link
                  href="/account"
                  className="transition-colors duration-300 hover:text-amber-400"
                >
                  Track Order
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className="transition-colors duration-300 hover:text-amber-400"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  href="/privacy"
                  className="transition-colors duration-300 hover:text-amber-400"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4
              className="
                mb-5
                bg-gradient-to-r
                from-amber-300
                to-yellow-600
                bg-clip-text
                text-sm
                font-semibold
                uppercase
                tracking-[0.2em]
                text-transparent
              "
            >
              Stay in Style
            </h4>

            <p className="mb-5 text-sm leading-6 text-stone-400">
              Subscribe for new arrivals, exclusive pieces and special offers.
            </p>

            <div className="flex overflow-hidden rounded-sm border border-stone-700 bg-stone-900/70 transition-all duration-300 focus-within:border-amber-600">
              <input
                type="email"
                placeholder="Your email"
                className="
                  min-w-0
                  flex-1
                  bg-transparent
                  px-4
                  py-3
                  text-sm
                  text-white
                  placeholder:text-stone-500
                  outline-none
                "
              />

              <button
                className="
                  bg-gradient-to-r
                  from-amber-700
                  via-amber-600
                  to-yellow-600
                  px-5
                  text-sm
                  font-semibold
                  text-white
                  transition-all
                  duration-300
                  hover:from-amber-600
                  hover:via-yellow-500
                  hover:to-amber-500
                "
              >
                Join
              </button>
            </div>

            <p className="mt-3 text-[11px] text-stone-500">
              By subscribing, you agree to receive updates from RoshMaison.
            </p>
          </div>
        </div>

        {/* Decorative Line */}
        <div className="mt-14 h-px bg-gradient-to-r from-transparent via-amber-700/50 to-transparent" />

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 pt-6 text-xs text-stone-500 md:flex-row">

          <p>
            © {new Date().getFullYear()}{" "}
            <span className="text-amber-600">RoshMaison</span>.
            All rights reserved.
          </p>

          <div className="flex gap-6">
            <Link
              href="/terms"
              className="transition-colors hover:text-amber-400"
            >
              Terms
            </Link>

            <Link
              href="/privacy"
              className="transition-colors hover:text-amber-400"
            >
              Privacy
            </Link>

            <Link
              href="/contact"
              className="transition-colors hover:text-amber-400"
            >
              Contact
            </Link>
          </div>

        </div>
      </div>
    </footer>
  );
}
