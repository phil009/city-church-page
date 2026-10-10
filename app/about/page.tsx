import { MeetOurPastors } from "@/components/home/meet-our-pastors";
import TestimonialSlider from "@/components/home/testimonials";
import React, { Suspense } from "react";
import Loading from "../loading";
import { GlobalHero } from "@/components/global-hero";
import { aboutUsBg } from "@/constants/AppImages";
import AboutContent from "@/components/about-us/AboutContent";

export default function AboutUs() {
  return (
    <Suspense fallback={<Loading />}>
      <section className="before:block before:h-12 bg-white">
        <GlobalHero
          backgroundImage={aboutUsBg}
          title="About City Church"
          breadcrumbs={[
            { label: "City Church", href: "/" },
            { label: "About Us", href: "/about" },
          ]}
        />
        <AboutContent />
        <MeetOurPastors />
        <TestimonialSlider />
      </section>
    </Suspense>
  );
}
