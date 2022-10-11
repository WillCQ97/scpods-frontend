<template>
  <VisualMap
    title="Alegre - Sede"
    :bounds="alegreBounds"
    :center="alegreCenter"
    :feature="alegreFeature"
    :markers="createMarkersResumed"
  />
</template>

<script>
import alegreFeature from '~/assets/features/alegre_min.json'

export default {
  name: 'AlegreSedeMapPage',

  data() {
    return {
      alegreBounds: [
        [-20.75885, -41.53911],
        [-20.76464, -41.53211],
      ],
      alegreCenter: [-20.76161, -41.536],
      alegreFeature,
    }
  },

  computed: {
    createMarkersResumed() {
      return this.$store.getters.createMarkersInfoAlegre('sede')
    },
  },
}
</script>
