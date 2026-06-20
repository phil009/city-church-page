"use client";

import { motion } from "framer-motion";

const roles = [
  {
    badge: "A",
    title: "Amplifiers",
    description:
      "Engage with every post within 15 minutes of publishing — like, comment, and share to trigger the algorithm and push content further.",
  },
  {
    badge: "C",
    title: "Connectors",
    description:
      "Distribute content externally into WhatsApp groups, community chats, and personal networks to expand reach beyond the page.",
  },
  {
    badge: "Cr",
    title: "Creators",
    description:
      "Provide production support — graphics, video editing, copywriting, and creative direction — that keeps the content pipeline strong.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const RoleCards = () => {
  return (
    <section className="px-4 sm:px-12 md:px-20 py-14">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mb-10"
      >
        <p className="text-appRed text-base md:text-xl mb-2 font-medium">
          Operational Structure
        </p>
        <h2 className="text-3xl md:text-4xl font-semibold text-appDark">
          Choose Your Role
        </h2>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-6"
      >
        {roles.map((role) => (
          <motion.div
            key={role.badge}
            variants={cardVariants}
            className="bg-white border border-appGhost rounded-xl p-8 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-14 h-14 rounded-full bg-appRed flex items-center justify-center">
              <span className="text-white font-bold text-xl">{role.badge}</span>
            </div>
            <h3 className="text-xl font-semibold text-appDark">{role.title}</h3>
            <p className="text-sm opacity-65 leading-relaxed">
              {role.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default RoleCards;
