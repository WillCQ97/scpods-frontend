<template>
  <v-row>
    <v-col>
      <v-row>
        <v-col>
          <actions-map-component
            :title="nomeUnidade"
            :bounds="limitesRive"
            :center="centroRive"
            :feature="featureRive"
            :markers="createMarkers"
            :zoom="zoom"
            @show-actions="showActions"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <actions-list-component v-if="exibirAcoes" :actions="acoesRive" />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import featureRive from '~/assets/features/rive.json'
import ActionsListComponent from '~/components/Actions/ActionsList.vue'
import ActionsMapComponent from '~/components/Actions/ActionsMap.vue'
import type { Acao } from '~/models/acao.model'

const codigoUnidade = 'EXP_RIVE'
const { $api } = useNuxtApp()
const unidadeStore = useUnidadeStore()

export default {
  name: 'PaginaMapaAcoesAlegreRive',
  components: { ActionsListComponent, ActionsMapComponent },

  async beforeRouteEnter() {
    await unidadeStore.fetchInfo(codigoUnidade)
  },

  data() {
    return {
      acoesRive: [] as Acao[],
      exibirAcoes: false,
      nomeUnidade: 'Área Experimental em Rive, Alegre',
      centroRive: [-20.7494, -41.4875],
      limitesRive: [
        [-20.7422, -41.4932],
        [-20.7562, -41.4815],
      ],
      featureRive,
      zoom: 16,
    }
  },

  computed: {
    createMarkers() {
      return unidadeStore.getMarcadores
    },
  },

  methods: {
    async loadActions() {
      this.acoesRive = await $api.acoes.getAcoes(codigoUnidade)
    },
    showActions(flag: boolean) {
      this.exibirAcoes = flag
      if (this.exibirAcoes) {
        this.loadActions()
      }
    },
  },
}
</script>
