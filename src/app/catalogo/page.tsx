import { Suspense } from "react";
import CatalogGrid from "@/components/CatalogGrid";
import { getAllColors, getAllProducts, getCategories, getSizes, getTags } from "@/lib/products";

export default function CatalogPage() {
  const products = getAllProducts();
  const categories = getCategories();
  const colors = getAllColors();
  const sizes = getSizes();
  const tags = getTags();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="font-script italic text-4xl text-terracotta text-center mb-14">Catálogo</h1>
      <Suspense>
        <CatalogGrid products={products} categories={categories} colors={colors} sizes={sizes} tags={tags} />
      </Suspense>
    </div>
  );
}
