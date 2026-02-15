// components/ministries/ministries-carousel.tsx
"use client";
import Autoplay from "embla-carousel-autoplay";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import { GenericCard } from "../home/generic-card";

interface Ministry {
    name: string;
    description: string;
    icon: string;
    head?: string | null;
    image?: string;
}

interface MinistriesCarouselProps {
    ministries: Ministry[];
}

export default function MinistriesCarousel({
    ministries,
}: MinistriesCarouselProps) {
    return (
        <div className="w-full">
            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                plugins={[
                    Autoplay({
                        delay: 2000,
                    }),
                ]}
                orientation="vertical"
                className="w-full max-w-sm mx-auto"
            >
                <CarouselContent className="-mt-1 h-screen">
                    {ministries.map((ministry, index) => (
                        <CarouselItem
                            key={index}
                            className="pt-1 md:basis-1/3"
                        >
                            <div className="p-1">
                                <GenericCard
                                    type="ministry"
                                    title={ministry.name}
                                    description={ministry.description}
                                    icon={ministry.icon}
                                    imageSrc={ministry.image}
                                    imageAlt={`${ministry.name} Image`}
                                />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    );
}
