<template>
  <v-card class="mx-auto" max-width="800" tile>
    <!-- LISTA COM OS PROJETOS-->
    <v-list>
      <v-subheader>{{ titulo }}</v-subheader>

      <v-list-item-group v-model="selectedItem" color="primary">
        <v-list-item v-if="projetos.length === 0">
          <v-list-item-title>
            Não foi possível carregar a lista com os projetos.
          </v-list-item-title>
        </v-list-item>

        <!-- TODO: tentar separar este v-list-item em um componente próprio -->
        <v-list-item v-for="(projeto, index) in projetos" :key="index" two-line>
          <v-list-item-title>
            <strong>Ação: </strong>{{ projeto.titulo }}
          </v-list-item-title>

          <v-list-item-subtitle>
            <strong>ODS: </strong>
            {{ projeto.meta.objetivo.id }}.
            {{ projeto.meta.objetivo.titulo }}
            <br />
            <strong>Descrição: </strong>{{ projeto.descricao }}
            <br />
            <strong>Coordenador: </strong>
            {{ projeto.coordenador.nome }}<br />
            <br />
          </v-list-item-subtitle>

          <v-list-item-action>
            <v-btn @click="showActionInfo(index)"> info </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list-item-group>
    </v-list>

    <!-- CAIXA DE DIÁLOGO QUE EXIBE AS INFORMAÇÕES -->
    <!-- TODO: Separar esse v-dialog para um componente próprio que apenas recebe o projeto -->
    <v-dialog v-model="exibirDialogoDetalhesAcao" width="125vh">
      <v-card>
        <v-card-title> Informações detalhadas sobre o projeto </v-card-title>

        <v-card-text>
          <strong>Ação:</strong> {{ projetoSelecionado.titulo }}
          <br />
          <strong>ODS:</strong>
          {{ projetoSelecionado.meta.objetivo.id }} -
          {{ projetoSelecionado.meta.objetivo.titulo }}
          <br />
          <strong>Meta ODS: </strong>
          {{ projetoSelecionado.meta.id }}
          -
          {{ projetoSelecionado.meta.descricao }}
          <br />
          <strong>Descrição: </strong>{{ projetoSelecionado.descricao }}
          <br />
          <strong>Centro: </strong>
          {{ projetoSelecionado.lotacao.centro.nome }}
          <br />
          <strong>Lotação: </strong>
          {{ projetoSelecionado.lotacao.nome }}
          <br />
          <strong>Coordenador: </strong>
          {{ projetoSelecionado.coordenador.nome }}
          <br />
          <strong>Vínculo com a UFES: </strong>
          {{ projetoSelecionado.coordenador.descricaoVinculo }}
          <br />
          <strong>Data de Início: </strong>
          {{ projetoSelecionado.dataInicio }}

          <div v-if="projetoSelecionado.dataEncerramento">
            <strong>Data Fim: </strong>
            {{ projetoSelecionado.dataEncerramento }} <br />
          </div>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="exibirDialogoDetalhesAcao = false">
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
export default {
  // TODO: Utilizar isso aqui https://vuetifyjs.com/en/components/data-tables/basics/#usage
  name: 'AcoesListComponent',

  props: {
    titulo: {
      type: String,
      required: true,
    },
    projetos: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      exibirDialogoDetalhesAcao: false,
      selectedItem: undefined,
      projetoSelecionado: {
        id: 1,
        titulo: '',
        meta: {
          id: '1.1',
          descricao: '',
          objetivo: {
            id: '',
            descricao: '',
          },
        },
        lotacao: {
          nome: '',
          centro: {
            nome: '',
          },
        },
        coordenador: {
          id: 4,
          nome: '',
          tipoVinculo: '',
          descricaoVinculo: '',
        },
        dataInicio: '',
        dataEncerramento: undefined,
      },
    }
  },

  methods: {
    showActionInfo(index) {
      this.exibirDialogoDetalhesAcao = true
      this.projetoSelecionado = this.projetos[index]
    },
  },
}
</script>
