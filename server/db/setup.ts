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


// Lazy-initialized database instance (Cloudflare Workers don't allow I/O at global scope)
let _db: ReturnType<typeof drizzlePostgres<typeof schema>> | null = null;
let _postgres: ReturnType<typeof postgres> | null = null;

export function usePostgres() {
    if (_postgres) return _postgres;

    const config = useRuntimeConfig();
    // @ts-expect-error globalThis.__env__ is not defined
    const hyperdrive = process.env.POSTGRES || globalThis.__env__?.POSTGRES || globalThis.POSTGRES as Hyperdrive | undefined
    const dbUrl = hyperdrive?.connectionString || config.dbUrl || process.env.DB_URL

    if (!dbUrl) {
        throw createError('Missing `POSTGRES` hyperdrive binding or `DB_URL` env variable')
    }

    // Hyperdrive handles connection pooling and SSL, so we disable prepare (no named prepared statements)
    // and avoid SSL when using Hyperdrive since it terminates TLS at the edge
    _postgres = postgres(dbUrl, {
        ssl: hyperdrive ? false : 'require',
        prepare: false, // Required for Hyperdrive - disables prepared statements
        connect_timeout: 10,
        idle_timeout: 20,
        max_lifetime: 60 * 30, // 30 minutes
    })

    return _postgres;
}

export function useDbInstance() {
    if (_db) return _db;

    _db = drizzlePostgres({
        client: usePostgres(),
        schema
    });

    return _db;
}

// For backward compatibility - getter that lazily initializes
export const db = new Proxy({} as ReturnType<typeof drizzlePostgres<typeof schema>>, {
    get(_, prop) {
        return (useDbInstance() as any)[prop];
    }
});