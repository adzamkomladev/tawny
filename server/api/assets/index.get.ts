export default eventHandler(async (event) => {
  // Require authentication
  requireAuth(event);

  const { limit, cursor } = getQuery(event);

  // List blobs from storage
  const result = await hubBlob().list({
    limit: limit ? Number.parseInt(limit as string) : 20,
    cursor: cursor ? (cursor as string) : undefined,
  });

  return {
    blobs: result.blobs,
    hasMore: result.hasMore,
    cursor: result.cursor,
  };
});
