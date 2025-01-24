"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  {
    id: 1,
    image: "/images/pastors/who-1.JPG",
    alt: "who we are",
  },
  {
    id: 2,
    image: "/images/pastors/who-2.jpg",
    alt: "who we are",
  },
  {
    id: 3,
    image: "/images/pastors/who-3.jpeg",
    alt: "who we are",
  },
  {
    id: 3,
    image: "/images/pastors/who-4.jpg",
    alt: "who we are",
  },
];

export const WhoWeAre = () => {
  const [[page, direction], setPage] = useState([0, 0]);

  const imageIndex = Math.abs(page % slides.length);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 3000);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 1000 : -1000,
      };
    },
    center: {
      zIndex: 1,
      x: 0,
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
      };
    },
  };
  return (
    <section className="px-4 sm:px-12 md:px-20 py-16 sm:py-24">
      <div className="flex flex-col md:flex-row items-center justify-center gap-12">
        <div className="w-full md:w-1/2 aspect-[10/13] overflow-hidden bg-appDark relative rounded-3xl max-w-lg">
          <AnimatePresence initial={false}>
            <motion.div
              key={page}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: {
                  duration: 0.5,
                },
              }}
              className="absolute inset-0"
            >
              <Image
                src={slides[imageIndex].image || "/placeholder.svg"}
                alt={slides[imageIndex].alt}
                fill
                style={{ objectFit: "cover" }}
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="md:w-1/2 grid sm:gap-4">
          <p className="text-appRed text-xl sm:text-3xl sm:mb-2">
            We are a living church
          </p>
          <h1 className="text-3xl md:text-7xl font-semibold mb-4">
            Get Ready for a shift in your life through the{" "}
            <span className="text-appRed">WORD</span>
          </h1>
          <p className="text-base sm:text-xl">
            A Life Development Church with practical teachings and loving
            relationships, led by Tony Aleogena-Raphael. <br />
            <br /> We are a Church with a heart for people who are far from
            Jesus and create environments that help them take their next steps
            towards Him. <br />
            <br /> We commit to members&apos; growth through regular worship
            services, educational programs, pastoral care, and community service
            opportunities. This dedication fosters a spiritually maturing
            congregation, enriching their faith journeys.
          </p>
        </div>
      </div>
    </section>
  );
};
