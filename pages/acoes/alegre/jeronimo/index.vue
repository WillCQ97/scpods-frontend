<template>
  <div>
    <VisualMap
      title="Jerônimo Monteiro"
      :bounds="jeronimoBounds"
      :center="jeronimoCenter"
      :feature="jeronimoFeature"
      :markers="createMarkersResumed"
    />
  </div>
</template>

<script>
import jeronimoFeature from '~/assets/features/jeronimo_min.json'

export default {
  name: 'AlegreJeronimoMapPage',

  data() {
    return {
      jeronimoCenter: [-20.78981, -41.38849],
      jeronimoFeature,
      riveBounds: [
        [-20.7492301, -41.4905947],
        [-20.7535765, -41.4855781],
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
