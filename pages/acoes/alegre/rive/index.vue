<template>
  <actions-map-component
    :title="nomeUnidade"
    :bounds="limitesRive"
    :center="centroRive"
    :feature="featureUnidadeRive"
    :markers="obterMarcadoresParaRive"
    :zoom="zoom"
  />
</template>

<script lang="ts">
import featureUnidadeRive from '~/assets/features/rive.json'
import ActionsMapComponent from '~/components/Actions/ActionsMap.vue'

export default {
  name: 'PaginaMapaAcoesAlegreRive',
  components: { ActionsMapComponent },
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
      return []
    },
  },
}
</script>
