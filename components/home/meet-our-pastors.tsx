"use client";

import { useInView } from "@/hooks/useInView";
import { PastorCard } from "./pastor-card";

const pastors = [
  {
    name: "Pst. Tony Aleogena-Raphael",
    position: "Lead Pastor",
    video: "/videos/pastor-tony-1.mp4",
  },
  {
    name: "Pst. Anointed Enoh",
    position: "Team Pastor",
    video: "/videos/pastor-anointed-1.mp4",
  },
  {
    name: "Pst. Aniekan Umoh",
    position: "Team Pastor",
    video: "/videos/pastor-ani-1.mp4",
  },
  {
    name: "Pst. Goodluck Opue",
    position: "Team Pastor",
    video: "/videos/pastor-gee-1.mp4",
  },
  {
    name: "Pst. Richard Etim",
    position: "Team Pastor",
    video: "/videos/pst-richard-1.mp4",
  },
  {
    name: "Pst. Emmanuel Obeten",
    position: "Team Pastor",
    video: "/videos/pastor-obeten-1.mp4",
  },
  {
    name: "Pst. Daniel Essien",
    position: "Team Pastor",
    video: "/videos/pastor-dan-1.mp4",
  },
  {
    name: "Pst. Uma Ukpai",
    position: "Team Pastor",
    video: "/videos/pastor-uma-1.mp4",
  },
  {
    name: "Pst. Esta Etim",
    position: "Team Pastor",
    video: "/videos/pst-esta-1.mp4",
  },
];

export const MeetOurPastors = () => {
  const [ref, isInView] = useInView({ threshold: 0.3 });

  return (
    <section ref={ref} className="p-6 md:p-20">
      <div className="text-center grid justify-center">
        <p className="text-appRed text-base md:text-2xl mb-2">
          Meet Our Pastors
        </p>
        <h1 className="text-xl md:text-3xl md:max-w-[35ch] font-semibold">
          Dedicated spiritual leaders, teachers, and shepherds, guiding us
          together on our faith journey.
        </h1>
      </div>
      <div className="flex flex-wrap justify-center gap-4 my-12">
        {pastors.map((pastor, index) => (
          <PastorCard
            key={index}
            name={pastor.name}
            position={pastor.position}
            video={pastor.video}
            play={isInView}
          />
        ))}
      </div>
    </section>
  );
};
