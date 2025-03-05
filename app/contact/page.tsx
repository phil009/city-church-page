import { GlobalHero } from "@/components/global-hero";
import ContactSection from "@/components/home/contact-section";
import { contactUsBg } from "@/constants/AppImages";

export default function Contact() {
  return (
    <section className="before:block before:h-12">
      <GlobalHero
        backgroundImage={contactUsBg}
        title="Contact Us"
        breadcrumbs={[
          { label: "City Church", href: "/" },
          { label: "Contact Us", href: "/contact" },
        ]}
      />
      <ContactSection />
    </section>
  );
}
