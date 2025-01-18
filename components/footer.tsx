import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <section className="w-full relative px-20 py-8">
      <Image
        src={"/images/footer_bg.jpeg"}
        alt="map"
        width={1000}
        height={1000}
        className="w-full h-full absolute top-0 left-0"
      />
      <div className="relative"></div>
    </section>
  );
};

export default Footer;
