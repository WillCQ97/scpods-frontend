<template>
  <client-only>
    <template #fallback>
      <br />
      <p style="text-align: center">Preparando exibição do mapa ...</p>
      <br />
    </template>

    <!-- PROPRIEDADES DO MAPA -->
    <l-map
      :center="center"
      :options="mapOptions"
      :zoom="zoom"
      style="height: 600px; z-index: 1"
      :use-global-leaflet="false"
    >
      <!-- LAYER DO OPENSTREETMAP -->
      <l-tile-layer :attribution="attribution" :url="tileUrl"></l-tile-layer>

      <!-- FEATURES DO CAMPUS NO GEOJSON -->
      <l-geo-json
        v-if="showFeatureOnMap"
        :geojson="feature"
        :options="featureOptions"
      />

      <!-- MARCADORES RECEBIDOS -->
      <l-marker
        v-for="marker in markers"
        :key="marker.id"
        :lat-lng="marker.coordinates"
      >
        <l-icon :icon-size="markerIconSize" :icon-url="markerIconUrl"></l-icon>
        <l-popup :content="marker.content" :options="popupOptions"></l-popup>
      </l-marker>
    </l-map>
  </client-only>
</template>

<script lang="ts">
import type { GeoJsonObject } from 'geojson'
import { point, type PointExpression } from 'leaflet'
import type { PropType } from 'vue'
import type MarkerInterface from '~/models/props/marker.model'

/*
 * A ordem esperada das coordenadas é latitude, longitude
 */
export default {
  name: 'AppMap',

  props: {
    attribution: {
      type: String,
      required: false,
      default: '',
    },
    bounds: {
      type: Array,
      required: true,
    },
    center: {
      type: Object as PropType<PointExpression>,
      required: true,
    },
    feature: {
      type: Object as PropType<GeoJsonObject>,
      required: false,
      default: null,
    },
    markers: {
      type: Array as PropType<MarkerInterface[]>,
      required: true,
    },
    tileUrl: {
      type: String,
      required: false,
      default: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
    },
    showFeature: {
      type: Boolean,
      required: false,
      default: false,
    },
    zoom: {
      type: Number,
      default: 18,
      required: false,
    },
  },

  data() {
    return {
      enableTooltip: true,
      markerIconUrl: '/img/logo-ods-small.png',
      markerIconSize: point(20, 20),
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
      return (feature: any, layer: any) => {
        /*
         * ESTE TOOLTIP CONSIDERA A ESTRUTURA DO GEOJSON DOS CAMPI
         */
        const props = feature.properties

        let tags = ''
        Object.entries(props.palavras_chave).forEach(([_key, value]) => {
          tags += value + '; '
        })

        const mapTooltip =
          '<strong>ID:</strong> ' +
          props.idd +
          '<br /><strong>Nome:</strong> ' +
          props.primario +
          '<br /><strong>Tags:</strong> ' +
          tags

        layer.bindTooltip(mapTooltip, { permanent: false, sticky: true })
      }
    },
    mapOptions() {
      return {
        maxBounds: this.bounds,
        maxZoom: 18,
        minZoom: 16,
        scrollWheelZoom: false,
        zoomControl: true,
      }
    },
    showFeatureOnMap(): boolean {
      if (this.feature === null) {
        return false
      }
      return this.showFeature
    },
    popupOptions() {
      return {
        maxWidth: 315,
      }
    },
  },
}
</script>
