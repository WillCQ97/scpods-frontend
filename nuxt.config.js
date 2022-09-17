import colors from 'vuetify/es5/util/colors'

// TODO: adicionar imagem e url para o site
const siteTitle = 'Mapa Colaborativo Projetos ODS na UFES'
const siteDescription =
  'Conheça as ações e projetos relacionados com os Objetivos de Desenvolvimento Sustentável na UFES'
const siteImage = ''
const siteUrl = ''

const colorUfes = {
  // Monocromatic pallete from primary color #234379 made on https://pt.paletadecolores.online/cor-monocromatica/
  default: {
    primary: '#234379',
    mono1: '#000011',
    mono2: '#11182c',
    mono3: '#182849',
    mono4: '#203a69',
    mono5: '#345188',
    mono6: '#546da8',
    mono7: '#748bc8',
    mono8: '#94aaea',
  },
}

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s',
    title: siteTitle,
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
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/logos/ods-small.png' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['nuxt-leaflet'],

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      ufes_light: true,
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
        ufes_light: {
          primary: colorUfes.default.primary,
          accent: colorUfes.default.light,
          secondary: colorUfes.default.dark,
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
}
