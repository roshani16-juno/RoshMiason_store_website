import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-32 text-center">
      <p className="font-display text-8xl text-amber-700">404</p>
      <h1 className="mt-4 font-display text-3xl">Page not found</h1>
      <Link href="/" className="mt-8 inline-block bg-stone-900 px-8 py-4 text-sm uppercase tracking-widest text-white">
        Back to Home
      </Link>
    </div>
  );
}