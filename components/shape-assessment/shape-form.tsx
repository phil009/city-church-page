"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import axios from "axios";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  shapeSchema,
  type ShapeFormValues,
  STEP_FIELDS,
} from "@/lib/validations/shape-schema";
import { SHAPE_STEPS, SHAPE_STEP_HEADERS, P16_TYPES } from "@/data/shape-data";
import {
  computeDiscScores,
  computeGiftScores,
  computeP16Code,
  primaryDiscFromScores,
  topGiftsFromScores,
} from "@/lib/shape-assessment/scoring";

import ShapeStepBar from "./shape-step-bar";
import SuccessScreen from "./success-screen";
import PersonalInfoStep from "./steps/personal-info-step";
import SpiritualGiftsStep from "./steps/spiritual-gifts-step";
import HeartStep from "./steps/heart-step";
import AbilitiesStep from "./steps/abilities-step";
import DiscStep from "./steps/disc-step";
import Personality16Step from "./steps/personality16-step";
import ExperiencesStep from "./steps/experiences-step";
import SummaryStep from "./steps/summary-step";

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
  exit: (dir: number) => ({
    x: dir < 0 ? 60 : -60,
    opacity: 0,
    transition: { duration: 0.2, ease: "easeIn" },
  }),
};

const LAST_STEP = SHAPE_STEPS.length;

export default function ShapeForm() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [giftPage, setGiftPage] = useState(0);
  const [p16Page, setP16Page] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<ShapeFormValues | null>(
    null,
  );

  const form = useForm<ShapeFormValues>({
    resolver: zodResolver(shapeSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      spiritualGifts: {},
      passions: [],
      people: [],
      causes: [],
      heartServing: "",
      abilities: [],
      disc: {},
      p16: {},
      expEducation: "",
      expMinistry: "",
      expPainful: "",
      expSpiritual: "",
      additionalComments: "",
    },
    mode: "onTouched",
  });

  // ─── Derived scores ─────────────────────────────────────────────────────────

  const spiritualGiftsWatch = form.watch("spiritualGifts");
  const discWatch = form.watch("disc");
  const p16Watch = form.watch("p16");

  const giftScores = useMemo(
    () => computeGiftScores(spiritualGiftsWatch),
    [spiritualGiftsWatch],
  );
  const discScores = useMemo(() => computeDiscScores(discWatch), [discWatch]);
  const topGifts = useMemo(() => topGiftsFromScores(giftScores), [giftScores]);
  const primaryDiscType = useMemo(
    () => primaryDiscFromScores(discScores),
    [discScores],
  );
  const p16Code = useMemo(() => computeP16Code(p16Watch ?? {}), [p16Watch]);
  const p16Info = useMemo(() => P16_TYPES[p16Code], [p16Code]);

  // ─── Navigation ─────────────────────────────────────────────────────────────

  const goNext = async () => {
    if (step < LAST_STEP) {
      const fields = STEP_FIELDS[step as keyof typeof STEP_FIELDS];
      if (fields) {
        const valid = await form.trigger([
          ...fields,
        ] as (keyof ShapeFormValues)[]);
        if (!valid) return;
      }
      setDirection(1);
      setStep((s) => s + 1);
      if (step === 1) setGiftPage(0);
      if (step === 5) setP16Page(0);
    }
  };

  const goBack = () => {
    if (step > 1) {
      setDirection(-1);
      setStep((s) => s - 1);
    }
  };

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

  const handleP16Back = () => {
    setDirection(-1);
    setStep(5);
  };
  const handleP16Next = async () => {
    const valid = await form.trigger(["p16"]);
    if (!valid) return;
    setDirection(1);
    setStep(7);
  };

  // ─── Submit ─────────────────────────────────────────────────────────────────

  const onSubmit = async (data: ShapeFormValues) => {
    setIsSubmitting(true);
    try {
      await axios.post("/api/shape-assessment", {
        ...data,
        topGifts,
        discScores,
        primaryDiscType,
        p16Code,
      });
      setSubmittedData(data);
    } catch {
      toast.error("Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ─── Render ─────────────────────────────────────────────────────────────────

  if (submittedData) {
    return (
      <section className="px-4 sm:px-12 md:px-20 py-14">
        <SuccessScreen
          data={submittedData}
          topGifts={topGifts}
          primaryDiscType={primaryDiscType}
          p16Code={p16Code}
          p16Info={p16Info}
        />
      </section>
    );
  }

  const isLastStep = step === LAST_STEP;
  const showOuterNav = step !== 2 && step !== 6;
  const header = SHAPE_STEP_HEADERS[step];

  return (
    <section className="px-4 sm:px-12 md:px-20 py-14">
      <div className="max-w-3xl mx-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="bg-white rounded-xl border border-appGhost shadow-sm p-6 sm:p-8">
              <ShapeStepBar current={step} />

              {/* Step header */}
              {header && (
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-appDark">
                    {header.title}
                  </h2>
                  <p className="text-sm text-gray-400 mt-0.5">
                    {header.subtitle}
                  </p>
                </div>
              )}

              {step === LAST_STEP && (
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-appDark">
                    Review & Submit
                  </h2>
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
                    {step === 6 && (
                      <Personality16Step
                        p16Page={p16Page}
                        setP16Page={setP16Page}
                        onOuterBack={handleP16Back}
                        onOuterNext={handleP16Next}
                      />
                    )}
                    {step === 7 && <ExperiencesStep />}
                    {step === 8 && (
                      <SummaryStep
                        topGifts={topGifts}
                        discScores={discScores}
                        primaryDiscType={primaryDiscType}
                      />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Outer navigation (hidden on steps 2 and 6 which have internal nav) */}
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
