import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/products/ProductCard";

export default async function BestSellers() {
  // Stand-in: newest in-stock products. Swap for real sales data once orders exist.
  const products = await prisma.product.findMany({
    where: { inStock: true },
    orderBy: { createdAt: "desc" },
    take: 4,
    select: { id: true, name: true, price: true, category: true },
  });

  if (products.length === 0) return null;

  return (
    <section className="mt-14">
      <div className="flex items-end justify-between">
        <h2 className="font-display text-3xl font-semibold text-tibeb-green">
          Best Sellers
        </h2>
        <Link
          href="/products"
          className="inline-flex items-center gap-1 text-sm font-medium text-tibeb-green hover:underline"
        >
          View All <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>

      <ul className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-4">
        {products.map((p) => (
          <li key={p.id}>
            <ProductCard product={p} />
          </li>
        ))}
      </ul>
    </section>
  );
}
