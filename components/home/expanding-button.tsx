"use client";

import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

export default function ExpandingSocialButton() {
  return (
    <motion.div
      className="relative flex items-center cursor-pointer"
      initial="collapsed"
      whileHover="expanded"
    >
      <motion.div
        className="flex items-center bg-red-500 p-2 w-32 text-white rounded-full overflow-hidden"
        variants={{
          collapsed: {
            width: "40px",
          },
          expanded: {
            width: "140px",
          },
        }}
        transition={{
          duration: 0.3,
          ease: "easeOut",
        }}
      >
        <span className="whitespace-nowrap pl-4 pr-10">See More</span>
        <motion.div
          className="absolute right-0 w-10 h-10 bg-white rounded-full flex items-center justify-center"
          variants={{
            collapsed: {
              scale: 1,
            },
            expanded: {
              scale: 1,
            },
          }}
        >
          <Icon icon="logos:facebook" className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
