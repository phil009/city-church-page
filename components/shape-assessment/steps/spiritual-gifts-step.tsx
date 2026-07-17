"use client";

import { useFormContext, useController } from "react-hook-form";
import { useEffect, useRef } from "react";
import { FormMessage, FormItem, FormField } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { GIFT_CATEGORIES, GIFT_QUESTIONS } from "@/data/shape-data";
import { type ShapeFormValues } from "@/lib/validations/shape-schema";

interface Props {
  giftPage: number;
  setGiftPage: (page: number) => void;
  onOuterBack: () => void;
  onOuterNext: () => void;
}

function QuestionRating({ qNum }: { qNum: number }) {
  const { field } = useController<ShapeFormValues>({
    name: `spiritualGifts.${qNum}` as "spiritualGifts",
  });

  const val = field.value as number | undefined;

  return (
    <div className="flex gap-1.5 shrink-0">
      {[0, 1, 2, 3].map((v) => (
        <button
          key={v}
          type="button"
          onClick={() => field.onChange(v)}
          className={cn(
            "w-9 h-9 rounded-full text-xs font-bold border transition-all",
            val === v
              ? "bg-appRed text-white border-appRed"
              : "border-appGhost text-gray-400 hover:border-gray-400"
          )}
        >
          {v}
        </button>
      ))}
    </div>
  );
}

export default function SpiritualGiftsStep({
  giftPage,
  setGiftPage,
  onOuterBack,
  onOuterNext,
}: Props) {
  const form = useFormContext<ShapeFormValues>();
  const category = GIFT_CATEGORIES[giftPage];
  const giftsWatch = form.watch("spiritualGifts") ?? {};

  const answeredInCategory = category.questions.filter(
    (q) => giftsWatch[String(q)] !== undefined
  ).length;

  const totalAnswered = GIFT_CATEGORIES.flatMap((c) => c.questions).filter(
    (q) => giftsWatch[String(q)] !== undefined
  ).length;

  const categoryComplete = answeredInCategory === 3;
  const advancedRef = useRef(false);

  useEffect(() => {
    if (categoryComplete && !advancedRef.current) {
      advancedRef.current = true;
      const timer = setTimeout(() => {
        if (giftPage === GIFT_CATEGORIES.length - 1) {
          onOuterNext();
        } else {
          setGiftPage(giftPage + 1);
        }
      }, 300);
      return () => clearTimeout(timer);
    }
    if (!categoryComplete) {
      advancedRef.current = false;
    }
  }, [categoryComplete, giftPage, onOuterNext, setGiftPage]);

  const handlePrev = () => {
    if (giftPage === 0) {
      onOuterBack();
    } else {
      setGiftPage(giftPage - 1);
    }
  };

  const handleNext = () => {
    if (giftPage === GIFT_CATEGORIES.length - 1) {
      onOuterNext();
    } else {
      setGiftPage(giftPage + 1);
    }
  };

  return (
    <div className="space-y-4">
      {/* Overall progress */}
      <div className="flex items-center justify-between text-xs text-gray-400">
        <span>
          Category {giftPage + 1} of {GIFT_CATEGORIES.length}
        </span>
        <span>{totalAnswered} / 96 answered</span>
      </div>

      {/* Category progress bar */}
      <div className="h-1 w-full bg-appGhost rounded-full overflow-hidden">
        <div
          className="h-full bg-appRed rounded-full transition-all duration-300"
          style={{
            width: `${((giftPage + 1) / GIFT_CATEGORIES.length) * 100}%`,
          }}
        />
      </div>

      {/* Scale legend */}
      <div className="bg-appOffWhite rounded-xl p-3 border border-appGhost">
        <p className="text-xs font-semibold text-appDark mb-1">
          Rating scale:
        </p>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
          <span><b className="text-appDark">3</b> = Consistently / definitely true</span>
          <span><b className="text-appDark">2</b> = Most of the time</span>
          <span><b className="text-appDark">1</b> = Some of the time</span>
          <span><b className="text-appDark">0</b> = Not at all</span>
        </div>
      </div>

      {/* Category header */}
      <div className="flex items-center gap-3 bg-appDark text-white rounded-xl px-4 py-3">
        <span className="w-8 h-8 rounded-full bg-appRed flex items-center justify-center text-sm font-bold shrink-0">
          {category.id}
        </span>
        <div>
          <p className="text-sm font-semibold">{category.name}</p>
          <p className="text-xs opacity-50">
            {answeredInCategory} / 3 answered
          </p>
        </div>
      </div>

      {/* Questions */}
      <FormField
        control={form.control}
        name="spiritualGifts"
        render={() => (
          <FormItem>
            <div className="divide-y divide-appGhost">
              {category.questions.map((qNum, idx) => (
                <div
                  key={qNum}
                  className="flex items-start sm:items-center justify-between gap-3 py-3"
                >
                  <div className="flex items-start gap-2 flex-1 min-w-0">
                    <span className="text-xs text-gray-400 shrink-0 pt-0.5 sm:pt-0 w-5 text-right">
                      {idx + 1}.
                    </span>
                    <p className="text-sm text-gray-700 leading-snug">
                      {GIFT_QUESTIONS[qNum]}
                    </p>
                  </div>
                  <QuestionRating qNum={qNum} />
                </div>
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Category navigation */}
      <div className="flex items-center justify-between pt-2 border-t border-appGhost">
        <button
          type="button"
          onClick={handlePrev}
          className="text-sm text-gray-500 hover:text-appDark transition-colors flex items-center gap-1"
        >
          ← {giftPage === 0 ? "Back to Intro" : "Previous Category"}
        </button>
        <p className="text-xs text-gray-400 italic">
          {categoryComplete ? "Moving on…" : `${3 - answeredInCategory} left`}
        </p>
      </div>
    </div>
  );
}
