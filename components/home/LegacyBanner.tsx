import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function LegacyBanner() {
  return (
    <section className="mt-14 rounded-2xl bg-tibeb-green px-8 py-14 text-center text-white">
      <h2 className="font-display text-3xl font-semibold md:text-4xl">
        More Than Just Clothing
        <br />
        It&apos;s a Legacy.
      </h2>
      <Link
        href="/about"
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3
                   font-semibold text-tibeb-green transition hover:bg-tibeb-cream"
      >
        Explore Our Story <ArrowRight size={18} aria-hidden="true" />
      </Link>
    </section>
  );
}
