import { createAuthClient } from "better-auth/vue" // make sure to import from better-auth/vue
import {
    inferAdditionalFields,
} from "better-auth/client/plugins";
import type { auth } from "~~/server/utils/auth";

export const authClient = createAuthClient({
    plugins: [
        inferAdditionalFields<typeof auth>(),

    ],
});

export const {
    useSession,
    getSession,
    sendVerificationEmail,
    requestPasswordReset,
    resetPassword,
    signIn,
    signUp,
    signOut
} = authClient;

export type Session = typeof authClient.$Infer.Session;
export type User = typeof authClient.$Infer.Session.user;