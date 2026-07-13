import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import ColorSwatch from "@/components/ColorSwatch";

export default function ProductCard({ product, colorHex }: { product: Product; colorHex: string }) {
  return (
    <Link href={`/produto/${product.slug}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden bg-nude/20">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
        />
        {product.promotion && (
          <span className="absolute top-3 left-3 bg-cream/90 text-terracotta text-xs tracking-widest uppercase px-3 py-1">
            Promoção
          </span>
        )}
      </div>
      <div className="mt-4 space-y-1 text-center">
        <h3 className="font-serif text-lg text-graphite">{product.name}</h3>
        <p className="text-sm text-graphite/70">{formatPrice(product.price)}</p>
        <div className="flex items-center justify-center gap-1.5 pt-1">
          <ColorSwatch hex={colorHex} name={product.color} />
          <span className="text-xs text-graphite/50">{product.color}</span>
        </div>
        <span className="inline-block mt-2 text-xs tracking-widest uppercase text-terracotta group-hover:text-terracotta-dark transition-colors">
          Ver produto
        </span>
      </div>
    </Link>
  );
}
