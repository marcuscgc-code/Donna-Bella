"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart, itemKey } from "@/lib/cart-context";
import { formatPrice } from "@/lib/format";
import { buildOrderMessage, buildWhatsappUrl } from "@/lib/whatsapp";
import { Button, ButtonLink } from "@/components/Button";

export default function CartView({ whatsappNumber }: { whatsappNumber: string }) {
  const { items, subtotal, updateQuantity, removeItem } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-24 text-center">
        <h1 className="font-serif text-3xl text-graphite mb-4">Sua sacola está vazia</h1>
        <p className="text-graphite/70 mb-8">Explore o catálogo e encontre peças para você.</p>
        <ButtonLink href="/catalogo">Ver catálogo</ButtonLink>
      </div>
    );
  }

  function handleCheckout() {
    const message = buildOrderMessage(items, subtotal);
    window.open(buildWhatsappUrl(whatsappNumber, message), "_blank", "noopener,noreferrer");
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-serif text-3xl text-graphite mb-10">Sua sacola</h1>

      <ul className="divide-y divide-graphite/10">
        {items.map((item) => {
          const key = itemKey(item);
          return (
            <li key={key} className="py-6 flex gap-5">
              <div className="relative w-20 aspect-[3/4] bg-nude/20 overflow-hidden shrink-0">
                <Image src={item.image} alt={item.name} fill className="object-cover" />
              </div>

              <div className="flex-1">
                <div className="flex justify-between gap-4">
                  <div>
                    <Link href={`/produto/${item.slug}`} className="font-serif text-lg text-graphite hover:text-terracotta">
                      {item.name}
                    </Link>
                    <p className="text-sm text-graphite/60 mt-1">
                      Cor: {item.color} · Tamanho: {item.size}
                    </p>
                  </div>
                  <p className="text-graphite whitespace-nowrap">{formatPrice(item.price * item.quantity)}</p>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-3 border border-graphite/20 w-fit">
                    <button
                      onClick={() => updateQuantity(key, item.quantity - 1)}
                      className="w-9 h-9 text-graphite/70 hover:text-terracotta"
                      aria-label="Diminuir quantidade"
                    >
                      −
                    </button>
                    <span className="w-5 text-center text-sm">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(key, item.quantity + 1)}
                      className="w-9 h-9 text-graphite/70 hover:text-terracotta"
                      aria-label="Aumentar quantidade"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(key)}
                    className="text-xs tracking-wide uppercase text-graphite/50 hover:text-terracotta transition-colors"
                  >
                    Remover
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="mt-10 pt-6 border-t border-graphite/10 flex items-center justify-between">
        <span className="font-serif text-xl text-graphite">Total</span>
        <span className="font-serif text-xl text-terracotta">{formatPrice(subtotal)}</span>
      </div>

      <Button onClick={handleCheckout} className="w-full mt-8">
        Finalizar no WhatsApp
      </Button>
    </div>
  );
}
