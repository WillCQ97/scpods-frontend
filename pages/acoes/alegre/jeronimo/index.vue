<template>
  <VisualMap
    title="Jerônimo Monteiro"
    :bounds="jeronimoBounds"
    :center="jeronimoCenter"
    :feature="jeronimoFeature"
    :markers="createMarkersResumed"
  />
</template>

<script>
import jeronimoFeature from '~/assets/features/jeronimo_min.json'

export default {
  name: 'AlegreJeronimoMapPage',

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
    // TODO: carregar os marcadores para jerônimo
    createMarkersResumed() {
      return []
    },
  },
}
</script>
