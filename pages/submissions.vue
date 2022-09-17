<!-- wrapper content for users depending on the subroute -->
<template>
  <div>
    <v-card>
      <h1>Página de Submissões</h1>
      <v-text-field v-model="submissionId" type="text"></v-text-field>
      <v-btn @click="onLoadSubmission">Carregar Submissão</v-btn>
      <nuxt-child />
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'SubmissionPageWrapper',
  data() {
    return {
      submissionId: '',
    }
  },
  methods: {
    onLoadSubmission() {
      this.$router.push('/submissions/' + this.submissionId)
    },
  },
}
</script>


<style>
</style>
