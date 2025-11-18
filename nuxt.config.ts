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
    '@nuxthub/core'
  ],
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
})