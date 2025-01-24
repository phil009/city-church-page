import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface GlobalHeroProps {
  backgroundImage: string | StaticImageData;
  title: string;
  breadcrumbs: BreadcrumbItem[];
}

export const GlobalHero: React.FC<GlobalHeroProps> = ({
  backgroundImage,
  title,
  breadcrumbs,
}) => {
  return (
    <div className="relative min-h-[calc(100dvh-240px)] sm:min-h-[calc(100dvh-200px)] md:min-h-[calc(100dvh-100px)] w-full overflow-hidden">
      <div className="absolute inset-0 flex items-end">
        <Image
          src={backgroundImage || "/placeholder.svg"}
          alt={`${title} background`}
          fill
          style={{ objectFit: "cover" }}
          priority
          className=""
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-appDark opacity-70 z-10" />
        <div className="absolute bottom-0 right-0 h-full -skew-x-12 bg-gradient-to-t from-white/40 to-transparent z-10 w-1/3 opacity-55" />
        <div className="relative z-20 px-4 sm:px-12 md:px-20 py-16 sm:py-24 text-white">
          <nav aria-label="Breadcrumb">
            <ol className="flex gap-3 text-sm sm:text-xl mb-2">
              {breadcrumbs?.map((item, index) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                  {index < breadcrumbs.length - 1 && (
                    <span className="text-appRed ml-3">{">"}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          <h1 className="font-bold text-2xl sm:text-4xl md:text-5xl">
            {title}
          </h1>
        </div>
      </div>
    </div>
  );
};
