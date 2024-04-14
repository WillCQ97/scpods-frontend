<template>
  <div>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>Sobre o campus</v-card-title>
          <v-card-subtitle>
            Mais informações
            <a
              href="https://www.ufes.br/campi/campus-de-sao-mateus"
              target="_blank"
            >
              na página da ufes
              <v-icon icon="mdi-open-in-new" size="x-small"></v-icon>
            </a>
          </v-card-subtitle>
          <hr />
          <v-card-text>
            <p>
              O campus de São Mateus abriga o Centro Universitário Norte do
              Espírito Santo (Ceunes) e fica localizado no município de São
              Mateus, região norte do Espírito Santo, a 215 km de Vitória/ES.
              Situado numa área de 532.000 m², a infraestrutura do campus se
              compõe de salas de aulas, laboratórios, restaurante universitário,
              biblioteca e fazenda experimental.
            </p>
            <br />
            <p>
              O Ceunes oferece 17 cursos de graduação e quatro de pós-graduação,
              e tem sido um importante polo de apoio ao desenvolvimento da
              região norte do Espírito Santo, que aparece como uma das dinâmicas
              do estado nos últimos anos, com investimentos industriais e de
              serviços relevantes.
            </p>
          </v-card-text>

          <v-card-actions>
            <v-spacer />
            <a href="https://saomateus.ufes.br/" target="_blank">
              <v-btn
                small
                color="primary"
                text="Ir para o site"
                append-icon="mdi-open-in-new"
              >
              </v-btn>
            </a>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <!-- MAPA PARA O CAMPUS -->
    <v-row>
      <v-col>
        <actions-map-component
          :title="nomeUnidade"
          :bounds="limitesMapa"
          :center="centroMapa"
          :feature="featureCampus"
          :markers="createMarkers"
          @show-actions="showActions"
        />

        <actions-list-component
          v-if="isActionsListVisible"
          :actions="saoMateusActions"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import ActionsListComponent from '~/components/Actions/ActionsList.vue'
import ActionsMapComponent from '~/components/Actions/ActionsMap.vue'

import saoMateusActions from '~/assets/data/saoMateusActions.json'
import saoMateusInfo from '~/assets/data/saoMateusInfo.json'
import odsGoals from '~/assets/data/odsGoals.json'

import feature from '~/assets/features/sao_mateus.json'

export default {
  name: 'PaginaAcoesSaoMateus',
  components: { ActionsListComponent, ActionsMapComponent },

  data() {
    return {
      saoMateusActions,
      saoMateusInfo,
      odsGoals,
      isActionsListVisible: false,
      nomeCampus: 'SAO_MATEUS',
      nomeUnidade: 'Unidade de São Mateus',
      centroMapa: [-18.675738334093378, -39.86240690464644],
      limitesMapa: [
        [-18.670727522212445, -39.866469236990035],
        [-18.680308622184185, -39.85245444148613],
      ],
      featureCampus: feature,
    }
  },
  computed: {
    createMarkers() {
      const locais = saoMateusInfo.unidades[0].locais.filter(
        (local) => local.quantidadeProjetosAtivos > 0,
      )

      const markers = locais.map((local) => ({
        ...local,
        id: local.id,
        coordinates: local.localizacao.coordinates.reverse(),
        content:
          '<div class="popup">' +
          '<img class="popup_img" src="' +
          '/img/ods-icons/pt-br/SDG-' +
          local.idObjetivoMaisAtendido +
          '.svg' +
          '"><br>' +
          '<div class="popup_text">' +
          '<strong>' +
          local.nomePrincipal +
          '</strong>' +
          '<br/>Número de Projetos Ativos: ' +
          local.quantidadeProjetosAtivos +
          '<br/>Objetivos atendidos: ' +
          local.quantidadeObjetivosAtendidos +
          '<br/>Objetivo mais atendido: ' +
          '<br/>' +
          odsGoals.filter((ods) => ods.id === local.idObjetivoMaisAtendido)[0]
            .titulo +
          '</div></div>',
      }))

      return markers
    },
  },
  methods: {
    showActions(flag: boolean) {
      this.isActionsListVisible = flag
    },
  },
}
</script>
