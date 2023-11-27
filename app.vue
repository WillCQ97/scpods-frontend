<template>
  <NuxtLayout class="ufes-style">
    <v-app>
      <NuxtPage />
    </v-app>
  </NuxtLayout>
</template>
<script setup lang="ts">
/* https://nuxt.com/docs/migration/pages-and-layouts#appvue */

// TODO: adicionar imagem e url para o site
const siteTitle = 'Mapa Colaborativo: ODS na UFES'
const siteDescription =
  'Conheça as ações e projetos relacionados com os Objetivos de Desenvolvimento Sustentável (ODS) na UFES'
const siteImage = ''
const siteUrl = ''

useHead({
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

  link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon-ods.png' }],
  script: [{ innerHTML: 'console.log(\'Olá, executado da meta tag config no app.vue\')' }]
})
</script>
