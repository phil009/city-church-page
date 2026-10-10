"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
    Heart, 
    Sparkles, 
    Users, 
    Compass, 
    BookOpen, 
    Flame, 
    ShieldCheck, 
    Globe, 
    ArrowRight 
} from "lucide-react";
import {
    congregationBelievers,
    outdoorsCheerfulLadies,
    congregationPeaceDaniels,
    outdoorsFirstImpression,
} from "@/constants/AppImages";

const values = [
    {
        title: "Christ-Centred",
        description: "Jesus is the center of everything we do—our worship, our teaching, and the way we love one another.",
        icon: Heart,
    },
    {
        title: "Relational Community",
        description: "We believe faith is lived in community, not isolation. We are a family where you can belong before you believe.",
        icon: Users,
    },
    {
        title: "Practical Teaching",
        description: "God's Word is meant to be lived. We teach biblical truth in ways that make sense Monday through Saturday.",
        icon: BookOpen,
    },
    {
        title: "City Transformation",
        description: "We are committed to the good of Calabar—serving our neighborhoods, loving the broken, and showing Christ's love.",
        icon: Globe,
    },
];

const beliefs = [
    {
        title: "The Scriptures",
        content: "We believe the Bible is the inspired, authoritative Word of God, providing guidance, hope, and practical wisdom for everyday living.",
    },
    {
        title: "The Triune God",
        content: "We believe in one eternal God who exists in three persons: Father, Son, and Holy Spirit—loving, holy, and the creator of all things.",
    },
    {
        title: "Jesus Christ",
        content: "We believe Jesus is fully God and fully man. Through His life, death, and resurrection, He conquered sin and offers reconciliation with God.",
    },
    {
        title: "Salvation by Grace",
        content: "Salvation is a free gift from God received through faith in Jesus Christ, not earned through our own efforts or religious perfection.",
    },
    {
        title: "The Holy Spirit",
        content: "We believe the Holy Spirit lives in every believer, empowering us with spiritual gifts, guiding our decisions, and producing love and peace.",
    },
    {
        title: "The Church & Eternity",
        content: "We believe the Church is the spiritual family of God called to do life together, with the living hope of eternal life in Christ.",
    },
];

const imageStrips = [
    { src: congregationBelievers, offset: "mt-0" },
    { src: outdoorsCheerfulLadies, offset: "mt-6" },
    { src: congregationPeaceDaniels, offset: "mt-3" },
    { src: outdoorsFirstImpression, offset: "mt-10" },
];

