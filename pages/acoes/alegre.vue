<template>
  <v-row>
    <v-col>
      <!-- INFO SOBRE AS ÁREAS DO CAMPUS E MENU DE SELEÇÃO -->
      <v-row>
        <v-col>
          <v-card>
            <v-card-title>Campus de Alegre</v-card-title>
            <v-card-subtitle>Selecione o mapa a ser exibido!</v-card-subtitle>
            <hr />
            <v-card-text>
              <p>
                Atualmente, o campus de Alegre conta com
                <strong>três localidades</strong>:
              </p>

              <ul>
                <li>
                  A <strong>sede do campus</strong> que está localizada no Alto
                  Universitário, no município de <strong> Alegre, ES</strong>.
                </li>
                <li>
                  As instalações do
                  <strong>
                    Departamento de Ciências Florestais e da Madeira (DCFM)
                  </strong>
                  localizadas no município de
                  <strong> Jerônimo Monteiro, ES</strong>.
                </li>
                <li>
                  A <strong> Área Experimental</strong> na localidade de
                  <strong>Rive</strong>, no município de Alegre. Onde estão
                  localizados o <strong>Hospital Veterinário (HOVET)</strong>, o
                  <strong>Laboratório de Solos</strong> e o
                  <strong>Viveiro</strong>.
                </li>
              </ul>
            </v-card-text>
            <hr />
            <v-card-actions>
              <v-spacer />
              <v-btn
                v-for="(mapa, index) in mapas"
                :key="index"
                :color="corBotao"
                variant="tonal"
                @click="exibirMapa(mapa.subpagina)"
              >
                {{ mapa.titulo }}
              </v-btn>
              <v-spacer />
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <!-- EXIBIÇÃO DO MAPA -->
      <v-row>
        <v-col id="child-container" ref="childContainer">
          <nuxt-page />
        </v-col>
      </v-row>

      <!-- LISTA DE PROJETOS -->
      <v-row v-if="flagShowActionsList">
        <v-col>
          <acoes-list titulo="Lista de ações em Alegre" />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import AcoesList from '~/components/Acoes/AcoesList.vue'
import colorPalleteUfes from '~/assets/colors'

async function carregarMapa(campus: string) {
  await navigateTo('/acoes/alegre/' + campus)
}
// import localAlegreInfo from '~/assets/data/alegreInfo'

export default {
  name: 'PaginaAcoesAlegreWrapper',
  components: { AcoesList },

  data() {
    return {
      corBotao: colorPalleteUfes.monocromatic.mono5,
      mapas: [
        { titulo: 'Sede em Alegre', subpagina: 'sede' },
        { titulo: 'Unidade Jerônimo Monteiro', subpagina: 'jeronimo' },
        { titulo: 'Área Experimental Rive', subpagina: 'rive' },
      ],
      flagShowActionsList: false,
      flagErroAoCarregarInfos: false,
    }
  },
  // fetch(context) {
  // TODO: MOVER ESSE CARREGAMENTO PARA UMA AÇÃO NA STORE, POIS SE O /acoes/alegre/sede for carregado diretamente, esse código não terá sido executado
  /*
    // Usar a api específica para tal https://nuxt.com/docs/getting-started/data-fetching
    // console.log('=== EXECUTEI NO FETCH DAS INFOS ===')
    context.$axios
      .$get('/campus/info?nome=alegre')
      .then((infoAlegre) => {
        console.log(infoAlegre)
        context.store.dispatch('setInfo', infoAlegre)
        // console.log('=== EXECUTEI NO THEN DO AXIOS.GET ===')
      })
      .catch((e) => {
        // FIXME: Caso esse cara não esteja disponível então é mostrada uma página de erro inesperado
        // Utilizar a flag para mostrar um warning quando o usuário clicar no botão para exibir um mapa
        this.flagErroAoCarregarInfos = true
        // console.log('=== EXECUTEI NO CATCH DA EXCEÇÃO ===')
        // console.log(localAlegreInfo)
        // context.store.dispatch('setInfo', localAlegreInfo)
        console.error(e)
      })
      */
  // },

  methods: {
    // TODO: FIX SCROLL INTO CHILD
    scrollToIntoChild() {
      setTimeout(() => {
        this.$refs.childContainer.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        })
      }, 250)
    },
    exibirMapa(campus: string) {
      // if (this.flagErroAoCarregarInfos) {
      // TODO: mostrar um diálogo informando que não foi possível carregar as infos
      // }
      // this.scrollToIntoChild()
      carregarMapa(campus)
    },
  },
}
</script>

<style scoped>
ul {
  padding-left: 25px;
}
li {
  padding-left: 10px;
}
</style>
