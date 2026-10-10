"use client";
import { GenericCard } from "./generic-card";
import { motion } from "framer-motion";
import Link from "next/link";
import {
    introMinisterEvelyn,
    introPtWordByRevelation,
    congregationBelievers,
    introJuniorChurch,
} from "@/constants/AppImages";

const services = [
    {
        title: "Refreshing Worship",
        text: "We create a space where our congregation can come together to connect with God, strengthen their faith, and find spiritual renewal and inspiration. It's a central aspect of Christian community life and practice.",
        icon: "mdi:music-note",
        image: introMinisterEvelyn,
    },
    {
        title: "Word by Revelation",
        text: "The Word helps you deepen your understanding of the Bible and its teachings. It provides spiritual nourishment, guidance, and a sense of community among church members.",
        icon: "mdi:book-open-page-variant",
        image: introPtWordByRevelation,
    },
    {
        title: "Believers' Community",
        text: "We believe regular fellowship and worship within a Christian community are important for mutual edification, encouragement, and spiritual growth.",
        icon: "mdi:account-group",
        image: congregationBelievers,
    },
    {
        title: "The Junior Church",
        text: "Our involvement of children in church helps to nurture their spiritual development, teach them about their faith, and foster a sense of belonging and community.",
        icon: "mdi:seed-outline",
        image: introJuniorChurch,
    },
];

export const Introduction = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    return (
        <section className="px-4 sm:px-12 md:px-20 py-16 bg-appOffWhite text-zinc-900">
            <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <p className="text-appRed font-semibold tracking-wider text-sm sm:text-base uppercase">
                        Welcome to
                    </p>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-900">
                        City Church Calabar
                    </h2>
                </div>
                <p className="max-w-[42ch] text-base sm:text-lg text-zinc-600 leading-relaxed">
                    A welcoming church family learning to follow Jesus, find community, and live out His love in every sphere of life.
                </p>
            </div>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
                {services.map((service, index) => (
                    <GenericCard
                        key={index}
                        type="info"
                        title={service.title}
                        description={service.text}
                        icon={service.icon}
                        imageSrc={service.image}
                        imageAlt="Pictures"
                    />
                ))}
            </motion.div>

            {/* Standardized Service Times & Location Callout */}
            <div className="mt-16 bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-zinc-200/80 flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="space-y-3 text-center lg:text-left max-w-2xl">
                    <span className="inline-block text-xs font-bold text-appRed tracking-widest uppercase bg-red-50 px-3 py-1 rounded-full">
                        Join Us This Week
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-zinc-900">
                        Sundays at The Big Tent
                    </h3>
                    <p className="text-zinc-600 text-sm sm:text-base">
                        <strong className="text-zinc-900">1st Service:</strong> 9:30 AM – 11:00 AM &nbsp;|&nbsp;{" "}
                        <strong className="text-zinc-900">2nd Service:</strong> 11:00 AM – 12:30 PM
                        <br />
                        <span className="text-zinc-500 text-xs sm:text-sm">Location: The Big Tent, 98 Marian road, Calabar</span>
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                    <Link
                        href="/plan-your-visit"
                        className="bg-appRed hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-full text-sm text-center shadow transition-colors"
                    >
                        Plan Your Visit →
                    </Link>
                    <Link
                        href="/events"
                        className="border border-zinc-300 hover:border-zinc-400 text-zinc-700 hover:text-zinc-900 font-medium px-6 py-3 rounded-full text-sm text-center transition-colors"
                    >
                        View Weekly Schedule
                    </Link>
                </div>
            </div>
        </section>
    );
};
