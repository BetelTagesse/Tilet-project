import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/products/ProductCard";

const CATEGORIES = ["women", "men", "kids"] as const;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  // Only accept known categories; anything else shows everything
  const active = CATEGORIES.find((c) => c === category);

  const products = await prisma.product.findMany({
    where: { inStock: true, ...(active && { category: active }) },
    orderBy: { createdAt: "desc" },
    select: { id: true, name: true, price: true, category: true },
  });

  return (
    <main className="mx-auto max-w-6xl p-6">
      <h1 className="text-4xl font-semibold text-tibeb-green">Shop</h1>

      <nav className="mt-6 flex gap-2" aria-label="Filter by category">
        {[undefined, ...CATEGORIES].map((c) => (
          <Link
            key={c ?? "all"}
            href={c ? `/products?category=${c}` : "/products"}
            className={`rounded-full border px-4 py-2 text-sm capitalize ${
              c === active
                ? "border-tibeb-green bg-tibeb-green text-white"
                : "border-border text-text-secondary"
            }`}
          >
            {c ?? "all"}
          </Link>
        ))}
      </nav>

      {products.length === 0 ? (
        <p className="mt-10 text-text-secondary">No products found.</p>
      ) : (
        <ul className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-3">
          {products.map((p) => (
            <li key={p.id}>
              <ProductCard product={p} />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
