<template>
  <v-row>
    <v-col>
      <v-row>
        <v-col>
          <actions-map-component
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
          <actions-list-component v-if="exibirAcoes" :actions="acoesAlegre" />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import featureAlegre from '~/assets/features/alegre.json'
import ActionsListComponent from '~/components/Actions/ActionsList.vue'
import ActionsMapComponent from '~/components/Actions/ActionsMap.vue'
import type { Acao } from '~/models/acao.model'
import type { UnidadeInfo } from '~/models/unidade.model'

const codigoUnidade = 'UN_ALEGRE'
const { $api } = useNuxtApp()

export default {
  name: 'PaginaMapaAcoesAlegreSede',
  components: { ActionsListComponent, ActionsMapComponent },

  data() {
    return {
      acoesAlegre: [] as Acao[],
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
      this.acoesAlegre = await $api.acoes.getAcoes(codigoUnidade)
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
