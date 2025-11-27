/**
 * Fallback endpoint for serving assets in development without --remote flag.
 * In production, use presigned URLs from getAssetUrl() instead.
 */
export default eventHandler(async (event) => {
  const { pathname: assetId } = getRouterParams(event);

  if (!assetId) {
    throw createError({
      statusCode: 400,
      message: "Asset ID is required",
    });
  }

  // Add security headers to prevent XSS
  setHeader(event, "Content-Security-Policy", "default-src 'none';");

  return serveAssetById(assetId, event);
});
