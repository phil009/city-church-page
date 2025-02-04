"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { JoinMinistryModal } from "../ministries/join-ministry-modal";

interface GenericCardProps {
  type: "info" | "ministry" | "event";
  title: string;
  description: string;
  icon: string;
  imageSrc?: string;
  imageAlt?: string;
  time?: string;
  venue?: string;
}

export const GenericCard: React.FC<GenericCardProps> = ({
  type,
  title,
  description,
  icon,
  imageSrc,
  imageAlt,
  time,
  venue,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <>
      <motion.div
        variants={itemVariants}
        className={`border-t-4 p-4 grid transition-colors shadow-md bg-white duration-300 rounded-b-lg ${
          isHovered ? "border-appRed" : "border-appDark"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex gap-3 mb-4 items-center">
          <div
            className={`p-2 w-16 sm:w-24 aspect-square flex justify-center items-center rounded-md transition-colors duration-300 ${
              isHovered ? "bg-appRed" : "bg-appDark"
            }`}
          >
            <Icon icon={icon} className="text-4xl sm:text-6xl text-white" />
          </div>
          <h3 className="text-xl sm:text-2xl font-medium">{title}</h3>
        </div>
        <p className="mb-4 text-base sm:text-base opacity-60">{description}</p>
        {type === "event" && (time || venue) && (
          <div className="mb-4 text-sm text-gray-600">
            {time && <p>Time: {time}</p>}
            {venue && <p>Venue: {venue}</p>}
          </div>
        )}
        {type === "ministry" && (
          <button
            onClick={() => setIsModalOpen(true)}
            className={`inline-flex items-center ${
              isHovered ? "text-appRed" : "text-appDark"
            }`}
          >
            Join Us
            <Icon
              icon="akar-icons:arrow-right"
              className={`ml-2 w-6 h-6 p-1 rounded-full transition duration-300 rotate-45 text-white ${
                isHovered ? "bg-appRed -rotate-45" : "bg-appDark"
              }`}
            />
          </button>
        )}
        {imageSrc && (
          <div className="self-end aspect-[16/10] mt-4 overflow-hidden rounded-lg">
            <Image
              src={imageSrc || "/placeholder.svg"}
              alt={imageAlt || ""}
              width={400}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </motion.div>
      <JoinMinistryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        ministryName={title}
      />
    </>
  );
};
