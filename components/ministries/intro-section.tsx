import React from "react";

const IntroSection = () => {
  return (
    <section className="px-4 sm:px-12 md:px-20 py-14">
      <div className="flex justify-between">
        <div>
          <p className="text-appRed text-base md:text-xl md:mb-2">
            Our Ministries
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold">
            Specialized Areas Of Service
          </h2>
        </div>
        <p className="text-xs sm:text-sm md:text-base max-w-[50ch] opacity-65">
          These are specialized areas of service and outreach focused on meeting
          specific needs within the congregation and the broader community.
          These include worship, youth, women, and men&apos;s missions.
          Ministries aim to fulfill the church&apos;s mission, foster spiritual
          growth, and serve others in accordance with Christian principles.
        </p>
      </div>
    </section>
  );
};

export default IntroSection;
