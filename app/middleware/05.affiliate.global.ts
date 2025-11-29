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

    if (!useAuth().isAffiliate.value) {
        return navigateTo('/unauthorized');
    }
});