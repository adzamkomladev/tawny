// import { drizzle as drizzleHttp } from 'drizzle-orm/neon-http';
// import { drizzle as drizzleWs } from 'drizzle-orm/neon-serverless';
import { drizzle as drizzlePostgres } from 'drizzle-orm/postgres-js';

import type { Hyperdrive } from '@cloudflare/workers-types'
import postgres from 'postgres';

// import ws from 'ws';
import { users, accounts, sessions, verifications, teams, assets, events, affiliateApplications } from './schema';


const schema = {
    users,
    accounts,
    sessions,
    verifications,
    teams,
    assets,
    events,
    affiliateApplications
};

// export const httpDb = drizzleHttp({
//     connection: {
//         connectionString: process.env.DB_URL!,
//     },
//     schema
// });

// export const wsDb = drizzleWs({
//     connection: {
//         connectionString: process.env.DB_URL!,
//     },
//     ws,
//     schema
// });


function getConnectionString(): { url: string; isHyperdrive: boolean } {
    const config = useRuntimeConfig();

    // Try to get Hyperdrive binding from Cloudflare environment
    // @ts-expect-error - Cloudflare bindings available at runtime
    const hyperdrive = globalThis.__env__?.POSTGRES as Hyperdrive | undefined;

    if (hyperdrive?.connectionString) {
        return { url: hyperdrive.connectionString, isHyperdrive: true };
    }

    // Fallback to runtime config or env variable
    const dbUrl = config.dbUrl || process.env.DB_URL;
    if (dbUrl) {
        return { url: dbUrl, isHyperdrive: false };
    }

    throw createError('Missing `POSTGRES` hyperdrive binding or `DB_URL` env variable');
}

export function usePostgres() {
    const { url, isHyperdrive } = getConnectionString();

    // Create a new postgres client for each call
    // Hyperdrive handles connection pooling, so we create lightweight clients
    return postgres(url, {
        ssl: isHyperdrive ? false : 'require', // Hyperdrive terminates TLS
        prepare: false, // Required for connection pooling (Hyperdrive)
        max: 1, // Single connection per request in Workers
    });
}

export function useDbInstance() {
    return drizzlePostgres({
        client: usePostgres(),
        schema
    });
}

// For backward compatibility - creates a new instance each call
export const db = new Proxy({} as ReturnType<typeof drizzlePostgres<typeof schema>>, {
    get(_, prop) {
        return (useDbInstance() as any)[prop];
    }
});