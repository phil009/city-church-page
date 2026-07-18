"use client";

import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { type ShapeFormValues } from "@/lib/validations/shape-schema";

export default function PersonalInfoStep() {
  const form = useFormContext<ShapeFormValues>();

  return (
    <div className="space-y-6">
      {/* Intro card */}
      <div className="bg-appDark text-white rounded-xl p-5 space-y-2">
        <h3 className="text-base font-semibold">Welcome to the S.H.A.P.E. Assessment</h3>
        <p className="text-sm opacity-70 leading-relaxed">
          This assessment helps you discover how God has uniquely shaped you for
          service. It covers your{" "}
          <span className="text-appRed font-medium">Spiritual Gifts</span>,{" "}
          <span className="text-appRed font-medium">Heart</span>,{" "}
          <span className="text-appRed font-medium">Abilities</span>,{" "}
          <span className="text-appRed font-medium">Personality</span>, and{" "}
          <span className="text-appRed font-medium">Experiences</span>. Set aside
          at least 90 minutes and complete it in one sitting for the most accurate
          reflection.
        </p>
        <p className="text-xs opacity-50 pt-1">
          &ldquo;For we are God&rsquo;s masterpiece, created in Christ Jesus to do good
          works.&rdquo; — Ephesians 2:10
        </p>
      </div>

      {/* Name row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-appDark">
                First Name <span className="text-appRed">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Your first name"
                  className="bg-gray-50 border-0 focus-visible:ring-1 focus-visible:ring-appRed"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-appDark">
                Last Name <span className="text-appRed">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Your last name"
                  className="bg-gray-50 border-0 focus-visible:ring-1 focus-visible:ring-appRed"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Email + Phone row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-appDark">
                Email Address <span className="text-appRed">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  className="bg-gray-50 border-0 focus-visible:ring-1 focus-visible:ring-appRed"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-appDark">
                Phone Number{" "}
                <span className="text-gray-400 font-normal">(optional)</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  placeholder="+234 800 000 0000"
                  className="bg-gray-50 border-0 focus-visible:ring-1 focus-visible:ring-appRed"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
