<template>
  <mapa-component
    title="Alegre - Sede"
    :bounds="alegreBounds"
    :center="alegreCenter"
    :feature="alegreFeature"
    :markers="createMarkersResumed"
  />
</template>

<script>
import alegreFeature from '~/assets/features/alegre_min.json'
import alegreInfo from '~/assets/data/alegre/info.json'
import MapaComponent from '~/components/MapaComponent.vue'

export default {
  components: { MapaComponent },
  name: 'AlegreSedeMapPage',

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
      const markers = alegreInfo.sede.map((resumo) => ({
        id: resumo.id,
        coord: resumo.local.coord,
        content:
          '<div class="popup">' +
          '<img class="popup_img" src="' +
          require('~/assets/ods_icons/' + resumo.id_ods_principal + '.png') +
          '"><br>' +
          '<div class="popup_text">' +
          '<strong>' +
          resumo.local.nome +
          '</strong>' +
          '<br/>Total de Projetos: ' +
          resumo.qtd_projetos_totais +
          '<br/>Total de Projetos Ativos: ' +
          resumo.qtd_projetos_ativos +
          '<br/>Total de ODS atendidos: ' +
          resumo.qtd_ods +
          '<br/>ODS Principal Atendido: ' +
          resumo.id_ods_principal +
          '</div></div>',
      }))
      return markers
    },
  },
}
</script>
