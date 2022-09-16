<!-- wrapper content for users depending on the subroute -->
<template>
<div>
    <h1>Página de Submissões</h1>
    <input v-model="submissionId" type="text">
    <button @click="onLoadSubmission">Carregar Submissão</button>
    <nuxt-child />
  </div>
</template>

<script>
export default {
  name: 'SubmissionPageWrapper',
  data() {
    return {
      submissionId: ''
    }
  },
  methods: {
    onLoadSubmission() {
      this.$router.push('/submissions/' + this.submissionId);
    }
  }
}
</script>


<style>

</style>
