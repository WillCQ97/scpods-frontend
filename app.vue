<template>
  <NuxtLayout>
    <v-app>
      <NuxtPage />
    </v-app>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { Objetivo } from './models/objetivo.model'

// TODO: adicionar imagem e url para o site
const siteTitle = 'Mapa Colaborativo: ODS na UFES'
const siteDescription =
  'Conheça as ações e projetos relacionados com os Objetivos de Desenvolvimento Sustentável na UFES'
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
  script: [
    {
      innerHTML: "console.log('Olá, executado da meta tag config no app.vue')",
    },
  ],
})

/*TODO: ADD CÓDIGO DE TESTE SALVO EM STASH
const objetivoStore = useObjetivo()
const runtimeConfig = useRuntimeConfig()

await callOnce(async () => {
  objetivoStore.objetivos = await $fetch(
    runtimeConfig.public.apiBase + '//objetivos',
  ).catch((error) => {
    console.log('Erro ao requisitar os objetivos', error)
  })
})
*/

// INICIALIZA O APP COM A LISTAGEM DOS OBJETIVOS
// usa a repository para obter os dados da api, então adiciona a store
const { $api } = useNuxtApp()
const { data: objetivosResponse } = await $api.objetivos.getObjetivos()

const odsStore = useObjetivoStore()
odsStore.setObjetivos(
  objetivosResponse?.value ? objetivosResponse.value : ([] as Objetivo[]),
)
</script>
