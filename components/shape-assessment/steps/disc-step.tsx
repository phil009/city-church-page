"use client";

import { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { DISC_ROWS, DISC_TYPES } from "@/data/shape-data";
import { type ShapeFormValues } from "@/lib/validations/shape-schema";

type DiscKey = "D" | "I" | "S" | "C";
const DISC_COLS: DiscKey[] = ["D", "I", "S", "C"];

export default function DiscStep() {
  const form = useFormContext<ShapeFormValues>();
  const discWatchRaw = form.watch("disc");
  const discWatch = useMemo(() => discWatchRaw ?? {}, [discWatchRaw]);

  const scores = useMemo(() => {
    const s: Record<DiscKey, number> = { D: 0, I: 0, S: 0, C: 0 };
    Object.values(discWatch).forEach((v) => {
      if (v in s) s[v as DiscKey]++;
    });
    return s;
  }, [discWatch]);

  const primaryType = useMemo(
    () => (DISC_COLS.reduce((a, b) => (scores[a] >= scores[b] ? a : b)) as DiscKey),
    [scores]
  );

  const answered = Object.keys(discWatch).length;

  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-500 leading-relaxed">
        In each row below, select the word that best describes you right now. Your
        highest column score is your predominant personality type.
      </p>

      {/* Progress indicator */}
      <div className="flex items-center justify-between text-xs text-gray-400">
        <span>{answered} of 24 rows answered</span>
        {answered === 24 && (
          <span className="text-green-600 font-medium">Complete ✓</span>
        )}
      </div>

      {/* Column header */}
      <div className="grid grid-cols-5 gap-1 text-center text-xs font-bold text-gray-400 uppercase tracking-widest pb-1 border-b border-appGhost">
        <span className="text-left pl-1">#</span>
        <span>D</span>
        <span>I</span>
        <span>S</span>
        <span>C</span>
      </div>

      <FormField
        control={form.control}
        name="disc"
        render={({ field }) => {
          const discVal: Record<string, DiscKey> = field.value ?? {};
          const setRow = (row: number, type: DiscKey) => {
            field.onChange({ ...discVal, [String(row)]: type });
          };

          return (
            <FormItem>
              <div className="divide-y divide-appGhost">
                {DISC_ROWS.map((row) => {
                  const sel = discVal[String(row.row)];
                  return (
                    <div
                      key={row.row}
                      className="grid grid-cols-5 gap-1 items-center py-2"
                    >
                      <span className="text-xs text-gray-400 pl-1">
                        {row.row}
                      </span>
                      {DISC_COLS.map((type) => {
                        const word = row[type];
                        const isSelected = sel === type;
                        return (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setRow(row.row, type)}
                            className={cn(
                              "px-1 py-1.5 rounded-lg border text-xs font-medium text-center transition-all leading-tight",
                              isSelected
                                ? "border-appRed bg-appRed text-white"
                                : "border-appGhost text-appDark hover:border-gray-400"
                            )}
                          >
                            {word}
                          </button>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
              <FormMessage />
            </FormItem>
          );
        }}
      />

      {/* Live score display */}
      <div className="pt-4">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
          Your Scores
        </p>
        <div className="grid grid-cols-4 gap-3">
          {DISC_COLS.map((type) => {
            const isPrimary = type === primaryType && answered > 0;
            const meta = DISC_TYPES[type];
            return (
              <div
                key={type}
                className={cn(
                  "rounded-xl p-3 text-center border transition-colors",
                  isPrimary
                    ? "bg-appDark text-white border-appDark"
                    : "bg-white border-appGhost text-appDark"
                )}
              >
                <p className="text-2xl font-bold">{scores[type]}</p>
                <p
                  className={cn(
                    "text-xs font-semibold mt-0.5",
                    isPrimary ? "opacity-80" : "opacity-60"
                  )}
                >
                  {type}
                </p>
                <p
                  className={cn(
                    "text-xs mt-1 leading-tight hidden sm:block",
                    isPrimary ? "opacity-60" : "opacity-40"
                  )}
                >
                  {meta.name}
                </p>
              </div>
            );
          })}
        </div>

        {answered > 0 && (
          <div className="mt-4 bg-appOffWhite rounded-xl p-4 border border-appGhost">
            <p className="text-xs font-bold text-appDark uppercase tracking-widest mb-1">
              {primaryType} — {DISC_TYPES[primaryType].name} (
              {DISC_TYPES[primaryType].animal})
            </p>
            <p className="text-sm text-gray-500 leading-relaxed">
              {DISC_TYPES[primaryType].desc}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
