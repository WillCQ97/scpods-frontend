// https://nuxt.com/docs/api/configuration/nuxt-config

import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// TODO: adicionar imagem e url para o site
const siteTitle = 'Mapa Colaborativo: ODS na UFES'
const siteDescription =
  'Conheça as ações e projetos relacionados com os Objetivos de Desenvolvimento Sustentável (ODS) na UFES'
const siteImage = ''
const siteUrl = ''

export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      htmlAttrs: {
        lang: 'pt-br',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' },

        // Open Graph attributes
        { hid: 'og-type', name: 'og:type', content: 'website' },
        { hid: 'og-title', name: 'og:title', content: siteTitle },
        {
          hid: 'og-description',
          name: 'og:description',
          content: siteDescription,
        },
        { hid: 'og-image', name: 'og:image', content: siteImage },
        { hid: 'og-url', name: 'og:url', content: siteUrl },
        { hid: 'og-locale', name: 'og:locale', content: 'pt_BR' },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon-ods.png' }],
      titleTemplate: '%s',
      title: siteTitle,
      viewport: 'width=device-width, initial-scale=1',
    },
  },

  build: {
    transpile: ['vuetify'],
  },

  devtools: { enabled: true },

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
