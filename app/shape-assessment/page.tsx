import { GlobalHero } from "@/components/global-hero";
import { ministriesBg } from "@/constants/AppImages";

import ShapeForm from "@/components/shape-assessment/shape-form";

export const metadata = {
  title: "S.H.A.P.E. Assessment | City Church",
  description:
    "Discover how God has uniquely shaped you for service by completing the S.H.A.P.E. Assessment — covering your Spiritual Gifts, Heart, Abilities, Personality, and Experiences.",
};

export default function ShapeAssessmentPage() {
  return (
    <section className="before:block before:h-12">
      <GlobalHero
        backgroundImage={ministriesBg}
        title="S.H.A.P.E. Assessment"
        breadcrumbs={[
          { label: "City Church", href: "/" },
          { label: "S.H.A.P.E. Assessment", href: "/shape-assessment" },
        ]}
      />
      
      <ShapeForm />
    </section>
  );
}
