"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="relative aspect-[3/4] bg-nude/20 overflow-hidden">
        <Image src={images[active]} alt={name} fill priority className="object-cover" />
      </div>
      {images.length > 1 && (
        <div className="mt-4 flex gap-3">
          {images.map((img, i) => (
            <button
              key={img}
              onClick={() => setActive(i)}
              className={`relative w-20 aspect-[3/4] overflow-hidden border ${
                i === active ? "border-terracotta" : "border-transparent"
              }`}
              aria-label={`Ver imagem ${i + 1} de ${name}`}
            >
              <Image src={img} alt="" fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
