import fs from "fs";
import path from "path";
import type { Color, Product, StoreSettings } from "./types";

const PRODUCTS_DIR = path.join(process.cwd(), "content", "produtos");
const SETTINGS_PATH = path.join(process.cwd(), "content", "loja.json");
const COLORS_DIR = path.join(process.cwd(), "content", "cores");

export function getAllProducts(): Product[] {
  const files = fs.readdirSync(PRODUCTS_DIR).filter((f) => f.endsWith(".json"));
  return files
    .map((file) => JSON.parse(fs.readFileSync(path.join(PRODUCTS_DIR, file), "utf-8")) as Product)
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getFeaturedProducts(): Product[] {
  return getAllProducts().filter((p) => p.featured);
}

export function getProductBySlug(slug: string): Product | undefined {
  return getAllProducts().find((p) => p.slug === slug);
}

export function getCategories(): string[] {
  return Array.from(new Set(getAllProducts().map((p) => p.category)));
}

export function getSizes(): string[] {
  return Array.from(new Set(getAllProducts().flatMap((p) => p.sizes))).sort();
}

export function getTags(): string[] {
  return Array.from(new Set(getAllProducts().flatMap((p) => p.tags ?? []))).sort();
}

export function getAllColors(): Color[] {
  const files = fs.readdirSync(COLORS_DIR).filter((f) => f.endsWith(".json"));
  return files
    .map((file) => JSON.parse(fs.readFileSync(path.join(COLORS_DIR, file), "utf-8")) as Color)
    .sort((a, b) => a.nome.localeCompare(b.nome));
}

export function getColorHex(name: string): string {
  return getAllColors().find((c) => c.nome === name)?.hex ?? "#CCCCCC";
}

export function getStoreSettings(): StoreSettings {
  return JSON.parse(fs.readFileSync(SETTINGS_PATH, "utf-8")) as StoreSettings;
}
