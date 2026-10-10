import Image from "next/image";
import Link from "next/link";
import { Leaf, HeartHandshake } from "lucide-react";
import { prayersBg, congregationPrayerMan } from "@/constants/AppImages";

interface PrayerEvent {
    title: string;
    time: string;
    location: string;
}

const prayerEvents: PrayerEvent[] = [
    {
        title: "Friday Prayers",
        time: "Time: 6pm to 7pm",
        location: "Location: The Big Tent, 98 Marian Road, Calabar",
    },
    {
        title: "Pre-Service Prayers",
        time: "Time: Sundays 8.30am to 9am",
        location: "Location: The Big Tent",
    },
    {
        title: "Hour of Tongues",
        time: "Time: Mondays-Fridays 5am to 6am",
        location: "Location: City Church Telegram channel",
    },
];

export const Prayers = () => {
    return (
        <section className="flex">
            <div className="relative md:w-3/5">
                <Image
                    src={prayersBg}
                    alt="prayers"
                    width={500}
                    height={500}
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="relative grid gap-3 sm:gap-7 z-10 px-4 sm:px-12 md:px-20 py-28 text-white">
                    <p className="text-lg sm:text-2xl text-appRed">
                        Our Prayer Life
                    </p>
                    <h1 className="text-2xl sm:text-5xl font-semibold">
                        We believe in the efficacy of personal and corporate
                        prayers.
                    </h1>
                    <p className="tex-base sm:text-xl">
                        The prayer of faith is a heartfelt, confident prayer
                        rooted in trust in God&apos;s power and willingness to
                        answer. It aligns with God&apos;s will, believing that
                        He can and will act according to His divine purpose,
                        often accompanied by actions demonstrating that trust.
                        It&apos;s a potent expression of unwavering belief.
                    </p>
                    <div className="max-w-3xl mt-8 space-y-8">
                        {prayerEvents.map((event, index) => (
                            <div
                                key={index}
                                className="flex items-start gap-4"
                            >
                                <div className="bg-red-600 shadow-lg rounded-lg p-3 shrink-0">
                                    <Leaf className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
                                </div>
                                <div className="space-y-1">
                                    <h2 className="text-base sm:text-xl font-semibold">
                                        {event.title}
                                    </h2>
                                    <p className="text-xs sm:text-sm text-gray-300">
                                        {event.time}
                                    </p>
                                    <p className="text-xs sm:text-sm text-gray-300">
                                        {event.location}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Section 8 Homepage Prayer CTA */}
                    <div className="mt-8 p-6 sm:p-8 bg-black/60 backdrop-blur-md rounded-2xl border border-appRed/40 max-w-3xl shadow-xl">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                            <div className="space-y-2">
                                <span className="text-xs uppercase font-bold tracking-wider text-appRed">
                                    Need Prayer?
                                </span>
                                <h3 className="text-lg sm:text-2xl font-bold text-white">
                                    You don&apos;t have to carry everything alone. Let us pray with you.
                                </h3>
                                <p className="text-xs sm:text-sm text-gray-300">
                                    Our pastoral & intercessory prayer team will faithfully stand with you in faith.
                                </p>
                            </div>
                            <Link
                                href="/prayer-request"
                                className="shrink-0 bg-appRed hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-full text-sm transition-colors shadow-md text-center"
                            >
                                Request Prayer →
                            </Link>
                        </div>
                    </div>

                    <div className="pt-8 border-t text-sm sm:text-base border-zinc-800">
                        <p className="text-gray-300">
                            Connect with us on our social media platforms to
                            stay updated weekly:
                        </p>
                        <p className="text-gray-300 mt-2">
                            @citychurchcalabar or{" "}
                            <a href="tel:+2348036811155" className="hover:text-appRed transition-colors font-medium">
                                +234 803 681 1155
                            </a>
                        </p>
                    </div>
                </div>
            </div>
            <div className="hidden md:block w-2/5">
                <Image
                    src={congregationPrayerMan}
                    alt="prayers"
                    width={500}
                    height={500}
                    className="w-full h-full object-cover object-center"
                />
            </div>
        </section>
    );
};
