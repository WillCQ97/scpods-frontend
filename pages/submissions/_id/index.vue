<template>
  <div>
    <h1>Dados apenas de uma submissão</h1>
    <h2>Submissão de id : {{ $route.params.id }}</h2>
  </div>
</template>

<script>
export default {
  name: 'SubmissionPage',
  validate(data) {
    return /^\d+$/.test(data.params.id);
  }
}
</script>
