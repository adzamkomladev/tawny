import { z } from "zod";

export const presignUploadSchema = z.object({
  filename: z.string().min(1, "Filename is required"),
  contentType: z.string().min(1, "Content type is required"),
  prefix: z.string().optional(),
});

export type PresignUploadForm = z.infer<typeof presignUploadSchema>;

export const confirmUploadSchema = z.object({
  assetId: z.string().uuid("Invalid asset ID"),
});

export type ConfirmUploadForm = z.infer<typeof confirmUploadSchema>;

export const getAssetUrlSchema = z.object({
  assetId: z.string().uuid("Invalid asset ID").optional(),
  assetIds: z.array(z.string().uuid("Invalid asset ID")).optional(),
}).refine((data) => data.assetId || data.assetIds, {
  message: "Provide either assetId or assetIds",
});

export type GetAssetUrlForm = z.infer<typeof getAssetUrlSchema>;
