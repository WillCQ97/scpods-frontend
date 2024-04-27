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
            v-if="exibirAcores"
            :actions="acoesJeronimo"
          /> </v-col
      ></v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import featureJeronimo from '~/assets/features/jeronimo.json'
import ActionsListComponent from '~/components/Actions/ActionsList.vue'
import ActionsMapComponent from '~/components/Actions/ActionsMap.vue'
import type { Acao } from '~/models/acao/acao.model'

const codigoUnidade = 'UN_JERONIMO'
const acaoStore = useAcaoStore()
const unidadeStore = useUnidadeStore()

export default {
  name: 'PaginaAcoesJeronimo',
  components: { ActionsListComponent, ActionsMapComponent },

  async beforeRouteEnter() {
    await unidadeStore.fetchInfo(codigoUnidade)
  },

  data() {
    return {
      acoesJeronimo: [] as Acao[],
      exibirAcores: false,
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
      return unidadeStore.getMarcadores
    },
  },

  methods: {
    async showActions(flag: boolean) {
      this.exibirAcores = flag
      this.acoesJeronimo = await acaoStore.fetchAcoes(codigoUnidade)
    },
  },
}
</script>
