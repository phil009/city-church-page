"use client";

import { motion } from "framer-motion";

const IntroSection = () => {
  return (
    <section className="px-4 sm:px-12 md:px-20 py-14 bg-appOffWhite">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-4xl"
      >
        <p className="text-appRed text-base md:text-xl mb-2 font-medium">
          Digital Disciples Campaign
        </p>
        <h2 className="text-3xl md:text-4xl font-semibold text-appDark mb-6">
          Bridging the gap between content creation and organic community
          engagement.
        </h2>
        <p className="text-sm md:text-base opacity-65 max-w-[65ch] leading-relaxed">
          City Church&apos;s social presence is consistent — but consistent
          content alone doesn&apos;t build reach. The Digital Disciples Campaign
          moves us from voluntary participation to a{" "}
          <span className="font-semibold text-appDark opacity-100">
            Structured Engagement Force
          </span>
          , ensuring that every post gets the early traction it needs to travel
          further and invite more people into the family.
        </p>
        <p className="text-sm md:text-base opacity-65 max-w-[65ch] leading-relaxed mt-4">
          This campaign ensures that the spiritual momentum generated in-service
          is translated into digital visibility — extending the conversation
          beyond the auditorium.
        </p>
      </motion.div>
    </section>
  );
};

export default IntroSection;
