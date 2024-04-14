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
    '@pinia/nuxt',
    'nuxt3-leaflet',
  ],

  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
})
