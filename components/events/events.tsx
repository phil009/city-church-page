/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { MessageCircle, Mail } from "lucide-react";
import { GenericCard } from "../home/generic-card";
import {
    eventSundayService,
    eventSmallGroup,
    eventTelegramPrayer,
    eventCityQueens,
    eventMandate,
    eventBlaze,
    eventCouplesFellowship,
    eventNightOfIncense,
    eventChristmas,
} from "@/constants/AppImages";

interface EventItem {
    title: string;
    description: string;
    whoFor?: string;
    icon: string;
    image?: any;
    time?: string;
    venue?: string;
    ctaText?: string;
    ctaLink?: string;
}

const weeklyEvents: EventItem[] = [
    {
        title: "Sunday Services",
        description:
            "A vibrant celebration of worship, practical Bible teaching, and authentic community for the whole family.",
        whoFor: "Everyone — families, students, professionals",
        icon: "mdi:church",
        image: eventSundayService,
        time: "1st Service: 9:30 AM | 2nd Service: 11:00 AM",
        venue: "The Big Tent, 98 Marian Road, Calabar",
        ctaText: "Plan Your Visit",
        ctaLink: "/plan-your-visit",
    },
    {
        title: "Small Groups",
        description:
            "Midweek gatherings in living rooms and neighborhood spaces to build genuine friendships, study Scripture, and pray together.",
        whoFor: "Anyone wanting deeper community",
        icon: "mdi:account-group",
        image: eventSmallGroup,
        time: "Wednesdays, 6:00 PM",
        venue: "Various neighborhood locations across Calabar",
        ctaText: "Find a Group Near You",
        ctaLink: "/small-groups",
    },
    {
        title: "Friday Prayer Service",
        description:
            "An evening dedicated to intercession, prayer, and seeking God's face together as a church body.",
        whoFor: "All believers seeking spiritual refreshing",
        icon: "mdi:hands-pray",
        time: "Fridays, 6:00 PM",
        venue: "The Big Tent, 98 Marian Road, Calabar",
        ctaText: "Request Prayer",
        ctaLink: "/prayer-request",
    },
    {
        title: "Morning Prayer on Telegram",
        description:
            "Start your day anchored in God's presence and united in prayer with our digital church family.",
        whoFor: "Early risers and remote family members",
        icon: "mdi:send-circle",
        image: eventTelegramPrayer,
        time: "Monday – Friday, 5:00 AM – 6:00 AM",
        venue: "Online via Telegram",
        ctaText: "Join Telegram Community",
        ctaLink: "https://t.me/citychurchcalabar",
    },
];

const monthlyEvents: EventItem[] = [
    {
        title: "Women's Fellowship (City Queens)",
        description:
            "A warm gathering for the women of City Church to connect, study the Word, and encourage one another in faith and purpose.",
        whoFor: "Women of all ages and stages of life",
        icon: "mdi:crown",
        image: eventCityQueens,
        time: "1st Monday of every month, 6:00 PM",
        venue: "The Big Tent, 98 Marian Road, Calabar",
        ctaText: "Connect with City Queens",
        ctaLink: "/ministries",
    },
    {
        title: "Blaze (Singles & Youths)",
        description:
            "A high-energy, relatable space for students, singles, and young adults navigating career, relationships, and faith.",
        whoFor: "Singles, students & young professionals",
        icon: "mdi:fire",
        image: eventBlaze,
        time: "3rd Sunday of every month, 6:00 PM",
        venue: "The Big Tent, 98 Marian Road, Calabar",
        ctaText: "Get Involved with Blaze",
        ctaLink: "/ministries",
    },
    {
        title: "Mandate",
        description:
            "A focused session of biblical leadership training, vision casting, and spiritual empowerment for church workers and ministers.",
        whoFor: "Leaders, volunteers & ministry workers",
        icon: "mdi:book-open-page-variant",
        image: eventMandate,
        time: "3rd Saturday of every month, 8:00 AM",
        venue: "The Big Tent, 98 Marian Road, Calabar",
        ctaText: "Learn About Serving",
        ctaLink: "/ministries",
    },
    {
        title: "Couples' Fellowship",
        description:
            "Practical discussions, relationship enrichment, and supportive fellowship for married couples and those engaged to be married.",
        whoFor: "Married and engaged couples",
        icon: "mdi:heart-multiple",
        image: eventCouplesFellowship,
        time: "Last Sunday of every month, 6:00 PM",
        venue: "The Big Tent, 98 Marian Road, Calabar",
        ctaText: "Connect with Couples",
        ctaLink: "/ministries",
    },
];

