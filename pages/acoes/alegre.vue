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
            <p>Atualmente, o campus de Alegre conta com <strong>três localidades</strong>:</p>
            <p>
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
                localizados o <strong>Hospital Veterinário (HOVET)</strong>,
                o <strong>Laboratório de Solos</strong> e o <strong>Viveiro</strong>.
              </li>
            </ul>
            </p>
          </v-card-text>
          <hr />
          <v-card-actions>
            <v-spacer />
            <v-btn :color="btnColor" @click="exibirMapa('sede')">Sede em Alegre</v-btn>
            <v-btn :color="btnColor" @click="exibirMapa('jeronimo')">Unidade Jerônimo Monteiro</v-btn>
            <v-btn :color="btnColor" @click="exibirMapa('rive')">Área Experimental Rive</v-btn>
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

<script>
import AcoesList from '~/components/Acoes/AcoesList.vue'

export default {
  name: 'AlegreActionsWrapperPage',
  components: { AcoesList },

  data() {
    return {
      btnColor: '#d2dce8',
      flagShowActionsList: false,
      flagErroAoCarregarInfos: false,
    }
  },
  fetch(context) {
    // TODO: MOVER ESSE CARREGAMENTO PARA UMA AÇÃO NA STORE, POIS SE O /acoes/alegre/sede for carregado diretamente, esse código não terá sido executado
    context.$axios
      .$get('/info/alegre')
      .then((infoAlegre) => {
        context.store.dispatch('setInfo', infoAlegre)
      })
      .catch((e) => {
        // FIXME: Caso esse cara não esteja disponível então é mostrada uma página de erro inesperado
        // Utilizar a flag para mostrar um warning quando o usuário clicar no botão para exibir um mapa
        this.flagErroAoCarregarInfos = true
      })
  },

  methods: {
    scrollToIntoChild() {
      setTimeout(() => {
        this.$refs.childContainer.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        })
      }, 250)
    },
    exibirMapa(campus) {
      if (this.flagErroAoCarregarInfos) {
        // TODO: mostrar um diálogo informando que não foi possível carregar as infos
      }
      this.$router.push('/acoes/alegre/' + campus)
      this.scrollToIntoChild()
    },
  },
}
</script>

