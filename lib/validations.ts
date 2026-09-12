import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be under 100 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().max(200, "Subject must be under 200 characters").optional(),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be under 2000 characters"),
  website: z.string().max(0).optional(), // honeypot — must remain empty
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
