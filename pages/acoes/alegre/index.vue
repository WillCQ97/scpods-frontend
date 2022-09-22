<template>
  <div>
    <h1>Página para alegre</h1>
    <p>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit ut
      laudantium iusto, magnam culpa ipsam, alias amet natus dolore error ad quo
      eaque, reiciendis labore in optio iure. Unde, incidunt.
    </p>
    <p>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi rerum
      vitae accusamus repudiandae saepe quos. Facilis perferendis nemo fugiat
      quasi quos autem neque quidem, tenetur totam eaque at qui pariatur.
    </p>
    <!--TODO: COLOCAR ALGUNS CARDS INFORMATIVOS SOBRE OS PROJETOS DE FORMA GERAL
    O QUE SERIA OUTRO COMPONENTE (DASHBOARD?) -->
    <VisualMap
      :bounds="bounds"
      :center="center"
      :feature="feature"
      :markers="createMarkers"
    />
    <!-- adicionar o visualmap para jerônimo e botões para o usuário poder selecionar as informações-->

    <!-- TODO: adicionar a lista de projetos a serem exibidos (componente próprio) -->
    <p>CARREGAR UMA LISTA COM OS PROJETOS A PARTIR DA INTERAÇÃO COM O MAPA</p>
  </div>
</template>

<script>
// TODO: CORRIGIR DIFERENÇA ENTRE O GEOJSON E A LAYER DO MAPA
import alegreFeature from '~/assets/features/alegre_min.json'

// TROCAR ESSA IMPORTAÇÃO PELO DADO EM SI E EXCLUIR ESSE ARQUIVO
import acoesResumo from '~/assets/temp/acoes_resumo.json'
// import acoes from '~/assets/temp/acoes_alegre.json'

export default {
  name: 'AlegreActionsPage',

  data() {
    return {
      // TODO: UTILIZAR UMA ÁREA MENOR EM VOLTA DO CAMPUS
      bounds: [
        [-20.75885, -41.53911],
        [-20.76464, -41.53211],
      ],
      center: [-20.76161, -41.536],
      feature: alegreFeature,
    }
  },

  computed: {
    createMarkers() {
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
