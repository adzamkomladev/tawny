const authenticatedRoutes = [
  { path: "/api/assets", exact: false },
  { path: "/api/onboarding", exact: false },
  { path: '/api/profile', exact: false },
  { path: '/api/affiliate/', exact: false },
];

export default defineEventHandler(async (event) => {
  const url = getRequestURL(event).pathname;

  if (
    !authenticatedRoutes.some((route) =>
      route.exact ? url === route.path : url.startsWith(route.path),
    )
  ) {
    return;
  }

  const session = await auth.api.getSession({
    headers: event.headers,
  });

  if (!session) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized!",
    });
  }

  event.context.auth = session!;
});