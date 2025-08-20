import Image from "next/image";
import { getCatalogHeroData } from "@/lib/sanityApi";

interface InspireHeroProps {
  id: string;
}

const InspireHero = async ({ id }: InspireHeroProps) => {
  const data = await getCatalogHeroData(id);
  if (!data) return null;

  return (
    <section className="relative w-full h-[80vh] flex items-center justify-center text-white">
      {/* Бэкграунд: видео или изображение */}
      {data.video ? (
        <video
          src={data.video}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          
          poster={data.image.src}
          width={600}
          height={300}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : data.image ? (
        <Image
          src={data.image}
          alt={data.title || "Inspire Hero"}
          fill
          className="object-cover object-center"
          priority
        />
      ) : null}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Centered Text */}
      <div className="relative z-10 max-w-3xl text-center px-4">
        {data.smallTitle && (
          <span className="text-sm sm:text-base font-medium tracking-wide uppercase text-white/80 block mb-4">
            {data.smallTitle}
          </span>
        )}
        <h2 className="text-3xl sm:text-5xl font-bold font-serif mb-6 leading-tight">
          {data.title}
        </h2>
        {data.subtitle && (
          <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
            {data.subtitle}
          </p>
        )}
      </div>
    </section>
  );
};

export default InspireHero; 