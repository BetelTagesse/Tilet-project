import Image from "next/image";
import { formatPrice } from "@/lib/format";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    category: string;
    imageUrl: string | null;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="overflow-hidden rounded-xl border border-border bg-white">
      <div className="relative aspect-3/4 bg-tibeb-cream">
        {product.imageUrl && (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="object-cover"
          />
        )}
      </div>
      <div className="p-4">
        <p className="text-xs uppercase tracking-wide text-text-muted">
          {product.category}
        </p>
        <h2 className="mt-1 font-semibold">{product.name}</h2>
        <p className="mt-2 text-text-secondary">{formatPrice(product.price)}</p>
      </div>
    </article>
  );
}
