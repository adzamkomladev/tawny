import {
    timestamp,
    pgTable,
    text,
    varchar,
    uuid,
    boolean,
} from "drizzle-orm/pg-core";
import { v7 as uuidv7 } from "uuid";

export const users = pgTable("users", {
    id: uuid()
        .$defaultFn(() => uuidv7())
        .primaryKey(),
    name: varchar("name", { length: 200 }).notNull(),
    email: varchar("email", { length: 100 }).notNull().unique(),
    emailVerified: boolean("email_verified")
        .$defaultFn(() => false)
        .notNull(),
    image: varchar("image", { length: 1000 }),
    role: varchar("role", { length: 30 }),
    banned: boolean("banned"),
    banReason: varchar("ban_reason", { length: 255 }),
    banExpires: timestamp("ban_expires"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "date", precision: 3 }).$onUpdate(
        () => new Date(),
    ),
});

export const sessions = pgTable("sessions", {
    id: uuid()
        .$defaultFn(() => uuidv7())
        .primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: uuid("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").notNull(),
    updatedAt: timestamp("updated_at").notNull(),
});

export const accounts = pgTable("accounts", {
    id: uuid()
        .$defaultFn(() => uuidv7())
        .primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: uuid("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "date", precision: 3 }).$onUpdate(
        () => new Date(),
    ),
});

export const verifications = pgTable("verifications", {
    id: uuid()
        .$defaultFn(() => uuidv7())
        .primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "date", precision: 3 }).$onUpdate(
        () => new Date(),
    ),
});