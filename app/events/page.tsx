import { EventsSection } from "@/components/events/events";
import IntroSection from "@/components/events/intro-section";
import { GlobalHero } from "@/components/global-hero";
import { eventsBg } from "@/constants/AppImages";

export default function Events() {
  return (
    <section className="before:block before:h-12">
      <GlobalHero
        backgroundImage={eventsBg}
        title="Events"
        breadcrumbs={[
          { label: "City Church", href: "/" },
          { label: "Events", href: "/events" },
        ]}
      />
      <IntroSection />
      <EventsSection />
    </section>
  );
}
