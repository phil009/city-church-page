"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useAnimation, useMotionValue } from "framer-motion";
import Image from "next/image";

// Simulated image data
const images = [
  {
    id: 1,
    url: "/images/choir/beejay-in-the-mood-crossover.jpg",
    alt: "Church event 1",
  },
  {
    id: 2,
    url: "/images/city-queens/dance-moves-display.jpg",
    alt: "Church event 2",
  },
  {
    id: 3,
    url: "/images/outdoors/first-impression-2.jpg",
    alt: "Church event 3",
  },
  {
    id: 4,
    url: "/images/pastors/daddy-t-in-blue.jpg",
    alt: "Church event 4",
  },
  {
    id: 5,
    url: "/images/choir/bernice-first-sunday-2.jpg",
    alt: "Church event 5",
  },
  {
    id: 6,
    url: "/images/congregation/evelyn-praising.jpg",
    alt: "Church event 6",
  },
  {
    id: 7,
    url: "/images/congregation/choir-section-dancing.jpg",
    alt: "Church event 6",
  },
  {
    id: 8,
    url: "/images/congregation/inem-vibing.jpg",
    alt: "Church event 6",
  },
  {
    id: 9,
    url: "/images/congregation/smiling-musicians-ugenlo-focus.jpg",
    alt: "Church event 6",
  },
  {
    id: 10,
    url: "/images/outdoors/tesman-walking-in.jpg",
    alt: "Church event 6",
  },
];

export default function HorizontalInfiniteGallery() {
  const [width, setWidth] = useState(0);
  const carousel = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const x = useMotionValue(0);

  useEffect(() => {
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
  }, []);

  useEffect(() => {
    const animate = async () => {
      await controls.start({
        x: -width,
        transition: { duration: 50, ease: "linear" },
      });
      controls.set({ x: 0 });
      animate();
    };

    animate();

    return () => controls.stop();
  }, [controls, width]);

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
              src={image.url || "/placeholder.svg"}
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
