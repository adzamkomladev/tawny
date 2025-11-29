# Tix4u Tawny

> **A modern events platform bundling ticketing, payments, and live voting with USSD support.**

Tix4u is a comprehensive SaaS platform designed for event organizers, affiliates, and teams to manage ticketing, process payments, and collect live votes seamlessly. Built with Nuxt 4, Drizzle ORM, and deployed on Cloudflare.

---

## 🚀 Features

- **Ticketing System**: Create events, configure paid tickets, enforce stock limits, and handle payment callbacks.
- **Live Voting**: Web and USSD voting flows with de-duplication and latency tolerance.
- **Affiliate Revenue Sharing**: Affiliates earn 20% of platform fees from admins/owners they onboard.
- **Self-Service Management**: Affiliates can apply, spin up teams, manage events/tickets/votes, and track payouts.
- **Payment & KYC Integration**: Centralized business rules for compliance-sensitive code paths.
- **Edge-Ready**: Deployed on Cloudflare with SSR/ISR support and Neon serverless Postgres.

---

## 🛠️ Tech Stack

### Core Framework
- **Nuxt 4** (SSR/ISR on Cloudflare)
- **Vue 3** (Composition API)
- **TypeScript** (Strict mode)

### Database & ORM
- **Drizzle ORM** (Type-safe SQL)
- **Neon Serverless Postgres** (Edge-compatible)

### Authentication
- **Better Auth** (Session management)
- Custom utilities in `app/composables/auth.ts` and `server/utils/auth.ts`

### Forms & Validation
- **vee-validate** + **@vee-validate/zod**
- Schemas in `schemas/<domain>/*.ts`

### UI & Styling
- **shadcn-vue** (UI primitives)
- **Tailwind CSS v4** (Custom theme tokens)
- **Nuxt Icon** (Lucide icons via `<Icon name="lucide:*" />`)
- **VueUse** (Browser/state utilities)

### Data Tables
- **@tanstack/vue-table** (Sortable/filterable grids)

### Notifications
- **vue-sonner** (Toast notifications)

---

## 📂 Project Structure

```
tawny/
├── .github/
│   └── copilot-instructions.md   # AI coding guidelines
├── app/
│   ├── assets/css/
│   │   └── tailwind.css          # Tailwind v4 config
│   ├── components/
│   │   ├── affiliate/            # Affiliate-specific components
│   │   ├── layouts/              # Layout components (sidebar, nav)
│   │   └── ui/                   # shadcn-vue primitives
│   ├── composables/
│   │   ├── auth.ts               # Client auth helpers
│   │   ├── breadcrumb.ts         # Breadcrumb state
│   │   └── nav.ts                # Navigation utilities
│   ├── layouts/                  # Nuxt layouts (admin, affiliate, auth, client)
│   ├── pages/                    # File-based routing
│   │   ├── (auth)/               # Auth pages (login, register)
│   │   ├── (client)/             # Public pages
│   │   ├── admin/                # Admin dashboard
│   │   └── affiliate/            # Affiliate dashboard
│   ├── plugins/                  # Nuxt plugins
│   └── utils/
│       ├── auth-client.ts        # Client auth utilities
│       └── string.ts             # Shared string utilities (slugify)
├── schemas/
│   └── affiliate/
│       └── teams.ts              # Zod schemas for affiliate domain
├── server/
│   ├── api/                      # API routes
│   │   ├── auth/[...all].ts      # Better Auth handler
│   │   └── health.ts             # Health check
│   ├── db/
│   │   ├── index.ts              # Drizzle connection
│   │   ├── schema.ts             # Database schema
│   │   ├── setup.ts              # Seed/setup scripts
│   │   └── migrations/           # Drizzle migrations
│   └── utils/
│       ├── auth.ts               # Server auth helpers
│       └── db.ts                 # DB utilities
├── components.json               # shadcn-vue config
├── drizzle.config.ts             # Drizzle Kit config
├── nuxt.config.ts                # Nuxt configuration
├── package.json                  # Dependencies
├── tsconfig.json                 # TypeScript config
└── README.md                     # This file
```

---

## 🏗️ Getting Started

### Prerequisites

