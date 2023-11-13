<!-- TODO: DELETAR ESTA PÁGINA TEMPORÁRIA -->
<template>
  <div>
    <actions-list-component
      titulo="Lista de Projetos Alegre TESTE"
      :projetos="projetos"
    />
  </div>
</template>
<script>
import ActionsListComponent from '~/components/ActionsList.vue'

export default {
  name: 'TempPage',
  components: { ActionsListComponent },

  data() {
    return {
      projetos: this.$store.getters.getAcoesAlegre,
    }
  },
}
</script>
