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
    createMarkersResumed() {
      const markers = this.$store.getters.loadedAlegreInfo.jeronimo.map(
        (resumo) => ({
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
        })
      )
      return markers
    },
  },
}
</script>
