<template>
  <acoes-list :projetos="acoesAlegreSede"></acoes-list>
</template>

<script lang="ts">
import acoesAlegre from '~/assets/data/acoesAlegre.json'

export default {
  data() {
    return {
      acoesAlegreSede: acoesAlegre.sede,
    }
  },

  methods: {},
}
</script>
