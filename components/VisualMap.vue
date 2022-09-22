<template>
  <v-row>
    <v-spacer />
    <v-col cols="10">
      <v-card elevation="8" min-width="80vh">
        <v-card-title>Alegre - Sede</v-card-title>
        <hr />
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

            <!-- MARCADORES RECEBIDOS -->
            <l-marker
              v-for="marker in markers"
              :key="marker.id"
              :lat-lng="marker.coord"
              @click="enableBtnProjectList()"
            >
              <l-icon
                :icon-size="markerIconSize"
                :icon-url="markerIconUrl"
              ></l-icon>
              <l-popup
                :content="marker.content"
                :options="popupOptions"
              ></l-popup>
            </l-marker>
          </l-map>
        </client-only>
        <hr />
        <v-card-actions>
          <!-- ADICIONAR O ON CLICK PARA UM MÉTODO EMIT QUE AVISARÁ AO COMPONENTE PAI QUAL AÇÃO EXECUTAR -->
          <v-btn class="btn" :disabled="hideBtnProjectList">
            Exibir Ações
          </v-btn>
        </v-card-actions>
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
    markers: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      attribution:
        '<a href="https://mapa.prodesignufes.org">Prodesing UFES</a> | &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      hideBtnProjectList: true,
      enableTooltip: true,
      markerIconUrl: '/img/logos/ods-small.png',
      markerIconSize: [20, 20],
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
        let tags = ''

        Object.entries(props.palavras_chave).forEach(([_key, value]) => {
          tags += value + '; '
        })

        const popupContent =
          '<strong>ID:</strong> ' +
          props.idd +
          '<br /><strong>Nome:</strong> ' +
          props.primario +
          '<br /><strong>Tags:</strong> ' +
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
  methods: {
    enableBtnProjectList() {
      if (this.hideBtnProjectList) {
        this.hideBtnProjectList = false
      }
    },
  },
}
</script>

<style>
div.popup {
  display: flex;
}

img.popup_img {
  height: 75px;
  width: 75px;
}

div.popup_text {
  padding-left: 5px;
}
</style>
