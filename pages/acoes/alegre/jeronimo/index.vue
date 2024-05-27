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
            :markers="jeronimoMarkers"
            @show-actions="showActionsHandler"
            @refresh-data="reloadInfoHandler"
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
const acaoStore = useAcaoStore()

const unidadeStore = useUnidadeStore()

async function carregarInfo() {
  await unidadeStore.fetchInfo(codigoUnidade)
}

export default {
  name: 'PaginaAcoesJeronimo',
  components: { ActionsListComponent, ActionsMapComponent },

  async beforeRouteEnter() {
    await carregarInfo()
  },

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
    }
  },

  computed: {
    jeronimoMarkers() {
      return unidadeStore.getMarcadores
    },
  },

  methods: {
    async showActionsHandler(flag: boolean) {
      this.isActionsListVisible = flag
      this.jeronimoActions = await acaoStore.fetchAcoes(codigoUnidade)
    },
    async reloadInfoHandler() {
      // FIXME: ATUALIZAR NÃO ESTÁ FUNCIONANDO
      // PROVAVELMENTE, PORQUE A INFO É UTILIZADA PARA GERAR OS MARCADORES
      // MAS OS MESMOS SÃO UTILIZADOS COMO COMPUTED E POR ISSO NÃO SÃO ATUALIZADOS
      await carregarInfo()
    },
  },
}
</script>
