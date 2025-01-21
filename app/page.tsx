import HomeHeroSlider from "@/components/home/hero-slider";
import { Introduction } from "@/components/home/introduction";
import TestimonialSlider from "@/components/home/testimonials";

export default function Home() {
  return (
    <section className="before:block before:h-12">
      <HomeHeroSlider />
      <Introduction />
      <TestimonialSlider />
    </section>
  );
}
