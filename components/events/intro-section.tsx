import React from "react";

const IntroSection = () => {
  return (
    <section className="px-4 sm:px-12 md:px-20 py-8 md:py-14">
      <div className="flex flex-col md:flex-row gap-3 justify-between">
        <div>
          <p className="text-appRed text-base md:text-xl md:mb-2">
            Powerful & Impactful Services
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold">
            Events & Programmes
          </h2>
        </div>
        <p className="text-xs sm:text-sm md:text-base max-w-[50ch] opacity-65">
          We make it easy for attendees to connect intimately with God using
          contemporary worship music, reflect on His person and nature using
          other artistic and creative art forms; and challenge them to make
          deliberate behavioral and character change with a Bible-based teaching
          format giving them principles they can readily apply
        </p>
      </div>
    </section>
  );
};

export default IntroSection;
