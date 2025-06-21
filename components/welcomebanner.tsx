/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
// import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show modal after a short delay
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1500); // 1.5 second delay

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-5xl bg-white flex flex-col md:flex-row p-0 overflow-hidden">
        {/* Close Button */}
        {/* <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 text-white hover:text-gray-200 transition-colors bg-black/20 rounded-full p-2"
        >
          <X className="h-5 w-5" />
        </button> */}

        {/* Image Section */}
        <div className="w-full md:w-1/2 relative">
          <Image
            src="/images/events/40Community.jpg"
            alt="40 Days of Community"
            width={600}
            height={400}
            priority
            quality={100}
            className="w-full h-64 md:h-full object-cover"
          />
        </div>

        {/* Content Section */}
        <div className="w-full md:w-1/2 p-4 md:p-8 flex flex-col justify-center">
          <div className="space-y-2">
            <h2 className="text-xl md:text-3xl font-bold text-gray-900 leading-tight">
              40 Days of Community Starts Now!
            </h2>

            <p className="text-gray-700 text-xs leading-relaxed">
              We're kicking off{" "}
              <span className="font-semibold text-appRed">
                40 Days of Community
              </span>{" "}
              — a powerful church-wide journey to grow deeper in love, faith,
              and connection. For the next 40 days, we'll explore how God builds
              us better together.
            </p>

            <div className="space-y-1">
              <p className="font-semibold text-gray-800">Join us by:</p>
              <ul className="space-y-2 text-xs text-gray-700">
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-appRed rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>
                    Joining a Small Group today and doing life with others.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-appRed rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>
                    Picking up your copy of the 40 Days Devotional in church
                    from tomorrow.
                  </span>
                </li>
              </ul>
            </div>

            <p className="text-gray-700 text-xs leading-relaxed">
              Don't miss this chance to grow spiritually, build meaningful
              relationships, and discover your part in God's family!
            </p>

            {/* Action Buttons */}
            <div className="pt-4 space-y-3">
              <Link
                href="/small-groups#available"
                onClick={handleClose}
                className="block"
              >
                <Button className="w-full bg-appRed hover:bg-red-700 text-white py-3 text-lg font-semibold">
                  Join the Challenge
                </Button>
              </Link>

              <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                <button
                  onClick={handleClose}
                  className="hover:text-gray-700 transition-colors"
                >
                  Maybe later
                </button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
