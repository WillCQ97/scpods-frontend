<template>
  <div>
    <VisualMap
      title="Área Experimental em Rive"
      :bounds="riveBounds"
      :center="riveCenter"
      :feature="riveFeature"
      :markers="createMarkersResumed"
    />
  </div>
</template>

<script>
import riveFeature from '~/assets/features/rive_min.json'

export default {
  name: 'AlegreRiveMapPage',
  data() {
    return {
      riveBounds: [
        [-20.7492301, -41.4905947],
        [-20.7535765, -41.4855781],
      ],
      riveCenter: [-20.7515466, -41.4883097],
      riveFeature,
    }
  },

  computed: {
    // TODO: carregar os marcadores para rive
    createMarkersResumed() {
      return []
    },
  },
}
</script>
