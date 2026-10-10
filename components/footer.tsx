"use client";
import Image from "next/image";
import React, { useState } from "react";
import Logo from "./logo";
import SocialLink, { SocialLinkProps } from "./social-links";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { footerbg } from "@/constants/AppImages";
import { subscribeNewsletter } from "@/utils/axiosInstance";
import { toast } from "sonner";

const Footer = () => {
  const [loading, setLoading] = useState(false);
  const formSchema = z.object({
    email: z.string().min(2).max(50),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const { email } = values;
    const res = await subscribeNewsletter(email);
    if (res) {
      toast.success("Subscribed successfully!");
      form.reset();
    } else {
      toast.error("Failed to subscribe. Please try again.");
    }
    setLoading(false);
  }
  const socials: SocialLinkProps[] = [
    { href: "https://facebook.com/citychurchcalabar", type: "FB" },
    { href: "https://www.instagram.com/citychurchcalabar", type: "IG" },
    {
      href: "https://www.youtube.com/channel/UC24V2Whkpzyas-kbEgs-q4A",
      type: "YT",
    },
  ];
  return (
    <section className="w-full text-white relative">
      <Image
        src={footerbg}
        alt="map"
        width={1000}
        height={1000}
        className="w-full h-full object-cover absolute top-0 left-0"
      />
      <div className="relative px-4 sm:px-12 md:px-20 py-12 border-b border-appBorderGray">
        <div className="flex flex-col gap-6 lg:flex-row justify-between md:items-start w-full">
          <div className="md:w-1/4">
            <div className="max-w-64">
              <Logo />
            </div>
            <p className="text-xs sm:text-sm text-gray-300 mt-3 max-w-[34ch]">
              Learning to follow Jesus, find community, and raise change agents who carry His love into our city and beyond.
            </p>
          </div>
          <div className="md:w-1/4">
            <span className="text-appRed text-sm md:text-base font-medium">
              Visit Us
            </span>
            <br />
            <b className="text-base sm:text-lg block mt-1">
              The Big Tent, 98 Marian road, Calabar
            </b>
            <span className="text-xs text-gray-400 block mt-1">
              Sundays: 9:30 AM & 11:00 AM | Fridays: 6:00 PM
            </span>
          </div>
          <div className="md:w-1/4">
            <span className="text-appRed text-sm md:text-base font-medium">
              Have Any Questions?
            </span>
            <br />
            <a
              href="tel:+2348036811155"
              className="text-base sm:text-xl font-bold hover:text-appRed block mt-1 transition-colors"
            >
              +234 803 681 1155
            </a>
            <a
              href="https://wa.me/2348036811155"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-xs text-emerald-400 hover:text-emerald-300 mt-1"
            >
              Chat on WhatsApp →
            </a>
          </div>
          <div className="md:w-1/4">
            <span className="text-appRed text-sm md:text-base font-medium">
              Send Email
            </span>
            <br />
            <a
              href="mailto:info@citychurchcalabar.org"
              className="text-sm sm:text-base font-bold hover:text-appRed block mt-1 transition-colors"
            >
              info@citychurchcalabar.org
            </a>
          </div>
        </div>
      </div>
      <div className="relative text-appGhost flex flex-col gap-12 md:gap-4 md:flex-row justify-between px-4 sm:px-12 md:px-20 py-10">
        <div className="md:w-1/3">
          <h2 className="text-base sm:text-lg md:text-xl font-bold mb-4 text-white">
            Connect
          </h2>
          <p className="text-sm mb-4 max-w-[36ch] text-gray-300">
            Follow our journey and stay updated with teachings, events, and community stories.
          </p>
          <div className="flex gap-2">
            {socials.map((link, index) => (
              <SocialLink key={index} href={link.href} type={link.type} />
            ))}
          </div>
        </div>
        <div className="md:w-1/3">
          <h2 className="text-base sm:text-lg md:text-xl font-bold mb-4 text-white">
            Quick Links
          </h2>
          <ul className="grid grid-cols-2 gap-2 text-sm sm:text-base font-medium">
            <li className="hover:text-appRed transition-colors">
              <Link href={"/about"}>About</Link>
            </li>
            <li className="hover:text-appRed transition-colors">
              <Link href={"/live"}>Watch</Link>
            </li>
            <li className="hover:text-appRed transition-colors">
              <Link href={"/small-groups"}>Small Groups</Link>
            </li>
            <li className="hover:text-appRed transition-colors">
              <Link href={"/ministries"}>Ministries</Link>
            </li>
            <li className="hover:text-appRed transition-colors">
              <Link href={"/events"}>Events</Link>
            </li>
            <li className="hover:text-appRed transition-colors">
              <Link href={"/prayer-request"}>Prayer</Link>
            </li>
            <li className="hover:text-appRed transition-colors">
              <Link href={"/giving"}>Give</Link>
            </li>
            <li className="hover:text-appRed transition-colors">
              <Link href={"/contact"}>Contact</Link>
            </li>
          </ul>
        </div>
        <div className="md:w-1/3">
          <h2 className="text-base sm:text-lg md:text-2xl font-bold sm:mb-6">
            Newsletter
          </h2>
          <p className="text-sm sm:text-lg mb-6 max-w-[40ch]">
            Stay tuned to receive updates about us right in your email when you
            subscribe.
          </p>
          <div className="bg-appBorderGray h-12 text-sm md:text-base md:h-20 p-2 rounded-md">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex gap-2 w-full h-full"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="w-full h-full">
                      <FormControl>
                        <Input
                          className="border-0 h-full appearance-none outline-none"
                          placeholder="Enter your email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="bg-appRed h-full rounded disabled:bg-appRed/50"
                  disabled={loading}
                >
                  {loading ? "Subscribing..." : "Subscribe"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
