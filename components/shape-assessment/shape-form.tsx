"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import axios from "axios";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  shapeSchema,
  type ShapeFormValues,
  STEP_FIELDS,
} from "@/lib/validations/shape-schema";
import { GIFT_CATEGORIES, SHAPE_STEPS } from "@/data/shape-data";

import PersonalInfoStep     from "./steps/personal-info-step";
import SpiritualGiftsStep  from "./steps/spiritual-gifts-step";
import HeartStep            from "./steps/heart-step";
import AbilitiesStep        from "./steps/abilities-step";
import DiscStep             from "./steps/disc-step";
import ExperiencesStep      from "./steps/experiences-step";
import SummaryStep          from "./steps/summary-step";

// ─── Animation variants ──────────────────────────────────────────────────────

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: (dir: number) => ({
    x: dir < 0 ? 60 : -60,
    opacity: 0,
    transition: { duration: 0.2, ease: "easeIn" },
  }),
};

// ─── Step bar ────────────────────────────────────────────────────────────────

function ShapeStepBar({ current }: { current: number }) {
  return (
    <>
      {/* Full bar – sm and up */}
      <div className="hidden sm:flex items-center justify-between mb-8">
        {SHAPE_STEPS.map((step, idx) => {
          const isCompleted = current > step.id;
          const isCurrent   = current === step.id;
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
                      : "bg-appGhost text-gray-400"
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
                      : "text-gray-300"
                  )}
                >
                  {step.label}
                </span>
              </div>
              {idx < SHAPE_STEPS.length - 1 && (
                <div
                  className={cn(
                    "flex-1 h-0.5 mx-1 transition-colors duration-300",
                    current > step.id ? "bg-appRed opacity-60" : "bg-appGhost"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Compact bar – mobile */}
      <div className="sm:hidden flex items-center justify-between mb-6">
        <p className="text-xs text-gray-500">
          Step{" "}
          <span className="font-semibold text-appDark">{current}</span> of{" "}
          {SHAPE_STEPS.length}
        </p>
        <p className="text-xs font-semibold text-appRed">
          {SHAPE_STEPS[current - 1]?.letter
            ? `${SHAPE_STEPS[current - 1].letter} — `
            : ""}
          {SHAPE_STEPS[current - 1]?.label}
        </p>
      </div>
      {/* Progress bar */}
      <div className="h-1 w-full bg-appGhost rounded-full overflow-hidden mb-6">
        <div
          className="h-full bg-appRed rounded-full transition-all duration-500"
          style={{ width: `${((current - 1) / (SHAPE_STEPS.length - 1)) * 100}%` }}
        />
      </div>
    </>
  );
}

// ─── Success screen ──────────────────────────────────────────────────────────

function SuccessScreen() {
  return (
    <div className="text-center py-16 px-4 max-w-lg mx-auto">
      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
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
      <h2 className="text-2xl font-bold text-appDark mb-3">
        Assessment Submitted!
      </h2>
      <p className="text-gray-500 leading-relaxed mb-4">
        Thank you for completing your S.H.A.P.E. assessment. Our team will
        review your profile and be in touch soon with guidance on how you can
        best use your gifts in service.
      </p>
      <p className="text-sm italic text-gray-400">
        &ldquo;For we are God&rsquo;s masterpiece. He has created us anew in Christ Jesus,
        so we can do the good things he planned for us long ago.&rdquo;
        <br />— Ephesians 2:10
      </p>
    </div>
  );
}

// ─── Main form ───────────────────────────────────────────────────────────────

export default function ShapeForm() {
  const [step, setStep]               = useState(1);
  const [direction, setDirection]     = useState(1);
  const [giftPage, setGiftPage]       = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted]     = useState(false);

  const form = useForm<ShapeFormValues>({
    resolver: zodResolver(shapeSchema),
    defaultValues: {
      firstName:          "",
      lastName:           "",
      email:              "",
      phone:              "",
      spiritualGifts:     {},
      passions:           [],
      people:             [],
      causes:             [],
      heartServing:       "",
      heartExperience:    "",
      heartInfluence:     "",
      heartDream:         "",
      abilities:          [],
      disc:               {},
      expEducation:       "",
      expMinistry:        "",
      expPainful:         "",
      expSpiritual:       "",
      additionalComments: "",
    },
    mode: "onTouched",
  });

  // ─── Derived scores ─────────────────────────────────────────────────────────
  const spiritualGiftsWatch = form.watch("spiritualGifts");
  const discWatch            = form.watch("disc");

  const giftScores = useMemo(() => {
    return GIFT_CATEGORIES.reduce<Record<string, number>>((acc, cat) => {
      acc[cat.name] = (cat.questions as readonly number[]).reduce(
        (sum, q) => sum + (spiritualGiftsWatch?.[String(q)] ?? 0),
        0
      );
      return acc;
    }, {});
  }, [spiritualGiftsWatch]);

  const discScores = useMemo(() => {
    const s = { D: 0, I: 0, S: 0, C: 0 } as Record<"D"|"I"|"S"|"C", number>;
    Object.values(discWatch ?? {}).forEach((v) => {
      if (v in s) s[v as "D"|"I"|"S"|"C"]++;
    });
    return s;
  }, [discWatch]);

  const topGifts = useMemo(
    () =>
      Object.entries(giftScores)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 3)
        .map(([name, score]) => ({ name, score })),
    [giftScores]
  );

  const primaryDiscType = useMemo(
    () =>
      (["D", "I", "S", "C"] as const).reduce((a, b) =>
        discScores[a] >= discScores[b] ? a : b
      ),
    [discScores]
  );

  // ─── Navigation ─────────────────────────────────────────────────────────────

  const goNext = async () => {
    if (step < 7) {
      const fields = STEP_FIELDS[step as keyof typeof STEP_FIELDS];
      if (fields) {
        const valid = await form.trigger([...fields] as (keyof ShapeFormValues)[]);
        if (!valid) return;
      }
      setDirection(1);
      setStep((s) => s + 1);
      // Reset gift sub-page when re-entering step 2
      if (step === 1) setGiftPage(0);
    }
  };

  const goBack = () => {
    if (step > 1) {
      setDirection(-1);
      setStep((s) => s - 1);
    }
  };

  // Exposed to SpiritualGiftsStep for boundary navigation
  const handleGiftsBack = () => {
    setDirection(-1);
    setStep(1);
  };

  const handleGiftsNext = async () => {
    const valid = await form.trigger(["spiritualGifts"]);
    if (!valid) return;
    setDirection(1);
    setStep(3);
  };

  // ─── Submit ─────────────────────────────────────────────────────────────────

  const onSubmit = async (data: ShapeFormValues) => {
    setIsSubmitting(true);
    try {
      await axios.post("/api/shape-assessment", data);
      setSubmitted(true);
    } catch {
      toast.error("Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ─── Render ─────────────────────────────────────────────────────────────────

  if (submitted) {
    return (
      <section className="px-4 sm:px-12 md:px-20 py-14">
        <div className="max-w-2xl mx-auto">
          <SuccessScreen />
        </div>
      </section>
    );
  }

  const isLastStep = step === 7;

  // Step 2 hides outer nav buttons (it has its own internal navigation)
  const showOuterNav = step !== 2;

  return (
    <section className="px-4 sm:px-12 md:px-20 py-14">
      <div className="max-w-3xl mx-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="bg-white rounded-xl border border-appGhost shadow-sm p-6 sm:p-8">
              <ShapeStepBar current={step} />

              {/* Step header */}
              {step !== 1 && step !== 7 && (
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-appDark">
                    {step === 2 && "Spiritual Gifts Inventory"}
                    {step === 3 && "Heart & Passion"}
                    {step === 4 && "Abilities"}
                    {step === 5 && "Personality (DISC)"}
                    {step === 6 && "Experiences"}
                  </h2>
                  <p className="text-sm text-gray-400 mt-0.5">
                    {step === 2 && "133 statements · rate each on a scale of 0–3"}
                    {step === 3 && "Discover what you are passionate about"}
                    {step === 4 && "Select skills and talents you enjoy and are proven in"}
                    {step === 5 && "Choose the word that best describes you in each row"}
                    {step === 6 && "Reflect on the experiences that have shaped you"}
                  </p>
                </div>
              )}

              {step === 7 && (
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-appDark">Review & Submit</h2>
                  <p className="text-sm text-gray-400 mt-0.5">
                    Review your S.H.A.P.E. profile before submitting
                  </p>
                </div>
              )}

              {/* Step content */}
              <div className="overflow-hidden">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={step}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                  >
                    {step === 1 && <PersonalInfoStep />}
                    {step === 2 && (
                      <SpiritualGiftsStep
                        giftPage={giftPage}
                        setGiftPage={setGiftPage}
                        onOuterBack={handleGiftsBack}
                        onOuterNext={handleGiftsNext}
                      />
                    )}
                    {step === 3 && <HeartStep />}
                    {step === 4 && <AbilitiesStep />}
                    {step === 5 && <DiscStep />}
                    {step === 6 && <ExperiencesStep />}
                    {step === 7 && (
                      <SummaryStep
                        topGifts={topGifts}
                        discScores={discScores}
                        primaryDiscType={primaryDiscType}
                      />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Outer navigation (hidden on step 2 which has its own nav) */}
              {showOuterNav && (
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-appGhost">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={goBack}
                    disabled={step === 1}
                    className="border-appGhost text-gray-500 hover:text-appDark disabled:opacity-30"
                  >
                    ← Back
                  </Button>

                  <div className="flex items-center gap-4">
                    <span className="text-xs text-gray-400 hidden sm:block">
                      Step {step} of {SHAPE_STEPS.length}
                    </span>
                    {isLastStep ? (
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-red-600 hover:bg-red-700 text-white px-8 py-5"
                      >
                        {isSubmitting ? "Submitting…" : "Submit Assessment →"}
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        onClick={goNext}
                        className="bg-appRed hover:bg-red-700 text-white"
                      >
                        Next →
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
}
