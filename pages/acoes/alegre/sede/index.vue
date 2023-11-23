<template>
  <app-map-component
    :title="nomeUnidade"
    :bounds="limitesAlegre"
    :center="centroAlegre"
    :feature="featureCampusAlegre"
    :markers="obterMarcadoresParaAlegre"
  />
</template>

<script>
import featureCampusAlegre from '~/assets/features/alegre_min.json'
import AppMapComponent from '~/components/UI/AppMap.vue'

export default {
  name: 'AlegreSedeMapPage',
  components: { AppMapComponent },

  data() {
    return {
      nomeCampus: 'ALEGRE',
      nomeUnidade: 'Campus Alegre',
      centroAlegre: [-20.76161, -41.536],
      limitesAlegre: [
        [-20.75885, -41.53911],
        [-20.76464, -41.53211],
      ],
      featureCampusAlegre,
    }
  },

  computed: {
    obterMarcadoresParaAlegre() {
      /*  TODO
      if (!this.$store.getters.isInfoLoaded(this.nomeCampus)) {
        this.$store.dispatch('loadInfo', this.nomeCampus)
      }
      */
      const marcadores =
        this.$store.getters.obterMarcadoresInfoPorCampusEUnidade({
          nomeCampus: this.nomeCampus,
          // TODO: Considerar o carregamento das unidades sem ser pelo nome
          nomeUnidade: this.nomeUnidade,
        })
      return marcadores
    },
  },
}
</script>
