<template>
  <v-row>
    <v-col>
      <v-row>
        <v-col>
          <actions-map-component
            :title="mapTitle"
            :bounds="mapLimits"
            :center="mapCenter"
            :feature="featureAlegre"
            :markers="createMarkers"
            @show-actions="showActions"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <actions-list-component
            v-if="isActionsListVisible"
            :actions="alegreSedeActions"
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
import featureAlegre from '~/assets/features/alegre.json'

const unidadeStore = useUnidadeStore()
await useAsyncData('infoAlegreSede', () => unidadeStore.fetchInfo('UN_ALEGRE'))

export default {
  name: 'PaginaMapaAcoesAlegreSede',
  components: { ActionsListComponent, ActionsMapComponent },

  data() {
    return {
      alegreSedeActions: [],
      unidadeId: 1,
      isActionsListVisible: false,
      featureAlegre,
      mapCenter: [-20.76161, -41.536],
      mapLimits: [
        [-20.75885, -41.53911],
        [-20.76464, -41.53211],
      ],
      mapTitle: 'Campus Sede em Alegre',
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
      this.alegreSedeActions = alegreActions.filter(
        (action) => action.local.unidade.id === this.unidadeId,
      )
    },
  },
}
</script>
