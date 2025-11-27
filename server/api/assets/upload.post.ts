export default eventHandler(async (event) => {
  // Get authenticated user (optional - returns null if not authenticated)
  const { user } = getCurrentAuth(event)!;

  const form = await readFormData(event);
  const file = form.get("file") as File;

  if (!file || !file.size) {
    throw createError({
      statusCode: 400,
      message: "No file provided",
    });
  }

  // Validate file - allow images up to 4MB
  ensureBlob(file, {
    maxSize: "4MB",
    types: ["image"],
  });

  // Get optional prefix from form data
  const prefix = (form.get("prefix") as string) || "images";

  const result = await uploadAsset(file, {
    prefix,
    creatorId: user?.id,
    addRandomSuffix: true,
  });

  // Generate presigned URL for immediate use
  const url = await getAssetUrl(result.assetId);

  return {
    success: true,
    assetId: result.assetId,
    url,
    contentType: result.contentType,
    size: result.size,
  };
});
