import * as z from 'zod';

export const applySchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.email("Please enter a valid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits").regex(/^\+?[0-9\s\-()]+$/, "Please enter a valid phone number"),
    reason: z.string().min(50, "Please provide at least 50 characters explaining why you want to join"),
    acceptTerms: z.boolean().refine(val => val === true, {
        message: "You must accept the terms and conditions",
    }),
});

export type ApplyForm = z.infer<typeof applySchema>;
