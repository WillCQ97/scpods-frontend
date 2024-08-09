<template>
  <v-card min-width="80vh">
    <v-card-title>
      Listagem das {{ isSubmission ? 'Submissões' : 'Ações' }}
    </v-card-title>
    <the-card-divider />
    <v-data-table :headers="tableHeader" :items="actions">
      <!-- TEMPLATE PARA CARREGAR A IMAGEM DENTRO DO DATA-TABLE -->
      <template #item.image="{ item }">
        <the-goal-image :goal-code="item.codigoObjetivo" />
      </template>

      <!-- TEMPLATE DA OPÇÃO DE VISUALIZAÇÃO PARA CADA ITEM DO DATA-TABLE -->
      <template #item.options="{ item }">
        <v-icon
          class="me-2"
          size="small"
          @click="
            isSubmission ? loadSubmissionData(item) : loadActionData(item)
          "
        >
          mdi-eye
        </v-icon>
      </template>

      <!-- TEMPLATE DO DIÁLOGO QUE EXIBE O ITEM SELECIONADO -->
      <template #top>
        <v-dialog v-model="isActionDialogVisible" width="125vh">
          <action-card-detail
            :is-submission="isSubmission"
            :action="action"
            @close="isActionDialogVisible = false"
            @accept="emitAccept"
          />
        </v-dialog>
      </template>
    </v-data-table>
  </v-card>
  <!-- TEMPLATE DO DIÁLOGO -->
  <v-dialog v-model="isMessageDialogVisible" width="500">
    <v-card>
      <v-card-title>{{ dialog.title }}</v-card-title>
      <the-card-divider />
      <v-card-text class="dialog">
        <v-icon
          :icon="dialog.isError ? 'mdi-alert-circle' : 'mdi-check-circle'"
          :color="dialog.isError ? 'error' : 'success'"
          size="90"
        ></v-icon>
        <br /><br />
        {{ dialog.message }}
      </v-card-text>

      <the-card-divider />

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="isMessageDialogVisible = false">OK</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import ActionCardDetail from '~/components/Actions/ActionCardDetail.vue'
import TheCardDivider from '~/components/UI/TheCardDivider.vue'
import TheGoalImage from '~/components/UI/TheGoalImage.vue'
import type { AcaoSearchInterface } from '~/models/acao.search.model'
import { AcaoInterfaceBuilder } from '~/models/acao.model'

export default {
  name: 'ActionsList',
  components: { ActionCardDetail, TheCardDivider, TheGoalImage },

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
      action: AcaoInterfaceBuilder(),
      tableHeader: [
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
        { title: 'Envio', key: 'dataCadastro' },
        { title: 'Meta', key: 'codigoMeta' },
        { title: 'Lotação', key: 'siglaLotacao' },
        { title: 'Local', key: 'nomePrincipalLocal' },
        { title: 'Coordenador', key: 'nomeCoordenador' },
        { title: 'Opções', key: 'options', sortable: false, align: 'center' },
      ],
      isActionDialogVisible: false,
      isMessageDialogVisible: false,
      dialog: {
        title: '',
        message: '',
        isError: false,
      },
    }
  },

  emits: ['accept'],

  methods: {
    showDialog(title: string, message: string, isError: boolean) {
      this.dialog.title = title
      this.dialog.message = message
      this.dialog.isError = isError

      this.isMessageDialogVisible = true
    },
    emitAccept({ accepted, id }) {
      this.$emit('accept', { accepted, id })
      this.isActionDialogVisible = false
    },

    async loadActionData(acaoGrid: AcaoSearchInterface) {
      const { $api } = useNuxtApp()

      try {
        const acao = await $api.acoes.findById(acaoGrid.id)
        this.action = acao
        this.isActionDialogVisible = true
      } catch (e) {
        this.showDialog(
          'Erro ao exibir informações!',
          'Não foi possível carregar os dados da ação selecionada. Por favor, tente novamente mais tarde!',
          true,
        )
      }
    },

    async loadSubmissionData(acaoGrid: AcaoSearchInterface) {
      const { $api } = useNuxtApp()
      try {
        const submission = await $api.submissoes.findById(acaoGrid.id)
        this.action = submission
        this.isActionDialogVisible = true
      } catch (e) {
        this.showDialog(
          'Erro ao exibir informações!',
          'Não foi possível carregar os dados da submissão selecionada. Por favor, tente novamente mais tarde!',
          true,
        )
      }
    },
  },
}
</script>
