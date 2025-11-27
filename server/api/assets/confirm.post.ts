import { confirmUploadSchema } from "~~/schemas/assets";

/**
 * Confirm that a presigned upload completed successfully.
 * This updates the asset record with the actual file size.
 * 
 * POST /api/assets/confirm
 * Body: { assetId: string }
 * 
 * Returns: { success: boolean, url: string }
 */
export default eventHandler(async (event) => {
  // Require authentication
    const { user } = requireAuth(event);

  const { assetId } = await readValidatedBody(event, confirmUploadSchema.parse);

  // Verify the asset belongs to the user
  const asset = await getAsset(assetId);

  if (!asset) {
    throw createError({
      statusCode: 404,
      message: "Asset not found",
    });
  }

    if (asset.creatorId !== user.id) {
    throw createError({
      statusCode: 403,
      message: "Forbidden",
    });
  }

  const confirmed = await confirmUpload(assetId);

  if (!confirmed) {
    throw createError({
      statusCode: 400,
      message: "Upload not found or not completed",
    });
  }

  // Return presigned URL for immediate use
  const url = await getAssetUrl(assetId);

  return {
    success: true,
    url,
  };
});
