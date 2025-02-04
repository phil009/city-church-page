import React from "react";

const IntroSection = () => {
  return (
    <section className="px-4 sm:px-12 md:px-20 py-8 md:py-14">
      <div className="flex flex-col md:flex-row gap-3 justify-between">
        <div>
          <p className="text-appRed text-base md:text-xl md:mb-2">Giving</p>
          <h2 className="text-3xl md:text-4xl font-semibold max-w-[20ch]">
            For It Is Blessed to Give Than To Receive
          </h2>
        </div>
        <p className="text-xs sm:text-sm md:text-base max-w-[50ch] opacity-65">
          Online giving facilitates convenient, secure, and efficient ways for
          our members to give financial support to the church&apos;s mission,
          ministries, and community outreach. It expands giving options beyond
          physical offerings, enabling individuals to contribute anytime,
          anywhere, and simplifies financial management for both donors and the
          church.
        </p>
      </div>
    </section>
  );
};

export default IntroSection;
