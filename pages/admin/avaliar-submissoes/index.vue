<template>
  <v-row>
    <v-col>
      <v-spacer />
      <v-card>
        <v-card-title>Avaliação das submissões enviadas</v-card-title>
        <actions-list-component
          :actions="alegreActions"
          :is-submission="true"
        />
      </v-card>
      <v-spacer />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import ActionsListComponent from '~/components/Actions/ActionsList.vue'
import alegreActions from '~/assets/data/alegreActions.json'
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
