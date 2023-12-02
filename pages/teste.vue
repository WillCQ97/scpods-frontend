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
      projetoSelecionado: [
        {
          id: 1,
          titulo:
            'Desenvolvimento do Polo de Fruticultura da Região do Caparaó',
          meta: 'Atingir níveis mais elevados de produtividade das economias, por meio da diversificação, modernização tecnológica e inovação, inclusive por meio de um foco em setores de alto valor agregado e intensivos em mão-de-obra',
          local: 'Departamento de Agronomia',
          centro: 'CCAE',
          coordenador: '',
          inicio: '',
          encerramento: '',
        },
      ],
    }
  },
}
</script>
