import * as z from "zod"

export const leaderFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
  experience: z.string().min(10, {
    message: "Please provide some details about your experience.",
  }),
  vision: z.string().min(10, {
    message: "Please share your vision for the group.",
  }),
  availability: z.string({
    required_error: "Please select your availability.",
  }),
})

export type LeaderFormValues = z.infer<typeof leaderFormSchema>
