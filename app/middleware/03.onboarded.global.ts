import { is } from "drizzle-orm";

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

    const { user, hasRole, needsEvent, needsTeam, isAffiliate } = useAuth();

    if (!hasRole && url !== '/onboarding') {
        return navigateTo({
            path: '/onboarding',
            query: { redirect: url },
        });
    }

    if (isAffiliate && true && url !== '/onboarding/affiliate') {
        return navigateTo({
            path: '/onboarding/affiliate',
            query: { redirect: url },
        });
    }
   
    if (needsTeam && url !== '/onboarding/team') {
        return navigateTo({
            path: '/onboarding/team',
            query: { redirect: url },
        });
    }

    if (needsEvent && url !== '/onboarding/event') {
        return navigateTo({
            path: '/onboarding/event',
            query: { redirect: url },
        });
    }

});