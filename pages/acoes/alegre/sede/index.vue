<template>
  <div>
    <actions-map-component
      :title="mapTitle"
      :bounds="mapLimits"
      :center="mapCenter"
      :feature="featureAlegre"
      :markers="createMarkers"
      @show-actions="showActions"
    />

    <actions-list-component
      v-if="isActionsListVisible"
      :actions="alegreSedeActions"
    />
  </div>
</template>

<script lang="ts">
import ActionsListComponent from '~/components/Actions/ActionsList.vue'
import ActionsMapComponent from '~/components/Actions/ActionsMap.vue'

import alegreActions from '~/assets/data/alegreActions.json'
import alegreInfo from '~/assets/data/alegreInfo.json'

import featureAlegre from '~/assets/features/alegre.json'

export default {
  name: 'PaginaMapaAcoesAlegreSede',
  components: { ActionsListComponent, ActionsMapComponent },

  data() {
    return {
      alegreInfo,
      alegreSedeActions: [],
      unidadeId: 1,
      isActionsListVisible: false,
      featureAlegre,
      mapCenter: [-20.76161, -41.536],
      mapLimits: [
        [-20.75885, -41.53911],
        [-20.76464, -41.53211],
      ],
      mapTitle: 'Campus Sede em Alegre',
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
          '/img/ods_icons/' +
          local.idObjetivoMaisAtendido +
          '.png' +
          '"><br>' +
          '<div class="popup_text">' +
          '<strong>' +
          local.nomePrincipal +
          '</strong>' +
          '<br/>Total de Projetos: ' +
          local.quantidadeProjetosAtivos +
          '<br/>Total de ODS atendidos: ' +
          local.quantidadeObjetivosAtendidos +
          '<br/>ODS com maior número de Projetos: ' +
          local.idObjetivoMaisAtendido +
          '</div></div>',
      }))

      return markers
    },
  },
  methods: {
    showActions(flag: boolean) {
      this.isActionsListVisible = flag
      this.alegreSedeActions = alegreActions.filter(
        (action) => action.local.unidade.id === this.unidadeId,
      )
    },
  },
}
</script>
