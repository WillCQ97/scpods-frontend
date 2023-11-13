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
/* TODO: Corrigir erro inesperado ao acessar essa página */
// import acoesAlegre from '~/assets/data/alegre_actions.json'
import ListaAcoesComponent from '~/components/Acoes/ListaAcoes.vue'

export default {
  name: 'TempPage',
  components: { ListaAcoesComponent },

  data() {
    return {
      projetos: [],
    }
  },
}
</script>
