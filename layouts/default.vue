<!-- TODO: Verificar questão do menu lateral e footer em relação ao fixed, para que o footer seja ocultado automaticamente -->
<template>
  <v-app>
    <!-- TOP BAR (CABEÇALHO) -->
    <v-app-bar :clipped-left="clipped" :color="corCabecalho" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <!-- TODO: CORRIGIR FUNCIONAMENTO DO MINIVARIANT NA VERSÃO 3 DO VUETIFY -->
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>

      <v-app-bar-title id="title-bar" class="text-h5 font-weight-bold">
        {{ tituloCabecalho }}
      </v-app-bar-title>

      <v-spacer />
      <v-btn icon disabled>
        <v-img
          src="/img/logo-ods-na-ufes.png"
          height="40"
          width="40"
          contain
        ></v-img>
      </v-btn>
      <v-icon icon="mdi-home"></v-icon>
    </v-app-bar>

    <!-- MENU -->
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      :color="corMenu"
      app
    >
      <v-list>
        <!-- HOME -->
        <v-list-item to="/" append-icon="mdi-home">
          <v-list-item-title class="font-weight-bold">
            Início
          </v-list-item-title>
        </v-list-item>

        <!-- MAPAS -->
        <v-list-group :value="true" no-action append-icon="mdi-map">
          <template #activator="{ props }">
            <v-list-item v-bind="props">
              <v-list-item-title class="font-weight-bold">
                Mapas
              </v-list-item-title>
            </v-list-item>
          </template>

          <v-list-item
            v-for="(item, i) in itensSubMenuMapas"
            :key="i"
            :to="item.pagina"
            router
            exact
            class="mn-lg-li-action"
          >
            <v-list-item-title class="font-weight-bold">
              {{ item.titulo }}
            </v-list-item-title>
          </v-list-item>
        </v-list-group>

        <!-- RESTANTE DOS ITEMS DO MENU -->
        <v-list-item
          v-for="(item, i) in itensMenu"
          :key="i"
          :to="item.pagina"
          router
          exact
          :append-icon="item.icone"
        >
          <v-list-item-title class="font-weight-bold">
            {{ item.titulo }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- MAIN SECTION -->
    <v-main>
      <v-container>
        <slot />
      </v-container>
    </v-main>

    <!-- FOOTER -->
    <v-footer :color="corRodape" app>
      <v-spacer />
      <span> &copy; {{ new Date().getFullYear() }} - {{ autor }} </span>
      <v-spacer />
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import colorPalleteUfes from 'assets/colors'

export default {
  /* TODO: TROCAR TODAS AS VARIÁVEIS PARA PORTUGUÊS */
  name: 'DefaultLayout',
  data() {
    return {
      clipped: true,
      drawer: false,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      autor: 'Willian Conceição Queiroz',
      corCabecalho: colorPalleteUfes.monocromatic.mono6,
      corRodape: colorPalleteUfes.monocromatic.mono5,
      corMenu: colorPalleteUfes.monocromatic.mono7,
      itensMenu: [
        /* TODO: exibir a lista de submissões para aceite apenas para o usuário logado com esse privilégio,
         * provavelmente deverá ser adicionado em outro leiaute
         */
        {
          icone: 'mdi-message-outline',
          titulo: 'Sugerir Ação',
          pagina: '/sugerir-acao',
        },
        {
          icone: 'mdi-text',
          titulo: 'Sobre',
          pagina: '/sobre',
        },
        {
          icone: 'mdi-test-tube',
          titulo: 'Teste',
          pagina: '/teste',
        },
        {
          icone: 'mdi-test-tube',
          titulo: 'Teste Nested Pages',
          pagina: '/testes/parent',
        },
      ],
      itensSubMenuMapas: [
        {
          icone: 'mdi-map',
          titulo: 'Alegre',
          pagina: '/acoes/alegre',
        },
        {
          icone: 'mdi-map',
          titulo: 'Goiabeiras',
          pagina: '/acoes/goiabeiras',
        },
        {
          icone: 'mdi-map',
          titulo: 'Maruípe',
          pagina: '/acoes/maruipe',
        },
        {
          icone: 'mdi-map',
          titulo: 'São Mateus',
          pagina: '/acoes/sao-mateus',
        },
      ],
      tituloCabecalho: 'Mapa Colaborativo: Sustentabilidade na UFES',
    }
  },
}
</script>
<style scoped>
#title-bar {
  font-family: 'Ufes Sans', sans-serif !important;
  text-shadow: 1px 1px 2px #94aaea; /* colorPalleteUfes.monocromatic.mono8 */
  /*color: black; */ /* TODO: É POSSÍVEL DEFINIR A COR DA FONTE DIRETAMENTE ASSIM */
}
</style>
