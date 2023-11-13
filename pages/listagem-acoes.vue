<!-- TODO: DELETAR ESTA PÁGINA TEMPORÁRIA -->
<template>
  <div>
    <lista-acoes-component
      titulo="Lista de Projetos Alegre TESTE"
      :projetos="projetos"
    />
  </div>
</template>

<script>
import ListaAcoesComponent from '~/components/Acoes/ListaAcoes.vue'

export default {
  name: 'TempPage',
  components: { ListaAcoesComponent },

  data() {
    return {
      projetos: this.$store.getters.getAcoesAlegre,
    }
  },
}
</script>
