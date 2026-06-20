"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  digitalDisciplesSchema,
  type DigitalDisciplesFormValues,
} from "@/lib/validations/digital-disciples-schema";
import { cn } from "@/lib/utils";

// ── Data ────────────────────────────────────────────────────────────────────

const ROLES: {
  value: "Amplifier " | "Connector " | "Creator ";
  label: string;
  badge: string;
  description: string;
}[] = [
  {
    value: "Amplifier ",
    badge: "A",
    label: "Amplifier",
    description:
      "Engage within the first 15 minutes of every post — like, comment, and share.",
  },
  {
    value: "Connector ",
    badge: "C",
    label: "Connector",
    description:
      "Distribute content into WhatsApp groups and external communities.",
  },
  {
    value: "Creator ",
    badge: "Cr",
    label: "Creator",
    description:
      "Produce graphics, videos, copy, and creative content for the team.",
  },
];

const PLATFORMS_USED = [
  "WhatsApp ",
  "Instagram",
  "Facebook",
  "TikTok",
  "X (Twitter)",
  "YouTube",
  "Threads (by Instagram)",
  "Other",
];

const COMMUNITY_TYPES = [
  "Family",
  "Work",
  "School Alumni",
  "Professional",
  "NGO",
  "Fitness",
  "Kparakpor",
  "Other",
];

const COMMUNITY_PLATFORMS = [
  "WhatsApp",
  "Facebook",
  "Instagram ",
  "TikTok",
  "X (Twitter)",
  "YouTube",
  "Threads (by Instagram)",
];

const CREATOR_SKILLS = [
  "Graphics (Canva, design, etc.)",
  "Videos (shooting/editing)",
  "Writing (captions, scripts, posts)",
  "Social media management",
];

const STEPS = [
  { id: 1, label: "Personal Info" },
  { id: 2, label: "Your Role" },
  { id: 3, label: "Digital Footprint" },
  { id: 4, label: "Commitment" },
];

// ── Sub-components ───────────────────────────────────────────────────────────

function StepBar({ current }: { current: number }) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        {STEPS.map((step, i) => (
          <div key={step.id} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300",
                  current === step.id
                    ? "bg-appRed text-white scale-110"
                    : current > step.id
                      ? "bg-appRed text-white opacity-60"
                      : "bg-appGhost text-gray-400"
                )}
              >
                {current > step.id ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  step.id
                )}
              </div>
              <span
                className={cn(
                  "text-[10px] mt-1 hidden sm:block transition-colors",
                  current === step.id ? "text-appRed font-semibold" : "text-gray-400"
                )}
              >
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={cn(
                  "flex-1 h-0.5 mx-2 mb-4 transition-colors duration-300",
                  current > step.id ? "bg-appRed opacity-60" : "bg-appGhost"
                )}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function CheckboxGrid({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string[];
  onChange: (val: string[]) => void;
}) {
  const toggle = (option: string) =>
    onChange(
      value.includes(option)
        ? value.filter((v) => v !== option)
        : [...value, option]
    );

  return (
    <div className="grid grid-cols-2 gap-2">
      {options.map((opt) => (
        <label
          key={opt}
          className={cn(
            "flex items-center gap-2 border rounded-lg px-3 py-2 cursor-pointer text-sm transition-colors",
            value.includes(opt)
              ? "border-appRed bg-red-50 text-appDark"
              : "border-appGhost hover:border-gray-300"
          )}
        >
          <Checkbox
            checked={value.includes(opt)}
            onCheckedChange={() => toggle(opt)}
            className="data-[state=checked]:bg-appRed data-[state=checked]:border-appRed shrink-0"
          />
          <span>{opt.trim()}</span>
        </label>
      ))}
    </div>
  );
}

// ── Slide animation ──────────────────────────────────────────────────────────

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
  exit: (dir: number) => ({
    x: dir < 0 ? 60 : -60,
    opacity: 0,
    transition: { duration: 0.2, ease: "easeIn" },
  }),
};

// ── Main component ───────────────────────────────────────────────────────────

