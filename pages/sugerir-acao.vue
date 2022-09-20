<!-- todo: wrapper content for users depending on the subroute -->
<template>
  <div>
    <v-card>
      <h1>Página de Submissões</h1>
      <!-- TODO: em vez de um botão será realizada a validação via sso-->
      <v-btn @click="onLoadForm">Exibir Formulário</v-btn>
      <nuxt-child />
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'SugerirAcaoWrapperPage',
  data() {
    return {}
  },
  methods: {
    onLoadForm() {
      this.$router.push('/sugerir-acao/form')
    },
  },
}
</script>


<style>
</style>
