import type { StoreSettings } from "@/lib/types";

export default function Footer({ settings }: { settings: StoreSettings }) {
  return (
    <footer className="border-t border-nude/40 mt-24">
      <div className="mx-auto max-w-6xl px-6 py-14 flex flex-col items-center gap-3 text-center">
        <p className="font-script italic text-2xl text-terracotta">{settings.storeName}</p>
        <p className="text-sm text-graphite/70">{settings.address}</p>
        <div className="flex gap-6 text-sm text-graphite/70 mt-2">
          <a
            href={`https://wa.me/${settings.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-terracotta transition-colors"
          >
            WhatsApp
          </a>
          <a
            href={settings.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-terracotta transition-colors"
          >
            Instagram
          </a>
        </div>
        <p className="text-xs text-graphite/40 mt-6">
          © {new Date().getFullYear()} {settings.storeName}. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