- **Bun** 1.0+ (recommended) or **Node.js** 22+
- **Neon Postgres** account (for database)
- **Cloudflare Workers** account (for deployment)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/adzamkomladev/tawny.git
   cd tawny
   ```

2. **Install dependencies**:
   ```bash
   bun install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory:
   ```env
   # Database
   DATABASE_URL=your_neon_postgres_connection_string

   # Better Auth
   AUTH_SECRET=your_auth_secret_key
   
   # Cloudflare (optional for local dev)
   # Add Cloudflare bindings as needed
   ```

4. **Run database migrations**:
   ```bash
   bun run db:migrate
   ```

5. **Start the development server**:
   ```bash
   bun run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 Available Scripts

| Script            | Description                                      |
|-------------------|--------------------------------------------------|
| `bun run dev`     | Start development server                         |
| `bun run build`   | Build for production                             |
| `bun run start`   | Start production server                          |
| `bun run preview` | Preview production build locally                 |
| `bun run format`  | Format code with Prettier                        |
| `bun run db:generate` | Generate Drizzle migrations                  |
| `bun run db:migrate`  | Apply database migrations                    |
| `bun run db:studio`   | Open Drizzle Studio (visual DB editor)       |

---

## 🎨 UI Components

This project uses **shadcn-vue** components. To add new components:

```bash
bunx --bun shadcn-vue@latest add <component-name>
```

Example:
```bash
bunx --bun shadcn-vue@latest add dialog
```

Components are stored in `app/components/ui/`.

---

## 🗄️ Database Management

### Generate Migrations
After modifying `server/db/schema.ts`:
```bash
bun run db:generate
```

### Apply Migrations
```bash
bun run db:migrate
```

### Visual Editor
Open Drizzle Studio:
```bash
bun run db:studio
```

---

## 🚢 Deployment

### Cloudflare Workers

1. **Build the project**:
   ```bash
   bun run build
   ```

2. **Deploy with Wrangler**:
   ```bash
   bunx wrangler deploy
   ```

3. **Environment Variables**:
   Configure secrets in the Cloudflare dashboard or via Wrangler:
   ```bash
   bunx wrangler secret put DATABASE_URL
   bunx wrangler secret put AUTH_SECRET
   ```

### Route Rules (SSR/CSR)
- `/affiliate/**` - Client-side rendered
- `/admin/**` - Client-side rendered
- `/home` - Client-side rendered
- All other routes - Server-side rendered

---

## 🧑‍💻 Development Guidelines

### File Size Limits
- **`.ts` files**: Max 200 lines
- **`.vue` files**: Max 300-350 lines
- Refactor large files into composables or sub-components.

### Code Conventions
- **Script Order**: `<script setup>` must precede `<template>`.
- **Icons**: Use `<Icon name="lucide:icon-name" />` (avoid raw `lucide-vue-next` imports).
- **Schemas**: Define in `schemas/<domain>/*.ts`, never inline.
- **Utils**: Place reusable logic in `app/utils/*.ts` for auto-import.
- **VueUse**: Prefer VueUse functions for common tasks (e.g., `useDropZone`, `useFileDialog`).

### UI Patterns
- Use **bold section titles** (`font-semibold`) in forms.
- Separate page headers from form cards.
- Use dynamic helper text for derived values (e.g., slugs).

### Authentication
- All admin/affiliate routes are guarded with auth middleware.
- Session logic lives on the server; expose typed helpers to the client.

### Business Rules
- Keep payment, KYC, and compliance logic centralized for reuse by Cloudflare workers and Trigger.dev jobs.

---

## 🧪 Testing & Quality

- Run TypeScript checks before shipping:
  ```bash
  bun run build
  ```
- Format code with Prettier:
  ```bash
  bun run format
  ```
- Write unit tests for schema/business utilities.
- Stub Neon/Cloudflare specifics in tests.

---

## 📖 Documentation

- [Nuxt 4 Documentation](https://nuxt.com/docs)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Better Auth](https://better-auth.dev/)
- [shadcn-vue](https://shadcn-vue.com/)
- [VueUse](https://vueuse.org/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is private and proprietary. All rights reserved.

---

## 🙏 Acknowledgments

- Built with [Nuxt](https://nuxt.com/)
- UI components from [shadcn-vue](https://shadcn-vue.com/)
- Icons by [Lucide](https://lucide.dev/)
- Deployed on [Cloudflare Workers](https://workers.cloudflare.com/)

---

**Tix4u tawny** - Empowering events with seamless ticketing, payments, and voting.
