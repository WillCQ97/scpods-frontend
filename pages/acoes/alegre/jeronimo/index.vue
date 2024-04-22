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
            v-if="isActionsListVisible"
            :actions="jeronimoActions"
          /> </v-col
      ></v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import ActionsListComponent from '~/components/Actions/ActionsList.vue'
import ActionsMapComponent from '~/components/Actions/ActionsMap.vue'
import alegreActions from '~/assets/data/alegreActions.json'
import featureJeronimo from '~/assets/features/jeronimo.json'

const unidadeStore = useUnidadeStore()

export default {
  name: 'PaginaAcoesJeronimo',
  components: { ActionsListComponent, ActionsMapComponent },

  async beforeRouteEnter() {
    await unidadeStore.fetchInfo('UN_JERONIMO')
  },

  data() {
    return {
      alegreActions,
      isActionsListVisible: false,
      jeronimoActions: [],
      unidadeId: 6,
      nomeCampus: 'ALEGRE',
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
    showActions(flag: boolean) {
      this.isActionsListVisible = flag
      this.jeronimoActions = alegreActions.filter(
        (action) => action.local.unidade.id === this.unidadeId,
      )
    },
  },
}
</script>
