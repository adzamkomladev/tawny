const authenticatedRoutes = [
    { path: "/affiliate", exact: false },
    { path: "/admin", exact: false },
    { path: "/onboarding", exact: false },
    { path: '/email', exact: false },
    { path: "/home", exact: true },
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

    if (!user.value) {
        await refreshUser();
    }

    if (!user.value) {
        return navigateTo({
            path: "/login",
            query: { redirect: url },
        });
    }
});