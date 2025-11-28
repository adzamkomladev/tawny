import { drizzle as drizzleHttp } from 'drizzle-orm/neon-http';
import { drizzle as drizzleWs } from 'drizzle-orm/neon-serverless';
import { drizzle as drizzlePostgres } from 'drizzle-orm/postgres-js';

import type { Hyperdrive } from '@cloudflare/workers-types'
import postgres from 'postgres';

import ws from 'ws';
import { users, accounts, sessions, verifications, teams, assets, events } from './schema';


const schema = {
    users,
    accounts,
    sessions,
    verifications,
    teams,
    assets,
    events,
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



export function usePostgres() {
    // @ts-expect-error globalThis.__env__ is not defined
    const hyperdrive = process.env.POSTGRES || globalThis.__env__?.POSTGRES || globalThis.POSTGRES as Hyperdrive | undefined
    const dbUrl = hyperdrive?.connectionString || process.env.DB_URL
    if (!dbUrl) {
        throw createError('Missing `POSTGRES` hyperdrive binding or `DB_URL` env variable')
    }

    return postgres(dbUrl, {
        ssl: !hyperdrive ? 'require' : undefined
    })
}


export const db = drizzlePostgres({
    client: usePostgres(),
    schema
});