import { z } from "zod";
import { GIFT_CATEGORIES, DISC_ROWS } from "@/data/shape-data";

export const shapeSchema = z
  .object({
    // Step 1
    firstName: z.string().min(1, "First name is required"),
    lastName:  z.string().min(1, "Last name is required"),
    email:     z.string().email("Please enter a valid email address"),
    phone:     z.string().optional(),

    // Step 2 – Spiritual Gifts (keys are question numbers as strings)
    spiritualGifts: z.record(z.string(), z.number().min(0).max(3)),

    // Step 3 – Heart
    passions:     z.array(z.string()).min(1, "Please select at least one passion"),
    people:       z.array(z.string()),
    causes:       z.array(z.string()),
    heartServing: z.string().min(1, "Please share a serving opportunity"),

    // Step 4 – Abilities
    abilities: z.array(z.string()).min(1, "Please select at least one ability"),

    // Step 5 – DISC (keys are row numbers as strings)
    disc: z.record(z.string(), z.enum(["D", "I", "S", "C"])),

    // Step 6 – 16 Personalities (keys are question ids as strings, values -3 to +3)
    p16: z.record(z.string(), z.number().min(-3).max(3)),

    // Step 7 – Experiences
    expEducation: z.string().min(10, "Please share at least a brief description"),
    expMinistry:  z.string().min(10, "Please share at least a brief description"),
    expPainful:   z.string().min(10, "Please share at least a brief description"),
    expSpiritual: z.string().min(10, "Please share at least a brief description"),

    // Step 8 – Summary
    additionalComments: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    // Enforce all 96 spiritual gift questions answered on final submit
    const allQNums = GIFT_CATEGORIES.flatMap((c) => c.questions as readonly number[]);
    const missing = allQNums.filter((n) => data.spiritualGifts[String(n)] === undefined);
    if (missing.length > 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Please answer all spiritual gift questions (${missing.length} remaining)`,
        path: ["spiritualGifts"],
      });
    }

    // Enforce all 24 DISC rows answered on final submit
    const missingDisc = DISC_ROWS.filter((r) => !data.disc[String(r.row)]);
    if (missingDisc.length > 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Please select a word for each personality row (${missingDisc.length} remaining)`,
        path: ["disc"],
      });
    }

    // Enforce all 60 sixteen-personalities questions answered on final submit
    const missingP16 = Array.from({ length: 60 }, (_, i) => i + 1).filter(
      (n) => data.p16[String(n)] === undefined
    );
    if (missingP16.length > 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Please answer all personality questions (${missingP16.length} remaining)`,
        path: ["p16"],
      });
    }
  });

export type ShapeFormValues = z.infer<typeof shapeSchema>;

// Fields to validate per step (used with form.trigger())
export const STEP_FIELDS = {
  1: ["firstName", "lastName", "email", "phone"] as const,
  2: ["spiritualGifts"] as const,
  3: ["passions", "heartServing"] as const,
  4: ["abilities"] as const,
  5: ["disc"] as const,
  6: ["p16"] as const,
  7: ["expEducation", "expMinistry", "expPainful", "expSpiritual"] as const,
} satisfies Record<number, readonly (keyof ShapeFormValues)[]>;
