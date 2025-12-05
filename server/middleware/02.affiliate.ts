const affiliateRoutes = [
  { path: '/api/affiliate/', exact: false },
];

export default defineEventHandler(async (event) => {
  const url = getRequestURL(event).pathname;

  if (
    !affiliateRoutes.some((route) =>
      route.exact ? url === route.path : url.startsWith(route.path),
    )
  ) {
    return;
  }

  const { user } = getCurrentAuth(event)!;

  if (user?.role !== 'affiliate') {
    throw createError({
      statusCode: 403,
      statusMessage: 'Only affiliates can access this resource',
    });
  }
});
