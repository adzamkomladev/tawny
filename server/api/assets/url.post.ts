import { getAssetUrlSchema } from "~~/schemas/assets";

/**
 * Generate presigned URLs for one or more asset IDs.
 * 
 * POST /api/assets/url
 * Body: { assetId: string } | { assetIds: string[] }
 * Query: ?expiresIn=3600 (optional, in seconds)
 * 
 * Returns: { url: string } | { urls: Record<string, string | null> }
 */
export default eventHandler(async (event) => {
  const { assetId, assetIds } = await readValidatedBody(event, getAssetUrlSchema.parse);

  const { expiresIn } = getQuery(event);
  const options = {
    expiresIn: expiresIn ? Number.parseInt(expiresIn as string) : 3600,
  };

  // Single asset ID
  if (assetId) {
    const url = await getAssetUrl(assetId, options);

    if (!url) {
      throw createError({
        statusCode: 404,
        message: "Asset not found",
      });
    }

    return { url };
  }

  // Multiple asset IDs
  if (assetIds) {
    const urls = await getAssetUrls(assetIds, options);
    return { urls };
  }
});
