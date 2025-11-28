const emailVerifiedRoutes = [
    { path: "/affiliate", exact: false },
    { path: "/admin", exact: false },
    { path: "/onboarding", exact: false },
    { path: "/home", exact: true },
];

export default defineNuxtRouteMiddleware(async (to) => {
    const url = to.path;

    if (
        !emailVerifiedRoutes.some((route) =>
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