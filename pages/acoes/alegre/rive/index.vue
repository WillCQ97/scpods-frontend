<template>
  <v-row>
    <v-col>
      <v-row>
        <v-col>
          <actions-map-component
            :title="mapName"
            :bounds="limitesRive"
            :center="centroRive"
            :feature="featureUnidadeRive"
            :markers="createMarkers"
            :zoom="zoom"
            @show-actions="showActions"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <actions-list-component
            v-if="isActionsListVisible"
            :actions="riveActions"
          />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import ActionsListComponent from '~/components/Actions/ActionsList.vue'
import ActionsMapComponent from '~/components/Actions/ActionsMap.vue'
import alegreActions from '~/assets/data/alegreActions.json'
import featureUnidadeRive from '~/assets/features/rive.json'

const unidadeStore = useUnidadeStore()
await useAsyncData('infoRive', () => unidadeStore.fetchInfo('EX_RIVE'))

export default {
  name: 'PaginaMapaAcoesAlegreRive',

  components: { ActionsListComponent, ActionsMapComponent },

  data() {
    return {
      alegreActions,
      isActionsListVisible: false,
      riveActions: [],
      nomeCampus: 'ALEGRE',
      unidadeId: 5,
      mapName: 'Área Experimental em Rive, Alegre',
      centroRive: [-20.7494, -41.4875],
      limitesRive: [
        [-20.7422, -41.4932],
        [-20.7562, -41.4815],
      ],
      featureUnidadeRive,
      zoom: 16,
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
      this.riveActions = alegreActions.filter(
        (action) => action.local.unidade.id === this.unidadeId,
      )
    },
  },
}
</script>
