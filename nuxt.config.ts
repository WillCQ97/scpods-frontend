// https://nuxt.com/docs/api/configuration/nuxt-config

import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  app: {},

  build: {
    transpile: ['vuetify'],
  },

  css: ['~/assets/styles/main.css', '~/assets/styles/font.css'],
  devtools: { enabled: true },

  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    '@nuxtjs/leaflet',
    '@pinia/nuxt',
  ],

  runtimeConfig: {
    apiSecret: '', // can be overridden by NUXT_API_SECRET environment variable
    public: {
      // can be overridden by NUXT_PUBLIC_API_BASE environment variable
      apiBase: 'http://localhost:8080/acoes-ods/v1/',
    },
  },

  ssr: false,

  vite: {
    build: { target: 'es2022' },
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },

  compatibilityDate: '2024-07-13',
})
