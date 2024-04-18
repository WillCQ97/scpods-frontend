<template>
  <v-row>
    <v-col>
      <v-row>
        <v-col>
          <actions-map-component
            :title="mapName"
            :bounds="limitesRive"
            :center="centroRive"
            :feature="featureUnidadeRive"
            :markers="createMarkers"
            :zoom="zoom"
            @show-actions="showActions"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <actions-list-component
            v-if="isActionsListVisible"
            :actions="riveActions"
          />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import ActionsListComponent from '~/components/Actions/ActionsList.vue'
import ActionsMapComponent from '~/components/Actions/ActionsMap.vue'
import alegreActions from '~/assets/data/alegreActions.json'
import alegreInfo from '~/assets/data/alegreInfo.json'
import featureUnidadeRive from '~/assets/features/rive.json'

const odsStore = useObjetivoStore()

export default {
  name: 'PaginaMapaAcoesAlegreRive',

  components: { ActionsListComponent, ActionsMapComponent },

  data() {
    return {
      alegreActions,
      alegreInfo,
      isActionsListVisible: false,
      riveActions: [],
      nomeCampus: 'ALEGRE',
      unidadeId: 5,
      mapName: 'Área Experimental em Rive, Alegre',
      centroRive: [-20.7494, -41.4875],
      limitesRive: [
        [-20.7422, -41.4932],
        [-20.7562, -41.4815],
      ],
      featureUnidadeRive,
      zoom: 16,
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
          odsStore.getTituloObjetivoById(local.idObjetivoMaisAtendido) +
          '</div></div>',
      }))

      return markers
    },
  },

  methods: {
    showActions(flag: boolean) {
      this.isActionsListVisible = flag
      this.riveActions = alegreActions.filter(
        (action) => action.local.unidade.id === this.unidadeId,
      )
    },
  },
}
</script>
