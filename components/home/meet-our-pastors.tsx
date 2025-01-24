import {
  daddyTInBlue,
  daddyTInAction,
  daddyTPortrait,
  pstGeeinAction1,
  pstGeeinAction2,
  pstGeePotrait,
  pstAniekanInAction1,
  pstAniekanInAction2,
  pstAniekanPotrait,
  pstAnointedInAction1,
  pstAnointedInAction2,
  pstAnointedPotrait,
  pstMarkInAction1,
  pstMarkInAction2,
  pstMarkPotrait,
} from "@/constants/AppImages";
import { PastorCard } from "./pastor-card";

export const MeetOurPastors = () => {
  const pastors = [
    {
      name: "Pst. Tony Aleogena-Raphael",
      position: "Lead Pastor",
      images: [
        {
          id: 1,
          src: daddyTInBlue,
          alt: "Pastor preaching",
        },
        {
          id: 2,
          src: daddyTInAction,
          alt: "Pastor praying",
        },
        {
          id: 3,
          src: daddyTPortrait,
          alt: "Pastor profile",
        },
      ],
    },
    {
      name: "Pst. Aniekan Umoh",
      position: "Team Pastor",
      images: [
        {
          id: 1,
          src: pstAniekanInAction1,
          alt: "Pastor preaching",
        },
        {
          id: 2,
          src: pstAniekanInAction2,
          alt: "Pastor praying",
        },
        {
          id: 3,
          src: pstAniekanPotrait,
          alt: "Pastor profile",
        },
      ],
    },
    {
      name: "Pst. Goodluck Opue",
      position: "Team Pastor",
      images: [
        {
          id: 1,
          src: pstGeeinAction1,
          alt: "Pastor preaching",
        },
        {
          id: 2,
          src: pstGeeinAction2,
          alt: "Pastor praying",
        },
        {
          id: 3,
          src: pstGeePotrait,
          alt: "Pastor profile",
        },
      ],
    },
    {
      name: "Pst. Anointed Enoh",
      position: "Team Pastor",
      images: [
        {
          id: 1,
          src: pstAnointedInAction1,
          alt: "Pastor preaching",
        },
        {
          id: 2,
          src: pstAnointedInAction2,
          alt: "Pastor praying",
        },
        {
          id: 3,
          src: pstAnointedPotrait,
          alt: "Pastor profile",
        },
      ],
    },
    {
      name: "Pst. Mark",
      position: "Team Pastor",
      images: [
        {
          id: 1,
          src: pstMarkInAction1,
          alt: "Pastor preaching",
        },
        {
          id: 2,
          src: pstMarkInAction2,
          alt: "Pastor praying",
        },
        {
          id: 3,
          src: pstMarkPotrait,
          alt: "Pastor profile",
        },
      ],
    },
  ];

  return (
    <section className="p-6 md:p-20">
      <div className="text-center grid justify-center">
        <p className="text-appRed text-base md:text-2xl mb-2">
          Meet Our Pastors
        </p>
        <h1 className="text-xl md:text-5xl md:max-w-[35ch] font-semibold">
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
            images={pastor.images}
          />
        ))}
      </div>
    </section>
  );
};
