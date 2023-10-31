<template>
  <mapa-component
    title="Área Experimental em Rive"
    :bounds="riveBounds"
    :center="riveCenter"
    :feature="riveFeature"
    :markers="createMarkersResumed"
    :zoom="zoom"
  />
</template>

<script>
import riveFeature from '~/assets/features/rive_min.json'
import MapaComponent from '~/components/MapaComponent.vue'

export default {
  components: { MapaComponent },
  name: 'AlegreRiveMapPage',
  data() {
    return {
      riveBounds: [
        [-20.7422, -41.4932],
        [-20.7562, -41.4815],
      ],
      riveCenter: [-20.7494, -41.4875],
      riveFeature,
      zoom: 16,
    }
  },

  computed: {
    createMarkersResumed() {
      return this.$store.getters.createMarkersInfoAlegre('rive')
    },
  },
}
</script>
