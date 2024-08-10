<template>
  <v-card min-width="80vh">
    <v-card-title>{{ title }}</v-card-title>
    <the-card-divider />
    <app-map
      :attribution="attributionHOT"
      :bounds="bounds"
      :center="center"
      :feature="feature"
      :markers="createMarkers"
      :tile-url="urlHOT"
      :show-feature="true"
      :zoom="zoom"
    />
    <the-card-divider />
    <v-card-actions>
      <v-spacer />
      <v-btn class="btn" @click="emitShowActionsList">
        {{ isActionListVisible ? 'Ocultar' : 'Exibir' }} Ações
        <v-tooltip activator="parent" location="bottom">
          Mostrar a listagem das ações para esta unidade
        </v-tooltip>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import AppMap from '~/components/UI/AppMap.vue'
import TheCardDivider from '~/components/UI/TheCardDivider.vue'
import type { LocalInfoInterface } from '~/models/local.model'
import type Marker from '~/models/props/marker.model'
import type { UnidadeInfoInterface } from '~/models/unidade.model'

export default {
  // A ordem esperada das coordenadas é latitude, longitude
  name: 'ActionsMap',

  components: { AppMap, TheCardDivider },

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
    unidadeInfo: {
      type: Object as PropType<UnidadeInfoInterface>,
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

  emits: ['showActions', 'refreshData'],

  computed: {
    createMarkers(): Marker[] {
      const odsStore = useObjetivoStore()

      const locaisAtivos = this.unidadeInfo.locais?.filter(
        (local) => local.projetosAtivos > 0,
      )

      if (locaisAtivos === undefined) return []

      return locaisAtivos.map((local: LocalInfoInterface) => ({
        ...local,
        id: local.id,
        coordinates: local.localizacao.coordinates.toReversed(),
        content:
          '<div class="map-popup">' +
          '<img class="map-popup-img" src="' +
          '/img/ods-icons/pt-br/SDG-' +
          local.idObjetivoComMaisProjetos +
          '.svg' +
          '"><br>' +
          '<div class="map-popup-text">' +
          '<strong>' +
          local.nomePrincipal +
          '</strong>' +
          '<br/>Número de Projetos Ativos: ' +
          local.projetosAtivos +
          '<br/>Objetivos atendidos: ' +
          local.objetivosAtendidos +
          '<br/>Objetivo mais atendido: ' +
          '<br/>' +
          odsStore.getTituloObjetivoById(local.idObjetivoComMaisProjetos) +
          '</div></div>',
      }))
    },
  },

  data() {
    return {
      attribution:
        '<a href="https://mapa.prodesignufes.org">ProDesing Ufes</a> | &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      attributionHOT:
        '<a href="https://mapa.prodesignufes.org">ProDesing Ufes</a> | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>',
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
    emitRefreshData() {
      this.$emit('refreshData')
    },
  },
}
</script>

<style>
div.map-popup {
  display: flex;
}

img.map-popup-img {
  height: 100px;
  margin-bottom: auto;
  margin-top: auto;
  width: 100px;
}

div.map-popup-text {
  padding-left: 5px;
}
</style>
