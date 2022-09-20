<!--todo: receber os dados por props -->
<!--todo: fazer os testes para as informações por resumo -->
<template>
  <v-row>
    <v-spacer />
    <v-col cols="10">
      <v-card elevation="8" min-width="80vh">
        <client-only>
          <!-- PROPRIEDADES DO MAPA -->
          <l-map
            :center="center"
            :options="mapOptions"
            style="height: 600px; z-index: 1"
            :zoom="zoom"
          >
            <!-- LAYER DO OPENSTREETMAP -->
            <l-tile-layer :attribution="attribution" :url="url"></l-tile-layer>

            <!-- FEATURES DO CAMPUS NO GEOJSON -->
            <l-geo-json
              v-if="showCampusFeature"
              :geojson="feature"
              :options="featureOptions"
            />
          </l-map>
        </client-only>
      </v-card>
    </v-col>
    <v-spacer />
  </v-row>
</template>

<script>
export default {
  name: 'VisualMapComponent',
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
    /*
    projects: {
      type: Array,
      required: true,
    }, */
  },
  data() {
    return {
      attribution:
        '<a href="https://mapa.prodesignufes.org">Prodesing UFES</a> | &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      enableTooltip: true,
      markerIconUrl: 'img/logos/ods-small.png',
      markerIconSize: [20, 20],
      markers: [],
      showCampusFeature: true,
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      zoom: 18,
    }
  },
  computed: {
    featureOptions() {
      return {
        onEachFeature: this.onEachFeature,
      }
    },
    onEachFeature() {
      if (!this.enableTooltip) {
        return
      }
      return (feature, layer) => {
        const props = feature.properties
        let tags = '';

        Object.entries(props.palavras_chave).forEach(
          ([key, value]) => {
            tags += value + '; '
          }
        )

        const popupContent =
          'ID: ' +
          props.idd +
          '<br /> Nome: ' +
          props.primario +
          '<br /> Tags: ' +
          tags

        layer.bindTooltip(popupContent, { permanent: false, sticky: true })
      }
    },
    mapOptions() {
      return {
        minZoom: 16,
        maxZoom: 18,
        zoomControl: true,
        scrollWheelZoom: false,
        maxBounds: this.bounds,
      }
    },
    popupOptions() {
      return {
        maxWidth: 315,
      }
    },
  },
}
</script>
