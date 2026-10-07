"use client";

import { cn } from "@/lib/utils";
import { SHAPE_STEPS } from "@/data/shape-data";

export default function ShapeStepBar({ current }: { current: number }) {
  return (
    <>
      <div className="hidden sm:flex items-center justify-between mb-8">
        {SHAPE_STEPS.map((step, idx) => {
          const isCompleted = current > step.id;
          const isCurrent = current === step.id;
          return (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center gap-1">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300",
                    isCurrent
                      ? "bg-appRed text-white scale-110 shadow-md"
                      : isCompleted
                        ? "bg-appRed text-white opacity-60"
                        : "bg-appGhost text-gray-400",
                  )}
                >
                  {step.letter ?? step.id}
                </div>
                <span
                  className={cn(
                    "text-[10px] text-center leading-tight transition-colors whitespace-nowrap",
                    isCurrent
                      ? "text-appRed font-semibold"
                      : isCompleted
                        ? "text-gray-400"
                        : "text-gray-300",
                  )}
                >
                  {step.label}
                </span>
              </div>
              {idx < SHAPE_STEPS.length - 1 && (
                <div
                  className={cn(
                    "flex-1 h-0.5 mx-1 transition-colors duration-300",
                    current > step.id ? "bg-appRed opacity-60" : "bg-appGhost",
                  )}
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="sm:hidden flex items-center justify-between mb-6">
        <p className="text-xs text-gray-500">
          Step <span className="font-semibold text-appDark">{current}</span> of{" "}
          {SHAPE_STEPS.length}
        </p>
        <p className="text-xs font-semibold text-appRed">
          {SHAPE_STEPS[current - 1]?.letter
            ? `${SHAPE_STEPS[current - 1].letter} — `
            : ""}
          {SHAPE_STEPS[current - 1]?.label}
        </p>
      </div>

      <div className="h-1 w-full bg-appGhost rounded-full overflow-hidden mb-6">
        <div
          className="h-full bg-appRed rounded-full transition-all duration-500"
          style={{
            width: `${((current - 1) / (SHAPE_STEPS.length - 1)) * 100}%`,
          }}
        />
      </div>
    </>
  );
}
