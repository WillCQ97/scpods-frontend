<template>
  <v-card>
    <v-card-title>Avaliação de Submissões</v-card-title>
    <v-card>user.isAdmin</v-card>
  </v-card>
</template>

<script lang="ts">
/* <script setup lang="ts"> */
/*
 * ESSA DECLARAÇÃO RESULTA EM ERRO SE A PÁGINA ATUAL FOR A PRIMEIRA A SER ACESSADA
 * [nuxt] error caught during app initialization Error: [🍍]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
 * See https://pinia.vuejs.org/core-concepts/outside-component-usage.html for help.
 *
 * AO TROCAR PARA SCRIPT SETUP, O PROBLEMA NÃO OCORRE
 */
// const user = useUser()

definePageMeta({
  middleware: 'auth',
})
</script>
