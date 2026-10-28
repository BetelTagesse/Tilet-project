import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative isolate min-h-[420px] overflow-hidden rounded-2xl md:min-h-[560px]">
      {/* Background image */}
      <Image
        src="/products/tibeb-1.webp"
        alt="Traditional Ethiopian Tibeb clothing"
        fill
        priority
        sizes="(max-width: 768px) 100vw, 1200px"
        className="object-cover object-center"
      />

      {/* Subtle overlay */}
      <div aria-hidden="true" className="absolute inset-0 bg-black/40" />

      {/* Shop button */}
      <div className="relative max-w-xl px-8 py-20 md:px-14 md:py-28">
        <h1 className="font-display text-4xl font-semibold leading-tight md:text-6xl">
          Timeless Ethiopian Heritage
        </h1>
        <p className="mt-4 text-white/85">
          Authentic Tibeb. Woven with culture. Worn with pride.
        </p>
        <Link
          href="/products"
          className=" mt-4 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3
                     font-semibold text-tibeb-green transition hover:bg-tibeb-cream"
        >
          Shop Now
          <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
