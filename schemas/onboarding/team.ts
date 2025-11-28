import { z } from 'zod';

export const onboardingTeamSchema = z.object({
  name: z.string().min(2, 'Give your team a friendly display name.'),
  slug: z
    .string()
    .min(2, 'Add at least two characters.')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Only lowercase letters, numbers, and dashes.'),
  description: z
    .string()
    .min(24, 'Share a short narrative so reviewers understand the intent.'),
});

export type OnboardingTeamForm = z.infer<typeof onboardingTeamSchema>;

export const onboardingRoleSchema = z.object({
  role: z.enum(['organizer', 'affiliate']),
});

export type OnboardingRoleForm = z.infer<typeof onboardingRoleSchema>;