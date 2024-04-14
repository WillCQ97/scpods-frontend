<template>
  <action-card-component :is-submission="false" :action="actions[0]" />
</template>

<script setup lang="ts">
import ActionCardComponent from '~/components/Actions/ActionCard.vue'
import actions from '~/assets/data/alegreActions.json'
</script>
