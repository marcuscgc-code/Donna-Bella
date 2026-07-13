"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/Button";

export default function ProductActions({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [size, setSize] = useState(product.sizes[0] ?? "");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    addItem({
      slug: product.slug,
      name: product.name,
      price: product.price,
      color: product.color,
      size,
      quantity,
      image: product.images[0],
    });
    setAdded(true);
  }

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs tracking-widest uppercase text-graphite/50 mb-2">Tamanho</p>
        <div className="flex gap-2">
          {product.sizes.map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={`w-11 h-11 text-sm border transition-colors ${
                s === size
                  ? "border-terracotta text-terracotta"
                  : "border-graphite/20 text-graphite/70 hover:border-graphite/40"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs tracking-widest uppercase text-graphite/50 mb-2">Quantidade</p>
        <div className="flex items-center gap-4 border border-graphite/20 w-fit">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="w-10 h-10 text-graphite/70 hover:text-terracotta"
            aria-label="Diminuir quantidade"
          >
            −
          </button>
          <span className="w-6 text-center">{quantity}</span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="w-10 h-10 text-graphite/70 hover:text-terracotta"
            aria-label="Aumentar quantidade"
          >
            +
          </button>
        </div>
      </div>

      <Button onClick={handleAddToCart} className="w-full sm:w-auto">
        {added ? "Adicionado ✓" : "Adicionar ao carrinho"}
      </Button>
    </div>
  );
}
