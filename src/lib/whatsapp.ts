import type { CartItem } from "@/lib/cart-context";
import { formatPrice } from "@/lib/format";

export function buildOrderMessage(items: CartItem[], total: number): string {
  const lines = [
    "Olá! Gostaria de finalizar este pedido:",
    "",
    ...items.map((item) => {
      const subtotal = formatPrice(item.price * item.quantity);
      return `• ${item.name} — Cor: ${item.color}, Tamanho: ${item.size}, Qtd: ${item.quantity} — ${subtotal}`;
    }),
    "",
    `Total: ${formatPrice(total)}`,
  ];
  return lines.join("\n");
}

export function buildWhatsappUrl(whatsappNumber: string, message: string): string {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}
