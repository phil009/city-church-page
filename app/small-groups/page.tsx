"use client";

import { GlobalHero } from "@/components/global-hero";
import { useState, useRef } from "react";
import { ArrowDown, Users } from "lucide-react";
import GroupsCarousel from "@/components/small-groups/GroupsCarousel";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { contactUsBg } from "@/constants/AppImages";
import JoinGroupModal from "@/components/small-groups/JoinGroupModal";
import LeaderApplicationModal from "@/components/small-groups/LeaderApplicationModal";
import HowItWorks from "@/components/small-groups/HowItWorks";
import { smallGroups } from "@/data/small-groups-data";
import Image from "next/image";

export default function SmallGroupsPage() {
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showLeaderModal, setShowLeaderModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(smallGroups[0]);
  const groupsRef = useRef<HTMLDivElement>(null);

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
      <section className="py-16 relative bg-white overflow-x-hidden">
        <div className="px-4 sm:px-12 md:px-20 md:flex text-center md:text-start md:items-center gap-24">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            className="w-full md:w-1/2 text-appDark"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Connect, Grow, and Transform Togethers
            </h2>
            <p className="text-lg text-appBorderGray max-w-3xl mb-10">
              Small groups are the heart of our church community. They provide a
              place where you can connect with others, grow in your faith, and
              experience life transformation in a supportive environment.
            </p>
            <Button
              onClick={scrollToGroups}
              size="lg"
              className="group bg-appRed text-white"
            >
              Find a Group
              <ArrowDown className="ml-2 h-4 w-4 group-hover:animate-bounce" />
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            className="w-1/2 max-w-lg border-b-4 border-r-4 border-appDark aspect-[13/16] relative hidden md:block rounded-xl overflow-hidden"
          >
            <Image
              src="/images/outdoors/cheerful-ladies-pose.jpg"
              alt="background"
              fill={true}
              priority
              className="w-full h-full object-cover object-center"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-appDark opacity-20 z-10"></div>
            <div className="absolute bottom-0 right-0 h-full -skew-x-12 bg-gradient-to-t from-white/40 to-transparent z-10 w-1/3 opacity-55" />
          </motion.div>
        </div>
      </section>

      {/* Why Join Section */}
      <section className="py-16 bg-appDark">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-appOffWhite mb-12">
            Why Join a Small Group?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="border border-appBorderGray text-appOffWhite p-6 rounded-lg shadow-md"
            >
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-appRed" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Deeper Connections</h3>
              <p className="text-gray-100 opacity-70">
                Form meaningful relationships beyond Sunday services. Small
                groups provide the perfect setting to build lasting friendships.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="border border-appBorderGray text-appOffWhite p-6 rounded-lg shadow-md"
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
              <p className="text-gray-100 opacity-70">
                Dive deeper into God&apos;s Word in an interactive setting where
                questions are welcomed and faith is strengthened.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="border border-appBorderGray text-appOffWhite p-6 rounded-lg shadow-md"
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
              <p className="text-gray-100 opacity-70">
                Experience the power of community as you share life&apos;s joys
                and challenges with people who genuinely care about you.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Available Groups Carousel */}
      <section ref={groupsRef} className="py-16 relative bg-white">
        <Image
          src="/images/footer_bg.jpeg"
          alt="background"
          fill={true}
          priority
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Available Groups
          </h2>

          <GroupsCarousel groups={smallGroups} onJoinGroup={handleJoinGroup} />
        </div>
      </section>

      {/* How It Works */}
      <HowItWorks />

      {/* Call to Action */}
      <section className="py-16 bg-appDark text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-xl md:text-3xl font-bold mb-8">
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
