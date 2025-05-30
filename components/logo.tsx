import { logo } from "@/constants/AppImages";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href={"/"}>
      <Image
        src={logo}
        width={1000}
        height={1000}
        alt="City Church Calabar"
        className="w-full h-full"
      />
    </Link>
  );
};

export default Logo;
