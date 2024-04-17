<template>
  <v-divider :color="dividerColor" thickness="3"></v-divider>
</template>

<script setup lang="ts">
import colorPalleteUfes from '~/assets/colors'

const dividerColor = colorPalleteUfes.monocromatic.primary
</script>
