const authenticatedRoutes = [
    { path: "/affiliate", exact: false },
    { path: "/admin", exact: true },
    { path: "/onboarding", exact: false }
];

export default defineNuxtRouteMiddleware(async (to) => {
    const url = to.path;

    if (
        !authenticatedRoutes.some((route) =>
            route.exact ? url === route.path : url.startsWith(route.path),
        )
    ) {
        return;
    }

    const { user, refreshUser } = useAuth();

    if (!user.value?.emailVerified) {
        await refreshUser();
    }

    if (!user.value?.emailVerified) {
        return navigateTo({
            path: "/email/verification",
            query: { redirect: url },
        });
    }
});