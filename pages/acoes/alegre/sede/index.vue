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

// TODO: AÇÕES RESUMO SERÁ CARREGADO DO SERVIDOR
export default {
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
    // TODO: carregar os marcadores para alegre
    createMarkersResumed() {
      const markers = acoesResumo.map((resumo) => ({
        id: resumo.id,
        coord: resumo.localizacao.coord,
        content:
          '<div class="popup">' +
          '<img class="popup_img" src="' +
          require('~/assets/ods_icons/' + resumo.id_ods_principal + '.png') +
          '"><br>' +
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
