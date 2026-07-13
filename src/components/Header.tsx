"use client";

import Link from "next/link";
import type { StoreSettings } from "@/lib/types";
import { useCart } from "@/lib/cart-context";

export default function Header({ settings }: { settings: StoreSettings }) {
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-10 bg-cream/90 backdrop-blur-sm border-b border-nude/40">
      <div className="mx-auto max-w-6xl px-6 py-5 flex items-center justify-between">
        <Link href="/" className="font-script italic text-3xl text-terracotta tracking-wide">
          {settings.storeName}
        </Link>

        <nav className="hidden sm:flex items-center gap-8 font-sans text-sm tracking-wide text-graphite/80">
          <Link href="/catalogo" className="hover:text-terracotta transition-colors">
            Catálogo
          </Link>
          <Link href="/contato" className="hover:text-terracotta transition-colors">
            Contato
          </Link>
        </nav>

        <Link
          href="/carrinho"
          className="font-sans text-sm tracking-wide text-graphite/80 hover:text-terracotta transition-colors"
        >
          Sacola{itemCount > 0 ? ` (${itemCount})` : ""}
        </Link>
      </div>
    </header>
  );
}
