export type Color = {
  nome: string;
  hex: string;
};

export type Product = {
  slug: string;
  name: string;
  price: number;
  description: string;
  category: string;
  color: string;
  sizes: string[];
  tags?: string[];
  images: string[];
  featured?: boolean;
  promotion?: boolean;
};

export type StoreSettings = {
  storeName: string;
  tagline: string;
  whatsappNumber: string;
  instagram: string;
  address: string;
  ownerName: string;
  heroImage: string;
  heroTitle: string;
  heroSubtitle: string;
};
