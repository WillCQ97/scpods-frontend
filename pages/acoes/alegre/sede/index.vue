<template>
  <div>
    <VisualMap
      title="Alegre - Sede"
      :bounds="alegreBounds"
      :center="alegreCenter"
      :feature="alegreFeature"
      :markers="createMarkersResumed"
    />
  </div>
</template>

<script>
import alegreFeature from '~/assets/features/alegre_min.json'

// TODO: TROCAR ESSA IMPORTAÇÃO PELO DADO EM SI E EXCLUIR ESSE ARQUIVO
import acoesResumo from '~/assets/temp/acoes_resumo.json'
// import acoes from '~/assets/temp/acoes_alegre.json'

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
    // TODO: carregar os marcadores para alegre
    createMarkersResumed() {
      const markers = acoesResumo.map((resumo) => ({
        id: resumo.id,
        coord: resumo.localizacao.coord,
        content:
          '<div class="popup">' +
          '<img class="popup_img" src="/img/ods_icons/' +
          resumo.id_ods_principal +
          '.png"><br>' +
          '<div class="popup_text">' +
          '<strong> ' +
          resumo.localizacao.nome +
          '</strong>' +
          '<br/>Total de Projetos: ' +
          resumo.qtd_projetos_totais +
          '<br/>Total de Projetos Ativos: ' +
          resumo.qtd_projetos_ativos +
          '<br/>Total de ODS atendidos: ' +
          resumo.qtd_ods +
          '</div></div>',
      }))
      return markers
    },
  },
}
</script>
