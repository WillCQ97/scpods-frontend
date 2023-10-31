<template>
  <app-map-component
    title="Jerônimo Monteiro"
    :bounds="jeronimoBounds"
    :center="jeronimoCenter"
    :feature="jeronimoFeature"
    :markers="createMarkersResumed"
  />
</template>

<script>
import jeronimoFeature from '~/assets/features/jeronimo_min.json'
import AppMapComponent from '~/components/UI/AppMap.vue'

export default {
  name: 'AlegreJeronimoMapPage',
  components: { AppMapComponent },

  data() {
    return {
      jeronimoCenter: [-20.79071, -41.38887],
      jeronimoFeature,
      jeronimoBounds: [
        [-20.78827, -41.39275],
        [-20.79285, -41.38471],
      ],
    }
  },

  computed: {
    createMarkersResumed() {
      return this.$store.getters.createMarkersInfoAlegre('jeronimo')
    },
  },
}
</script>
