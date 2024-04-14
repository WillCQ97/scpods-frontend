<template>
  <div>
    <ActionsMapComponent
      :title="nomeUnidade"
      :bounds="limitesJeronimo"
      :center="centroJeronimo"
      :feature="featureJeronimo"
      :markers="createMarkers"
      @show-actions="showActions"
    />
    <actions-list-component
      v-if="isActionsListVisible"
      :actions="jeronimoActions"
    />
  </div>
</template>

<script lang="ts">
import ActionsListComponent from '~/components/Actions/ActionsList.vue'
import ActionsMapComponent from '~/components/Actions/ActionsMap.vue'

import alegreActions from '~/assets/data/alegreActions.json'
import alegreInfo from '~/assets/data/alegreInfo.json'
import odsGoals from '~/assets/data/odsGoals.json'

import featureJeronimo from '~/assets/features/jeronimo.json'

export default {
  name: 'PaginaAcoesJeronimo',
  components: { ActionsListComponent, ActionsMapComponent },

  data() {
    return {
      alegreActions,
      alegreInfo,
      odsGoals,
      isActionsListVisible: false,
      jeronimoActions: [],
      unidadeId: 6,
      nomeCampus: 'ALEGRE',
      nomeUnidade: 'Unidade em Jerônimo Monteiro',
      centroJeronimo: [-20.79071, -41.38887],
      limitesJeronimo: [
        [-20.78827, -41.39275],
        [-20.79285, -41.38471],
      ],
      featureJeronimo,
    }
  },

  computed: {
    createMarkers() {
      const sede = this.alegreInfo.unidades.filter(
        (un) => un.id === this.unidadeId,
      )[0]

      const locais = sede.locais.filter(
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
      this.jeronimoActions = alegreActions.filter(
        (action) => action.local.unidade.id === this.unidadeId,
      )
    },
  },
}
</script>
