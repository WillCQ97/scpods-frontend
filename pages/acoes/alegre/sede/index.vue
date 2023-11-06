<template>
  <app-map-component
    title="Alegre - Sede"
    :bounds="alegreBounds"
    :center="alegreCenter"
    :feature="alegreFeature"
    :markers="createMarkersResumed"
  />
</template>

<script>
import alegreFeature from '~/assets/features/alegre_min.json'
import AppMapComponent from '~/components/UI/AppMap.vue'

export default {
  name: 'AlegreSedeMapPage',
  components: { AppMapComponent },

  // this method is executed in the server, before returns the page for the client
  // it is only used on pages
  /*
  asyncData() {
    //this example show one maner to return a async data via promise
    return new Promise()
  },
  */
  // Mais detalhes na seção 4 do curso. aula 4.3
  asyncData(context, callback) {
    callback(null, {
      // the data that it will be returned here
    })
  },

  // this overwrite the asyncData
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
      return this.$store.getters.createMarkersInfoAlegre('sede');
    },
  },
}
</script>
