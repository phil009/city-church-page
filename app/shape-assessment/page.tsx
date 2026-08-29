import { GlobalHero } from "@/components/global-hero";
import { ministriesBg } from "@/constants/AppImages";

// TEMP: form is being reworked, blocked out until then — see ShapeForm in shape-assessment/shape-form.tsx
// import ShapeForm from "@/components/shape-assessment/shape-form";

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
      <div className="px-4 sm:px-12 md:px-20 py-20 text-center">
        <p className="text-2xl sm:text-3xl text-appDark mb-4">
          Coming Soon
        </p>
        <p className="text-sm sm:text-base opacity-60 max-w-xl mx-auto">
          The S.H.A.P.E. Assessment is currently being updated. Please check
          back soon.
        </p>
      </div>
      {/* <ShapeForm /> */}
    </section>
  );
}
