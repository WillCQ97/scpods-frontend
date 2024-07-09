<template>
  <v-row>
    <v-col>
      <v-row>
        <v-col>
          <actions-map
            :title="nomeUnidade"
            :bounds="limitesRive"
            :center="centroRive"
            :feature="featureRive"
            :unidade-info="infoRive"
            :zoom="zoom"
            @show-actions="showActions"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <actions-list v-if="exibirAcoes" :actions="acoesRive" />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import featureRive from '~/assets/features/rive.json'
import ActionsList from '~/components/Actions/ActionsList.vue'
import ActionsMap from '~/components/Actions/ActionsMap.vue'
import type { AcaoInterface } from '~/models/acao.model'
import type { UnidadeInfo } from '~/models/unidade.model'

const codigoUnidade = 'EXP_RIVE'
const { $api } = useNuxtApp()

export default {
  name: 'PaginaMapaAcoesAlegreRive',
  components: { ActionsList, ActionsMap },

  data() {
    return {
      acoesRive: [] as AcaoInterface[],
      exibirAcoes: false,
      nomeUnidade: 'Área Experimental em Rive, Alegre',
      infoRive: {} as UnidadeInfo,
      centroRive: [-20.7494, -41.4875],
      limitesRive: [
        [-20.7422, -41.4932],
        [-20.7562, -41.4815],
      ],
      featureRive,
      zoom: 16,
    }
  },

  methods: {
    async loadActions() {
      this.acoesRive = await $api.acoes.search(codigoUnidade)
    },
    showActions(flag: boolean) {
      this.exibirAcoes = flag
      if (this.exibirAcoes) {
        this.loadActions()
      }
    },
  },

  async mounted() {
    this.infoRive = await $api.unidades.getUnidadeInfo(codigoUnidade)
  },
}
</script>
