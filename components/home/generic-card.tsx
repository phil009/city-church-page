"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

interface GenericCardProps {
  type: "info" | "ministry" | "event";
  title: string;
  description: string;
  icon: string;
  imageSrc?: string;
  imageAlt?: string;
  time?: string;
  venue?: string;
  joinLink?: string;
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
  joinLink,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`border-t-4 p-4 grid transition-colors bg-white duration-300 rounded-b-lg ${
        isHovered ? "border-appRed" : "border-appDark"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex gap-3 mb-4 items-center">
        <div
          className={`p-2 w-24 aspect-square flex justify-center items-center rounded-md transition-colors duration-300 ${
            isHovered ? "bg-appRed" : "bg-appDark"
          }`}
        >
          <Icon icon={icon} className="text-6xl text-white" />
        </div>
        <h3 className="text-3xl font-semibold">{title}</h3>
      </div>
      <p className="mb-4 text-xl opacity-60">{description}</p>
      {type === "event" && (time || venue) && (
        <div className="mb-4 text-sm text-gray-600">
          {time && <p>Time: {time}</p>}
          {venue && <p>Venue: {venue}</p>}
        </div>
      )}
      {type === "ministry" && joinLink && (
        <Link
          href={joinLink}
          className="inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          Join Us
          <Icon icon="akar-icons:arrow-right" className="ml-2 w-4 h-4" />
        </Link>
      )}
      {imageSrc && (
        <div className="self-end aspect-[16/10] overflow-hidden rounded-lg">
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
  );
};
