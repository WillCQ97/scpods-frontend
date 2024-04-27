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
            :markers="createMarkers"
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
import type { Acao } from '~/models/acao/acao.model'

const codigoUnidade = 'UN_ALEGRE'
const acaoStore = useAcaoStore()
const unidadeStore = useUnidadeStore()

export default {
  name: 'PaginaMapaAcoesAlegreSede',
  components: { ActionsListComponent, ActionsMapComponent },

  async beforeRouteEnter() {
    await unidadeStore.fetchInfo(codigoUnidade)
  },

  data() {
    return {
      acoesAlegre: [] as Acao[],
      exibirAcoes: false,
      featureAlegre,
      nomeCampus: 'Campus Sede em Alegre',
      centroAlegre: [-20.76161, -41.536],
      limitesAlegre: [
        [-20.75885, -41.53911],
        [-20.76464, -41.53211],
      ],
    }
  },

  computed: {
    createMarkers() {
      return unidadeStore.getMarcadores
    },
  },

  methods: {
    async showActions(flag: boolean) {
      this.exibirAcoes = flag
      this.acoesAlegre = await acaoStore.fetchAcoes(codigoUnidade)
    },
  },
}
</script>
