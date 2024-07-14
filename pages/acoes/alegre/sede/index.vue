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
            :unidade-info="infoAlegre"
            @show-actions="showActions"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <actions-list v-if="exibirAcoes" :actions="acoesAlegre" />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import featureAlegre from '~/assets/features/alegre.json'
import ActionsList from '~/components/Actions/ActionsList.vue'
import ActionsMap from '~/components/Actions/ActionsMap.vue'
import type { AcaoInterface } from '~/models/acao.model'
import { AcaoSearchOptionsBuilder } from '~/models/acao.search.filter.model'
import type { UnidadeInfo } from '~/models/unidade.model'

export default {
  name: 'PaginaAcoesAlegre',
  components: { ActionsList, ActionsMap },

  data() {
    return {
      nomeUnidade: 'Campus Sede em Alegre',
      codigoUnidade: 'UN_ALEGRE',
      acoesAlegre: [] as AcaoInterface[],
      infoAlegre: {} as UnidadeInfo,
      campusGeojson: featureAlegre,
      exibirAcoes: false,
      centroMapa: [-20.76161, -41.536],
      limitesMapa: [
        [-20.75885, -41.53911],
        [-20.76464, -41.53211],
      ],
    }
  },

  methods: {
    async carregarAcoes() {
      const { $api } = useNuxtApp()
      this.acoesAlegre = await $api.acoes.search(
        AcaoSearchOptionsBuilder(this.codigoUnidade),
      )
    },

    showActions(flag: boolean) {
      this.exibirAcoes = flag

      if (this.exibirAcoes) {
        this.carregarAcoes()
      }
    },
  },

  async mounted() {
    const { $api } = useNuxtApp()
    this.infoAlegre = await $api.unidades.getUnidadeInfo(this.codigoUnidade)
  },
}
</script>
