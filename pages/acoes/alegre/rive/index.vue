<template>
  <app-map-component
    :title="nomeUnidade"
    :bounds="limitesRive"
    :center="centroRive"
    :feature="featureUnidadeRive"
    :markers="obterMarcadoresParaRive"
    :zoom="zoom"
  />
</template>

<script lang="ts">
import featureUnidadeRive from '~/assets/features/rive_min.json'
import AppMapComponent from '~/components/UI/AppMap.vue'

export default {
  name: 'AlegreRiveMapPage',
  components: { AppMapComponent },
  data() {
    return {
      nomeCampus: 'ALEGRE',
      nomeUnidade: 'Área Experimental em Rive, Alegre',
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
    obterMarcadoresParaRive() {
      /*
      return this.$store.getters.obterMarcadoresInfoPorCampusEUnidade({
        nomeCampus: this.nomeCampus,
        nomeUnidade: this.nomeUnidade,
      })
      */
      return []
    },
  },
}
</script>
