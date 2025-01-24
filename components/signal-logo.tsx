"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function SignalLogo() {
  return (
    <Link href="/" className="block relative">
      {[1, 2, 3, 4].map((index) => (
        <motion.div
          key={index}
          className="absolute inset-0 rounded-full border-2 border-red-600/30"
          initial={{ scale: 1, opacity: 0 }}
          whileInView={{
            scale: [1, 1.1, 1.3, 1.5],
            opacity: [0.8, 0.5, 0.2, 0],
          }}
          transition={{
            duration: 2,
            ease: "easeOut",
            repeat: Number.POSITIVE_INFINITY,
            delay: index * 0.3,
          }}
        />
      ))}
      {/* Main Logo */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        className="relative z-10"
      >
        <Image
          src={"/images/favicon.png"}
          alt="Signal Logo"
          width={1000}
          height={1000}
          className="w-full max-w-20 sm:max-w-32"
        />
      </motion.div>
    </Link>
  );
}
