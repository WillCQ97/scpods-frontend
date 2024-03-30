<template>
  <v-row>
    <v-spacer />
    <v-col cols="10">
      <v-card min-width="80vh">
        <v-data-table :headers="cabecalho" :items="projetos">
          <template #item.logo="{ item }">
            <v-img :src="carregarLogoObjetivo(item.meta.objetivo.id)"></v-img>
          </template>
          <template #item.actions="{ item }">
            <v-dialog v-model="exibirDialogo" width="125vh">
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
                  {{ item.lotacao.centro.nome }}
                  <br />

                  <strong>Lotação: </strong>
                  {{ item.lotacao.nome }}
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
                  <v-btn color="primary" @click="exibirDialogo = false">
                    OK
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-icon class="me-2" size="small" @click="exibirDialogo = true">
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
  name: 'AcoesListComponent',
  props: {
    projetos: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      cabecalho: [
        {
          title: 'Objetivo',
          align: 'start',
          key: 'logo',
        },
        {
          title: 'Nome da Ação',
          align: 'start',
          sortable: false,
          key: 'titulo',
        },
        { title: 'Meta', key: 'meta.id' },
        { title: 'Lotação', key: 'lotacao.nome' },
        { title: 'Centro', key: 'lotacao.centro.sigla' },
        { title: 'Coordenador', key: 'coordenador.nome' },
        { title: 'Opções', key: 'actions', sortable: false, align: 'center' },
      ],
      exibirDialogo: false,
    }
  },
  methods: {
    carregarLogoObjetivo(idObjetivo: number): string {
      return '/img/ods_icons/' + idObjetivo + '.png'
    },
  },
}
</script>
