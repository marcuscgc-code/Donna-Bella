import type { Metadata } from "next";
import Script from "next/script";
import { Cormorant_Garamond, Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getStoreSettings } from "@/lib/products";
import { CartProvider } from "@/lib/cart-context";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["italic", "normal"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Donna Bella — Moda Feminina",
  description: "Catálogo de moda feminina elegante e atemporal. Finalize seu pedido pelo WhatsApp.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = getStoreSettings();

  return (
    <html
      lang="pt-BR"
      className={`${cormorant.variable} ${playfair.variable} ${inter.variable} h-full`}
    >
      <body className="min-h-full flex flex-col font-sans antialiased">
        <CartProvider>
          <Header settings={settings} />
          <main className="flex-1">{children}</main>
          <Footer settings={settings} />
        </CartProvider>
        <Script src="https://identity.netlify.com/v1/netlify-identity-widget.js" strategy="afterInteractive" />
        <Script id="netlify-identity-redirect" strategy="afterInteractive">
          {`
            if (window.netlifyIdentity) {
              window.netlifyIdentity.on("init", (user) => {
                if (!user) {
                  window.netlifyIdentity.on("login", () => {
                    document.location.href = "/admin/";
                  });
                }
              });
            }
          `}
        </Script>
      </body>
    </html>
  );
}
