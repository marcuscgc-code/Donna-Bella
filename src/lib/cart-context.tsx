"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type CartItem = {
  slug: string;
  name: string;
  price: number;
  color: string;
  size: string;
  quantity: number;
  image: string;
};

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addItem: (item: CartItem) => void;
  updateQuantity: (key: string, quantity: number) => void;
  removeItem: (key: string) => void;
};

const STORAGE_KEY = "donna-bella-cart";

export function itemKey(item: Pick<CartItem, "slug" | "color" | "size">): string {
  return `${item.slug}__${item.color}__${item.size}`;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) setItems(JSON.parse(raw));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  function addItem(item: CartItem) {
    setItems((prev) => {
      const key = itemKey(item);
      const existing = prev.find((i) => itemKey(i) === key);
      if (existing) {
        return prev.map((i) => (itemKey(i) === key ? { ...i, quantity: i.quantity + item.quantity } : i));
      }
      return [...prev, item];
    });
  }

  function updateQuantity(key: string, quantity: number) {
    setItems((prev) =>
      prev.map((i) => (itemKey(i) === key ? { ...i, quantity: Math.max(1, quantity) } : i))
    );
  }

  function removeItem(key: string) {
    setItems((prev) => prev.filter((i) => itemKey(i) !== key));
  }

  const itemCount = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items]);
  const subtotal = useMemo(() => items.reduce((sum, i) => sum + i.quantity * i.price, 0), [items]);

  return (
    <CartContext.Provider value={{ items, itemCount, subtotal, addItem, updateQuantity, removeItem }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
