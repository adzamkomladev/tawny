import { use, type EventHandlerRequest, type H3Event } from "h3";
import { betterAuth, BetterAuthOptions } from "better-auth";
import { customSession } from "better-auth/plugins";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { EmailTemplate } from "~~/types/email";
import { useWsDb, tables } from "./db";
import { sendTemplatedEmail } from "./email";

// Lazy initialization to avoid errors during Cloudflare build validation
let _auth: ReturnType<typeof betterAuth> | null = null;

function getAuthOptions(): BetterAuthOptions {
  return {
    session: {
      cookieCache: {
        enabled: true,
        maxAge: 5 * 60, // Cache duration in seconds
      },
    },
    emailAndPassword: {
      enabled: true,
      sendResetPassword: async ({ user, url, token }, request) => {
        await sendTemplatedEmail(
          { name: user.name || "User", email: user.email },
          "Reset your password",
          EmailTemplate.RESET_PASSWORD,
          { name: user.name || "User", resetLink: url }
        );
      },
    },
    emailVerification: {
      sendVerificationEmail: async ({ user, url, token }, request) => {
        await sendTemplatedEmail(
          { name: user.name || "User", email: user.email },
          "Verify your email address",
          EmailTemplate.EMAIL_VERIFICATION,
          { name: user.name || "User", verificationLink: url }
        );
      },
    },
    socialProviders: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      },
    },
    database: drizzleAdapter(useWsDb(), {
      provider: "pg",
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
    plugins: [],
  };
}

function getAuth() {
  if (!_auth) {
    const options = getAuthOptions();
    _auth = betterAuth({
      ...options,
      plugins: [
        ...(options.plugins ?? []),
        customSession(async ({ user, session }, ctx) => {
          const selected = await hubKV().get<{ teamId: string | null, eventId: string | null }>(`user:${session.userId}:selected`);

          return {
            user: { ...user, selected },
            session
          };
        }, options),
      ],
    });
  }
  return _auth;
}

// Proxy to lazily initialize auth
export const auth = new Proxy({} as ReturnType<typeof betterAuth>, {
  get(_target, prop) {
    return Reflect.get(getAuth(), prop);
  },
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