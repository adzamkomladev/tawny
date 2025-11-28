import {
    timestamp,
    pgTable,
    text,
    varchar,
    uuid,
    boolean,
    jsonb,
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

export const assets = pgTable("assets", {
    id: uuid()
        .$defaultFn(() => uuidv7())
        .primaryKey(),
    creatorId: uuid("creator_id")
        .references(() => users.id, { onDelete: "cascade" }),
    pathname: varchar('pathname', { length: 1000 }).notNull(),
    originalName: varchar('original_name', { length: 500 }).notNull(),
    bucket: varchar('bucket', { length: 100 }).notNull(),
    contentType: varchar('content_type', { length: 100 }).notNull(),
    size: varchar('size', { length: 50 }),
    linkedAt: timestamp("linked_at"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "date", precision: 3 }).$onUpdate(
        () => new Date(),
    ),
});

export const teams = pgTable("teams", {
    id: uuid()
        .$defaultFn(() => uuidv7())
        .primaryKey(),
    ownerId: uuid("owner_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    affiliateId: uuid("affiliate_id")
        .references(() => users.id, { onDelete: "set null" }),
    name: varchar("name", { length: 100 }).notNull(),
    slug: varchar("slug", { length: 100 }).notNull().unique(),
    description: varchar("description", { length: 300 }),
    banner: uuid("banner").references(() => assets.id, { onDelete: "set null" }),
    logo: uuid("logo").references(() => assets.id, { onDelete: "set null" }),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "date", precision: 3 }).$onUpdate(
        () => new Date(),
    ),
});

export const events = pgTable("events", {
    id: uuid()
        .$defaultFn(() => uuidv7())
        .primaryKey(),
    teamId: uuid("team_id")
        .notNull()
        .references(() => teams.id, { onDelete: "cascade" }),
    creatorId: uuid("creator_id")
        .notNull()
        .references(() => users.id, { onDelete: "set null" }),
    title: varchar("title", { length: 200 }).notNull(),
    slug: varchar("slug", { length: 200 }).notNull().unique(),
    description: text("description"),
    tags: jsonb("tags").$type<string[]>(),
    logo: uuid("logo").references(() => assets.id, { onDelete: "set null" }),
    banner: uuid("banner").references(() => assets.id, { onDelete: "set null" }),
    poster: uuid("poster").references(() => assets.id, { onDelete: "set null" }),
    gallery: jsonb("gallery").$type<{ picture: string, caption: string, order: number }[]>(),
    venue: varchar("venue", { length: 500 }),
    startDate: timestamp("start_date"),
    endDate: timestamp("end_date"),
    votingEnabledAt: timestamp("voting_enabled_at"),
    ticketsEnabledAt: timestamp("tickets_enabled_at"),
    status: varchar("status", { length: 30 }).notNull().default("draft"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "date", precision: 3 }).$onUpdate(
        () => new Date(),
    ),
});
