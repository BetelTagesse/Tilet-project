import Link from "next/link";
import { ArrowRight } from "lucide-react";

const CATEGORIES = [
  { href: "/women", label: "Women" },
  { href: "/men", label: "Men" },
  { href: "/kids", label: "Kids" },
];

export default function CategoryCards() {
  return (
    <section
      aria-label="Shop by category"
      className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3"
    >
      {CATEGORIES.map((c) => (
        <Link
          key={c.href}
          href={c.href}
          className="relative flex aspect-[4/3] items-end overflow-hidden rounded-xl bg-tibeb-green p-5"
        >
          {/* Category photo goes here later */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"
          />
          <div className="relative text-white">
            <h2 className="font-display text-2xl font-semibold">{c.label}</h2>
            <span className="mt-1 inline-flex items-center gap-1 text-sm">
              Shop Now <ArrowRight size={16} aria-hidden="true" />
            </span>
          </div>
        </Link>
      ))}
    </section>
  );
}
