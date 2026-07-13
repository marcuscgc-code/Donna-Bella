"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { Color, Product } from "@/lib/types";
import ProductCard from "@/components/ProductCard";
import ColorSwatch from "@/components/ColorSwatch";

type PriceRange = "" | "ate-100" | "100-200" | "acima-200";

const PRICE_RANGES: { value: PriceRange; label: string }[] = [
  { value: "", label: "Qualquer preço" },
  { value: "ate-100", label: "Até R$ 100" },
  { value: "100-200", label: "R$ 100 – 200" },
  { value: "acima-200", label: "Acima de R$ 200" },
];

function matchesPriceRange(price: number, range: PriceRange): boolean {
  if (range === "ate-100") return price <= 100;
  if (range === "100-200") return price > 100 && price <= 200;
  if (range === "acima-200") return price > 200;
  return true;
}

export default function CatalogGrid({
  products,
  categories,
  colors,
  sizes,
  tags,
}: {
  products: Product[];
  categories: string[];
  colors: Color[];
  sizes: string[];
  tags: string[];
}) {
  const searchParams = useSearchParams();
  const [category, setCategory] = useState(searchParams.get("categoria") ?? "");
  const [query, setQuery] = useState("");
  const [priceRange, setPriceRange] = useState<PriceRange>("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const colorHexByName = useMemo(
    () => Object.fromEntries(colors.map((c) => [c.nome, c.hex])),
    [colors]
  );

  function toggleTag(tag: string) {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  }

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = category ? p.category === category : true;
      const matchesQuery = query ? p.name.toLowerCase().includes(query.toLowerCase()) : true;
      const matchesPrice = matchesPriceRange(p.price, priceRange);
      const matchesColor = color ? p.color === color : true;
      const matchesSize = size ? p.sizes.includes(size) : true;
      const matchesTags = selectedTags.length ? selectedTags.every((t) => p.tags?.includes(t)) : true;
      return matchesCategory && matchesQuery && matchesPrice && matchesColor && matchesSize && matchesTags;
    });
  }, [products, category, query, priceRange, color, size, selectedTags]);

  const activeExtraFilters = [priceRange, color, size, ...selectedTags].filter(Boolean).length;

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-6 sm:items-center sm:justify-between mb-8">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setCategory("")}
            className={`px-4 py-2 text-sm border transition-colors ${
              category === ""
                ? "border-terracotta text-terracotta"
                : "border-graphite/20 text-graphite/70 hover:border-graphite/40"
            }`}
          >
            Todas
          </button>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-4 py-2 text-sm border transition-colors ${
                category === c
                  ? "border-terracotta text-terracotta"
                  : "border-graphite/20 text-graphite/70 hover:border-graphite/40"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar peça..."
          className="w-full sm:w-64 px-4 py-2 text-sm bg-transparent border border-graphite/20 placeholder:text-graphite/40 focus:outline-none focus:border-terracotta"
        />
      </div>

      <button
        onClick={() => setShowFilters((s) => !s)}
        className="text-xs tracking-widest uppercase text-graphite/60 hover:text-terracotta transition-colors mb-8"
      >
        {showFilters ? "Ocultar filtros" : "Mais filtros"}
        {activeExtraFilters > 0 ? ` (${activeExtraFilters})` : ""}
      </button>

      {showFilters && (
        <div className="mb-14 space-y-6 border-t border-b border-graphite/10 py-8">
          <div>
            <p className="text-xs tracking-widest uppercase text-graphite/50 mb-2">Preço</p>
            <div className="flex flex-wrap gap-2">
              {PRICE_RANGES.map((r) => (
                <button
                  key={r.value}
                  onClick={() => setPriceRange(r.value)}
                  className={`px-3 py-1.5 text-sm border transition-colors ${
                    priceRange === r.value
                      ? "border-terracotta text-terracotta"
                      : "border-graphite/20 text-graphite/70 hover:border-graphite/40"
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs tracking-widest uppercase text-graphite/50 mb-2">Cor</p>
            <div className="flex flex-wrap gap-3">
              {colors.map((c) => (
                <button
                  key={c.nome}
                  onClick={() => setColor((prev) => (prev === c.nome ? "" : c.nome))}
                  className={`flex items-center gap-1.5 px-2.5 py-1 border transition-colors ${
                    color === c.nome
                      ? "border-terracotta text-terracotta"
                      : "border-graphite/20 text-graphite/70 hover:border-graphite/40"
                  }`}
                >
                  <ColorSwatch hex={c.hex} name={c.nome} />
                  <span className="text-xs">{c.nome}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs tracking-widest uppercase text-graphite/50 mb-2">Tamanho</p>
            <div className="flex flex-wrap gap-2">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize((prev) => (prev === s ? "" : s))}
                  className={`w-10 h-10 text-sm border transition-colors ${
                    size === s
                      ? "border-terracotta text-terracotta"
                      : "border-graphite/20 text-graphite/70 hover:border-graphite/40"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {tags.length > 0 && (
            <div>
              <p className="text-xs tracking-widest uppercase text-graphite/50 mb-2">Tags</p>
              <div className="flex flex-wrap gap-2">
                {tags.map((t) => (
                  <button
                    key={t}
                    onClick={() => toggleTag(t)}
                    className={`px-3 py-1.5 text-sm border transition-colors ${
                      selectedTags.includes(t)
                        ? "border-terracotta text-terracotta"
                        : "border-graphite/20 text-graphite/70 hover:border-graphite/40"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="text-center text-graphite/60 py-16">Nenhuma peça encontrada.</p>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12">
          {filtered.map((product) => (
            <ProductCard key={product.slug} product={product} colorHex={colorHexByName[product.color] ?? "#CCCCCC"} />
          ))}
        </div>
      )}
    </div>
  );
}
