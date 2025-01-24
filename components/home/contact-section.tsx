"use client";

import { Phone, Mail, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ContactSection() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <section className="bg-zinc-900 min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <div className="space-y-8">
            <div>
              <p className="text-red-600 font-medium text-sm sm:text-base mb-2 sm:mb-4">
                Connect With Us
              </p>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-3 sm:mb-6">
                Let&apos;s Study, Pray & Grow Together In Faith. Shall We?
              </h2>
              <p className="text-gray-300 text-sm sm:text-base">
                We would love to hear from you. Let us know how we can be of
                help to your spiritual and all-round growth
              </p>
            </div>

            <div className="space-y-6">
              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="bg-red-600 rounded-lg p-4">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-red-600 mb-1">Have Any Question?</p>
                  <p className="text-white text-sm sm:text-lg">
                    +234 803 681 1155
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="bg-red-600 rounded-lg p-4">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-red-600 mb-1">Send Email</p>
                  <p className="text-white text-sm sm:text-lg">
                    info@citychurchcalabar.org
                  </p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="bg-red-600 rounded-lg p-4">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-red-600 mb-1">Address</p>
                  <p className="text-white text-sm sm:text-lg">
                    98 Ndidem Usang Iso Rd, Efut Ekondo 540222, Calabar, Cross
                    River
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
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

            <div className="relative bg-white rounded-3xl p-4 sm:p-8 lg:p-12">
              <h3 className="text-xl sm:text-3xl font-bold mb-8">Contact Us</h3>
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
                  placeholder="Your Phone"
                  className="bg-gray-50 border-0"
                />
                <Textarea
                  placeholder="Message here ..."
                  className="bg-gray-50 border-0 min-h-[160px]"
                />
                <Button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-6 rounded-lg text-sm sm:text-lg"
                >
                  Submit Now
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
