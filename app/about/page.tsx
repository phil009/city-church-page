import { MeetOurPastors } from "@/components/home/meet-our-pastors";
import TestimonialSlider from "@/components/home/testimonials";
import { WhoWeAre } from "@/components/home/who-we-are";
import React, { Suspense } from "react";
import Loading from "../loading";
import { GlobalHero } from "@/components/global-hero";
import { aboutUsBg } from "@/constants/AppImages";
import { IntroSection } from "@/components/about-us/intro-section";

export default function AboutUs() {
  return (
    <Suspense fallback={<Loading />}>
      <section className="before:block before:h-12">
        <GlobalHero
          backgroundImage={aboutUsBg}
          title="About Us"
          breadcrumbs={[
            { label: "City Church", href: "/" },
            { label: "About Us", href: "/about" },
          ]}
        />
        <IntroSection />
        <WhoWeAre />
        <MeetOurPastors />
        <TestimonialSlider />
      </section>
    </Suspense>
  );
}
