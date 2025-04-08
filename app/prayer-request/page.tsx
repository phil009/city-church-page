"use client";

import type React from "react";

import { Heart, Calendar, Shield } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export default function SendPrayerRequestsPage() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission
    console.log("Prayer request submitted");
    // You would typically send this to your backend
  };

  return (
    <section className="bg-zinc-900 min-h-screen flex items-center ">
      <div className="mx-auto px-4 md:px-10 lg:px-20 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <div className="space-y-8">
            <div>
              <p className="text-red-600 font-medium text-sm sm:text-base mb-2 sm:mb-4">
                Prayer Ministry
              </p>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-3 sm:mb-6">
                Share Your Prayer Requests With Us. We&apos;re Here To Pray With
                You.
              </h2>
              <p className="text-gray-300 text-sm sm:text-base">
                Our prayer team is committed to lifting your needs before God.
                Whatever you&apos;re facing, you don&apos;t have to face it
                alone. Submit your prayer request and our dedicated prayer team
                will intercede on your behalf.
              </p>
            </div>

            <div className="space-y-6">
              {/* Prayer Times */}
              <div className="flex items-start gap-4">
                <div className="bg-red-600 rounded-lg p-4">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-red-600 mb-1">Prayer Times</p>
                  <p className="text-white text-sm sm:text-lg">
                    Mondays - Fridays: 5:00 AM - 6:00 AM (Telegram Channel)
                  </p>
                  <p className="text-white text-sm sm:text-lg">
                    Fridays: 6:00 PM - 7:00 PM (The Big Tent)
                  </p>
                </div>
              </div>

              {/* Prayer Line */}
              <div className="flex items-start gap-4">
                <div className="bg-red-600 rounded-lg p-4">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-red-600 mb-1">Prayer Line</p>
                  <p className="text-white text-sm sm:text-lg">
                    +234 803 681 1155
                  </p>
                  <p className="text-gray-400 text-xs sm:text-sm">
                    Available 24/7 for urgent prayer needs
                  </p>
                </div>
              </div>

              {/* Confidentiality */}
              <div className="flex items-start gap-4">
                <div className="bg-red-600 rounded-lg p-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-red-600 mb-1">Confidentiality</p>
                  <p className="text-white text-sm sm:text-lg">
                    All prayer requests are kept confidential unless you specify
                    otherwise.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Prayer Request Form */}
          <div className="relative">
            {/* Background Pattern */}
            <div
              className="absolute right-0 bottom-0 w-72 h-72 opacity-10"
              style={{
                backgroundImage:
                  "radial-gradient(circle at center, #fff 2px, transparent 2px)",
                backgroundSize: "24px 24px",
              }}
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{
                stiffness: 260,
                type: "spring",
                damping: 20,
                delay: 0.5,
              }}
              className="relative bg-white max-w-md rounded-3xl p-4 sm:p-8 lg:p-12"
            >
              <h3 className="text-xl sm:text-3xl font-bold mb-8">
                Submit Prayer Request
              </h3>
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-6">
                <Input
                  type="text"
                  placeholder="Your Name"
                  className="bg-gray-50 border-0"
                />
                <Input
                  type="email"
                  placeholder="Your Email"
                  className="bg-gray-50 border-0"
                />
                <Input
                  type="tel"
                  placeholder="Your Phone (optional)"
                  className="bg-gray-50 border-0"
                />

                <div className="space-y-2">
                  <Label className="text-sm text-gray-700">
                    Prayer Request Urgency
                  </Label>
                  <RadioGroup
                    defaultValue="standard"
                    className="flex space-x-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="urgent" id="urgent" />
                      <Label htmlFor="urgent" className="text-sm">
                        Urgent
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="standard" id="standard" />
                      <Label htmlFor="standard" className="text-sm">
                        Standard
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <Textarea
                  placeholder="Your prayer request..."
                  className="bg-gray-50 border-0 min-h-[160px]"
                />

                <div className="flex items-start space-x-2">
                  <Checkbox id="confidential" />
                  <div className="grid gap-1.5 leading-none">
                    <Label
                      htmlFor="confidential"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Keep my request confidential
                    </Label>
                    <p className="text-xs text-gray-500">
                      Only the prayer team will see this request
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox id="share" />
                  <div className="grid gap-1.5 leading-none">
                    <Label
                      htmlFor="share"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Share with congregation
                    </Label>
                    <p className="text-xs text-gray-500">
                      Allow this request to be shared during prayer meetings
                    </p>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-6 rounded-lg text-sm sm:text-lg"
                >
                  Submit Prayer Request
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
