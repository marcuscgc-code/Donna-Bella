import type { CartItem } from "@/lib/cart-context";
import { formatPrice } from "@/lib/format";

export function buildOrderMessage(
  items: CartItem[],
  total: number
): string {
  const productLines = items.map((item, index) => {
    const subtotal = formatPrice(item.price * item.quantity);

    return [
      `*${index + 1}. ${item.name}*`,
      `🎨 Cor: ${item.color}`,
      `📏 Tamanho: ${item.size}`,
      `📦 Quantidade: ${item.quantity}`,
      `💰 Subtotal: ${subtotal}`,
    ].join("\n");
  });

  const lines = [
    "Olá, senhora Enedina! 😊",
    "",
    "Gostaria de finalizar o seguinte pedido:",
    "",
    "🛍️ *RESUMO DO PEDIDO*",
    "",
    productLines.join("\n\n"),
    "",
    "━━━━━━━━━━━━━━━━━━",
    `💳 *TOTAL DO PEDIDO: ${formatPrice(total)}*`,
    "━━━━━━━━━━━━━━━━━━",
    "",
    "Poderia, por gentileza, confirmar a disponibilidade dos produtos e me informar as formas de pagamento e entrega?",
    "",
    "Aguardo seu retorno. Obrigado(a)! 💕",
  ];

  return lines.join("\n");
}

export function buildWhatsappUrl(
  whatsappNumber: string,
  message: string
): string {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}