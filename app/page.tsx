import { Gallery } from "@/components/home/gallery";
import HomeHeroSlider from "@/components/home/hero-slider";
import { Introduction } from "@/components/home/introduction";
import { MeetOurPastors } from "@/components/home/meet-our-pastors";
import TestimonialSlider from "@/components/home/testimonials";
import VideoTestimonies from "@/components/home/video-testimonies";
import { WhoWeAre } from "@/components/home/who-we-are";
import { Suspense } from "react";
import Loading from "./loading";
import { Prayers } from "@/components/home/prayers";
import ContactSection from "@/components/home/contact-section";

import { HomeBusinessHubBanner } from "@/components/home/business-hub-banner";

export default function Home() {
  return (
    <Suspense fallback={<Loading />}>
      <section className="before:block before:h-12">
        <HomeHeroSlider />
        <Introduction />
        <VideoTestimonies />
        <WhoWeAre />
        <HomeBusinessHubBanner />
        <Gallery />
        <MeetOurPastors />
        <Prayers />
        <ContactSection />
      </section>
    </Suspense>
  );
}
