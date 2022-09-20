<template>
  <v-row>
    <v-col>
      <v-card elevation="8" max-width="100vh" min-width="60vh">
        <client-only>
          <l-map
            :center="center"
            :options="mapOptions"
            style="height: 600px; z-index: 1"
            :zoom="zoom"
          >
            <l-tile-layer :attribution="attribution" :url="url"></l-tile-layer>
          </l-map>
        </client-only>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'VisualMapComponent',
  /*
  props: {
    bounds: {
      type: Array,
      required: true,
    },
    center: {
      type: Array,
      required: true,
    },
    geojson: {
      type: Object,
      required: true,
    },
    projects: {
      type: Array,
      required: true,
    },
  },
  */
  data() {
    return {
      attribution:
        '<a href="https://mapa.prodesignufes.org">Prodesing UFES</a> | &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      bounds: [
        [-20.75885, -41.53911],
        [-20.76464, -41.53211],
      ],
      center: [-20.76161, -41.536],
      markerIconUrl: 'img/logos/ods-small.png',
      markerIconSize: [20, 20],
      markers: [],
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      zoom: 18,
    }
  },
  computed: {
    mapOptions() {
      return {
        minZoom: 16,
        maxZoom: 18,
        zoomControl: true,
        scrollWheelZoom: false,
        maxBounds: this.bounds,
      }
    },
  },
}
</script>
