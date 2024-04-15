<template>
  <action-card-detail-component :is-submission="false" :action="actions[0]" />
</template>

<script setup lang="ts">
import ActionCardDetailComponent from '~/components/Actions/ActionCardDetail.vue'
import actions from '~/assets/data/alegreActions.json'
</script>
