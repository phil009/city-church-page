"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TestimonialCard from "./testimonial-card";
import Image from "next/image";

const testimonials = [
  {
    name: "James Oje",
    testimony:
      "God has been good to me and my family. He met us at the point of our needs in the most trying moments of our lives. We have come to return the glory to JESUS. To Him alone be the glory!",
  },
  {
    name: "Onyebuchi Favour",
    testimony:
      "God has been good to me and my family. He met us at the point of our needs in the most trying moments of our lives. We have come to return the glory to JESUS. To Him alone be the glory!",
  },
  {
    name: "Success Anne",
    testimony:
      "God has been good to me and my family. He met us at the point of our needs in the most trying moments of our lives. We have come to return the glory to JESUS. To Him alone be the glory!",
  },
  {
    name: "Ada",
    testimony:
      "God has been good to me and my family. He met us at the point of our needs in the most trying moments of our lives. We have come to return the glory to JESUS. To Him alone be the glory!",
  },
];

export default function TestimonialSlider() {
  const [testimonialsList, setTestimonialsList] = useState(testimonials);

  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialsList((prev) => {
        const [first, ...rest] = prev;
        return [...rest, first];
      });
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-32 relative overflow-x-hidden">
      <Image
        width={1000}
        height={1000}
        src={"/images/testimonial_bg.jpeg"}
        alt=""
        className="w-full h-full absolute top-0 left-0 object-cover"
      />
      <div className="flex flex-col md:flex-row mx-auto relative px-4 md:px-10">
        <div className=" mb-12">
          <p className="text-red-600 text-base sm:text-xl font-medium sm:mb-2">
            It&apos;s the Lord&apos;s Doing
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold mb-2 sm:mb-4">
            Testimonies
          </h2>
          <p className="text-gray-600 text-base sm:text-xl max-w-3xl mx-auto">
            Testimonies contribute to the spiritual growth and edification of
            believers, fostering a deeper sense of faith, unity, and connection
            among members. We celebrate God&apos;s work in individuals&apos;
            lives because it provides valuable lessons and inspiration to the
            entire congregation.
          </p>
        </div>

        <div className="relative translate-x-1/2 md:translate-x-3/4 lg:translate-x-2/3 xl:translate-x-1/3">
          <motion.div className="flex md:gap-6 justify-center" initial={false}>
            <AnimatePresence mode="popLayout">
              {testimonialsList.slice(0, 4).map((testimonial, index) => (
                <motion.div
                  key={`${testimonial.name}-${index}`}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    opacity: { duration: 0.2 },
                  }}
                  className="flex-shrink-0 w-full sm:w-auto"
                >
                  <TestimonialCard
                    name={testimonial.name}
                    testimony={testimonial.testimony}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
