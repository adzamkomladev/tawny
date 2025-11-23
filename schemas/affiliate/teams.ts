import * as z from 'zod';


export const fileSchema = z.custom<File | null>((val) => {
    if (!val) return false;
    if (typeof File === 'undefined') return true;
    return val instanceof File;
}, 'Upload required');


export const newTeamFormSchema = z.object({
    logo: fileSchema,
    banner: fileSchema,
    name: z.string().min(2, 'Give your team a friendly display name.'),
    slug: z
        .string()
        .min(2, 'Add at least two characters.')
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Only lowercase letters, numbers, and dashes.'),
    description: z
        .string()
        .min(24, 'Share a short narrative so reviewers understand the intent.'),
    adminName: z.string().min(2, 'Admin needs a name for the invite.'),
    adminEmail: z.string().email('We need a valid inbox for the admin.'),
});

export type NewTeamForm = z.infer<typeof newTeamFormSchema>;