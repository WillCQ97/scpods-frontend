// https://nuxt.com/docs/api/configuration/nuxt-config

import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// TODO: adicionar imagem e url para o site
const siteTitle = 'Mapa Colaborativo: ODS na UFES'
const siteDescription =
  'Conheça as ações e projetos relacionados com os Objetivos de Desenvolvimento Sustentável (ODS) na UFES'
const siteImage = ''
const siteUrl = ''

export default defineNuxtConfig({
  devtools: { enabled: true },
  build: {
    transpile: ['vuetify'],
  },
  
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    '@pinia/nuxt',
    'nuxt3-leaflet'
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
})
