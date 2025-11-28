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

export const httpDb = drizzleHttp({
    connection: {
        connectionString: process.env.DB_URL!,
    },
    schema
});

export const wsDb = drizzleWs({
    connection: {
        connectionString: process.env.DB_URL!,
    },
    ws,
    schema
});
