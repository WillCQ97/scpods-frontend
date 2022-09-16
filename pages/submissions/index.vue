<template>
  <div>
    <h1>Página de Submissões</h1>
    <input v-model="submissionId" type="text">
    <button @click="onLoadSubmission">Carregar Submissão</button>
  </div>
</template>

<script>
export default {
  name: 'SubmissionPage',
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
