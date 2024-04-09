<template>
  <v-row>
    <v-spacer />
    <v-col cols="10">
      <v-card min-width="80vh">
        <v-card-title>{{ title }}</v-card-title>
        <v-divider :color="dividerColor" thickness="3"></v-divider>
        <AppMapComponent
          :attribution="attributionHOT"
          :bounds="bounds"
          :center="center"
          :feature="feature"
          :markers="markers"
          :tile-url="urlHOT"
          :show-feature="true"
          :zoom="zoom"
        />
        <v-divider :color="dividerColor" thickness="3"></v-divider>
        <v-card-actions>
          <v-btn class="btn" @click="emitShowActionsList">
            {{ isActionListVisible ? 'Ocultar' : 'Exibir' }} Ações
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-spacer />
  </v-row>
</template>

<script lang="ts">
import AppMapComponent from '~/components/UI/AppMap.vue'
import colorPalleteUfes from '~/assets/colors'

export default {
  // A ordem esperada das coordenadas é latitude, longitude
  name: 'ActionsMapComponent',
  components: { AppMapComponent },
  props: {
    bounds: {
      type: Array,
      required: true,
    },
    center: {
      type: Array,
      required: true,
    },
    feature: {
      type: Object,
      required: true,
    },
    markers: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    zoom: {
      type: Number,
      default: 18,
      required: false,
    },
  },
  emits: ['showActions'],
  data() {
    return {
      attribution:
        '<a href="https://mapa.prodesignufes.org">Prodesing UFES</a> | &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      attributionHOT:
        '<a href="https://mapa.prodesignufes.org">Prodesing UFES</a> | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>',
      dividerColor: colorPalleteUfes.monocromatic.primary,
      enableTooltip: true,
      isActionListVisible: false,
      showCampusFeature: true,
      urlHOT: 'http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
    }
  },
  methods: {
    emitShowActionsList() {
      this.isActionListVisible = !this.isActionListVisible
      this.$emit('showActions', this.isActionListVisible)
    },
  },
}
</script>
