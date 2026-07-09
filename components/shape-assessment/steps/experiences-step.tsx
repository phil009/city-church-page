"use client";

import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { type ShapeFormValues } from "@/lib/validations/shape-schema";

const EXPERIENCE_FIELDS = [
  {
    name: "expEducation" as const,
    label: "1. Educational Experiences",
    placeholder:
      "Degrees, courses, certifications, self-study — anything significant in your educational journey…",
  },
  {
    name: "expMinistry" as const,
    label: "2. Ministry Experiences",
    placeholder:
      "Church involvement, mission trips, small groups, leadership roles, volunteer work…",
  },
  {
    name: "expPainful" as const,
    label: "3. Painful Experiences",
    placeholder:
      "Losses, challenges, hardships — the difficult seasons God has brought you through…",
  },
  {
    name: "expSpiritual" as const,
    label: "4. Spiritual Experiences",
    placeholder:
      "Conversion, key moments of spiritual growth, answered prayers, encounters with God…",
  },
];

export default function ExperiencesStep() {
  const form = useFormContext<ShapeFormValues>();

  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-500 leading-relaxed">
        One of the most overlooked factors in determining the ministry God has for
        you is your past experience — particularly the hurts and problems you&rsquo;ve
        overcome with God&rsquo;s help. Our greatest life messages often come out of our
        weaknesses, not our strengths.
      </p>

      {EXPERIENCE_FIELDS.map(({ name, label, placeholder }) => (
        <FormField
          key={name}
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-semibold text-appDark">
                {label}
              </FormLabel>
              <FormControl>
                <Textarea
                  rows={5}
                  placeholder={placeholder}
                  className="bg-gray-50 border-0 resize-none focus-visible:ring-1 focus-visible:ring-appRed"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
    </div>
  );
}
