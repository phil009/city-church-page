"use client";

import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
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
                  <label
                    key={item}
                    onClick={() => toggle(item)}
                    className={cn(
                      "flex items-center gap-2 border rounded-lg px-3 py-2 cursor-pointer text-sm transition-colors select-none",
                      isSelected
                        ? "border-appRed bg-red-50 text-appDark"
                        : "border-appGhost hover:border-gray-300 text-gray-600"
                    )}
                  >
                    <Checkbox
                      checked={isSelected}
                      className="data-[state=checked]:bg-appRed data-[state=checked]:border-appRed shrink-0 pointer-events-none"
                    />
                    <span className="leading-snug">{item}</span>
                  </label>
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
                    <label
                      key={p.title}
                      onClick={() => toggle(p.title)}
                      className={cn(
                        "border rounded-xl px-4 py-3 cursor-pointer transition-all select-none",
                        isSelected
                          ? "border-appRed bg-red-50"
                          : "border-appGhost hover:border-gray-300"
                      )}
                    >
                      <div className="flex items-start gap-2">
                        <Checkbox
                          checked={isSelected}
                          className="data-[state=checked]:bg-appRed data-[state=checked]:border-appRed shrink-0 mt-0.5 pointer-events-none"
                        />
                        <div>
                          <p className="text-sm font-semibold text-appDark leading-tight">
                            {p.title}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5 leading-snug">
                            {p.desc}
                          </p>
                        </div>
                      </div>
                    </label>
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

      {/* Reflection questions */}
      <SectionDivider label="Reflection questions" />
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="heartServing"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-semibold text-appDark">
                What serving opportunity would you most enjoy?{" "}
                <span className="text-appRed">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  rows={3}
                  placeholder="Describe the kind of service that excites you most…"
                  className="bg-gray-50 border-0 resize-none focus-visible:ring-1 focus-visible:ring-appRed"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="heartExperience"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-semibold text-appDark">
                Five areas where you currently or previously serve
              </FormLabel>
              <FormControl>
                <Textarea
                  rows={4}
                  placeholder={"1.\n2.\n3.\n4.\n5."}
                  className="bg-gray-50 border-0 resize-none focus-visible:ring-1 focus-visible:ring-appRed"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="heartInfluence"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-semibold text-appDark">
                Who do you most feel called to influence for God?
              </FormLabel>
              <FormControl>
                <Textarea
                  rows={3}
                  placeholder="Describe the people you feel most called to serve…"
                  className="bg-gray-50 border-0 resize-none focus-visible:ring-1 focus-visible:ring-appRed"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="heartDream"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-semibold text-appDark">
                What dream would release your passions to serve God?
              </FormLabel>
              <FormControl>
                <Textarea
                  rows={3}
                  placeholder="What pursuit would you love to undertake for God's kingdom?…"
                  className="bg-gray-50 border-0 resize-none focus-visible:ring-1 focus-visible:ring-appRed"
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
