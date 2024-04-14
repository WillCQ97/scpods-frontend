<template>
  <v-row>
    <v-spacer />
    <v-col cols="10">
      <v-card min-width="80vh">
        <v-data-table :headers="header" :items="actions">
          <!-- TEMPLATE DO DIÁLOGO QUE EXIBE O ITEM SELECIONADO -->
          <template #top>
            <v-dialog v-model="showDialog" width="150vh">
              <action-card-component
                :is-submission="false"
                :action="selectedItem"
                @close="showDialog = false"
              ></action-card-component>
            </v-dialog>
          </template>

          <!-- TEMPLATE PARA CARREGAR A IMAGEM DENTRO DO DATA-TABLE -->
          <template #item.image="{ item }">
            <the-goal-image :goal-id="item.meta.objetivo.id" />
          </template>

          <!-- TEMPLATE DA OPÇÃO DE VISUALIZAÇÃO PARA CADA ITEM DO DATA-TABLE -->
          <template #item.options="{ item }">
            <v-icon class="me-2" size="small" @click="showItem(item)">
              mdi-eye
            </v-icon>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
    <v-spacer />
  </v-row>
</template>

<script lang="ts">
import ActionCardComponent from '~/components/Actions/ActionCard.vue'
import TheGoalImage from '~/components/UI/TheGoalImage.vue'

export default {
  name: 'ActionsListComponent',
  components: { ActionCardComponent, TheGoalImage },
  props: {
    actions: {
      type: Array,
      required: true,
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
        { title: 'Meta', key: 'meta.id' },
        { title: 'Centro', key: 'lotacao.sigla' },
        { title: 'Local', key: 'local.nomePrincipal' },
        { title: 'Coordenador', key: 'coordenador.nome' },
        { title: 'Opções', key: 'options', sortable: false, align: 'center' },
      ],
      selectedItem: {
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
          id: '',
          descricao: '',
          objetivo: {
            id: '',
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
  methods: {
    showItem(item) {
      this.selectedItem = item
      this.showDialog = true
    },
  },
}
</script>
