"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { whoWeAre1, whoWeAre2, whoWeAre3, whoWeAre4, whoWeAre5 } from "@/constants/AppImages";

const slides = [
    { id: 1, image: whoWeAre1, alt: "who we are" },
    { id: 2, image: whoWeAre2, alt: "who we are" },
    { id: 3, image: whoWeAre3, alt: "who we are" },
    { id: 4, image: whoWeAre4, alt: "who we are" },
    { id: 5, image: whoWeAre5, alt: "who we are" },
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
            <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
                <div className="w-full max-w-xl lg:w-2/3 aspect-[3/2] lg:aspect-[2/3] overflow-hidden bg-appDark relative rounded-3xl">
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
                                src={
                                    slides[imageIndex].image ||
                                    "/placeholder.svg"
                                }
                                alt={slides[imageIndex].alt}
                                fill
                                style={{ objectFit: "cover" }}
                                priority
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>
                <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-4 sm:space-y-6">
                    <p className="text-appRed font-semibold tracking-wider text-sm sm:text-base uppercase">
                        Who We Are
                    </p>
                    <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold leading-tight text-white">
                        We are a church family learning to follow Jesus and live His way.
                    </h2>
                    <div className="space-y-4 text-gray-200 text-sm sm:text-base leading-relaxed">
                        <p>
                            We believe church is more than a Sunday gathering. It is a place to know God, grow in faith, find community, discover purpose, and become the person God has called you to be.
                        </p>
                        <p>
                            For 16 years, we have been growing together, serving our city, and raising change agents who carry the love of Jesus into their homes, workplaces and communities.
                        </p>
                    </div>
                    <div className="pt-2">
                        <Link
                            href="/about"
                            className="inline-flex items-center gap-2 text-appRed hover:text-red-400 font-semibold text-base sm:text-lg group transition-colors"
                        >
                            <span>Learn More About Us</span>
                            <span className="transition-transform group-hover:translate-x-1">→</span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};
