import { presignUploadSchema } from "~~/schemas/assets";

/**
 * Generate a presigned URL for direct client-side upload to R2.
 * 
 * POST /api/assets/presign
 * Body: { filename: string, contentType: string, prefix?: string }
 * 
 * Returns: { assetId: string, uploadUrl: string }
 * 
 * After uploading to uploadUrl, call POST /api/assets/confirm with { assetId }
 */
export default eventHandler(async (event) => {
    // Require authentication for upload
    const { user } = requireAuth(event);

    const { filename, contentType, prefix } = await readValidatedBody(event, presignUploadSchema.parse);

    // Validate content type is an image
    if (!contentType.startsWith("image/")) {
        throw createError({
            statusCode: 400,
            message: "Only image uploads are allowed",
        });
    }

    try {
        const result = await createPresignedUpload({
            filename,
            contentType,
            prefix: prefix || "images",
            creatorId: user.id,
        });

        return {
            success: true,
            assetId: result.assetId,
            uploadUrl: result.uploadUrl,
        };
    } catch (error) {
        // createCredentials only works in production or with --remote
        throw createError({
            statusCode: 500,
            message: "Presigned uploads require production or --remote flag. Use /api/assets/upload instead.",
        });
    }
});
