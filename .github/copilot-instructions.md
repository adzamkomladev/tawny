# Copilot Instructions

## Product & Domain
- Tix4u is an events platform that bundles ticketing, payments, and live voting (including USSD flows).
- Users and teams can create events, configure paid tickets, and collect votes; fees are shared with affiliates (20% of platform fees earned from the admins/owners they bring in).
- Affiliates can self-serve: apply, spin up a team + admin, manage their team's events/tickets/votes, and track payouts.
- Payment, KYC/user-management, and compliance-sensitive code paths must be handled carefully; keep business rules centralized so Cloudflare workers and potential Trigger.dev jobs can reuse them.

## Tech Stack Expectations
- Nuxt 4 (app router) with SSR/ISR on Cloudflare: prefer server routes/composables under `server/*` and `app/composables/*`; always use `defineNuxtRouteMiddleware`, `useState`, and `useSeoMeta` helpers.
- Database layer is Drizzle ORM + Neon serverless Postgres. Use `server/db/schema.ts` & `server/db/index.ts`; schema changes go through `drizzle-kit` migrations.
- Auth relies on Better Auth + custom utilities in `app/composables/auth.ts` and `server/utils/auth.ts`; keep session logic on the server and expose typed helpers to the client.
- Forms and validation: `vee-validate` + `@vee-validate/zod` + `zod`. Define schemas in `schemas/<domain>/*.ts` (e.g., `schemas/affiliate/teams.ts`) and import them; never hand-validate or define schemas inside components.
- Icons: Use `<Icon name="lucide:<icon-name>" />` (via Nuxt Icon) instead of importing raw `lucide-vue-next` components.
- Tables and complex data grids: `@tanstack/vue-table` utilities already installed; prefer using them for sortable/filterable data views.
- Animations and styling run through Tailwind v4 (`app/assets/css/tailwind.css`) with custom `@theme` tokens; use semantic CSS variables (`bg-background`, `text-foreground`, etc.) instead of hard-coded values.
- UI kit is shadcn-vue components stored in `app/components/ui`. Do not recreate primitives; import from the existing directories or add via shadcn generator so tokens stay consistent.
- Utilities: Prefer `vueuse` functions for common browser/state logic over custom implementations.

## Architectural Conventions
- File Size Limits: Enforce a hard limit of 200 lines for `.ts` files and 300-350 lines for `.vue` files. Refactor large files into smaller composables or components.
- Vue SFC structure: `<script setup>` must always precede `<template>`.
- Keep UI logic in `app/components` or feature-specific `app/pages` files and push data fetching/business rules into server routes, Nitro server handlers, or composables.
- Shared utilities (e.g., string manipulation, formatting) go in `app/utils/*.ts` for auto-import; avoid local definitions for reusable logic.
- Use composables for cross-cutting concerns (auth, navigation, breadcrumbs, affiliate state). Extend existing files (`app/composables/*.ts`) before creating new ones.
- UI Patterns: Use bold section titles (`font-semibold`) in forms. Separate page headers from form cards. Use dynamic helper text for derived values (like slugs) instead of read-only inputs.
- For Cloudflare deployment, keep server handlers edge-friendly (no Node-only APIs) and prefer async/await with the Neon serverless driver.
- Anticipate Trigger.dev automation: author server functions with idempotent signatures so they can be reused by background jobs later.

## Feature Priorities & Gotchas
- Ticketing flows must enforce stock limits and handle payment success/failure callbacks server-side before updating Neon.
- Voting (web + USSD) should de-duplicate submissions per user/account and tolerate latency; queue or debounce when necessary.
- Affiliate revenue share (20%) needs accurate fee calculations; keep math in shared utilities to avoid drift between dashboard and payouts.
- Guard every admin/affiliate route with auth middleware and role checks.

## Testing & Quality
- Lean on unit tests for schema/business utilities and component tests for complex UI logic; stub Neon/Cloudflare specifics.
- Run `npm run lint`/`npm run test` equivalents if/when added; at minimum ensure TypeScript + `nuxt build` stay clean before shipping.
- When touching data models, generate and run Drizzle migrations; update seed/setup scripts in `server/db/setup.ts` as needed.

## DX Notes
- Use `npm run dev` for local development (Bun is optional but supported when using shadcn CLI).
- Prefer composables + UI primitives over ad-hoc logic; honor strict TypeScript settings in `tsconfig.json`.
- Document any new environment variables (Cloudflare, Neon, webhook secrets) in the README or deployment notes, never hard-code them.
