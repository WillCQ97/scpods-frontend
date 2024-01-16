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

<script lang="ts">
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
          meta: '2.1',
          local: 'Departamento de Agronomia',
          centro: 'CCAE',
          coordenador: 'Mário Novo CTO',
          inicio: '2023-02-21',
          encerramento: '',
        },
        {
          id: 2,
          titulo: 'Lorem Ipsum Dolor sit amet',
          meta: '9.4',
          local: 'Departamento de Computação',
          centro: 'CCENS',
          coordenador: 'Mário Novo CTO',
          inicio: '2021-02-21',
          encerramento: '2021-05-09',
        },
      ],
    }
  },
}
</script>
