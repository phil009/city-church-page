import { Suspense } from "react";
import type { Metadata } from "next";
import Loading from "../loading";
import PastorHero from "@/components/pastor/PastorHero";
import HeartForCityChurch from "@/components/pastor/HeartForCityChurch";
import TeachingShapingLives from "@/components/pastor/TeachingShapingLives";
import BeyondThePulpit from "@/components/pastor/BeyondThePulpit";
import ConnectCityChurch from "@/components/pastor/ConnectCityChurch";

export const metadata: Metadata = {
  title: "Meet Pastor Tony Aleogena Raphael | Lead Pastor | City Church Calabar",
  description:
    "A Life of Faith. A Heart for People. A Commitment to God's Purpose. Discover the ministry, teachings, and vision of Pastor Tony Aleogena Raphael (TAR), Lead Pastor of City Church Calabar.",
  keywords: [
    "Pastor Tony Aleogena Raphael",
    "Pastor Tony Calabar",
    "City Church Calabar Pastor",
    "TAR",
    "Lead Pastor Calabar",
    "Raising Change Agents",
    "City Church Pastor Tony",
  ],
  openGraph: {
    title: "Meet Pastor Tony Aleogena Raphael | Lead Pastor",
    description:
      "A Life of Faith. A Heart for People. A Commitment to God's Purpose. Discover the pastoral leadership, teachings, and heart of Pastor Tony Aleogena Raphael.",
    url: "https://citychurchcalabar.org/pastor",
    siteName: "City Church Calabar",
    images: [
      {
        url: "/images/pastors/pastor-tony-blue-suit.jpg",
        width: 1200,
        height: 630,
        alt: "Pastor Tony Aleogena Raphael - Lead Pastor City Church Calabar",
      },
    ],
    locale: "en_US",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Meet Pastor Tony Aleogena Raphael | City Church Calabar",
    description:
      "A Life of Faith. A Heart for People. A Commitment to God's Purpose.",
    images: ["/images/pastors/pastor-tony-blue-suit.jpg"],
  },
};

export default function PastorPage() {
  return (
    <Suspense fallback={<Loading />}>
      <main className="min-h-screen bg-black text-white selection:bg-appRed selection:text-white">
        <PastorHero />
        <HeartForCityChurch />
        <TeachingShapingLives />
        <BeyondThePulpit />
        <ConnectCityChurch />
      </main>
    </Suspense>
  );
}
