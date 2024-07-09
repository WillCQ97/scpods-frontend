<template>
  <v-row>
    <v-col>
      <v-row>
        <v-col>
          <actions-map
            :title="nomeCampus"
            :bounds="limitesAlegre"
            :center="centroAlegre"
            :feature="featureAlegre"
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
import type { UnidadeInfo } from '~/models/unidade.model'

const codigoUnidade = 'UN_ALEGRE'
const { $api } = useNuxtApp()

export default {
  name: 'PaginaMapaAcoesAlegreSede',
  components: { ActionsList, ActionsMap },

  data() {
    return {
      acoesAlegre: [] as AcaoInterface[],
      exibirAcoes: false,
      infoAlegre: {} as UnidadeInfo,
      featureAlegre,
      nomeCampus: 'Campus Sede em Alegre',
      centroAlegre: [-20.76161, -41.536],
      limitesAlegre: [
        [-20.75885, -41.53911],
        [-20.76464, -41.53211],
      ],
    }
  },

  methods: {
    async loadActions() {
      this.acoesAlegre = await $api.acoes.search(codigoUnidade)
    },
    showActions(flag: boolean) {
      this.exibirAcoes = flag

      if (this.exibirAcoes) {
        this.loadActions()
      }
    },
  },

  async mounted() {
    this.infoAlegre = await $api.unidades.getUnidadeInfo(codigoUnidade)
  },
}
</script>
