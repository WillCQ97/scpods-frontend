<template>
  <v-card>
    <v-card-title>Página do Admin</v-card-title>
  </v-card>
</template>

<script lang="ts">
definePageMeta({
  middleware: ['auth'],
})
export default {
  name: 'PaginaAdministrador',
}
</script>
