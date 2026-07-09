"use client";

import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
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
                    <label
                      key={ability}
                      onClick={() => toggle(ability)}
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
                      <span className="leading-snug">{ability}</span>
                    </label>
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
