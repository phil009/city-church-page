"use client";
import Image from "next/image";
import React from "react";
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

const Footer = () => {
  const formSchema = z.object({
    username: z.string().min(2).max(50),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
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
        src={"/images/footer_bg.jpeg"}
        alt="map"
        width={1000}
        height={1000}
        className="w-full h-full absolute top-0 left-0"
      />
      <div className="relative px-4 sm:px-12 md:px-20 py-12 border-b border-appBorderGray">
        <div className="flex flex-col gap-4 md:flex-row justify-between md:items-center w-full">
          <div className="md:w-1/3">
            <div className="max-w-64">
              <Logo />
            </div>
          </div>
          <div className="md:w-1/3">
            <span className="text-appRed text-base md:text-xl">
              Have Any Question?{" "}
            </span>{" "}
            <br />
            <b className="md:text-2xl">+234 803 681 1155</b>
          </div>
          <div className="md:w-1/3">
            <span className="text-appRed text-base md:text-xl">Send Email</span>{" "}
            <br />
            <b className="md:text-2xl">info@citychurchcalabar.org</b>
          </div>
        </div>
      </div>
      <div className="relative text-appGhost flex flex-col gap-12 md:gap-4 md:flex-row justify-between px-4 sm:px-12 md:px-20 py-10">
        <div className="md:w-1/3">
          <p className="text-sm sm:text-base mb-6 max-w-[40ch]">
            We are a Life Development Church with practical teachings and loving
            relationships, led by Tony Aleogena-Raphael
          </p>
          <div className="flex gap-2">
            {socials.map((link, index) => (
              <SocialLink key={index} href={link.href} type={link.type} />
            ))}
          </div>
        </div>
        <div className="md:w-1/3">
          <h2 className="text-base sm:text-lg md:text-2xl font-bold mb-6">
            Explore
          </h2>
          <ul className="grid grid-cols-2 gap-2 uppercase text-sm sm:text-base md:text-lg font-medium">
            <li>
              <Link href={"/about"}>About</Link>
            </li>
            <li>
              <Link href={"/ministries"}>Ministries</Link>
            </li>
            <li>
              <Link href={"/events"}>Events</Link>
            </li>
            <li>
              <Link href={"/store"}>Store</Link>
            </li>
            <li>
              <Link href={"/giving"}>Giving</Link>
            </li>
            <li>
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
                  name="username"
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
                <Button type="submit" className="bg-appRed h-full rounded">
                  Subscribe
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
