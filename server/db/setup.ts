import { drizzle as drizzleHttp } from 'drizzle-orm/neon-http';
import { drizzle as drizzleWs } from 'drizzle-orm/neon-serverless';

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

// Lazy initialization to avoid errors during Cloudflare build validation
// Environment variables are not available at module load time
let _httpDb: ReturnType<typeof drizzleHttp> | null = null;
let _wsDb: ReturnType<typeof drizzleWs> | null = null;

function getHttpDb() {
    if (!_httpDb) {
        const connectionString = process.env.DB_URL;
        if (!connectionString) {
            throw new Error('DB_URL environment variable is not set');
        }
        _httpDb = drizzleHttp({
            connection: { connectionString },
            schema,
        });
    }
    return _httpDb;
}

function getWsDb() {
    if (!_wsDb) {
        const connectionString = process.env.DB_URL;
        if (!connectionString) {
            throw new Error('DB_URL environment variable is not set');
        }
        _wsDb = drizzleWs({
            connection: { connectionString },
            ws,
            schema,
        });
    }
    return _wsDb;
}

// Export as getters to ensure lazy initialization
export const httpDb = new Proxy({} as ReturnType<typeof drizzleHttp>, {
    get(_target, prop) {
        return Reflect.get(getHttpDb(), prop);
    },
});

export const wsDb = new Proxy({} as ReturnType<typeof drizzleWs>, {
    get(_target, prop) {
        return Reflect.get(getWsDb(), prop);
    },
});
