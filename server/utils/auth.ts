import type { EventHandlerRequest, H3Event } from "h3";
import { betterAuth, BetterAuthOptions } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { useWsDb, tables } from "./db";

const options = {
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // Cache duration in seconds
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  database: drizzleAdapter(useWsDb(), {
    provider: "pg", // or "pg" or "mysql"
    usePlural: true,
    schema: {
      ...tables
    }
  }),
  advanced: {
    database: {
      generateId: false,
    },
  },

} satisfies BetterAuthOptions;

export const auth = betterAuth({
  ...options,
});

export type Session = typeof auth.$Infer.Session;

/**
 * Get the current session if authenticated, otherwise returns null
 * Does not throw an error if session is not available
 */
export const getCurrentAuth = (
  event: H3Event<EventHandlerRequest>,
): Session | null => {
  return event.context.auth || null;
};

/**
 * Require authentication for an API route
 * Throws an error if user is not authenticated
 */
export function requireAuth(event: any): Session {
  const session = event.context.auth as Session | null;

  if (!session?.user) {
    throw createError({
      statusCode: 401,
      statusMessage: "Authentication required",
    });
  }

  return session;
}