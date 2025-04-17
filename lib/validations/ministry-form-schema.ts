import * as z from "zod";

export const ministryFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
  ministery: z.string().min(2, {
    message: "Ministry name must be at least 2 characters.",
  }),
  reason: z.string().optional(),
});

export type MinistryFormValues = z.infer<typeof ministryFormSchema>;
