"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image, { type StaticImageData } from "next/image";
import { useInView } from "../../hooks/useInView";

interface PastorCardProps {
  name: string;
  position: string;
  images: {
    id: number;
    src: StaticImageData;
    alt: string;
  }[];
}

export const PastorCard = ({ name, position, images }: PastorCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const [ref, isInView] = useInView({ threshold: 0.5 });

  useEffect(() => {
    if (!isInView || isAnimationComplete) return;

    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => {
        if (prev === 2) {
          setIsAnimationComplete(true);
          clearInterval(timer);
        }
        return prev < 2 ? prev + 1 : prev;
      });
    }, 3000);

    return () => clearInterval(timer);
  }, [isInView, isAnimationComplete]);

  return (
    <div
      ref={ref}
      className="rounded-3xl bg-appDark overflow-hidden relative aspect-[3/4] w-full max-w-64"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 0, scale: 1.2 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          className="relative w-full h-full"
        >
          <Image
            src={images[currentImageIndex].src || "/placeholder.svg"}
            alt={images[currentImageIndex].alt}
            fill
            className="object-cover"
            priority
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-appDark/90 to-transparent" />

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h3 className="text-base sm:text-2xl font-bold sm:mb-2">{name}</h3>
            <p className="text-gray-300 text-sm">{position}</p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Progress Indicator */}
      {!isAnimationComplete && isInView && (
        <div className="absolute top-4 left-4 right-4 flex gap-2">
          {images.map((_, index) => (
            <div
              key={index}
              className={`h-1 rounded-full flex-1 transition-all duration-500 ${
                index <= currentImageIndex ? "bg-white" : "bg-white/30"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
