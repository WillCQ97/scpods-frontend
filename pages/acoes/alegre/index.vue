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
    <v-card width="50vh">
      <v-card-title>Selecione o mapa a ser visualizado</v-card-title>

      <v-card-actions>
        <v-btn @click="btnShowOnlyAlegre">Alegre Sede</v-btn>
        <v-btn @click="btnShowOnlyJeronimo">Jerônimo</v-btn>
        <v-btn @click="btnShowOnlyRive">Área Experimental Rive</v-btn>
      </v-card-actions>
    </v-card>

    <!--TODO: COLOCAR ALGUNS CARDS INFORMATIVOS SOBRE OS PROJETOS DE FORMA GERAL
    O QUE SERIA OUTRO COMPONENTE (DASHBOARD?) -->

    <VisualMap
      v-if="showMapAlegre"
      title="Alegre - Sede"
      :bounds="bounds"
      :center="center"
      :feature="feature"
      :markers="createMarkersResumed"
    />
    <!--
    <VisualMap
      v-else-if="showMapJeronimo"
      title="Jerônimo Monteiro"
      :bounds="jeronimoBounds"
      :center="jeronimoCenter"
      :feature="jeronimoFeature"
      :markers="createMarkersResumed"
    />

    <VisualMap
      v-else-if="showMapRive"
      title="Área Experimental em Rive"
      :bounds="riveBounds"
      :center="riveCenter"
      :feature="riveFeature"
      :markers="createMarkersResumed"
    />
    -->

    <!-- TODO: adicionar a lista de projetos a serem exibidos (componente próprio) -->
    <p>CARREGAR UMA LISTA COM OS PROJETOS A PARTIR DA INTERAÇÃO COM O MAPA</p>
  </div>
</template>

<script>
import alegreFeature from '~/assets/features/alegre_min.json'
import jeronimoFeature from '~/assets/features/jeronimo_min.json'
import riveFeature from '~/assets/features/rive_min.json'

// TROCAR ESSA IMPORTAÇÃO PELO DADO EM SI E EXCLUIR ESSE ARQUIVO
import acoesResumo from '~/assets/temp/acoes_resumo.json'
// import acoes from '~/assets/temp/acoes_alegre.json'

export default {
  name: 'AlegreActionsPage',

  data() {
    return {
      bounds: [
        [-20.75885, -41.53911],
        [-20.76464, -41.53211],
      ],
      center: [-20.76161, -41.536],
      feature: alegreFeature,
      jeronimoBounds: [
        [-20.78885, -41.3898],
        [-20.79236, -41.38772],
      ],
      jeronimoCenter: [-20.78981, -41.38849],
      jeronimoFeature,
      riveBounds: [
        [-20.7492301, -41.4905947],
        [-20.7535765, -41.4855781],
      ],
      riveCenter: [-20.7515466, -41.4883097],
      riveFeature,
      showMapAlegre: true,
      showMapJeronimo: false,
      showMapRive: false,

      // TODO: varáveis de teste, remover posteriormente
      mapAlegre: {
        bounds: [
          [-20.75885, -41.53911],
          [-20.76464, -41.53211],
        ],
        center: [-20.76161, -41.536],
        feature: alegreFeature,
      },
      mapJeronimo: {
        bounds: [
          [-20.78885, -41.3898],
          [-20.79236, -41.38772],
        ],
        center: [-20.78981, -41.38849],
        feature: jeronimoFeature,
      },
      mapRive: {
        bounds: [
          [-20.7492301, -41.4905947],
          [-20.7535765, -41.4855781],
        ],
        center: [-20.7515466, -41.4883097],
        feature: riveFeature,
      },
    }
  },

  computed: {
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

  methods: {
    btnShowOnlyAlegre() {
      this.bounds = this.mapAlegre.bounds
      this.center = this.mapAlegre.center
      this.feature = this.mapAlegre.feature
      /*
      this.showMapAlegre = true;
      this.showMapJeronimo = false;
      this.showMapRive = false;
      */
    },
    btnShowOnlyJeronimo() {
      /*
      this.showMapAlegre = false;
      this.showMapJeronimo = true;
      this.showMapRive = false;
      */
      this.bounds = this.mapJeronimo.bounds
      this.center = this.mapJeronimo.center
      this.feature = this.mapJeronimo.feature
    },
    btnShowOnlyRive() {
      this.showMapAlegre = false
      this.showMapJeronimo = false
      this.showMapRive = true
    },
  },
}
</script>
