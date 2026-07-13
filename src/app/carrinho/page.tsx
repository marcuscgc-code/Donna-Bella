import CartView from "@/components/CartView";
import { getStoreSettings } from "@/lib/products";

export default function CartPage() {
  const settings = getStoreSettings();
  return <CartView whatsappNumber={settings.whatsappNumber} />;
}
