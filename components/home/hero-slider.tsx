"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Button } from "../ui/button";
import SocialLink, { SocialLinkProps } from "../social-links";

const socials: SocialLinkProps[] = [
  { href: "https://facebook.com/citychurchcalabar", type: "FB" },
  { href: "https://www.instagram.com/citychurchcalabar", type: "IG" },
  {
    href: "https://www.youtube.com/channel/UC24V2Whkpzyas-kbEgs-q4A",
    type: "YT",
  },
];

const slides = [
  {
    id: 1,
    image: "/images/pastors/daddy-t-hebrews-distant-view.jpg",
    alt: "Daddy T Hebrews",
    title: "Welcome to City Church Calabar",
    subtitle:
      "A Life Development Church with practical teachings and loving relationships, led by Tony Aleogena-Raphael",
    button: "Discover more",
  },
  {
    id: 2,
    image: "/images/pastors/daddy-t-hebrews-distant-view.jpg",
    alt: "Daddy T Hebrews",
    title: "Welcome to City Church Calabar",
    subtitle:
      "A Life Development Church with practical teachings and loving relationships, led by Tony Aleogena-Raphael",
    button: "Discover more",
  },
  {
    id: 3,
    image: "/images/slider/series-banner.jpg",
    alt: "Church service",
    title: "Life is a Journey",
    subtitle:
      "Join us to explore how to navigate life’s uncertainties and make the journey of life worthwhile through worship and fellowship. Every Sunday in January at 9:30 AM and 11:00 AM",
    button: "Other programs",
  },
  {
    id: 4,
    image: "/images/outdoors/dominion-and-friends-walking-in.jpg",
    alt: "Community outreach",
    title: "Serving Our Community",
    subtitle: "Making a difference together",
    button: "Discover more",
  },
];

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

export default function HomeHeroSlider() {
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

  return (
    <div className="relative min-h-[calc(100dvh-48px)] w-full overflow-hidden">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30, duration: 0.5 },
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
          <div className="absolute px-20 inset-0 bg-black bg-opacity-40 flex flex-col justify-center text-white">
            <h1 className="text-4xl md:text-8xl font-bold mb-4 max-w-[15ch]">
              {slides[imageIndex].title}
            </h1>
            <p className="text-xl md:text-3xl mb-6 max-w-[48ch]">
              {slides[imageIndex].subtitle}
            </p>
            <Button className="bg-appRed w-max h-12 text-xl p-4">
              {slides[imageIndex].button}
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="absolute bottom-4 left-0 z-10 right-0 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`h-1 w-8 rounded-full ${
              index === imageIndex ? "bg-white" : "bg-white bg-opacity-50"
            }`}
          />
        ))}
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 z-20 right-12 flex flex-col gap-4">
        {socials.map((link, index) => (
          <SocialLink key={index} href={link.href} type={link.type} />
        ))}
      </div>
    </div>
  );
}
