"use client";

import { useController, useFormContext } from "react-hook-form";
import { FormItem, FormMessage, FormField } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { P16_QUESTIONS, type P16Dimension } from "@/data/shape-data";
import { type ShapeFormValues } from "@/lib/validations/shape-schema";

// ─── Dimension config ────────────────────────────────────────────────────────

const DIMENSIONS: Array<{
    key: P16Dimension;
    label: string;
    left: string;
    right: string;
}> = [
    { key: "E", label: "Mind", left: "Introverted", right: "Extroverted" },
    { key: "N", label: "Energy", left: "Observant", right: "Intuitive" },
    { key: "T", label: "Nature", left: "Feeling", right: "Thinking" },
    { key: "J", label: "Tactics", left: "Prospecting", right: "Judging" },
    { key: "A", label: "Identity", left: "Turbulent", right: "Assertive" },
];

// Values map left-to-right: 3=Strongly Agree → -3=Strongly Disagree
const LIKERT_VALUES = [3, 2, 1, 0, -1, -2, -3] as const;
const LIKERT_LABELS = [
    "Strongly\nAgree",
    "Agree",
    "Slightly\nAgree",
    "Neutral",
    "Slightly\nDisagree",
    "Disagree",
    "Strongly\nDisagree",
];
const LIKERT_LABELS_SHORT = ["SA", "A", "SlA", "N", "SlD", "D", "SD"];

// Graduated sizes: largest at extremes, smallest at neutral (bottom-aligned)
const CIRCLE_SIZES = [
    "w-10 h-10 sm:w-16 sm:h-16",
    "w-9 h-9 sm:w-14 sm:h-14",
    "w-8 h-8 sm:w-12 sm:h-12",
    "w-7 h-7 sm:w-9 sm:h-9",
    "w-8 h-8 sm:w-12 sm:h-12",
    "w-9 h-9 sm:w-14 sm:h-14",
    "w-10 h-10 sm:w-16 sm:h-16",
];

// ─── Single question Likert row ───────────────────────────────────────────────

