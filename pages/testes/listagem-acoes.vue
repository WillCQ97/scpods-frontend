<!-- TODO: DELETAR ESTA PÁGINA TEMPORÁRIA -->
<template>
  <div>
    <acoes-list titulo="Lista de Projetos Alegre TESTE" :projetos="projetos" />
  </div>
</template>

<script lang="ts">
import acoesAlegre from '~/assets/data/acoesAlegre.json'
import AcoesList from '~/components/Acoes/AcoesList.vue'

export default {
  name: 'TempPage',
  components: { AcoesList },

  data() {
    return {
      projetos: acoesAlegre.sede,
    }
  },
}
</script>
