"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useAnimation, useMotionValue } from "framer-motion";
import Image from "next/image";
import {
    homeGallery1,
    homeGallery2,
    homeGallery3,
    homeGallery4,
    homeGallery5,
    homeGallery6,
    homeGallery7,
    homeGallery8,
    homeGallery9,
    homeGallery10,
    homeGallery11,
    homeGallery12,
    homeGallery13,
    homeGallery14,
    homeGallery15,
    homeGallery16,
    homeGallery17,
    homeGallery18,
} from "@/constants/AppImages";

const images = [
    { id: 1,  url: homeGallery1,  alt: "City Church gallery" },
    { id: 2,  url: homeGallery2,  alt: "City Church gallery" },
    { id: 3,  url: homeGallery3,  alt: "City Church gallery" },
    { id: 4,  url: homeGallery4,  alt: "City Church gallery" },
    { id: 5,  url: homeGallery5,  alt: "City Church gallery" },
    { id: 6,  url: homeGallery6,  alt: "City Church gallery" },
    { id: 7,  url: homeGallery7,  alt: "City Church gallery" },
    { id: 8,  url: homeGallery8,  alt: "City Church gallery" },
    { id: 9,  url: homeGallery9,  alt: "City Church gallery" },
    { id: 10, url: homeGallery10, alt: "City Church gallery" },
    { id: 11, url: homeGallery11, alt: "City Church gallery" },
    { id: 12, url: homeGallery12, alt: "City Church gallery" },
    { id: 13, url: homeGallery13, alt: "City Church gallery" },
    { id: 14, url: homeGallery14, alt: "City Church gallery" },
    { id: 15, url: homeGallery15, alt: "City Church gallery" },
    { id: 16, url: homeGallery16, alt: "City Church gallery" },
    { id: 17, url: homeGallery17, alt: "City Church gallery" },
    { id: 18, url: homeGallery18, alt: "City Church gallery" },
];

export default function HorizontalInfiniteGallery() {
    const [width, setWidth] = useState(0);
    const carousel = useRef<HTMLDivElement>(null);
    const controls = useAnimation();
    const x = useMotionValue(0);
    const isMounted = useRef(false);

    useEffect(() => {
        if (carousel.current) {
            setWidth(
                carousel.current.scrollWidth - carousel.current.offsetWidth,
            );
        }
    }, []);

    useEffect(() => {
        isMounted.current = true;

        const animate = async () => {
            if (!isMounted.current) return;
            await controls.start({
                x: -width,
                transition: { duration: 50, ease: "linear" },
            });
            if (isMounted.current) {
                controls.set({ x: 0 });
                animate();
            }
        };

        animate();

        return () => {
            isMounted.current = false;
            controls.stop();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDragEnd = () => {
        const currentX = x.get();
        if (currentX > 0) {
            controls.set({ x: -width + currentX });
        } else if (currentX < -width) {
            controls.set({ x: width + currentX });
        }
    };

    return (
        <div
            className="overflow-hidden cursor-grab active:cursor-grabbing"
            aria-label="Image gallery"
        >
            <motion.div
                ref={carousel}
                className="flex"
                drag="x"
                dragConstraints={{ right: 0, left: -width }}
                animate={controls}
                style={{ x }}
                onDragEnd={handleDragEnd}
            >
                {[...images, ...images].map((image, index) => (
                    <motion.div
                        key={`${image.id}-${index}`}
                        className="min-w-[300px] aspect-[3/4] p-2"
                    >
                        <Image
                            src={image.url}
                            alt={image.alt}
                            width={300}
                            height={200}
                            className="w-full h-full object-cover rounded-lg pointer-events-none"
                        />
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
