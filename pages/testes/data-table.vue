<template>
  <div>
    <hr />
    <v-data-table :headers="cabecalho" :items="projetos">
      <template v-slot:item.logo="{ item }">
        <v-img :src="carregarLogoObjetivo(item.meta.objetivo.id)"></v-img>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-dialog v-model="exibirDialogo" width="125vh">
          <!-- CAIXA DE DIÁLOGO QUE EXIBE AS INFORMAÇÕES -->
          <!-- TODO: Separar esse v-dialog para um componente próprio que apenas recebe o projeto -->
          <v-card>
            <v-card-title>
              Informações detalhadas sobre o projeto
            </v-card-title>

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

              <div>
                <strong>Data Fim: </strong>
                {{ item.dataEncerramento }} <br />
              </div>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="exibirDialogo = false"> OK </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-icon class="me-2" size="small" @click="exibirDialogo = true">
          mdi-eye
        </v-icon>
      </template>
    </v-data-table>
    <hr />
  </div>
</template>

<script lang="ts">
import acoesAlegre from '~/assets/data/acoesAlegre.json'

export default {
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
        { title: 'Opções', key: 'actions', sortable: false },
      ],
      exibirDialogo: false,
      projetos: acoesAlegre.sede,
    }
  },
  methods: {
    carregarLogoObjetivo(idObjetivo: number): string {
      return '/img/ods_icons/' + idObjetivo + '.png'
    },
  },
}
</script>
