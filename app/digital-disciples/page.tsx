import { GlobalHero } from "@/components/global-hero";
import IntroSection from "@/components/digital-disciples/intro-section";
import RoleCards from "@/components/digital-disciples/role-cards";
import Golden15 from "@/components/digital-disciples/golden-15";
import DigitalDisciplesSignup from "@/components/digital-disciples/signup-form";
import { digitalDisciples } from "@/constants/AppImages";

export const metadata = {
    title: "Digital Disciples | City Church",
    description:
        "Join the Digital Disciples Campaign and help City Church grow its reach through structured social media engagement.",
};

export default function DigitalDisciplesPage() {
    return (
        <section className="before:block before:h-12">
            <GlobalHero
                backgroundImage={digitalDisciples}
                title="Digital Disciples"
                breadcrumbs={[
                    { label: "City Church", href: "/" },
                    { label: "Digital Disciples", href: "/digital-disciples" },
                ]}
            />
            <IntroSection />
            <RoleCards />
            <Golden15 />
            <DigitalDisciplesSignup />
        </section>
    );
}
