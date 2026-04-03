import { GlobalHero } from "@/components/global-hero";
import IntroSection from "@/components/ministries/intro-section";
import { ministriesBg } from "@/constants/AppImages";
import VolunteerSignup from "@/components/ministries/volunteer-signup";

export default function Ministries() {
    return (
        <section className="before:block before:h-12">
            <GlobalHero
                backgroundImage={ministriesBg}
                title="Ministries"
                breadcrumbs={[
                    { label: "City Church", href: "/" },
                    { label: "Ministries", href: "/ministries" },
                ]}
            />
            <IntroSection />
            <VolunteerSignup />
        </section>
    );
}
