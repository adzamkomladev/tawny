import * as z from 'zod';

// Query schema for listing events
export const listEventsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  size: z.coerce.number().int().min(1).max(100).default(10),
  search: z.string().trim().optional().default(''),
  status: z.enum(['draft', 'published', 'cancelled', 'completed']).optional(),
});

export type ListEventsQuery = z.infer<typeof listEventsQuerySchema>;

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

// Gallery image schema for client-side form
export const galleryImageSchema = z.object({
  id: z.string(),
  file: fileSchema,
  caption: z.string().max(200, 'Caption must be 200 characters or less.').optional().or(z.literal('')),
  order: z.number().int().min(0),
  isFeatured: z.boolean().optional(),
});

export type GalleryImage = z.infer<typeof galleryImageSchema>;

export const newEventFormSchema = z.object({
  logo: optionalFileSchema,
  banner: optionalFileSchema,
  poster: optionalFileSchema,
  title: z.string().min(3, 'Give your event a catchy title.'),
  slug: z
    .string()
    .min(3, 'Add at least three characters.')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Only lowercase letters, numbers, and dashes.'),
  description: z
    .string()
    .min(24, 'Provide a brief description so attendees know what to expect.')
    .optional()
    .or(z.literal('')),
  tags: z.array(z.string()).max(5, 'Maximum of 5 tags allowed.').optional(),
  venue: z.string().min(3, 'Add a venue for your event.').optional().or(z.literal('')),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  enableVoting: z.boolean().optional(),
  enableTicketing: z.boolean().optional(),
  gallery: z.array(galleryImageSchema).max(10, 'Maximum of 10 gallery images.').optional(),
});

export type NewEventForm = z.infer<typeof newEventFormSchema>;

// Gallery item for API payload (after upload)
export const galleryItemPayloadSchema = z.object({
  assetId: z.string().uuid('Invalid asset ID'),
  caption: z.string().max(200).optional().nullable(),
  order: z.number().int().min(0),
  isFeatured: z.boolean().optional(),
});

export type GalleryItemPayload = z.infer<typeof galleryItemPayloadSchema>;

export const createEventSchema = z.object({
  logoAssetId: z.string().uuid('Invalid logo asset ID').optional().nullable(),
  bannerAssetId: z.string().uuid('Invalid banner asset ID').optional().nullable(),
  posterAssetId: z.string().uuid('Invalid poster asset ID').optional().nullable(),
  title: z.string().min(3, 'Give your event a catchy title.'),
  slug: z
    .string()
    .min(3, 'Add at least three characters.')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Only lowercase letters, numbers, and dashes.'),
  description: z.string().optional().nullable(),
  tags: z.array(z.string()).max(5).optional(),
  venue: z.string().optional().nullable(),
  startDate: z.date().optional().nullable(),
  endDate: z.date().optional().nullable(),
  enableVoting: z.boolean().optional(),
  enableTicketing: z.boolean().optional(),
  gallery: z.array(galleryItemPayloadSchema).max(10).optional(),
});

export type CreateEventPayload = z.infer<typeof createEventSchema>;
