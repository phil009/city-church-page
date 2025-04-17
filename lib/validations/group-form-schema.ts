import * as z from "zod"

export const groupFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
  reason: z.string().optional(),
})

export type GroupFormValues = z.infer<typeof groupFormSchema>
