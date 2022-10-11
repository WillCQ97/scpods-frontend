<template>
  <VisualMap
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

export default {
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
      const markers = this.$store.getters.loadedAlegreInfo.rive.map(
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
