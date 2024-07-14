<template>
  <a :href="url" target="_blank">
    <v-btn
      append-icon="mdi-open-in-new"
      color="primary"
      size="small"
      text="Ir para o site"
    >
    </v-btn
  ></a>
</template>
<script lang="ts">
export default {
  name: 'ExternalLinkBtn',
  props: {
    url: {
      type: String,
      required: true,
    },
  },
}
</script>
