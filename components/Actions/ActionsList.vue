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
            @accept="acceptHandler"
          />
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
    <v-dialog v-model="showSuccess" width="50vh">
      <v-card>
        <v-card-title>Sucesso</v-card-title>
        <v-card-text>
          A submissão foi {{ aceito ? 'aceita' : 'recusada' }}!
        </v-card-text>
        <v-card-actions>
          <v-btn @click="showSuccess = false">Fechar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="showError" width="50vh">
      <v-card>
        <v-card-title>Erro</v-card-title>
        <v-card-text> A ação não pode ser concluída! </v-card-text>
        <v-card-actions>
          <v-btn @click="showError = false">Fechar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script lang="ts">
import ActionCardDetailComponent from '~/components/Actions/ActionCardDetail.vue'
import TheCardDivider from '~/components/UI/TheCardDivider.vue'
import TheGoalImage from '~/components/UI/TheGoalImage.vue'

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
      aceito: undefined,
      showDialog: false,
      showError: false,
      showSuccess: false,
    }
  },
  methods: {
    showItem(item) {
      this.selectedItem = item
      this.showDialog = true
    },
    acceptHandler(accept: boolean) {
      console.log('Aceito: ', accept)
      if (accept) {
        // aceitar submissão
        this.aceito = true
      } else {
        //recusar submissão
        this.aceito = false
      }

      if (Math.floor(Math.random() * 10) % 2 === 0) {
        this.showSuccess = true
      } else {
        this.showError = true
      }
    },
  },
}
</script>
