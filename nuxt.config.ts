import tailwindcss from '@tailwindcss/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/fonts',
    '@nuxt/hints',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxthub/core',
    'shadcn-nuxt',
  ],
  css: ['~/assets/css/tailwind.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  shadcn: {
    /**
     * Prefix for all the imported component.
     * @default "Ui"
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * Will respect the Nuxt aliases.
     * @link https://nuxt.com/docs/api/nuxt-config#alias
     * @default "@/components/ui"
     */
    componentDir: '@/components/ui'
  },

  nitro: {
    experimental: {
      websocket: true
    }
  },
  hub: {
    cache: true,
    kv: true,
    blob: true,
    workers: true,

    bindings: {
      observability: {
        logs: true,
      },
    },

  },

  routeRules: {
    "/affiliate/**": { ssr: false },
    "/admin/**": { ssr: false },
    "/home": { ssr: false },
    "/password/**": { ssr: false },
    "/email/**": { ssr: false },
    "/onboarding/**": { ssr: false },
  },

  runtimeConfig: {
    public: {
      appUrl: 'https://tix4u.online',
    }
  },
})