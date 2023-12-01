<template>
  <div>
    <h1>Aqui jaz um título</h1>
    <hr />
    <v-data-table :items="projetoSelecionado"> </v-data-table>
    <!--
    <AcoesList
      titulo="Ações em Alegre Sede"
      :projetos="projetosSede"
    ></AcoesList>
    -->
    <!--
    <ProjectFormInfoComponent />
    <hr />
    <NovaAcaoForm />
    -->
    <hr />
  </div>
</template>

<script>
/* TODO: VERIFICAR UTILIZADAÇÃO DESSA PÁGINA E REMOVÊ-LA
 * JUNTAMENTE COM O COMPONENTE PROJECTINFO E O JSON DE CAMPOS
 */

// import ProjectFormInfoComponent from '~/components/ProjectInfo.vue'
// import NovaAcaoForm from '~/components/Acoes/NovaAcaoForm.vue'
import acoesAlegre from '~/assets/data/acoesAlegre.json'

export default {
  // components: { ProjectFormInfoComponent, NovaAcaoForm },
  data() {
    return {
      projetosSede: acoesAlegre.sede,
      projetoSelecionado: {
        id: 1,
        titulo: '',
        meta: '',
        objetivo: '',
        lotacao: '',
        centro: '',
        coordenador: '',
        dataInicio: '',
        dataEncerramento: undefined,
      },
    }
  },
}
</script>
