<template>
  <v-row>
    <v-col>
      <v-row>
        <v-col>
          <actions-map
            :title="nomeUnidade"
            :bounds="limitesMapa"
            :center="centroMapa"
            :feature="campusGeojson"
            :unidade-info="infoJeronimo"
            @show-actions="showActionsHandler"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <actions-list v-if="exibirAcoes" :actions="acoesJeronimo" /> </v-col
      ></v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import featureJeronimo from '~/assets/features/jeronimo.json'
import ActionsList from '~/components/Actions/ActionsList.vue'
import ActionsMap from '~/components/Actions/ActionsMap.vue'
import type { AcaoInterface } from '~/models/acao.model'
import { AcaoSearchOptionsBuilder } from '~/models/acao.search.options.model'
import type { UnidadeInfoInterface } from '~/models/unidade.model'

export default {
  name: 'PaginaAcoesJeronimo',

  components: { ActionsList, ActionsMap },

  data() {
    return {
      nomeUnidade: 'Unidade em Jerônimo Monteiro',
      codigoUnidade: 'UN_JERONIMO',
      acoesJeronimo: [] as AcaoInterface[],
      infoJeronimo: {} as UnidadeInfoInterface,
      campusGeojson: featureJeronimo,
      exibirAcoes: false,
      centroMapa: [-20.79071, -41.38887],
      limitesMapa: [
        [-20.78827, -41.39275],
        [-20.79285, -41.38471],
      ],
    }
  },

  methods: {
    async loadActionsList() {
      const { $api } = useNuxtApp()
      this.acoesJeronimo = await $api.acoes.search(
        AcaoSearchOptionsBuilder(this.codigoUnidade),
      )
    },

    showActionsHandler(flag: boolean) {
      this.exibirAcoes = flag

      if (this.exibirAcoes) {
        this.loadActionsList()
      }
    },
  },

  async mounted() {
    const { $api } = useNuxtApp()
    this.infoJeronimo = await $api.unidades.getUnidadeInfo(this.codigoUnidade)
  },
}
</script>
