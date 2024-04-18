<template>
  <v-row>
    <v-col>
      <v-row>
        <v-col>
          <actions-map-component
            :title="nomeUnidade"
            :bounds="limitesJeronimo"
            :center="centroJeronimo"
            :feature="featureJeronimo"
            :markers="createMarkers"
            @show-actions="showActions"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <actions-list-component
            v-if="isActionsListVisible"
            :actions="jeronimoActions"
          /> </v-col
      ></v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import ActionsListComponent from '~/components/Actions/ActionsList.vue'
import ActionsMapComponent from '~/components/Actions/ActionsMap.vue'
import alegreActions from '~/assets/data/alegreActions.json'
import alegreInfo from '~/assets/data/alegreInfo.json'
import featureJeronimo from '~/assets/features/jeronimo.json'

const odsStore = useObjetivoStore()

export default {
  name: 'PaginaAcoesJeronimo',
  components: { ActionsListComponent, ActionsMapComponent },

  data() {
    return {
      alegreActions,
      alegreInfo,
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
          odsStore.getTituloObjetivoById(local.idObjetivoMaisAtendido) +
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
