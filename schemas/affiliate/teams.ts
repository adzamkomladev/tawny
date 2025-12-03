import * as z from 'zod';

// Query schema for listing teams
export const listTeamsQuerySchema = z.object({
    page: z.coerce.number().int().min(1).default(1),
    size: z.coerce.number().int().min(1).max(100).default(10),
    search: z.string().trim().optional().default(''),
});

export type ListTeamsQuery = z.infer<typeof listTeamsQuerySchema>;

export const fileSchema = z.custom<File | null>((val) => {
    if (!val) return false;
    if (typeof File === 'undefined') return true;
    return val instanceof File;
}, 'Upload required');

export const optionalFileSchema = z.custom<File | null>((val) => {
    if (!val) return true;
    if (typeof File === 'undefined') return true;
    return val instanceof File;
}).optional().nullable();


export const newTeamFormSchema = z.object({
    logo: optionalFileSchema,
    banner: optionalFileSchema,
    name: z.string().min(2, 'Give your team a friendly display name.'),
    slug: z
        .string()
        .min(2, 'Add at least two characters.')
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Only lowercase letters, numbers, and dashes.'),
    description: z
        .string()
        .min(24, 'Share a short narrative so reviewers understand the intent.'),
    tags: z.array(z.string()).min(1, 'Add at least one tag to categorize your team.').max(5, 'Maximum of 5 tags allowed.'),
    adminName: z.string().min(2, 'Admin needs a name for the invite.'),
    adminEmail: z.string().email('We need a valid inbox for the admin.'),
});

export type NewTeamForm = z.infer<typeof newTeamFormSchema>;

export const createTeamSchema = z.object({
    logoAssetId: z.string().uuid('Invalid logo asset ID').optional().nullable(),
    bannerAssetId: z.string().uuid('Invalid banner asset ID').optional().nullable(),
    name: z.string().min(2, 'Give your team a friendly display name.'),
    slug: z
        .string()
        .min(2, 'Add at least two characters.')
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Only lowercase letters, numbers, and dashes.'),
    description: z
        .string()
        .min(24, 'Share a short narrative so reviewers understand the intent.'),
    tags: z.array(z.string()).min(1, 'Add at least one tag.').max(5, 'Maximum of 5 tags.'),
    adminName: z.string().min(2, 'Admin needs a name for the invite.'),
    adminEmail: z.string().email('We need a valid inbox for the admin.'),
});

export type CreateTeamPayload = z.infer<typeof createTeamSchema>;

export const updateTeamFormSchema = z.object({
    logo: optionalFileSchema,
    banner: optionalFileSchema,
    name: z.string().min(2, 'Give your team a friendly display name.'),
    slug: z
        .string()
        .min(2, 'Add at least two characters.')
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Only lowercase letters, numbers, and dashes.'),
    description: z
        .string()
        .min(24, 'Share a short narrative so reviewers understand the intent.'),
    tags: z.array(z.string()).min(1, 'Add at least one tag to categorize your team.').max(5, 'Maximum of 5 tags allowed.'),
});

export type UpdateTeamForm = z.infer<typeof updateTeamFormSchema>;

export const updateTeamSchema = z.object({
    logoAssetId: z.string().uuid('Invalid logo asset ID').optional().nullable(),
    bannerAssetId: z.string().uuid('Invalid banner asset ID').optional().nullable(),
    name: z.string().min(2, 'Give your team a friendly display name.').optional(),
    slug: z
        .string()
        .min(2, 'Add at least two characters.')
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Only lowercase letters, numbers, and dashes.')
        .optional(),
    description: z
        .string()
        .min(24, 'Share a short narrative so reviewers understand the intent.')
        .optional(),
    tags: z.array(z.string()).min(1, 'Add at least one tag.').max(5, 'Maximum of 5 tags.').optional(),
});

export type UpdateTeamPayload = z.infer<typeof updateTeamSchema>;