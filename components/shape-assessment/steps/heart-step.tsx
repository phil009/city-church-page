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
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

function CheckIcon({ checked }: { checked: boolean }) {
  return (
    <div
      className={cn(
        "h-4 w-4 shrink-0 rounded-sm border transition-colors",
        checked
          ? "bg-appRed border-appRed flex items-center justify-center"
          : "border-gray-300 bg-white"
      )}
    >
      {checked && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
    </div>
  );
}
import { PASSIONS, PEOPLE_GROUPS, CAUSES } from "@/data/shape-data";
import { type ShapeFormValues } from "@/lib/validations/shape-schema";

function SectionDivider({ label }: { label: string }) {
  return (
    <h4 className="flex items-center gap-3 text-xs font-bold text-appDark uppercase tracking-widest mt-8 mb-4">
      {label}
      <span className="flex-1 h-px bg-appGhost" />
    </h4>
  );
}

function CheckboxList({
  name,
  items,
}: {
  name: "people" | "causes";
  items: string[];
}) {
  const form = useFormContext<ShapeFormValues>();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        const selected: string[] = field.value ?? [];
        const toggle = (item: string) => {
          field.onChange(
            selected.includes(item)
              ? selected.filter((i) => i !== item)
              : [...selected, item]
          );
        };

        return (
          <FormItem>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {items.map((item) => {
                const isSelected = selected.includes(item);
                return (
                  <div
                    key={item}
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={0}
                    onClick={() => toggle(item)}
                    onKeyDown={(e) => e.key === " " && toggle(item)}
                    className={cn(
                      "flex items-center gap-2 border rounded-lg px-3 py-2 cursor-pointer text-sm transition-colors select-none",
                      isSelected
                        ? "border-appRed bg-red-50 text-appDark"
                        : "border-appGhost hover:border-gray-300 text-gray-600"
                    )}
                  >
                    <CheckIcon checked={isSelected} />
                    <span className="leading-snug">{item}</span>
                  </div>
                );
              })}
            </div>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}

export default function HeartStep() {
  const form = useFormContext<ShapeFormValues>();

  return (
    <div>
      <p className="text-sm text-gray-500 leading-relaxed mb-2">
        The Bible uses &ldquo;heart&rdquo; to represent the centre of your motivation and
        desires. Work through the exercises below to define your passions.
      </p>

      {/* Passions */}
      <SectionDivider label="What drives you? Select all that apply" />
      <FormField
        control={form.control}
        name="passions"
        render={({ field }) => {
          const selected: string[] = field.value ?? [];
          const toggle = (title: string) => {
            field.onChange(
              selected.includes(title)
                ? selected.filter((p) => p !== title)
                : [...selected, title]
            );
          };

          return (
            <FormItem>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {PASSIONS.map((p) => {
                  const isSelected = selected.includes(p.title);
                  return (
                    <div
                      key={p.title}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={0}
                      onClick={() => toggle(p.title)}
                      onKeyDown={(e) => e.key === " " && toggle(p.title)}
                      className={cn(
                        "border rounded-xl px-4 py-3 cursor-pointer transition-all select-none",
                        isSelected
                          ? "border-appRed bg-red-50"
                          : "border-appGhost hover:border-gray-300"
                      )}
                    >
                      <div className="flex items-start gap-2">
                        <CheckIcon checked={isSelected} />
                        <div>
                          <p className="text-sm font-semibold text-appDark leading-tight">
                            {p.title}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5 leading-snug">
                            {p.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <FormMessage />
            </FormItem>
          );
        }}
      />

      {/* People Groups */}
      <SectionDivider label="The people I would most like to serve" />
      <CheckboxList name="people" items={PEOPLE_GROUPS} />

      {/* Causes */}
      <SectionDivider label="Issues or causes I feel most strongly about" />
      <CheckboxList name="causes" items={CAUSES} />

      {/* Reflection question */}
      <SectionDivider label="Reflection" />
      <FormField
        control={form.control}
        name="heartServing"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm font-semibold text-appDark">
              What is the serving opportunity that excites you the most?{" "}
              <span className="text-appRed">*</span>
            </FormLabel>
            <FormControl>
              <Textarea
                rows={4}
                placeholder="Describe the kind of service that excites you most…"
                className="bg-gray-50 border-0 resize-none focus-visible:ring-1 focus-visible:ring-appRed"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
