import { notFound } from "next/navigation";
import ProductGallery from "@/components/ProductGallery";
import ProductActions from "@/components/ProductActions";
import ColorSwatch from "@/components/ColorSwatch";
import { formatPrice } from "@/lib/format";
import { getAllProducts, getColorHex, getProductBySlug } from "@/lib/products";

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const colorHex = getColorHex(product.color);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="grid sm:grid-cols-2 gap-12 lg:gap-20">
        <ProductGallery images={product.images} name={product.name} />

        <div className="max-w-md">
          <p className="text-xs tracking-widest uppercase text-graphite/50 mb-3">
            {product.category}
          </p>
          <h1 className="font-serif text-3xl text-graphite leading-snug">{product.name}</h1>
          <p className="mt-3 text-xl text-terracotta">{formatPrice(product.price)}</p>

          <div className="mt-4 flex items-center gap-2">
            <ColorSwatch hex={colorHex} name={product.color} size="md" />
            <span className="text-sm text-graphite/70">{product.color}</span>
          </div>

          <p className="mt-6 text-graphite/70 leading-relaxed">{product.description}</p>

          <div className="mt-10">
            <ProductActions product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
