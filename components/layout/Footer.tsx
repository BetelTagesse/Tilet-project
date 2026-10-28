import Link from "next/link";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="mt-20 bg-tibeb-green text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-2xl font-semibold">Tibeb</p>
          <p className="text-sm text-white/70">Ethiopian Traditional Wear</p>
        </div>
        <nav
          aria-label="Footer"
          className="flex flex-wrap gap-6 text-sm text-white/80"
        >
          {LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-white">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <p className="border-t border-white/15 px-6 py-4 text-center text-xs text-white/60">
        © {new Date().getFullYear()} Tibeb. All rights reserved.
      </p>
    </footer>
  );
}
