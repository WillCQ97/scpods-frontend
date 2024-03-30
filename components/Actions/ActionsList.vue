<template>
  <v-row>
    <v-spacer />
    <v-col cols="10">
      <v-card min-width="80vh">
        <v-data-table :headers="header" :items="actions">
          <template #item.image="{ item }">
            <v-img :src="loadGoalImage(item.meta.objetivo.id)"></v-img>
          </template>
          <template #item.actions="{ item }">
            <v-dialog v-model="showDialog" width="125vh">
              <!-- CAIXA DE DIÁLOGO QUE EXIBE AS INFORMAÇÕES -->
              <!-- TODO: Separar esse v-dialog para um componente próprio que apenas recebe o projeto -->
              <v-card>
                <v-card-title>
                  Informações detalhadas sobre o projeto
                </v-card-title>
                <hr />
                <v-card-text>
                  <strong>Ação:</strong> {{ item.titulo }}
                  <br />

                  <strong>ODS:</strong>
                  {{ item.meta.objetivo.id }} -
                  {{ item.meta.objetivo.titulo }}
                  <br />

                  <strong>Meta ODS: </strong>
                  {{ item.meta.id }}
                  -
                  {{ item.meta.descricao }}
                  <br />

                  <strong>Descrição: </strong>{{ item.descricao }}
                  <br />

                  <strong>Centro: </strong>
                  {{ item.lotacao.descricao }}
                  <br />

                  <strong>Local: </strong>
                  {{ item.local.nomePrincipal }}
                  <br />

                  <strong>Coordenador: </strong>
                  {{ item.coordenador.nome }}
                  <br />

                  <strong>Vínculo com a UFES: </strong>
                  {{ item.coordenador.descricaoVinculo }}
                  <br />

                  <strong>Data de Início: </strong>
                  {{ item.dataInicio }}
                  <br />

                  <strong>Data Fim: </strong>
                  {{ item.dataEncerramento }}
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
            <v-icon class="me-2" size="small" @click="showDialog = true">
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
        { title: 'Coordenador', key: 'coordenador.nome' },
        { title: 'Opções', key: 'actions', sortable: false, align: 'center' },
      ],
      showDialog: false,
    }
  },
  methods: {
    loadGoalImage(goalId: number): string {
      return '/img/ods_icons/' + goalId + '.png'
    },
  },
}
</script>
