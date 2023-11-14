<template>
  <v-card class="mx-auto" max-width="800" tile>
    <!-- LISTA COM OS PROJETOS-->
    <v-list>
      <v-subheader>{{ titulo }}</v-subheader>

      <v-list-item-group v-model="selectedItem" color="primary">
        <v-list-item v-if="projetos.length === 0">
          <v-list-item-content>
            <v-list-item-title>
              Não foi possível carregar a lista com os projetos.
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-for="(projeto, index) in projetos" :key="index" two-line>
          <!-- Separar em outro componente -->
          <v-list-item-content>
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
          </v-list-item-content>

          <v-list-item-action>
            <v-btn @click="showActionInfo(index)"> info </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list-item-group>
    </v-list>

    <!-- CAIXA DE DIÁLOGO QUE EXIBE AS INFORMAÇÕES, SEPARAR EM OUTRO COMPONENTE -->

    <detalhes-acao-dialog
      titulo="Informações detalhadas sobre a ação"
      :acao="projetoSelecionado"
      :is-visualizar="false"
      :exibir-dialogo="exibirDialogoAcaoSelecionada"
    ></detalhes-acao-dialog>
  </v-card>
</template>

<script>
import DetalhesAcaoDialog from './DetalhesAcaoDialog.vue'

export default {
  name: 'ActionsListComponent',

  components: { DetalhesAcaoDialog },

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
      exibirDialogoAcaoSelecionada: false,
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
      this.exibirDialogoAcaoSelecionada = true
      this.projetoSelecionado = this.projetos[index]
    },
  },
}
</script>
