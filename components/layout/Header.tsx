import Link from "next/link";
import { ShoppingBag, User } from "lucide-react";
import { auth, signOut } from "@/auth";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop" },
  { href: "/women", label: "Women" },
  { href: "/men", label: "Men" },
  { href: "/kids", label: "Kids" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export default async function Header() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <Link href="/" className="leading-tight">
          <span className="block font-display text-2xl font-semibold text-tibeb-green">
            Tibeb
          </span>
          <span className="block text-[11px] text-text-muted">
            Ethiopian Traditional Wear
          </span>
        </Link>

        <nav
          aria-label="Main"
          className="hidden items-center gap-6 text-sm text-text-secondary md:flex"
        >
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:text-tibeb-green"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {session?.user ? (
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
            >
              <button
                type="submit"
                className="text-sm text-text-secondary hover:text-tibeb-green"
              >
                Sign out
              </button>
            </form>
          ) : (
            <Link
              href="/sign-in"
              aria-label="Sign in"
              className="text-text-secondary hover:text-tibeb-green"
            >
              <User size={20} />
            </Link>
          )}
          <Link
            href="/cart"
            aria-label="Cart"
            className="text-text-secondary hover:text-tibeb-green"
          >
            <ShoppingBag size={20} />
          </Link>
        </div>
      </div>
    </header>
  );
}
