import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { CATEGORY_INFO, isCategory, toArray } from "@/lib/catalog";
import ProductCard from "@/components/products/ProductCard";
import ProductFilters from "@/components/products/ProductFilters";

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{
    size?: string | string[];
    color?: string | string[];
  }>;
}) {
  const { category } = await params;
  if (!isCategory(category)) notFound(); // /about, /cart, /nonsense end up here

  const query = await searchParams;
  const sizes = toArray(query.size);
  const colors = toArray(query.color);
  const info = CATEGORY_INFO[category];

  // Run both queries at once: the filtered products and the sidebar options
  const [products, options] = await Promise.all([
    prisma.product.findMany({
      where: {
        category,
        inStock: true,
        ...(sizes.length > 0 && { sizes: { hasSome: sizes } }),
        ...(colors.length > 0 && { colors: { hasSome: colors } }),
      },

      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        price: true,
        category: true,
        imageUrl: true,
      },
    }),
    prisma.product.findMany({
      where: { category, inStock: true },
      select: { sizes: true, colors: true },
    }),
  ]);

  const allSizes = [...new Set(options.flatMap((o) => o.sizes))];
  const allColors = [...new Set(options.flatMap((o) => o.colors))];

  return (
    <main className="mx-auto max-w-6xl p-6">
      <section className="rounded-2xl bg-tibeb-green px-8 py-14 text-white">
        <h1 className="font-display text-4xl font-semibold md:text-5xl">
          {info.title}
        </h1>
        <p className="mt-2 text-white/85">{info.tagline}</p>
      </section>

      <nav aria-label="Breadcrumb" className="mt-4 text-sm text-text-secondary">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <span aria-hidden="true"> › </span>
        <span>{info.title}</span>
      </nav>

      <div className="mt-8 grid gap-10 md:grid-cols-[220px_1fr]">
        <aside>
          <ProductFilters
            basePath={`/${category}`}
            sizes={allSizes}
            colors={allColors}
            selectedSizes={sizes}
            selectedColors={colors}
          />
        </aside>

        <section aria-label={`${info.title} products`}>
          {products.length === 0 ? (
            <p className="text-text-secondary">
              No products match these filters.
            </p>
          ) : (
            <ul className="grid grid-cols-2 gap-6 lg:grid-cols-3">
              {products.map((p) => (
                <li key={p.id}>
                  <ProductCard product={p} />
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
