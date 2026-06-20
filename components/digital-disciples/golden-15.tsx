"use client";

import { motion } from "framer-motion";

const Golden15 = () => {
  return (
    <section className="px-4 sm:px-12 md:px-20 py-14 bg-appDark">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-3xl border-l-4 border-appRed pl-8"
      >
        <p className="text-appRed text-base md:text-xl mb-3 font-medium tracking-wide uppercase">
          The Golden 15 Rule
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          The first 15 minutes determine how far a post travels.
        </h2>
        <p className="text-appGhost text-sm md:text-base leading-relaxed">
          Early interaction signals to the algorithm that content is worth
          spreading. When Digital Disciples engage within the first 15 minutes
          of a post going live, they act as the catalyst that pushes church
          messages in front of more people — including those who have never
          visited City Church before.
        </p>
      </motion.div>
    </section>
  );
};

export default Golden15;
