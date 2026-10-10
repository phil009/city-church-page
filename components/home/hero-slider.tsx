"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import SocialLink, { SocialLinkProps } from "../social-links";
import Link from "next/link";
import { heroSliderDaddyT, watchBg, heroSliderNextGen } from "@/constants/AppImages";

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
        image: heroSliderDaddyT,
        alt: "Worship at City Church Calabar",
        eyebrow: "WELCOME TO CITY CHURCH",
        title: "Know Jesus. Find Community. Become a Change Agent.",
        subtitle:
            "A church family where people can grow in their relationship with Jesus, build meaningful relationships, and live out their influence wherever God has placed them.",
        primaryCta: {
            text: "Plan Your Visit",
            href: "/plan-your-visit",
        },
        secondaryCta: {
            text: "Watch a Sermon",
            href: "/live",
        },
        tertiaryLink: {
            text: "I'm New Here →",
            href: "/plan-your-visit",
        },
    },
    {
        id: 2,
        image: heroSliderNextGen,
        alt: "Raising Change Agents",
        eyebrow: "OUR IDENTITY & CALLING",
        title: "Raising Change Agents",
        subtitle:
            "We believe God can use ordinary people to make an extraordinary difference. You don't have to be famous or have everything figured out—you can be salt and light right where you are.",
        primaryCta: {
            text: "Plan Your Visit",
            href: "/plan-your-visit",
        },
        secondaryCta: {
            text: "Watch a Sermon",
            href: "/live",
        },
        tertiaryLink: {
            text: "Learn More About Us →",
            href: "/about",
        },
    },
    {
        id: 3,
        image: watchBg,
        alt: "Teaching and Community",
        eyebrow: "REVELATION & PRACTICAL TEACHING",
        title: "We Teach in Series",
        subtitle:
            "Each month, we dive deep into biblical principles through engaging teachings designed to equip you to live out your faith from Monday to Saturday.",
        primaryCta: {
            text: "Watch Latest Message",
            href: "/live",
        },
        secondaryCta: {
            text: "Plan Your Visit",
            href: "/plan-your-visit",
        },
        tertiaryLink: {
            text: "Find a Small Group →",
            href: "/small-groups",
        },
    },
];

const variants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
    }),
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
    },
    exit: (direction: number) => ({
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
    }),
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
        }, 7000);

        return () => clearInterval(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    const currentSlide = slides[imageIndex];

    return (
        <div className="relative min-h-[calc(100dvh-48px)] w-full overflow-hidden bg-appDark">
            <AnimatePresence initial={false} custom={direction}>
                <motion.div
                    key={page}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.4 },
                    }}
                    className="absolute inset-0"
                >
                    <Image
                        src={currentSlide.image || "/placeholder.svg"}
                        alt={currentSlide.alt}
                        fill
                        style={{ objectFit: "cover" }}
                        priority
                    />
                    {/* Gradient Overlay for high legibility */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />

                    {/* Hero Content */}
                    <div className="relative h-full flex flex-col justify-center pt-28 pb-24 sm:py-16 px-6 sm:px-12 md:px-20 lg:px-24 text-white z-10 max-w-5xl">
                        {/* Eyebrow badge */}
                        <div className="mb-3 sm:mb-4">
                            <span className="inline-block text-xs sm:text-sm font-bold tracking-widest text-appRed uppercase bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-appRed/30">
                                {currentSlide.eyebrow}
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-4 sm:mb-6 max-w-[22ch] leading-[1.15]">
                            {currentSlide.title}
                        </h1>

                        {/* Subtitle */}
                        <p className="text-sm sm:text-lg md:text-xl text-gray-200 mb-8 max-w-[46ch] leading-relaxed">
                            {currentSlide.subtitle}
                        </p>

                        {/* Action buttons */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-6">
                            <Link
                                href={currentSlide.primaryCta.href}
                                className="bg-appRed hover:bg-red-700 text-white font-semibold text-center text-sm sm:text-base px-6 py-3.5 rounded-full shadow-lg transition-transform hover:-translate-y-0.5 active:translate-y-0"
                            >
                                {currentSlide.primaryCta.text}
                            </Link>

                            <Link
                                href={currentSlide.secondaryCta.href}
                                className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 font-semibold text-center text-sm sm:text-base px-6 py-3.5 rounded-full transition-transform hover:-translate-y-0.5 active:translate-y-0"
                            >
                                {currentSlide.secondaryCta.text}
                            </Link>
                        </div>

                        {/* Secondary Link */}
                        <div>
                            <Link
                                href={currentSlide.tertiaryLink.href}
                                className="inline-flex items-center text-sm sm:text-base font-medium text-gray-300 hover:text-white transition-colors underline-offset-4 hover:underline"
                            >
                                {currentSlide.tertiaryLink.text}
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Slide Indicators */}
            <div className="absolute bottom-6 left-6 sm:left-12 md:left-20 z-20 flex items-center space-x-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setPage([index, index > imageIndex ? 1 : -1])}
                        aria-label={`Go to slide ${index + 1}`}
                        className={`h-2 rounded-full transition-all duration-300 ${
                            index === imageIndex
                                ? "w-8 bg-appRed"
                                : "w-2 bg-white/50 hover:bg-white"
                        }`}
                    />
                ))}
            </div>

            {/* Social Links on Desktop */}
            <div className="absolute bottom-6 right-6 md:right-12 md:bottom-auto md:top-1/2 md:-translate-y-1/2 z-20 flex md:flex-col gap-3">
                {socials.map((link, index) => (
                    <SocialLink
                        key={index}
                        href={link.href}
                        type={link.type}
                    />
                ))}
            </div>
        </div>
    );
}
