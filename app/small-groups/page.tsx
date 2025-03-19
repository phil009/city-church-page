"use client";

import { GlobalHero } from "@/components/global-hero";
import { useState, useRef } from "react";
import {
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  Users,
  MapPin,
  Calendar,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { contactUsBg } from "@/constants/AppImages";
import JoinGroupModal from "@/components/small-groups/JoinGroupModal";
import LeaderApplicationModal from "@/components/small-groups/LeaderApplicationModal";
import HowItWorks from "@/components/small-groups/HowItWorks";
import { smallGroups } from "@/data/small-groups-data";

export default function SmallGroupsPage() {
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showLeaderModal, setShowLeaderModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(smallGroups[0]);
  const groupsRef = useRef<HTMLDivElement>(null);

  const handlePrevGroup = () => {
    setActiveGroupIndex((prev) =>
      prev === 0 ? smallGroups.length - 1 : prev - 1
    );
  };

  const handleNextGroup = () => {
    setActiveGroupIndex((prev) =>
      prev === smallGroups.length - 1 ? 0 : prev + 1
    );
  };

  const handleJoinGroup = (group: (typeof smallGroups)[0]) => {
    setSelectedGroup(group);
    setShowJoinModal(true);
  };

  const scrollToGroups = () => {
    groupsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <GlobalHero
        backgroundImage={
          contactUsBg || "/placeholder.svg?height=600&width=1600"
        }
        title="Small Groups"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Small Groups", href: "/small-groups" },
        ]}
      />

      {/* Landing Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Connect, Grow, and Transform Together
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-10">
            Small groups are the heart of our church community. They provide a
            place where you can connect with others, grow in your faith, and
            experience life transformation in a supportive environment.
          </p>
          <Button onClick={scrollToGroups} size="lg" className="group">
            Find a Group
            <ArrowDown className="ml-2 h-4 w-4 group-hover:animate-bounce" />
          </Button>
        </div>
      </section>

      {/* Why Join Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Join a Small Group?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-appRed" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Deeper Connections</h3>
              <p className="text-gray-600">
                Form meaningful relationships beyond Sunday services. Small
                groups provide the perfect setting to build lasting friendships.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-appRed"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Spiritual Growth</h3>
              <p className="text-gray-600">
                Dive deeper into God&apos;s Word in an interactive setting where
                questions are welcomed and faith is strengthened.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-appRed"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Life Support</h3>
              <p className="text-gray-600">
                Experience the power of community as you share life&apos;s joys and
                challenges with people who genuinely care about you.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Available Groups Carousel */}
      <section ref={groupsRef} className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Available Groups
          </h2>

          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${activeGroupIndex * 100}%)` }}
              >
                {smallGroups.map((group, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
                      <div className="p-6">
                        <h3 className="text-2xl font-bold mb-2">
                          {group.name}
                        </h3>
                        <p className="text-gray-500 mb-4">
                          Led by {group.leaderName}
                        </p>

                        <div className="mb-4">
                          <h4 className="font-semibold text-gray-700 mb-2">
                            Leader&apos;s Story
                          </h4>
                          <p className="text-gray-600">{group.leaderStory}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="flex items-start">
                            <Calendar className="h-5 w-5 text-appRed mr-2 mt-0.5" />
                            <div>
                              <p className="text-sm text-gray-500">
                                Meeting Day
                              </p>
                              <p className="font-medium">{group.meetingDay}</p>
                            </div>
                          </div>

                          <div className="flex items-start">
                            <Clock className="h-5 w-5 text-appRed mr-2 mt-0.5" />
                            <div>
                              <p className="text-sm text-gray-500">
                                Meeting Time
                              </p>
                              <p className="font-medium">{group.meetingTime}</p>
                            </div>
                          </div>

                          <div className="flex items-start">
                            <MapPin className="h-5 w-5 text-appRed mr-2 mt-0.5" />
                            <div>
                              <p className="text-sm text-gray-500">Location</p>
                              <p className="font-medium">{group.location}</p>
                            </div>
                          </div>

                          <div className="flex items-start">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-appRed mr-2 mt-0.5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 10V3L4 14h7v7l9-11h-7z"
                              />
                            </svg>
                            <div>
                              <p className="text-sm text-gray-500">
                                Group Vision
                              </p>
                              <p className="font-medium">{group.vision}</p>
                            </div>
                          </div>
                        </div>

                        <div className="mb-6">
                          <h4 className="font-semibold text-gray-700 mb-2">
                            What to Expect
                          </h4>
                          <p className="text-gray-600">{group.description}</p>
                        </div>

                        <Button
                          onClick={() => handleJoinGroup(group)}
                          className="w-full"
                        >
                          Join This Group
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handlePrevGroup}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
              aria-label="Previous group"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              onClick={handleNextGroup}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
              aria-label="Next group"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <div className="flex justify-center mt-6 space-x-2">
              {smallGroups.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveGroupIndex(index)}
                  className={`w-3 h-3 rounded-full ${
                    index === activeGroupIndex ? "bg-appRed" : "bg-gray-300"
                  }`}
                  aria-label={`Go to group ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <HowItWorks />

      {/* Call to Action */}
      <section className="py-16 bg-appDark text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">
            Ready to Join a Small Group?
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              onClick={scrollToGroups}
              size="lg"
              variant="default"
              className="bg-appRed hover:bg-red-700"
            >
              Join a Group Now
            </Button>
            <Button
              onClick={() => setShowLeaderModal(true)}
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-appDark"
            >
              Want to Lead a Group?
            </Button>
          </div>
        </div>
      </section>

      {/* Modals */}
      <JoinGroupModal
        isOpen={showJoinModal}
        onClose={() => setShowJoinModal(false)}
        group={selectedGroup}
      />

      <LeaderApplicationModal
        isOpen={showLeaderModal}
        onClose={() => setShowLeaderModal(false)}
      />
    </div>
  );
}
