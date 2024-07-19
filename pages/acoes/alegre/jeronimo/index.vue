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

const codigoUnidade = 'UN_JERONIMO'

const { $api } = useNuxtApp()
const acaoStore = useAcaoStore()

const {
  data: jeronimoInfo,
  pending,
  error,
} = await $api.unidades.getUnidadeInfo(codigoUnidade)

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
      jeronimoInfo,
    }
  },

  methods: {
    async showActionsHandler(flag: boolean) {
      this.isActionsListVisible = flag
      this.jeronimoActions = await acaoStore.fetchAcoes(codigoUnidade)
    },
  },
}
</script>
