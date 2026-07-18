"use client";

import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
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
import { ABILITIES } from "@/data/shape-data";
import { type ShapeFormValues } from "@/lib/validations/shape-schema";

export default function AbilitiesStep() {
  const form = useFormContext<ShapeFormValues>();

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500 leading-relaxed">
        Select the talents or skills in which you have proven ability and that you
        enjoy doing. Be honest — you are not making a commitment to serve in any of
        these areas.
      </p>

      <FormField
        control={form.control}
        name="abilities"
        render={({ field }) => {
          const selected: string[] = field.value ?? [];
          const toggle = (ability: string) => {
            field.onChange(
              selected.includes(ability)
                ? selected.filter((a) => a !== ability)
                : [...selected, ability]
            );
          };

          return (
            <FormItem>
              <p className="text-xs text-gray-400 mb-3">
                {selected.length} selected
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {ABILITIES.map((ability) => {
                  const isSelected = selected.includes(ability);
                  return (
                    <div
                      key={ability}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={0}
                      onClick={() => toggle(ability)}
                      onKeyDown={(e) => e.key === " " && toggle(ability)}
                      className={cn(
                        "flex items-center gap-2 border rounded-lg px-3 py-2 cursor-pointer text-sm transition-colors select-none",
                        isSelected
                          ? "border-appRed bg-red-50 text-appDark"
                          : "border-appGhost hover:border-gray-300 text-gray-600"
                      )}
                    >
                      <CheckIcon checked={isSelected} />
                      <span className="leading-snug">{ability}</span>
                    </div>
                  );
                })}
              </div>
              <FormMessage />
            </FormItem>
          );
        }}
      />
    </div>
  );
}
