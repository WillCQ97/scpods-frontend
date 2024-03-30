<template>
  <ActionsMapComponent
    :title="nomeUnidade"
    :bounds="limitesJeronimo"
    :center="centroJeronimo"
    :feature="featureJeronimo"
    :markers="obterMarcadoresParaJeronimo"
  />
</template>

<script lang="ts">
import ActionsMapComponent from '~/components/Actions/ActionsMap.vue'
import featureJeronimo from '~/assets/features/jeronimo.json'

export default {
  name: 'PaginaAcoesJeronimo',
  components: { ActionsMapComponent },

  data() {
    return {
      nomeCampus: 'ALEGRE',
      nomeUnidade: 'Unidade em Jerônimo Monteiro',
      centroJeronimo: [-20.79071, -41.38887],
      limitesJeronimo: [
        [-20.78827, -41.39275],
        [-20.79285, -41.38471],
      ],
      featureJeronimo,
    }
  },

  computed: {
    obterMarcadoresParaJeronimo() {
      return []
    },
  },
}
</script>
