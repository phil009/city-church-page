"use client";
import { GenericCard } from "../home/generic-card";
import { motion } from "framer-motion";

interface MinistryProps {
  title: string;
  subcategories: {
    name: string;
    description: string;
    icon: string;
    head?: string | null;
    image?: string;
  }[];
}

export const Ministry = ({ title, subcategories }: MinistryProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="px-4 sm:px-12 md:px-20 py-8 md:py-14"
    >
      <p className="text-lg sm:text-2xl text-center text-appRed mb-8 md:mb-12">
        {title}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {subcategories.map((sub, index) => (
          <GenericCard
            key={index}
            type="ministry"
            title={sub.name}
            description={sub.description}
            icon={sub.icon}
            imageSrc={sub.image}
            imageAlt="Ministry Image"
          />
        ))}
      </div>
    </motion.div>
  );
};
