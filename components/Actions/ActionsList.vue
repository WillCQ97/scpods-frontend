<template>
  <v-row>
    <v-spacer />
    <v-col cols="10">
      <v-card min-width="80vh">
        <v-data-table :headers="header" :items="actions">
          <!-- TEMPLATE DO DIÁLOGO QUE EXIBE O ITEM SELECIONADO -->
          <template #top>
            <v-dialog v-model="showDialog" width="125vh">
              <v-card>
                <v-card-title>
                  Informações detalhadas sobre o projeto
                </v-card-title>
                <hr />
                <v-card-text>
                  <strong>Ação:</strong> {{ selectedItem.titulo }}
                  <br />

                  <strong>ODS:</strong>
                  {{ selectedItem.meta.objetivo.id }} -
                  {{ selectedItem.meta.objetivo.titulo }}
                  <br />

                  <strong>Meta ODS: </strong>
                  {{ selectedItem.meta.id }}
                  -
                  {{ selectedItem.meta.descricao }}
                  <br />

                  <strong>Descrição: </strong>{{ selectedItem.descricao }}
                  <br />

                  <strong>Centro: </strong>
                  {{ selectedItem.lotacao.descricao }}
                  <br />

                  <strong>Local: </strong>
                  {{ selectedItem.local.nomePrincipal }}
                  <br />

                  <strong>Coordenador: </strong>
                  {{ selectedItem.coordenador.nome }}
                  <br />

                  <strong>Vínculo com a UFES: </strong>
                  {{ selectedItem.coordenador.descricaoVinculo }}
                  <br />

                  <strong>Data de Início: </strong>
                  {{ selectedItem.dataInicio }}
                  <br />

                  <strong>Data Fim: </strong>
                  {{ selectedItem.dataEncerramento }}
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" @click="showDialog = false">
                    OK
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </template>

          <!-- TEMPLATE PARA CARREGAR A IMAGEM DENTRO DO DATA-TABLE -->
          <template #item.image="{ item }">
            <v-img :src="loadGoalImage(item.meta.objetivo.id)"></v-img>
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
export default {
  name: 'ActionsListComponent',
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
    loadGoalImage(goalId: number): string {
      return '/img/ods_icons/' + goalId + '.png'
    },
    showItem(item) {
      this.selectedItem = item
      this.showDialog = true
    },
  },
}
</script>
