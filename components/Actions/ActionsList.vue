<template>
  <v-card min-width="80vh">
    <v-card-title> Listagem das Ações </v-card-title>
    <the-card-divider />
    <v-data-table :headers="header" :items="actions">
      <!-- TEMPLATE DO DIÁLOGO QUE EXIBE O ITEM SELECIONADO -->
      <template #top>
        <v-dialog v-model="showDialog" width="150vh">
          <action-card-detail-component
            :is-submission="isSubmission"
            :action="selectedItem"
            @close="showDialog = false"
            @accept="emitAccept"
          />
        </v-dialog>
      </template>

      <!-- TEMPLATE PARA CARREGAR A IMAGEM DENTRO DO DATA-TABLE -->
      <template #item.image="{ item }">
        <the-goal-image :goal-id="item.meta.objetivo.codigo" />
      </template>

      <!-- TEMPLATE DA OPÇÃO DE VISUALIZAÇÃO PARA CADA ITEM DO DATA-TABLE -->
      <template #item.options="{ item }">
        <v-icon class="me-2" size="small" @click="showItem(item)">
          mdi-eye
        </v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>

<script lang="ts">
import ActionCardDetailComponent from '~/components/Actions/ActionCardDetail.vue'
import TheCardDivider from '~/components/UI/TheCardDivider.vue'
import TheGoalImage from '~/components/UI/TheGoalImage.vue'
import type { Acao } from '~/models/acao.model'

export default {
  name: 'ActionsListComponent',
  components: { ActionCardDetailComponent, TheCardDivider, TheGoalImage },

  props: {
    actions: {
      type: Array,
      required: true,
    },
    isSubmission: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  data() {
    return {
      header: [
        {
          title: 'Objetivo',
          align: 'start',
          key: 'image',
        },
        {
          title: 'Nome da Ação',
          align: 'start',
          sortable: false,
          key: 'titulo',
        },
        { title: 'Meta', key: 'meta.codigo' },
        { title: 'Lotação', key: 'lotacao.sigla' },
        { title: 'Local', key: 'local.nomePrincipal' },
        { title: 'Coordenador', key: 'coordenador.nome' },
        { title: 'Opções', key: 'options', sortable: false, align: 'center' },
      ],

      selectedItem: {
        // TODO: CRIAR UM BUILDER USANDO TYPESCRIPT PARA INSTANCIAR ESSE OBJETO
        titulo: '',
        descricao: '',
        dataCadastro: '',
        dataInicio: '',
        dataEncerramento: null,
        coordenador: {
          nome: '',
          descricaoVinculo: '',
        },
        meta: {
          id: null,
          codigo: '',
          descricao: '',
          objetivo: {
            id: null,
            codigo: '',
            titulo: '',
            descricao: '',
          },
        },
        local: {
          nomePrincipal: '',
          nomeSecundario: null,
          nomeTerciario: null,
          unidade: {
            nome: '',
          },
        },
        lotacao: {
          descricao: '',
          sigla: '',
        },
      },

      showDialog: false,
    }
  },

  emits: ['accept'],

  methods: {
    showItem(item: Acao) {
      // TODO: TYPESCRIPT WARNING
      this.selectedItem = item
      this.showDialog = true
    },
    emitAccept({ accepted, id }) {
      this.$emit('accept', { accepted, id })
    },
  },
}
</script>
