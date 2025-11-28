import { drizzle as drizzleHttp } from 'drizzle-orm/neon-http';
import { drizzle as drizzleWs } from 'drizzle-orm/neon-serverless';

import ws from 'ws';
import { users, accounts, sessions, verifications, teams, assets, events } from './schema';

const dbSchema = {
    users,
    accounts,
    sessions,
    verifications,
    teams,
    events,
    assets,
};

// Lazy initialization to avoid errors during Cloudflare build validation
let _httpDb: ReturnType<typeof drizzleHttp> | null = null;
let _wsDb: ReturnType<typeof drizzleWs> | null = null;

export const httpDb = new Proxy({} as ReturnType<typeof drizzleHttp>, {
    get(_target, prop) {
        if (!_httpDb) {
            const connectionString = process.env.DB_URL;
            if (!connectionString) {
                throw new Error('DB_URL environment variable is not set');
            }
            _httpDb = drizzleHttp({
                connection: { connectionString },
                schema: dbSchema,
            });
        }
        return Reflect.get(_httpDb, prop);
    },
});

export const wsDb = new Proxy({} as ReturnType<typeof drizzleWs>, {
    get(_target, prop) {
        if (!_wsDb) {
            const connectionString = process.env.DB_URL;
            if (!connectionString) {
                throw new Error('DB_URL environment variable is not set');
            }
            _wsDb = drizzleWs({
                connection: { connectionString },
                ws,
                schema: dbSchema,
            });
        }
        return Reflect.get(_wsDb, prop);
    },
});
