import Image from "next/image";
import {
    congregationBelievers,
    outdoorsCheerfulLadies,
    congregationPeaceDaniels,
    outdoorsFirstImpression,
} from "@/constants/AppImages";

const strips = [
    { src: congregationBelievers,   offset: "mt-0"  },
    { src: outdoorsCheerfulLadies,  offset: "mt-6"  },
    { src: congregationPeaceDaniels, offset: "mt-3"  },
    { src: outdoorsFirstImpression, offset: "mt-10" },
];

export default function VisionMission() {
    return (
        <div className="relative flex flex-col md:flex-row gap-10 w-full p-6 rounded-lg shadow-sm">
            {/* Text */}
            <div className="md:w-1/2 flex flex-col justify-center">
                <div className="mb-6">
                    <h2 className="text-appRed sm:mb-2 text-base sm:text-xl">
                        Vision
                    </h2>
                    <p className="text-lg sm:text-2xl text-appDark">
                        To raise change agents.
                    </p>
                </div>
                <div className="flex flex-col">
                    <h2 className="text-appRed sm:mb-2 text-base sm:text-xl">
                        Mission
                    </h2>
                    <p className="text-lg sm:text-2xl sm:max-w-[36ch] text-appDark leading-relaxed">
                        We are a church with a heart for people who are far from
                        Jesus and create environments that help them take their
                        next steps towards Him.
                    </p>
                </div>
            </div>

            {/* 4 image strips */}
            <div className="md:w-1/2 flex gap-2 items-start h-[420px]">
                {strips.map((strip, i) => (
                    <div
                        key={i}
                        className={`relative flex-1 h-full ${strip.offset} rounded-xl overflow-hidden`}
                    >
                        <Image
                            src={strip.src}
                            alt="City Church"
                            fill
                            className="object-cover"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
