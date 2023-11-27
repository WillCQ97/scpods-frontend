import { defineNuxtConfig } from '@nuxt/bridge'
import colors from 'vuetify/es5/util/colors'

// TODO: adicionar imagem e url para o site
const siteTitle = 'Mapa Colaborativo: ODS na UFES'
const siteDescription =
  'Conheça as ações e projetos relacionados com os Objetivos de Desenvolvimento Sustentável (ODS) na UFES'
const siteImage = ''
const siteUrl = ''

export default defineNuxtConfig({
  app: {
    head: {
      title: siteTitle,
      titleTemplate: '%s',
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
    },
  },
  bridge: false,
  // Global page headers: https://go.nuxtjs.dev/config-head

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/styles/main.css', '~/assets/styles/font.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    'nuxt-leaflet',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['nuxt-leaflet', '@nuxtjs/axios'],

  axios: {
    baseURL: process.env.BASE_URL || 'http://localhost:8080/api',
    credentials: false,
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
})
