import { ButtonLink } from "@/components/Button";
import { getStoreSettings } from "@/lib/products";

export default function ContactPage() {
  const settings = getStoreSettings();
  const mapQuery = encodeURIComponent(settings.address);

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 text-center">
      <h1 className="font-script italic text-4xl text-terracotta mb-4">Fale conosco</h1>
      <p className="font-serif text-xl text-graphite">{settings.ownerName}</p>
      <p className="text-graphite/70 mt-1">{settings.address}</p>

      <div className="mt-8">
        <ButtonLink href={`https://wa.me/${settings.whatsappNumber}`} className="mx-auto">
          Conversar no WhatsApp
        </ButtonLink>
      </div>

      <div className="mt-16 aspect-video w-full overflow-hidden border border-graphite/10">
        <iframe
          src={`https://maps.google.com/maps?q=${mapQuery}&output=embed`}
          className="w-full h-full"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Localização da loja"
        />
      </div>
    </div>
  );
}
