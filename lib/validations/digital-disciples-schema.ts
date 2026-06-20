import { z } from "zod";

export const digitalDisciplesSchema = z.object({
  name: z.string().min(2, "Full name must be at least 2 characters."),
  phone: z.string().min(10, "Enter a valid WhatsApp number."),
  email: z.string().email("Enter a valid email address."),
  department: z.string().min(1, "Please enter your department or unit."),
  role: z.enum(["Amplifier ", "Connector ", "Creator "], {
    required_error: "Please select a role.",
  }),
  platformsUsed: z
    .array(z.string())
    .min(1, "Select at least one platform you use."),
  weeklyAvailability: z.string().min(1, "Please select your availability."),
  representWithIntegrity: z.enum(["Yes", "No"], {
    required_error: "Please confirm your commitment.",
  }),

  // Connector-specific
  communityCount: z.string().optional(),
  communityTypes: z.array(z.string()).optional(),
  activeInCommunities: z.string().optional(),
  communityPlatforms: z.array(z.string()).optional(),

  // Creator-specific
  creatorSkills: z.array(z.string()).optional(),
  portfolioLink: z.string().optional(),
});

export type DigitalDisciplesFormValues = z.infer<typeof digitalDisciplesSchema>;
