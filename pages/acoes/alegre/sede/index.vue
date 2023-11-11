<template>
  <app-map-component
    title="Alegre - Sede"
    :bounds="limiteAlegre"
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
      limiteAlegre: [
        [-20.75885, -41.53911],
        [-20.76464, -41.53211],
      ],
      centroAlegre: [-20.76161, -41.536],
      featureCampusAlegre,
    }
  },

  computed: {
    obterMarcadoresParaAlegre() {
      console.log('Obtendo marcadores')
      const marcadores =
        this.$store.getters.obterMarcadoresInfoPorCampusEUnidade({
          nomeCampus: 'ALEGRE',
          nomeUnidade: 'Unidade Sede em Alegre',
        })
      console.log(marcadores)
      return marcadores
    },
  },
}
</script>
