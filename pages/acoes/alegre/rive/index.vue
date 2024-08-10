<template>
  <v-row>
    <v-col>
      <v-row>
        <v-col>
          <actions-map
            :title="nomeUnidade"
            :bounds="limitesRive"
            :center="centroRive"
            :feature="campusGeojson"
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
import { type AcaoInterface } from '~/models/acao.model'
import { AcaoSearchOptionsBuilder } from '~/models/acao.search.options.model'
import type { UnidadeInfo } from '~/models/unidade.model'

export default {
  name: 'PaginaAcoesRive',
  components: { ActionsList, ActionsMap },

  data() {
    return {
      nomeUnidade: 'Área Experimental em Rive, Alegre',
      codigoUnidade: 'EXP_RIVE',
      acoesRive: [] as AcaoInterface[],
      infoRive: {} as UnidadeInfo,
      exibirAcoes: false,
      centroRive: [-20.7494, -41.4875],
      limitesRive: [
        [-20.7422, -41.4932],
        [-20.7562, -41.4815],
      ],
      campusGeojson: featureRive,
      zoom: 16,
    }
  },

  methods: {
    async loadActions() {
      const { $api } = useNuxtApp()
      this.acoesRive = await $api.acoes.search(
        AcaoSearchOptionsBuilder(this.codigoUnidade),
      )
    },

    showActions(flag: boolean) {
      this.exibirAcoes = flag
      if (this.exibirAcoes) {
        this.loadActions()
      }
    },
  },

  async mounted() {
    const { $api } = useNuxtApp()
    this.infoRive = await $api.unidades.getUnidadeInfo(this.codigoUnidade)
  },
}
</script>