const DigitalDisciplesSignup = () => {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<DigitalDisciplesFormValues>({
    resolver: zodResolver(digitalDisciplesSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      department: "",
      role: undefined,
      platformsUsed: [],
      weeklyAvailability: "",
      representWithIntegrity: undefined,
      communityCount: "",
      communityTypes: [],
      activeInCommunities: "",
      communityPlatforms: [],
      creatorSkills: [],
      portfolioLink: "",
    },
  });

  const selectedRole = form.watch("role");
  const isConnector = selectedRole === "Connector ";
  const isCreator = selectedRole === "Creator ";

  const stepFields: Record<number, (keyof DigitalDisciplesFormValues)[]> = {
    1: ["name", "phone", "email", "department"],
    2: ["role"],
    3: ["platformsUsed", "weeklyAvailability"],
    4: ["representWithIntegrity"],
  };

  const goNext = async () => {
    const valid = await form.trigger(stepFields[step]);
    if (!valid) return;
    setDirection(1);
    setStep((s) => s + 1);
  };

  const goBack = () => {
    setDirection(-1);
    setStep((s) => s - 1);
  };

  const onSubmit = async (data: DigitalDisciplesFormValues) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/digital-disciples", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Submission failed");
      }

      setSubmitted(true);
      toast.success("You're in! Welcome to the Digital Disciples.");
      form.reset();
      setStep(1);
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="px-4 sm:px-12 md:px-20 py-14 bg-appOffWhite">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-2xl"
      >
        <p className="text-appRed text-base md:text-xl mb-2 font-medium">
          Join the Movement
        </p>
        <h2 className="text-3xl md:text-4xl font-semibold text-appDark mb-2">
          Sign Up as a Digital Disciple
        </h2>
        <p className="text-sm md:text-base opacity-65 mb-10">
          Pick the role that fits your gifting and commit to making City
          Church&apos;s digital mission count.
        </p>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-10 text-center shadow-sm border border-appGhost"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-appDark mb-2">You&apos;re in!</h3>
            <p className="text-sm opacity-65 mb-6">
              Thank you for signing up. The Socials Team will reach out with your
              onboarding details soon.
            </p>
            <Button
              onClick={() => setSubmitted(false)}
              className="bg-appRed hover:bg-red-700 text-white"
            >
              Register Another Person
            </Button>
          </motion.div>
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="bg-white rounded-xl p-8 shadow-sm border border-appGhost"
            >
              <StepBar current={step} />

              {/* Animated step content */}
              <div className="overflow-hidden min-h-[320px]">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={step}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="space-y-5"
                  >
                    {/* ── Step 1: Personal Info ── */}
                    {step === 1 && (
                      <>
                        <div>
                          <h3 className="text-lg font-semibold text-appDark">Personal Info</h3>
                          <p className="text-xs opacity-50 mt-0.5">Tell us a bit about yourself.</p>
                        </div>

                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="John Doe"
                                  {...field}
                                  className="focus:border-appRed focus:ring focus:ring-appRed focus:ring-opacity-50"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>WhatsApp Number</FormLabel>
                                <FormControl>
                                  <Input
                                    type="tel"
                                    placeholder="08012345678"
                                    {...field}
                                    className="focus:border-appRed focus:ring focus:ring-appRed focus:ring-opacity-50"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email Address</FormLabel>
                                <FormControl>
                                  <Input
                                    type="email"
                                    placeholder="you@example.com"
                                    {...field}
                                    className="focus:border-appRed focus:ring focus:ring-appRed focus:ring-opacity-50"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="department"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Department / Unit in Church</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="e.g. Protocol, Worship, Ushering..."
                                  {...field}
                                  className="focus:border-appRed focus:ring focus:ring-appRed focus:ring-opacity-50"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </>
                    )}

                    {/* ── Step 2: Role ── */}
                    {step === 2 && (
                      <>
                        <div>
                          <h3 className="text-lg font-semibold text-appDark">Choose Your Role</h3>
                          <p className="text-xs opacity-50 mt-0.5">Pick the area that fits your gifting.</p>
                        </div>

                        <FormField
                          control={form.control}
                          name="role"
                          render={({ field }) => (
                            <FormItem>
                              <div className="grid grid-cols-1 gap-3">
                                {ROLES.map((r) => (
                                  <button
                                    key={r.value}
                                    type="button"
                                    onClick={() => field.onChange(r.value)}
                                    className={cn(
                                      "flex items-start gap-4 text-left border rounded-xl p-4 transition-all",
                                      field.value === r.value
                                        ? "border-appRed bg-red-50"
                                        : "border-appGhost hover:border-gray-300"
                                    )}
                                  >
                                    <div
                                      className={cn(
                                        "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 transition-colors",
                                        field.value === r.value
                                          ? "bg-appRed text-white"
                                          : "bg-appGhost text-gray-500"
                                      )}
                                    >
                                      {r.badge}
                                    </div>
                                    <div>
                                      <p className="font-semibold text-appDark">{r.label}</p>
                                      <p className="text-xs opacity-60 mt-0.5 leading-snug">{r.description}</p>
                                    </div>
                                  </button>
                                ))}
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </>
                    )}

                    {/* ── Step 3: Digital Footprint (role-adaptive) ── */}
                    {step === 3 && (
                      <>
                        <div>
                          <h3 className="text-lg font-semibold text-appDark">Digital Footprint</h3>
                          <p className="text-xs opacity-50 mt-0.5">
                            {isConnector
                              ? "Tell us about your communities and platforms."
                              : isCreator
                                ? "Share your skills and where you create."
                                : "Tell us about your social presence."}
                          </p>
                        </div>

                        {/* Connector-specific */}
                        {isConnector && (
                          <>
                            <FormField
                              control={form.control}
                              name="communityCount"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>How many online communities do you belong to?</FormLabel>
                                  <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select range" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="below 10">Below 10</SelectItem>
                                      <SelectItem value="10 - 20">10 – 20</SelectItem>
                                      <SelectItem value="20 - 30">20 – 30</SelectItem>
                                      <SelectItem value="30 +">30+</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="communityTypes"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>What type of communities?</FormLabel>
                                  <CheckboxGrid
                                    options={COMMUNITY_TYPES}
                                    value={field.value ?? []}
                                    onChange={field.onChange}
                                  />
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="activeInCommunities"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Are you active in those communities?</FormLabel>
                                  <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="Yes">Yes</SelectItem>
                                      <SelectItem value="Not really">Not really</SelectItem>
                                      <SelectItem value="No">No</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="communityPlatforms"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>What platforms are those communities on?</FormLabel>
                                  <CheckboxGrid
                                    options={COMMUNITY_PLATFORMS}
                                    value={field.value ?? []}
                                    onChange={field.onChange}
                                  />
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </>
                        )}

                        {/* Creator-specific */}
                        {isCreator && (
                          <>
                            <FormField
                              control={form.control}
                              name="creatorSkills"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Creator Skills</FormLabel>
                                  <CheckboxGrid
                                    options={CREATOR_SKILLS}
                                    value={field.value ?? []}
                                    onChange={field.onChange}
                                  />
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="portfolioLink"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>
                                    Portfolio Link{" "}
                                    <span className="text-xs opacity-40">(optional)</span>
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="https://..."
                                      {...field}
                                      className="focus:border-appRed focus:ring focus:ring-appRed focus:ring-opacity-50"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </>
                        )}

                        {/* Shared for all roles */}
                        <FormField
                          control={form.control}
                          name="platformsUsed"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Platforms You Use</FormLabel>
                              <CheckboxGrid
                                options={PLATFORMS_USED}
                                value={field.value}
                                onChange={field.onChange}
                              />
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="weeklyAvailability"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Weekly Availability</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="How often can you engage?" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="Daily">Daily</SelectItem>
                                  <SelectItem value="A few times a week">A few times a week</SelectItem>
                                  <SelectItem value="Occasionally">Occasionally</SelectItem>
                                  <SelectItem value="Other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </>
                    )}

                    {/* ── Step 4: Commitment ── */}
                    {step === 4 && (
                      <>
                        <div>
                          <h3 className="text-lg font-semibold text-appDark">One Last Thing</h3>
                          <p className="text-xs opacity-50 mt-0.5">
                            Every Digital Disciple represents the church.
                          </p>
                        </div>

                        <div className="bg-appOffWhite rounded-xl p-5 border border-appGhost text-sm leading-relaxed text-appDark opacity-80">
                          As a Digital Disciple, my online presence will reflect the values and
                          integrity of City Church. I will engage respectfully, share truthfully,
                          and represent the Kingdom well in every space.
                        </div>

                        <FormField
                          control={form.control}
                          name="representWithIntegrity"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Do you commit to this?</FormLabel>
                              <div className="flex gap-3 mt-1">
                                {(["Yes", "No"] as const).map((opt) => (
                                  <button
                                    key={opt}
                                    type="button"
                                    onClick={() => field.onChange(opt)}
                                    className={cn(
                                      "px-8 py-2.5 rounded-lg border text-sm font-medium transition-all",
                                      field.value === opt
                                        ? "border-appRed bg-appRed text-white"
                                        : "border-appGhost hover:border-gray-400 text-appDark"
                                    )}
                                  >
                                    {opt}
                                  </button>
                                ))}
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation */}
              <div className={cn("flex mt-8 gap-3", step > 1 ? "justify-between" : "justify-end")}>
                {step > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={goBack}
                    className="border-appGhost"
                  >
                    Back
                  </Button>
                )}

                {step < 4 ? (
                  <Button
                    type="button"
                    onClick={goNext}
                    className="bg-appRed hover:bg-red-700 text-white px-8"
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-appRed hover:bg-red-700 text-white px-8"
                  >
                    {isSubmitting ? "Submitting..." : "Join the Digital Disciples"}
                  </Button>
                )}
              </div>
            </form>
          </Form>
        )}
      </motion.div>
    </section>
  );
};

export default DigitalDisciplesSignup;
