<template>
  <NuxtLayout>
    <v-app>
      <NuxtPage />
    </v-app>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { ObjetivoInterface } from './models/objetivo.model'

// TODO: adicionar imagem e url para o site
const siteTitle = 'Mapa Colaborativo: ODS na Ufes'
const siteDescription =
  'Conheça as ações e projetos relacionados com os Objetivos de Desenvolvimento Sustentável na Ufes'
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
    { name: 'og:type', content: 'website' },
    { name: 'og:title', content: siteTitle },
    {
      name: 'og:description',
      content: siteDescription,
    },
    { name: 'og:image', content: siteImage },
    { name: 'og:url', content: siteUrl },
    { name: 'og:locale', content: 'pt_BR' },
  ],

  link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon-ods.png' }],
  script: [
    {
      innerHTML:
        "console.debug('Olá, como vão os seus objetivos?')",
    },
  ],
})

// INICIALIZA O APP COM A LISTAGEM DOS OBJETIVOS
// Usa a repository para obter os dados da api e então persiste na store
const { $api } = useNuxtApp()
const odsStore = useObjetivoStore()

await callOnce(async () => {
  try {
    const objetivos = await $api.objetivos.getObjetivos()
    odsStore.setObjetivos(objetivos ? objetivos : ([] as ObjetivoInterface[]))
  } catch (error) {
    console.debug(
      'ERRO: Não foi possível obter os objetivos no carregamento inicial do site',
      error,
    )
  }
})
</script>
