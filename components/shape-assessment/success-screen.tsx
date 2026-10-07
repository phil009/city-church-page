"use client";

import { DISC_TYPES } from "@/data/shape-data";
import { computeMinistryMatches, type DiscKey } from "@/lib/shape-assessment/scoring";
import { type ShapeFormValues } from "@/lib/validations/shape-schema";

interface Props {
  data: ShapeFormValues;
  topGifts: { name: string; score: number }[];
  primaryDiscType: DiscKey;
  p16Code: string;
  p16Info: { name: string; role: string; desc: string } | undefined;
}

export default function SuccessScreen({
  data,
  topGifts,
  primaryDiscType,
  p16Code,
  p16Info,
}: Props) {
  const matches = computeMinistryMatches(
    topGifts.map((g) => g.name),
    primaryDiscType,
    p16Code,
    data.passions ?? [],
    data.people ?? [],
    data.causes ?? [],
    data.abilities ?? [],
  );

  return (
    <div className="max-w-2xl mx-auto space-y-8 py-10 px-4">
      {/* Check mark */}
      <div className="text-center">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-appDark mb-2">
          Assessment Submitted!
        </h2>
        <p className="text-gray-500 text-sm leading-relaxed">
          Thank you,{" "}
          <span className="font-semibold text-appDark">{data.firstName}</span>.
          Here is a snapshot of your S.H.A.P.E. profile and your top ministry
          matches.
        </p>
      </div>

      {/* Profile snapshot */}
      <div className="border border-appGhost rounded-xl overflow-hidden">
        <div className="bg-appDark px-5 py-3">
          <p className="text-xs font-bold text-white uppercase tracking-widest">
            Your S.H.A.P.E. Snapshot
          </p>
        </div>
        <div className="divide-y divide-appGhost">
          {/* Gifts */}
          <div className="px-5 py-4">
            <p className="text-xs font-bold text-appDark uppercase tracking-widest mb-2">
              S — Spiritual Gifts
            </p>
            <div className="space-y-1">
              {topGifts.slice(0, 3).map((g, i) => (
                <div key={g.name} className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-appRed text-white text-xs font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-sm text-appDark font-medium">{g.name}</span>
                  <span className="text-xs text-gray-400 ml-auto">{g.score}/9</span>
                </div>
              ))}
            </div>
          </div>

          {/* DISC */}
          <div className="px-5 py-4">
            <p className="text-xs font-bold text-appDark uppercase tracking-widest mb-2">
              P — Personality (DISC)
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-semibold text-appDark">
                {primaryDiscType} — {DISC_TYPES[primaryDiscType].name}
              </span>
              <span className="text-gray-400 text-xs ml-2">
                {DISC_TYPES[primaryDiscType].desc}
              </span>
            </p>
          </div>

          {/* 16P */}
          <div className="px-5 py-4">
            <p className="text-xs font-bold text-appDark uppercase tracking-widest mb-2">
              P — 16 Personalities
            </p>
            {p16Info ? (
              <div>
                <p className="text-sm font-semibold text-appDark">
                  {p16Code} — {p16Info.name}
                  <span className="ml-2 text-xs font-normal text-appRed">
                    {p16Info.role}
                  </span>
                </p>
                <p className="text-xs text-gray-500 mt-0.5">{p16Info.desc}</p>
              </div>
            ) : (
              <p className="text-sm text-appDark font-semibold">{p16Code}</p>
            )}
          </div>
        </div>
      </div>

      {/* Ministry matches */}
      <div>
        <p className="text-xs font-bold text-appDark uppercase tracking-widest mb-4">
          Your Top Ministry Matches
        </p>
        <div className="space-y-3">
          {matches.map((m, i) => (
            <div
              key={m.unit.name}
              className="border border-appGhost rounded-xl overflow-hidden"
            >
              <div className="flex items-center gap-3 px-4 py-3 bg-appOffWhite border-b border-appGhost">
                <span className="w-7 h-7 rounded-full bg-appRed text-white text-xs font-bold flex items-center justify-center shrink-0">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-appDark leading-tight">
                    {m.unit.name}
                  </p>
                  <p className="text-xs text-gray-400">{m.unit.team}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-lg font-bold text-appRed">{m.pct}%</p>
                  <p className="text-[10px] text-gray-400">match</p>
                </div>
              </div>
              {/* Match bar */}
              <div className="px-4 pt-3 pb-1">
                <div className="h-1.5 w-full bg-appGhost rounded-full overflow-hidden mb-3">
                  <div
                    className="h-full bg-appRed rounded-full transition-all duration-700"
                    style={{ width: `${m.pct}%` }}
                  />
                </div>
                {/* Reason tags */}
                <div className="flex flex-wrap gap-1.5 pb-3">
                  {m.reasons.map((r) => (
                    <span
                      key={r}
                      className="text-xs px-2 py-0.5 bg-red-50 border border-appRed/20 rounded-full text-appDark"
                    >
                      {r}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scripture */}
      <p className="text-sm italic text-gray-400 text-center">
        &ldquo;For we are God&rsquo;s masterpiece. He has created us anew in
        Christ Jesus, so we can do the good things he planned for us long
        ago.&rdquo;
        <br />— Ephesians 2:10
      </p>
    </div>
  );
}
