const organizerRoutes = [
    { path: "/home", exact: true },
];

export default defineNuxtRouteMiddleware(async (to) => {
    const url = to.path;

    if (
        !organizerRoutes.some((route) =>
            route.exact ? url === route.path : url.startsWith(route.path),
        )
    ) {
        return;
    }
    

    if (!useAuth().isOrganizer.value) {
        return navigateTo('/unauthorized');
    }
});