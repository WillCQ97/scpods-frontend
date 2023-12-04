<template>
  <div>
    <h1>parent/parent.vue</h1>
    <v-btn title="Load child" @click="loadChild()">Load child</v-btn>
    <hr />
    <nuxt-page />
  </div>
</template>
<script>
function navigate() {
  return navigateTo('/testes/parent/child')
}
export default {
  methods: {
    loadChild() {
      navigate()
    },
  },
}
</script>
