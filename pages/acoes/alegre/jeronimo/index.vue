<template>
  <v-row>
    <v-col>
      <v-row>
        <v-col>
          <actions-map-component
            :title="mapTitle"
            :bounds="jeronimoBounds"
            :center="jeronimoCenter"
            :feature="campusFeatures"
            :unidade-info="jeronimoInfo"
            @show-actions="showActionsHandler"
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
import featureJeronimo from '~/assets/features/jeronimo.json'
import ActionsListComponent from '~/components/Actions/ActionsList.vue'
import ActionsMapComponent from '~/components/Actions/ActionsMap.vue'
import type { Acao } from '~/models/acao.model'
import type { UnidadeInfo } from '~/models/unidade.model'

const codigoUnidade = 'UN_JERONIMO'
const { $api } = useNuxtApp()

export default {
  name: 'PaginaAcoesJeronimo',

  components: { ActionsListComponent, ActionsMapComponent },

  data() {
    return {
      jeronimoActions: [] as Acao[], // TODO: TIPAR EM INGLÊS
      campusFeatures: featureJeronimo,
      isActionsListVisible: false,
      mapTitle: 'Unidade em Jerônimo Monteiro',
      jeronimoBounds: [
        [-20.78827, -41.39275],
        [-20.79285, -41.38471],
      ],
      jeronimoCenter: [-20.79071, -41.38887],
      jeronimoInfo: {} as UnidadeInfo,
    }
  },

  methods: {
    async loadActionsList() {
      this.jeronimoActions = await $api.acoes.getAcoes(codigoUnidade)
    },

    showActionsHandler(flag: boolean) {
      this.isActionsListVisible = flag

      if (this.isActionsListVisible) {
        this.loadActionsList()
      }
    },
  },

  async mounted() {
    this.jeronimoInfo = await $api.unidades.getUnidadeInfo(codigoUnidade)
  },
}
</script>
