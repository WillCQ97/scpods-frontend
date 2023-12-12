<template>
  <app-map-component
    :title="nomeUnidade"
    :bounds="limitesJeronimo"
    :center="centroJeronimo"
    :feature="featureUnidadeJeronimo"
    :markers="obterMarcadoresParaJeronimo"
  />
</template>

<script>
import featureUnidadeJeronimo from '~/assets/features/jeronimo_min.json'
import AppMapComponent from '~/components/UI/AppMap.vue'

export default {
  name: 'AlegreJeronimoMapPage',
  components: { AppMapComponent },

  data() {
    return {
      nomeCampus: 'ALEGRE',
      nomeUnidade: 'Unidade em Jerônimo Monteiro',
      centroJeronimo: [-20.79071, -41.38887],
      limitesJeronimo: [
        [-20.78827, -41.39275],
        [-20.79285, -41.38471],
      ],
      featureUnidadeJeronimo,
    }
  },

  computed: {
    obterMarcadoresParaJeronimo() {
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