const signatureEvents: EventItem[] = [
    {
        title: "Night of Incense",
        description:
            "A powerful quarterly night of non-stop worship, heartfelt prayer, and deep spiritual encounter in the presence of God.",
        whoFor: "Everyone hungry for God's presence",
        icon: "mdi:smoke",
        image: eventNightOfIncense,
        time: "Quarterly Gathering",
        venue: "The Big Tent, 98 Marian Road, Calabar",
        ctaText: "Watch Past Encounters",
        ctaLink: "/live",
    },
    {
        title: "Free to Worship",
        description:
            "An annual celebration of pure, unhindered praise featuring creative arts, joyful music, and thanksgiving to Jesus.",
        whoFor: "Entire Calabar community",
        icon: "mdi:music-note",
        time: "Annual Special Gathering",
        venue: "The Big Tent, 98 Marian Road, Calabar",
        ctaText: "Experience Worship",
        ctaLink: "/live",
    },
    {
        title: "Christmas @ City Church",
        description:
            "A joyful season celebrating the birth of Christ featuring special carols, family services, and community impact initiatives.",
        whoFor: "Families, visitors and friends",
        icon: "mingcute:christmas-hat-line",
        image: eventChristmas,
        time: "Every December",
        venue: "The Big Tent, 98 Marian Road, Calabar",
        ctaText: "Plan Your Visit",
        ctaLink: "/plan-your-visit",
    },
];

const EventGrid = ({ events }: { events: EventItem[] }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {events.map((event, index) => (
            <GenericCard
                key={index}
                type="event"
                title={event.title}
                description={event.description}
                whoFor={event.whoFor}
                icon={event.icon}
                time={event.time}
                venue={event.venue}
                imageSrc={event.image}
                ctaText={event.ctaText}
                ctaLink={event.ctaLink}
            />
        ))}
    </div>
);

export const EventsSection = () => {
    return (
        <div className="px-4 sm:px-12 md:px-20 py-12 flex flex-col gap-16">
            {/* Weekly Rhythms */}
            <div>
                <div className="mb-8">
                    <span className="text-xs uppercase font-bold tracking-wider text-appRed bg-appRed/10 px-3 py-1 rounded-full">
                        Weekly Rhythms
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-appDark mt-3">
                        Regular Weekly Gatherings
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                        Consistent spaces to encounter God, learn His Word, and build authentic connections.
                    </p>
                </div>
                <EventGrid events={weeklyEvents} />
            </div>

            {/* Monthly Fellowships */}
            <div>
                <div className="mb-8">
                    <span className="text-xs uppercase font-bold tracking-wider text-appRed bg-appRed/10 px-3 py-1 rounded-full">
                        Monthly Fellowships
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-appDark mt-3">
                        Targeted Community Spaces
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                        Spaces tailored to where you are in life—from students to couples and leaders.
                    </p>
                </div>
                <EventGrid events={monthlyEvents} />
            </div>

            {/* Signature Annual Gatherings */}
            <div>
                <div className="mb-8">
                    <span className="text-xs uppercase font-bold tracking-wider text-appRed bg-appRed/10 px-3 py-1 rounded-full">
                        Signature Moments
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-appDark mt-3">
                        Annual Gatherings & Special Nights
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                        Landmark dates in our calendar for deeper worship, extended prayer, and seasonal celebrations.
                    </p>
                </div>
                <EventGrid events={signatureEvents} />
            </div>

            {/* Questions or Hosting Callout */}
            <div className="bg-gradient-to-r from-neutral-900 to-neutral-800 text-white rounded-2xl p-8 sm:p-10 border border-neutral-700 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="max-w-xl">
                    <h4 className="text-xl sm:text-2xl font-bold">
                        Have Questions About a Gathering or Programme?
                    </h4>
                    <p className="text-sm text-gray-300 mt-2 leading-relaxed">
                        Whether you want to know how to get to The Big Tent, are wondering about kids church, or want to host a Small Group in your area, our team is always happy to help.
                    </p>
                </div>
                <div className="flex flex-wrap gap-3">
                    <a
                        href="https://wa.me/2348036811155"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
                    >
                        <MessageCircle className="w-4 h-4" />
                        Chat on WhatsApp
                    </a>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors border border-white/20"
                    >
                        <Mail className="w-4 h-4" />
                        Contact Office
                    </Link>
                </div>
            </div>
        </div>
    );
};
