import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <p className="section-kicker">Dermot Cox Counselling</p>
      <h1 className="mt-3 font-display text-5xl text-forest">This page is not here</h1>
      <p className="mt-6 max-w-xl text-xl leading-relaxed">
        The counselling practice has a single page. You can return there and move between the
        sections from the menu.
      </p>
      <Link href="/" className="text-link mt-8 inline-block text-lg">
        Back to the homepage
      </Link>
    </main>
  );
}
