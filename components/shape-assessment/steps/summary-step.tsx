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
import { DISC_TYPES } from "@/data/shape-data";
import { type ShapeFormValues } from "@/lib/validations/shape-schema";

type DiscKey = "D" | "I" | "S" | "C";
const DISC_COLS: DiscKey[] = ["D", "I", "S", "C"];

interface Props {
  topGifts: { name: string; score: number }[];
  discScores: Record<DiscKey, number>;
  primaryDiscType: DiscKey;
}

export default function SummaryStep({
  topGifts,
  discScores,
  primaryDiscType,
}: Props) {
  const form = useFormContext<ShapeFormValues>();
  const passions: string[] = form.watch("passions") ?? [];
  const abilities: string[] = form.watch("abilities") ?? [];
  const people: string[] = form.watch("people") ?? [];
  const causes: string[] = form.watch("causes") ?? [];

  return (
    <div className="space-y-5">
      {/* Intro card */}
      <div className="bg-appDark text-white rounded-xl p-5">
        <h3 className="text-base font-semibold mb-1">
          Almost there — here&rsquo;s a snapshot of your S.H.A.P.E.
        </h3>
        <p className="text-sm opacity-60">
          Review your profile below before submitting. Our team will follow up
          with guidance on serving opportunities that fit how God has uniquely
          designed you.
        </p>
      </div>

      {/* Top 3 gifts */}
      <div className="border border-appGhost rounded-xl overflow-hidden">
        <div className="bg-appOffWhite px-4 py-2 border-b border-appGhost">
          <p className="text-xs font-bold text-appDark uppercase tracking-widest">
            S — Top Spiritual Gifts
          </p>
        </div>
        <div className="p-4 space-y-2">
          {topGifts.length === 0 ? (
            <p className="text-sm text-gray-400 italic">
              No gift answers recorded yet
            </p>
          ) : (
            topGifts.map((g, i) => (
              <div
                key={g.name}
                className="flex items-center gap-3 py-1"
              >
                <span className="w-7 h-7 rounded-full bg-appRed text-white text-xs font-bold flex items-center justify-center shrink-0">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-appDark truncate">
                    {g.name}
                  </p>
                </div>
                <span className="text-xs text-gray-400 shrink-0">
                  {g.score}/21
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* DISC profile */}
      <div className="border border-appGhost rounded-xl overflow-hidden">
        <div className="bg-appOffWhite px-4 py-2 border-b border-appGhost">
          <p className="text-xs font-bold text-appDark uppercase tracking-widest">
            P — Personality (DISC)
          </p>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-4 gap-2 mb-3">
            {DISC_COLS.map((type) => (
              <div
                key={type}
                className={cn(
                  "rounded-xl p-2 text-center border transition-colors",
                  type === primaryDiscType
                    ? "bg-appDark text-white border-appDark"
                    : "bg-white border-appGhost text-appDark"
                )}
              >
                <p className="text-xl font-bold">{discScores[type]}</p>
                <p className={cn("text-xs font-semibold", type === primaryDiscType ? "opacity-70" : "opacity-50")}>
                  {type}
                </p>
              </div>
            ))}
          </div>
          {discScores[primaryDiscType] > 0 && (
            <p className="text-xs text-gray-500">
              Primary type:{" "}
              <span className="font-semibold text-appDark">
                {primaryDiscType} — {DISC_TYPES[primaryDiscType].name}
              </span>
            </p>
          )}
        </div>
      </div>

      {/* Heart summary */}
      <div className="border border-appGhost rounded-xl overflow-hidden">
        <div className="bg-appOffWhite px-4 py-2 border-b border-appGhost">
          <p className="text-xs font-bold text-appDark uppercase tracking-widest">
            H — Heart
          </p>
        </div>
        <div className="p-4 space-y-2 text-sm">
          <p className="text-gray-500">
            <span className="font-medium text-appDark">Passions: </span>
            {passions.length > 0
              ? passions.join(", ")
              : <span className="italic text-gray-400">None selected</span>}
          </p>
          <p className="text-gray-500">
            <span className="font-medium text-appDark">People groups: </span>
            {people.length > 0
              ? `${people.length} selected`
              : <span className="italic text-gray-400">None selected</span>}
          </p>
          <p className="text-gray-500">
            <span className="font-medium text-appDark">Causes: </span>
            {causes.length > 0
              ? `${causes.length} selected`
              : <span className="italic text-gray-400">None selected</span>}
          </p>
        </div>
      </div>

      {/* Abilities summary */}
      <div className="border border-appGhost rounded-xl overflow-hidden">
        <div className="bg-appOffWhite px-4 py-2 border-b border-appGhost">
          <p className="text-xs font-bold text-appDark uppercase tracking-widest">
            A — Abilities
          </p>
        </div>
        <div className="p-4">
          {abilities.length === 0 ? (
            <p className="text-sm text-gray-400 italic">None selected</p>
          ) : (
            <>
              <p className="text-sm text-gray-500 mb-2">
                {abilities.length} selected
              </p>
              <div className="flex flex-wrap gap-1.5">
                {abilities.map((a) => (
                  <span
                    key={a}
                    className="text-xs px-2 py-0.5 bg-red-50 border border-appRed/20 rounded-full text-appDark"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Consent notice */}
      <div className="bg-appOffWhite border border-appGhost rounded-xl p-4">
        <p className="text-xs text-gray-500 leading-relaxed">
          By submitting this assessment, you agree to allow our team to review
          your S.H.A.P.E. profile and follow up with guidance about service
          opportunities that fit how God has uniquely designed you.
        </p>
      </div>

      {/* Additional comments */}
      <FormField
        control={form.control}
        name="additionalComments"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm font-semibold text-appDark">
              Additional Comments{" "}
              <span className="text-gray-400 font-normal">(optional)</span>
            </FormLabel>
            <FormControl>
              <Textarea
                rows={3}
                placeholder="Is there anything else you would like to share with us?"
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
