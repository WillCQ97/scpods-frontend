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
      const markers = this.$store.getters.loadedAlegreInfo.sede.map((resumo) => ({
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