export default function AboutContent() {
    return (
        <div className="text-zinc-900 bg-white">
            {/* 1. Our Story & 16 Years */}
            <section className="py-20 px-4 sm:px-12 md:px-20 max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <span className="text-xs sm:text-sm uppercase font-bold tracking-widest text-appRed bg-red-50 px-3.5 py-1.5 rounded-full inline-block">
                            Our Story
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 leading-tight">
                            Growing together, serving Calabar for 16 years.
                        </h2>
                        <div className="space-y-4 text-zinc-600 text-base sm:text-lg leading-relaxed">
                            <p>
                                What began as a humble dream to help people discover Jesus and grow in faith has blossomed into a thriving spiritual family right here in Calabar.
                            </p>
                            <p>
                                We believe church is never just a Sunday event to attend—it is a spiritual home. It is where you find genuine friendships, discover God&apos;s unique purpose for your life, and get equipped to make an impact wherever life takes you.
                            </p>
                            <p>
                                Whether you walk through our doors with decades of church experience or you are still figuring out what faith is all about, there is a place for you here.
                            </p>
                        </div>
                    </div>

                    {/* Mobile: 2x2 Photo Grid */}
                    <div className="grid grid-cols-2 gap-3 h-[300px] sm:hidden">
                        {imageStrips.map((strip, i) => (
                            <div
                                key={i}
                                className="relative rounded-xl overflow-hidden shadow-sm"
                            >
                                <Image
                                    src={strip.src}
                                    alt="City Church Family"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Tablet & Desktop: 4 Staggered Image Strips */}
                    <div className="hidden sm:flex gap-3 lg:gap-4 items-start h-[420px] lg:h-[480px]">
                        {imageStrips.map((strip, i) => (
                            <div
                                key={i}
                                className={`relative flex-1 h-full ${strip.offset} rounded-2xl overflow-hidden shadow-md`}
                            >
                                <Image
                                    src={strip.src}
                                    alt="City Church Family"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 2 & 3. Vision: Raising Change Agents (Core DNA) */}
            <section className="bg-zinc-950 text-white py-20 px-4 sm:px-12 md:px-20 relative overflow-hidden">
                <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
                    <span className="text-xs uppercase font-bold tracking-widest text-appRed bg-red-950/80 border border-appRed/30 px-4 py-1.5 rounded-full inline-block">
                        Our Vision & DNA
                    </span>
                    <h2 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight">
                        Raising Change Agents
                    </h2>
                    <blockquote className="text-lg sm:text-2xl text-gray-200 font-medium italic leading-relaxed max-w-3xl mx-auto">
                        &ldquo;We believe God can use ordinary people to make an extraordinary difference.&rdquo;
                    </blockquote>
                    <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto">
                        You don&apos;t have to be famous, wealthy, or have everything figured out to influence your world. You can be salt. You can be light. You can faithfully represent Jesus right where you are—in your home, workplace, classroom, and community.
                    </p>

                    <div className="pt-4 flex flex-wrap justify-center gap-4">
                        <Link
                            href="/plan-your-visit"
                            className="bg-appRed hover:bg-red-700 text-white font-semibold px-7 py-3.5 rounded-full text-sm sm:text-base transition-colors shadow-lg"
                        >
                            Plan Your Visit
                        </Link>
                        <Link
                            href="/small-groups"
                            className="border border-zinc-700 hover:border-zinc-500 bg-zinc-900 text-white font-semibold px-7 py-3.5 rounded-full text-sm sm:text-base transition-colors"
                        >
                            Connect with Group Life
                        </Link>
                    </div>
                </div>

                {/* Subtle background glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
            </section>

            {/* 4. Our Mission & Values */}
            <section className="py-20 px-4 sm:px-12 md:px-20 max-w-7xl mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
                    <span className="text-xs uppercase font-bold tracking-wider text-appRed">
                        How We Live
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900">
                        Our Mission & Core Values
                    </h2>
                    <p className="text-zinc-600 text-base">
                        We are a church with a heart for people who are far from Jesus, creating environments that help them take their next steps towards Him.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {values.map((v, i) => {
                        const IconComponent = v.icon;
                        return (
                            <div
                                key={i}
                                className="bg-zinc-50 border border-zinc-200 rounded-2xl p-6 sm:p-8 hover:border-appRed/40 transition-colors shadow-sm"
                            >
                                <div className="w-12 h-12 bg-red-100 text-appRed rounded-xl flex items-center justify-center mb-5">
                                    <IconComponent className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-zinc-900 mb-2">
                                    {v.title}
                                </h3>
                                <p className="text-sm text-zinc-600 leading-relaxed">
                                    {v.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* 6. What We Believe */}
            <section className="bg-zinc-50 py-20 px-4 sm:px-12 md:px-20 border-t border-zinc-200">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
                        <span className="text-xs uppercase font-bold tracking-wider text-appRed">
                            The Foundation
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900">
                            What We Believe
                        </h2>
                        <p className="text-zinc-600 text-sm sm:text-base">
                            At City Church, we hold to historical Christian faith, expressed with warmth, humility, and clarity.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {beliefs.map((b, i) => (
                            <div
                                key={i}
                                className="bg-white p-6 sm:p-8 rounded-2xl border border-zinc-200/80 shadow-sm space-y-3"
                            >
                                <div className="flex items-center gap-2">
                                    <ShieldCheck className="w-5 h-5 text-appRed shrink-0" />
                                    <h3 className="font-bold text-lg text-zinc-900">
                                        {b.title}
                                    </h3>
                                </div>
                                <p className="text-sm text-zinc-600 leading-relaxed">
                                    {b.content}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
