"use client";
import Image from "next/image";
import { loading } from "@/constants/AppImages";

export default function MyApp() {
  return (
    <>
      <div className="absolute top-0 left-0 z-50 object-cover">
        <Image
          src={loading}
          className="w-full h-full"
          alt="Loading"
          layout="fill"
        />
      </div>
    </>
  );
}
