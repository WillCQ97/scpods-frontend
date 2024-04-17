import '@mdi/font/css/materialdesignicons.css'
import { createVuetify, type ThemeDefinition } from 'vuetify'
import { pt } from 'vuetify/locale' // Translations provided by Vuetify
import 'vuetify/styles'
import colors from 'vuetify/util/colors'
import colorPalleteUfes from '~/assets/colors'

// Tema adicionado ao nuxt.config criado pela adição do vuetify na versão 2
const oldDarkTheme: ThemeDefinition = {
  dark: true,
  colors: {
    primary: colors.blue.darken2,
    accent: colors.grey.darken3,
    secondary: colors.amber.darken3,
    info: colors.teal.lighten1,
    warning: colors.amber.base,
    error: colors.deepOrange.accent4,
    success: colors.green.accent3,
  },
}

// Exemplo disponibilizado em https://vuetifyjs.com/en/features/theme/#typescript
const exampleTheme: ThemeDefinition = {
  dark: false,
  colors: {
    background: '#FFFFFF',
    surface: '#FFFFFF',
    primary: '#6200EE',
    'primary-darken-1': '#3700B3',
    secondary: '#03DAC6',
    'secondary-darken-1': '#018786',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  },
}

const ufesTheme: ThemeDefinition = {
  dark: false,
  colors: {
    background: '#D2DCE8',
    surface: '#FFFFFF',
    primary: colorPalleteUfes.monocromatic.mono6,
    'primary-darken-1': colorPalleteUfes.monocromatic.mono5,
    info: colorPalleteUfes.monocromatic.primary,
    error: '#B00020',
    success: '#4CAF50',
    warning: '#FB8C00',
  },
}

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    locale: {
      locale: 'pt',
      messages: { pt },
    },
    theme: {
      defaultTheme: 'ufesTheme',
      themes: {
        exampleTheme,
        oldDarkTheme,
        ufesTheme,
      },
    },
  })
  app.vueApp.use(vuetify)
})
