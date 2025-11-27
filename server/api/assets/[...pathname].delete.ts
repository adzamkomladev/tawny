export default eventHandler(async (event) => {
  // Require authentication for deletion
    const { user } = requireAuth(event);

  const { pathname: assetId } = getRouterParams(event);

  if (!assetId) {
    throw createError({
      statusCode: 400,
      message: "Asset ID is required",
    });
  }

  // Verify the asset belongs to the user
  const asset = await getAsset(assetId);

  if (!asset) {
    throw createError({
      statusCode: 404,
      message: "Asset not found",
    });
  }

  // Only allow deletion if user is the creator
    if (asset.creatorId !== user.id) {
    throw createError({
      statusCode: 403,
      message: "Forbidden",
    });
  }

  await deleteAsset(assetId);

  return sendNoContent(event);
});
