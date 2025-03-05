"use client";
import { ChevronRight, CreditCard, Smartphone, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { GlobalHero } from "@/components/global-hero";
import IntroSection from "@/components/giving/intro-section";
import { motion } from "framer-motion";
import Link from "next/link";
import { givingBg } from "@/constants/AppImages";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

const GivingMethodCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) => (
  <motion.div
    variants={itemVariants}
    className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
  >
    <div className="bg-primary/10 rounded-full p-4 mb-4">
      <Icon className="w-8 h-8 text-primary" />
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </motion.div>
);
export default function GivingPage() {
  return (
    <>
      <GlobalHero
        backgroundImage={givingBg}
        title="Give to Our Ministry"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Giving", href: "/giving" },
        ]}
      />
      <IntroSection />
      <div className="min-h-screen px-2 md:px-20 bg-white">
        <div className="mx-auto py-16 text-center">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">
            Many Ways to Give
          </h1>
          <p className="text-base mb-12">
            Give either one-time or schedule recurring giving, through your
            credit card or e-transfer.
          </p>

          <main className="">
            {/* Giving Methods */}
            <section className="mb-20">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
              >
                <GivingMethodCard
                  icon={Smartphone}
                  title="e-Give"
                  description="Send your giving via bank transfer, quick and easy."
                />
                <GivingMethodCard
                  icon={CreditCard}
                  title="Credit Card"
                  description="Donate securely online using your credit card."
                />
                <GivingMethodCard
                  icon={Users}
                  title="Give In-person"
                  description="Bring your gift to the church during service times."
                />
              </motion.div>
            </section>

            {/* e-Giving Section */}
            <section className="mb-20">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="grid md:grid-cols-2">
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="p-8 flex flex-col justify-center"
                  >
                    <h2 className="text-3xl font-bold mb-4">e-Giving</h2>
                    <p className="text-lg mb-6 text-muted-foreground">
                      Send your giving via bank transfer
                    </p>
                    <div className="space-y-4 mb-6">
                      <div>
                        <h3 className="font-semibold mb-2">
                          For local transactions:
                        </h3>
                        <p>
                          <strong>Bank:</strong> Zenith Bank PLC
                        </p>
                        <p>
                          <strong>Account Name:</strong> City Church Calabar
                        </p>
                        <p>
                          <strong>Account Number:</strong> 2020 2020 2020
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">
                          For international transactions:
                        </h3>
                        <p>
                          <strong>Bank:</strong> Guaranteed Trust Bank
                        </p>
                        <p>
                          <strong>Account Name:</strong> City Church Calabar
                        </p>
                        <p>
                          <strong>USD Account:</strong> 017 343 6755
                        </p>
                        <p>
                          <strong>GBP Account:</strong> 017 343 6762
                        </p>
                      </div>
                    </div>
                    <p className="text-sm italic text-muted-foreground">
                      Use the description field to specify the purpose of your
                      giving.
                    </p>
                  </motion.div>
                  <div className="relative min-h-[400px]">
                    <Image
                      src="/images/first-mobile.jpeg"
                      alt="Person using mobile banking"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Credit Card Section */}
            <section className="mb-20">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="grid md:grid-cols-2">
                  <div className="relative min-h-[400px]">
                    <Image
                      src="/images/credit-card.jpeg"
                      alt="Credit cards"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="p-8 flex flex-col justify-center items-center"
                  >
                    <h2 className="text-3xl font-bold mb-4">
                      Credit Card Giving
                    </h2>
                    <p className="text-lg mb-6 text-muted-foreground">
                      Donate securely online from our website
                    </p>
                    <p className="mb-8">
                      Simple and secure, give online today. Set up a one-time or
                      recurring donation using your credit card.
                    </p>
                    <Button size="lg" className="w-fit" disabled>
                      Give Now
                    </Button>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Other Ways Section */}
            <section>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-primary/5 rounded-lg p-8 text-center"
              >
                <h2 className="text-3xl font-bold mb-8">Other Ways To Give</h2>
                <div className="max-w-2xl mx-auto">
                  <h3 className="text-2xl font-semibold mb-4">
                    Give In-Person
                  </h3>
                  <p className="mb-6">
                    Bring your gift to the church during Sunday service or at
                    regular office hours,
                    <br />
                    Tuesday to Friday, 9:00 AM - 4:30 PM.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center text-primary hover:underline"
                  >
                    Find our location <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
