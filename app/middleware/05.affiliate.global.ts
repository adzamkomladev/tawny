const affiliateRoutes = [
    { path: "/affiliate/", exact: false },
];

export default defineNuxtRouteMiddleware(async (to) => {
    const url = to.path;

    if (
        !affiliateRoutes.some((route) =>
            route.exact ? url === route.path : url.startsWith(route.path),
        )
    ) {
        return;
    }

    const { user, isAffiliate } = useAuth();

    if (!isAffiliate.value) {
        return navigateTo('/unauthorized');
    }

    if (!user.value?.affiliate?.verified) {
        return navigateTo({
            path: "/onboarding/affiliate",
            query: { redirect: url },
        });
    }
});