"use client";

import { useState } from "react";
import { GlobalHero } from "@/components/global-hero";
import { aboutUsBg } from "@/constants/AppImages";
import { 
    Clock, 
    MapPin, 
    Heart, 
    Users, 
    Sparkles, 
    Smile, 
    MessageCircle, 
    CheckCircle2, 
    ArrowRight,
    Baby
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function PlanYourVisitPage() {
    const [name, setName] = useState("");
    const [phoneOrEmail, setPhoneOrEmail] = useState("");
    const [serviceChoice, setServiceChoice] = useState("1st-service");
    const [hasKids, setHasKids] = useState("no");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) {
            toast.error("Please enter your name.");
            return;
        }
        setSubmitted(true);
        toast.success("We can't wait to welcome you this Sunday!");
    };

    return (
        <section className="before:block before:h-12 bg-zinc-950 text-white min-h-screen">
            <GlobalHero
                backgroundImage={aboutUsBg}
                title="Your First Sunday at City Church"
                breadcrumbs={[
                    { label: "City Church", href: "/" },
                    { label: "Plan Your Visit", href: "/plan-your-visit" },
                ]}
            />

            {/* You Are Welcome Here Banner */}
            <div className="bg-gradient-to-r from-red-950/40 via-zinc-900 to-zinc-950 border-b border-zinc-800/80 py-16 px-4 sm:px-12 md:px-20">
                <div className="max-w-4xl mx-auto text-center space-y-4">
                    <span className="text-xs sm:text-sm uppercase font-bold tracking-widest text-appRed bg-red-950/60 border border-appRed/30 px-4 py-1.5 rounded-full inline-block">
                        You Are Welcome Here
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
                        There is room for you at City Church.
                    </h2>
                    <p className="text-base sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        Whether you have been in church for years or you are just curious about Jesus, you will find a warm, welcoming family ready to meet you right where you are.
                    </p>
                </div>
            </div>

            {/* What To Expect Section */}
            <div className="py-20 px-4 sm:px-12 md:px-20 max-w-7xl mx-auto">
                <div className="text-center mb-16 space-y-3">
                    <p className="text-appRed font-semibold uppercase tracking-wider text-sm">
                        No Guesswork
                    </p>
                    <h2 className="text-3xl sm:text-4xl font-bold">
                        What You Can Expect
                    </h2>
                    <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto">
                        Walking into a new church can feel intimidating. Here is exactly what Sunday looks like:
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 sm:p-8 hover:border-appRed/50 transition-all duration-300">
                        <div className="w-12 h-12 bg-red-600/20 text-appRed rounded-xl flex items-center justify-center mb-6">
                            <Sparkles className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-white">Worship</h3>
                        <p className="text-sm text-gray-300 leading-relaxed">
                            Passionate, contemporary worship music where you can freely express your heart and draw close to God.
                        </p>
                    </div>

                    <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 sm:p-8 hover:border-appRed/50 transition-all duration-300">
                        <div className="w-12 h-12 bg-red-600/20 text-appRed rounded-xl flex items-center justify-center mb-6">
                            <Heart className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-white">Practical Teaching</h3>
                        <p className="text-sm text-gray-300 leading-relaxed">
                            Straightforward teaching from God&apos;s Word designed to give you practical principles you can apply from Monday to Saturday.
                        </p>
                    </div>

                    <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 sm:p-8 hover:border-appRed/50 transition-all duration-300">
                        <div className="w-12 h-12 bg-red-600/20 text-appRed rounded-xl flex items-center justify-center mb-6">
                            <Users className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-white">Community</h3>
                        <p className="text-sm text-gray-300 leading-relaxed">
                            Warm, authentic relationships. People who will know your name and journey with you through life&apos;s seasons.
                        </p>
                    </div>

                    <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 sm:p-8 hover:border-appRed/50 transition-all duration-300">
                        <div className="w-12 h-12 bg-red-600/20 text-appRed rounded-xl flex items-center justify-center mb-6">
                            <Smile className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-white">Come As You Are</h3>
                        <p className="text-sm text-gray-300 leading-relaxed">
                            A relaxed, judgment-free environment. Dress comfortably—whether casual or traditional, you belong here.
                        </p>
                    </div>
                </div>
            </div>

            {/* When We Meet & Where We Meet */}
            <div className="bg-zinc-900 py-20 px-4 sm:px-12 md:px-20 border-y border-zinc-800">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                    {/* Schedule */}
                    <div className="space-y-8">
                        <div>
                            <span className="text-xs uppercase font-bold text-appRed tracking-wider">
                                Weekly Gatherings
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-bold mt-2">
                                When We Meet
                            </h2>
                            <p className="text-gray-400 mt-2 text-sm sm:text-base">
                                Consistent service times designed to fit your weekly rhythm.
                            </p>
                        </div>

                        <div className="space-y-4">
                            {/* Sundays */}
                            <div className="bg-zinc-950/80 border border-zinc-800 rounded-xl p-5 hover:border-zinc-700 transition-colors">
                                <div className="flex items-start gap-4">
                                    <div className="bg-red-600/20 text-appRed p-3 rounded-lg shrink-0 mt-1">
                                        <Clock className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <h3 className="font-bold text-lg text-white">Sundays</h3>
                                            <Link href="/events" className="text-xs text-appRed hover:underline">
                                                Event details →
                                            </Link>
                                        </div>
                                        <p className="text-sm text-gray-300 mt-1">
                                            <strong className="text-white">1st Service:</strong> 9:30 AM – 11:00 AM
                                        </p>
                                        <p className="text-sm text-gray-300">
                                            <strong className="text-white">2nd Service:</strong> 11:00 AM – 12:30 PM
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Wednesdays */}
                            <div className="bg-zinc-950/80 border border-zinc-800 rounded-xl p-5 hover:border-zinc-700 transition-colors">
                                <div className="flex items-start gap-4">
                                    <div className="bg-red-600/20 text-appRed p-3 rounded-lg shrink-0 mt-1">
                                        <Users className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <h3 className="font-bold text-lg text-white">Wednesdays — Small Groups</h3>
                                            <Link href="/small-groups" className="text-xs text-appRed hover:underline">
                                                Find your group →
                                            </Link>
                                        </div>
                                        <p className="text-sm text-gray-300 mt-1">
                                            6:00 PM across different locations in Calabar
                                        </p>
                                        <p className="text-xs text-gray-400 mt-1">
                                            Connect with people close to your neighborhood for honest conversations and prayer.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Fridays */}
                            <div className="bg-zinc-950/80 border border-zinc-800 rounded-xl p-5 hover:border-zinc-700 transition-colors">
                                <div className="flex items-start gap-4">
                                    <div className="bg-red-600/20 text-appRed p-3 rounded-lg shrink-0 mt-1">
                                        <Heart className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <h3 className="font-bold text-lg text-white">Fridays — Prayer Service</h3>
                                            <Link href="/events" className="text-xs text-appRed hover:underline">
                                                Event details →
                                            </Link>
                                        </div>
                                        <p className="text-sm text-gray-300 mt-1">
                                            6:00 PM – 7:00 PM at The Big Tent
                                        </p>
                                        <p className="text-xs text-gray-400 mt-1">
                                            An hour of intercession, spiritual renewal, and communion.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Location & Map Card */}
                    <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-8 space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="bg-red-600 p-4 rounded-xl shrink-0">
                                <MapPin className="w-7 h-7 text-white" />
                            </div>
                            <div>
                                <span className="text-xs uppercase font-bold text-appRed tracking-wider">
                                    Where We Meet
                                </span>
                                <h3 className="text-2xl font-bold text-white mt-1">
                                    The Big Tent, Calabar
                                </h3>
                                <p className="text-gray-300 text-base mt-2">
                                    98 Marian road, Calabar, Cross River State
                                </p>
                            </div>
                        </div>

                        <p className="text-sm text-gray-400 leading-relaxed">
                            Easily accessible with plenty of parking and a friendly welcome team ready to guide you from the moment you pull in.
                        </p>

                        <div className="pt-2 flex flex-col sm:flex-row gap-3">
                            <a
                                href="https://maps.google.com/?q=The+Big+Tent+98+Marian+Road+Calabar"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-appRed hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-full text-sm text-center shadow transition-colors inline-flex items-center justify-center gap-2"
                            >
                                <MapPin className="w-4 h-4" />
                                Get Directions in Google Maps
                            </a>
                            <a
                                href="https://wa.me/2348036811155"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="border border-emerald-500/50 hover:bg-emerald-950/40 text-emerald-400 font-semibold px-6 py-3 rounded-full text-sm text-center transition-colors inline-flex items-center justify-center gap-2"
                            >
                                <MessageCircle className="w-4 h-4" />
                                Ask on WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Kids Section & Questions */}
            <div className="py-20 px-4 sm:px-12 md:px-20 max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12">
                    {/* What About My Kids */}
                    <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-8 space-y-4">
                        <div className="w-12 h-12 bg-red-600/20 text-appRed rounded-xl flex items-center justify-center">
                            <Baby className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-bold text-white">
                            What About My Kids?
                        </h3>
                        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                            We love families! We provide a vibrant, safe, and engaging environment for your children and teenagers in our <strong>Junior Church</strong>.
                        </p>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Trained and loving volunteers will teach them God&apos;s Word with fun activities, music, and age-appropriate lessons while you enjoy the adult worship service with peace of mind.
                        </p>
                    </div>

                    {/* Still Have Questions */}
                    <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-8 space-y-4">
                        <div className="w-12 h-12 bg-emerald-600/20 text-emerald-400 rounded-xl flex items-center justify-center">
                            <MessageCircle className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-bold text-white">
                            Still Have Questions?
                        </h3>
                        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                            Want to know what to wear, where to park, or what the music is like? Send us a direct WhatsApp message and a member of our team will reply personally.
                        </p>
                        <div className="pt-2">
                            <a
                                href="https://wa.me/2348036811155"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm px-6 py-3 rounded-full transition-colors"
                            >
                                <MessageCircle className="w-4 h-4" />
                                <span>Chat with Us on WhatsApp (0803 681 1155)</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Visit Host Form / RSVP */}
            <div className="bg-gradient-to-b from-zinc-900 to-black py-20 px-4 sm:px-12 md:px-20 border-t border-zinc-800">
                <div className="max-w-2xl mx-auto bg-zinc-950 border border-zinc-800 rounded-3xl p-8 sm:p-12 shadow-2xl">
                    <div className="text-center mb-8 space-y-2">
                        <span className="text-xs uppercase font-bold text-appRed tracking-wider">
                            We would love to have you
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-bold text-white">
                            Let Us Know You&apos;re Coming
                        </h2>
                        <p className="text-gray-400 text-sm">
                            Fill out this quick note and our Welcome Host Team will look out for you, help you park, and save you a seat!
                        </p>
                    </div>

                    {submitted ? (
                        <div className="text-center py-12 space-y-4">
                            <div className="w-16 h-16 bg-emerald-600/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                                <CheckCircle2 className="w-10 h-10" />
                            </div>
                            <h3 className="text-2xl font-bold text-white">
                                Thank You, {name}!
                            </h3>
                            <p className="text-gray-300 text-sm max-w-md mx-auto">
                                We are thrilled to welcome you this Sunday. Look out for our welcome desk right at the entrance of The Big Tent.
                            </p>
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 text-appRed hover:text-red-400 font-semibold text-sm pt-4"
                            >
                                Back to Homepage <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-xs uppercase font-semibold text-gray-300 mb-1.5">
                                    Your Full Name *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="e.g. John Doe"
                                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-appRed text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-xs uppercase font-semibold text-gray-300 mb-1.5">
                                    Phone Number or WhatsApp
                                </label>
                                <input
                                    type="text"
                                    value={phoneOrEmail}
                                    onChange={(e) => setPhoneOrEmail(e.target.value)}
                                    placeholder="e.g. 0801 234 5678"
                                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-appRed text-sm"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs uppercase font-semibold text-gray-300 mb-1.5">
                                        Which Service?
                                    </label>
                                    <select
                                        value={serviceChoice}
                                        onChange={(e) => setServiceChoice(e.target.value)}
                                        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-appRed text-sm"
                                    >
                                        <option value="1st-service">1st Service (9:30 AM)</option>
                                        <option value="2nd-service">2nd Service (11:00 AM)</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs uppercase font-semibold text-gray-300 mb-1.5">
                                        Bringing Children?
                                    </label>
                                    <select
                                        value={hasKids}
                                        onChange={(e) => setHasKids(e.target.value)}
                                        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-appRed text-sm"
                                    >
                                        <option value="no">No, just myself/adults</option>
                                        <option value="yes">Yes, bringing kids</option>
                                    </select>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-appRed hover:bg-red-700 text-white font-bold py-3.5 rounded-full text-base uppercase tracking-wider shadow-lg transition-transform hover:-translate-y-0.5 active:translate-y-0 mt-6"
                            >
                                Plan My Visit →
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
}
