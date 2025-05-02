import * as z from "zod"

export const prayerFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().optional(),
  urgency: z.enum(["urgent", "standard"], {
    required_error: "Please select the urgency level.",
  }),
  request: z.string().min(10, {
    message: "Prayer request must be at least 10 characters.",
  }),
  confidential: z.boolean().default(false),
  share: z.boolean().default(false),
})

export type PrayerFormValues = z.infer<typeof prayerFormSchema>
