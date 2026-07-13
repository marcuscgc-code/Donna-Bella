import Image from "next/image";
import { ButtonLink } from "@/components/Button";
import ProductCard from "@/components/ProductCard";
import { getCategories, getColorHex, getFeaturedProducts, getStoreSettings } from "@/lib/products";

export default function Home() {
  const settings = getStoreSettings();
  const featured = getFeaturedProducts();
  const categories = getCategories();

  return (
    <div>
      <section className="relative h-[85vh] min-h-[560px] w-full overflow-hidden">
        <Image
          src={settings.heroImage}
          alt={settings.heroTitle}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-graphite/10" />
        <div className="relative h-full mx-auto max-w-6xl px-6 flex flex-col items-start justify-end pb-20">
          <h1 className="font-serif text-4xl sm:text-5xl text-graphite max-w-xl leading-tight">
            {settings.heroTitle}
          </h1>
          <p className="mt-4 text-graphite/80 max-w-md">{settings.heroSubtitle}</p>
          <ButtonLink href="/catalogo" className="mt-8">
            Ver coleção
          </ButtonLink>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="font-script italic text-3xl sm:text-4xl text-terracotta text-center mb-14">
          Destaques da estação
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12">
          {featured.map((product) => (
            <ProductCard key={product.slug} product={product} colorHex={getColorHex(product.color)} />
          ))}
        </div>
      </section>

      <section className="bg-nude/25 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-script italic text-3xl sm:text-4xl text-terracotta text-center mb-14">
            Categorias
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {categories.map((category) => (
              <a
                key={category}
                href={`/catalogo?categoria=${encodeURIComponent(category)}`}
                className="py-10 border border-graphite/15 bg-cream hover:border-terracotta transition-colors font-serif text-lg text-graphite"
              >
                {category}
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
