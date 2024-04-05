<template>
  <div>
    <h1>ADMIN PAGE</h1>
  </div>
</template>

<script lang="ts">
definePageMeta({
  middleware: ['auth'],
})

export default {
  name: 'AdminPage',
}
</script>
