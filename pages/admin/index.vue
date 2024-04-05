<template>
  <v-card>
    <v-card-title>Página de Submissões</v-card-title>
  </v-card>
</template>

<script lang="ts">
definePageMeta({
  middleware: ['auth'],
})

export default {
  name: 'AdminPage',
}
</script>
