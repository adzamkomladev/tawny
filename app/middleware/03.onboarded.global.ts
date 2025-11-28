const onboardedRoutes = [
    { path: "/affiliate", exact: false },
    { path: "/admin", exact: false },
    { path: "/home", exact: true },
];

export default defineNuxtRouteMiddleware(async (to) => {
    const url = to.path;

    if (
        !onboardedRoutes.some((route) =>
            route.exact ? url === route.path : url.startsWith(route.path),
        )
    ) {
        return;
    }

    const { hasRole, needsEvent, needsTeam, isAffiliate } = useAuth();

    if (!hasRole.value) {
        return navigateTo({
            path: '/onboarding',
            query: { redirect: url },
        });
    }

    if (isAffiliate.value && true) {
        return navigateTo({
            path: '/onboarding/affiliate',
            query: { redirect: url },
        });
    }

    if (needsTeam.value) {
        return navigateTo({
            path: '/onboarding/team',
            query: { redirect: url },
        });
    }

    if (needsEvent.value) {
        return navigateTo({
            path: '/onboarding/event',
            query: { redirect: url },
        });
    }

});