function P16Question({ qId }: { qId: number }) {
    const { field } = useController<ShapeFormValues>({
        name: `p16.${qId}` as "p16",
    });
    const val = field.value as number | undefined;

    return (
        <div className="py-4 sm:py-5 border-b h-max border-appGhost last:border-0">
            <p className="text-sm font-medium text-appDark leading-snug mb-5">
                {P16_QUESTIONS.find((q) => q.id === qId)?.text ??
                    `Question ${qId}`}
            </p>
            <div className="flex items-start justify-between">
                {LIKERT_VALUES.map((v, idx) => {
                    const isExtreme =
                        idx === 0 || idx === LIKERT_VALUES.length - 1;
                    return (
                        <button
                            key={v}
                            type="button"
                            onClick={() => field.onChange(v)}
                            className="flex flex-col items-center gap-1.5 group"
                        >
                            <div className="w-10 h-10 sm:w-16 sm:h-16 flex items-center justify-center shrink-0">
                                <div
                                    className={cn(
                                        CIRCLE_SIZES[idx],
                                        "rounded-full border-2 transition-all duration-200 shrink-0",
                                        val === v
                                            ? "bg-appRed border-appRed shadow-lg shadow-red-200/60"
                                            : "border-gray-200 hover:border-appRed/40 hover:bg-red-50",
                                    )}
                                />
                            </div>
                            {isExtreme && (
                                <>
                                    <span
                                        className={cn(
                                            "sm:hidden text-[8px] leading-none",
                                            val === v
                                                ? "text-appRed font-semibold"
                                                : "text-gray-400",
                                        )}
                                    >
                                        {LIKERT_LABELS_SHORT[idx]}
                                    </span>
                                    <span
                                        className={cn(
                                            "hidden sm:block text-[9px] leading-tight text-center whitespace-pre-line",
                                            val === v
                                                ? "text-appRed font-semibold"
                                                : "text-gray-400",
                                        )}
                                    >
                                        {LIKERT_LABELS[idx]}
                                    </span>
                                </>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

// ─── Trait bar for results display ───────────────────────────────────────────

function TraitBar({
    dimKey,
    score,
    maxScore,
}: {
    dimKey: P16Dimension;
    score: number;
    maxScore: number;
}) {
    const dim = DIMENSIONS.find((d) => d.key === dimKey)!;
    // score > 0 = toward right label; score < 0 = toward left label
    const pct =
        maxScore === 0
            ? 50
            : Math.round(((score + maxScore) / (2 * maxScore)) * 100);
    const dominantLabel = score >= 0 ? dim.right : dim.left;
    const dominantPct = score >= 0 ? pct : 100 - pct;

    return (
        <div className="mb-3">
            <div className="flex items-center justify-between text-xs font-medium text-appDark mb-1">
                <span
                    className={cn(score < 0 ? "text-appRed" : "text-gray-400")}
                >
                    {dim.left}
                </span>
                <span className="text-[10px] text-gray-400 uppercase tracking-wide">
                    {dim.label}
                </span>
                <span
                    className={cn(score >= 0 ? "text-appRed" : "text-gray-400")}
                >
                    {dim.right}
                </span>
            </div>
            <div className="h-2 bg-appGhost rounded-full overflow-hidden">
                <div
                    className="h-full bg-appRed rounded-full transition-all duration-500"
                    style={{
                        width: `${pct}%`,
                        marginLeft: score < 0 ? `${100 - pct}%` : undefined,
                    }}
                />
            </div>
            <p className="text-xs text-gray-500 mt-0.5 text-right">
                <span className="font-semibold text-appDark">
                    {dominantLabel}
                </span>{" "}
                {dominantPct}%
            </p>
        </div>
    );
}

// ─── Main component ───────────────────────────────────────────────────────────

interface Props {
    p16Page: number;
    setP16Page: (page: number) => void;
    onOuterBack: () => void;
    onOuterNext: () => void;
}

export default function Personality16Step({
    p16Page,
    setP16Page,
    onOuterBack,
    onOuterNext,
}: Props) {
    const form = useFormContext<ShapeFormValues>();
    const p16Watch = form.watch("p16") ?? {};

    const dim = DIMENSIONS[p16Page];
    const dimQuestions = P16_QUESTIONS.filter((q) => q.dimension === dim.key);
    const answeredInDim = dimQuestions.filter(
        (q) => p16Watch[String(q.id)] !== undefined,
    ).length;
    const totalAnswered = Object.keys(p16Watch).length;
    const allAnswered = totalAnswered === 60;

    // Compute per-dimension scores for trait bars
    const dimScores = DIMENSIONS.map(({ key }) => {
        const qs = P16_QUESTIONS.filter((q) => q.dimension === key);
        const raw = qs.reduce((sum, q) => {
            const v = p16Watch[String(q.id)];
            if (v === undefined) return sum;
            return sum + q.polarity * v;
        }, 0);
        const maxPossible = qs.length * 3;
        return { key, score: raw, maxScore: maxPossible };
    });

    const handlePrev = () => {
        if (p16Page === 0) onOuterBack();
        else setP16Page(p16Page - 1);
    };

    const handleNext = () => {
        if (p16Page === DIMENSIONS.length - 1) onOuterNext();
        else setP16Page(p16Page + 1);
    };

    return (
        <div className="space-y-4">
            {/* Progress */}
            <div className="flex items-center justify-between text-xs text-gray-400">
                <span>
                    Dimension {p16Page + 1} of {DIMENSIONS.length}
                </span>
                <span>{totalAnswered} / 60 answered</span>
            </div>

            {/* Dimension progress bar */}
            <div className="h-1 w-full bg-appGhost rounded-full overflow-hidden">
                <div
                    className="h-full bg-appRed rounded-full transition-all duration-300"
                    style={{
                        width: `${((p16Page + 1) / DIMENSIONS.length) * 100}%`,
                    }}
                />
            </div>

            {/* Scale legend */}
            <div className="bg-appOffWhite rounded-xl p-3 border border-appGhost">
                <p className="text-xs font-semibold text-appDark mb-1">
                    Rating scale:
                </p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
                    <span>
                        Left = <b className="text-appDark">Strongly Agree</b>
                    </span>
                    <span>
                        Middle = <b className="text-appDark">Neutral</b>
                    </span>
                    <span>
                        Right ={" "}
                        <b className="text-appDark">Strongly Disagree</b>
                    </span>
                </div>
            </div>

            {/* Dimension header */}
            <div className="flex items-center gap-3 bg-appDark text-white rounded-xl px-4 py-3">
                <span className="w-8 h-8 rounded-full bg-appRed flex items-center justify-center text-sm font-bold shrink-0">
                    {p16Page + 1}
                </span>
                <div>
                    <p className="text-sm font-semibold">
                        {dim.label}: {dim.left} vs {dim.right}
                    </p>
                    <p className="text-xs opacity-50">
                        {answeredInDim} / 12 answered
                    </p>
                </div>
            </div>

            {/* Questions */}
            <FormField
                control={form.control}
                name="p16"
                render={() => (
                    <FormItem>
                        <div>
                            {dimQuestions.map((q) => (
                                <P16Question
                                    key={q.id}
                                    qId={q.id}
                                />
                            ))}
                        </div>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* Live trait bars — shown once all 60 answered */}
            {allAnswered && (
                <div className="bg-appOffWhite rounded-xl p-4 border border-appGhost">
                    <p className="text-xs font-bold text-appDark uppercase tracking-widest mb-3">
                        Your Personality Traits
                    </p>
                    {dimScores.map(({ key, score, maxScore }) => (
                        <TraitBar
                            key={key}
                            dimKey={key}
                            score={score}
                            maxScore={maxScore}
                        />
                    ))}
                </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between pt-2 border-t border-appGhost">
                <button
                    type="button"
                    onClick={handlePrev}
                    className="text-sm text-gray-500 hover:text-appDark transition-colors"
                >
                    ← {p16Page === 0 ? "Back to DISC" : "Previous Dimension"}
                </button>
                <button
                    type="button"
                    onClick={handleNext}
                    className="text-sm font-semibold text-appRed hover:text-red-700 transition-colors"
                >
                    {p16Page === DIMENSIONS.length - 1
                        ? "Finish Personality →"
                        : "Next Dimension →"}
                </button>
            </div>
        </div>
    );
}
