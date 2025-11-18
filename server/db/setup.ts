import { drizzle as drizzleHttp } from 'drizzle-orm/neon-http';
import { drizzle as drizzleWs } from 'drizzle-orm/neon-serverless';

import ws from 'ws';


export const httpDb = drizzleHttp({
    connection: {
        connectionString: process.env.DB_URL!,
    }
});

export const wsDb = drizzleWs({
    connection: {
        connectionString: process.env.DB_URL!,
    },
    ws,
});
