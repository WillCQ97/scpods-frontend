<!-- TODO: Verificar questão do menu lateral e footer em relação ao fixed, para que o footer seja ocultado automaticamente -->
<template>
  <v-app>
    <!-- TOP BAR -->
    <v-app-bar :clipped-left="clipped" :color="colorBar" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <!-- TODO: CORRIGIR FUNCIONAMENTO DO MINIVARIANT NA VERSÃO 3 DO VUETIFY -->
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>

      <v-app-bar-title id="title-bar" class="text-h5 font-weight-bold">
        {{ title }}
      </v-app-bar-title>

      <v-spacer />
      <!-- FIX: o disabled esmaece a imagem -->
      <v-btn icon left disabled>
        <v-img
          src="/img/logo-ods-na-ufes.png"
          :height="iconHeight"
          :width="iconWidth"
          contain
        ></v-img>
      </v-btn>
    </v-app-bar>

    <!-- MENU -->
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      :color="colorMenu"
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
            v-for="(item, i) in mapItems"
            :key="i"
            :to="item.to"
            router
            exact
            class="mn-lg-li-action"
          >
            <v-list-item-title class="font-weight-bold">
              {{ item.title }}
            </v-list-item-title>
          </v-list-item>
        </v-list-group>

        <!-- RESTANTE DOS ITEMS DO MENU -->
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
          :append-icon="item.icon"
        >
          <v-list-item-title class="font-weight-bold">
            {{ item.title }}
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
    <v-footer :color="colorFooter" app>
      <v-spacer />
      <span> &copy; {{ new Date().getFullYear() }} - {{ author }} </span>
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
      author: 'Willian Conceição Queiroz',
      clipped: true,
      drawer: false,
      fixed: false,
      colorBar: colorPalleteUfes.monocromatic.mono6,
      colorFooter: colorPalleteUfes.monocromatic.mono5,
      colorMenu: colorPalleteUfes.monocromatic.mono7,
      iconHeight: 40,
      iconWidth: 40,
      items: [
        /* TODO: exibir a lista de submissões para aceite apenas para o usuário logado com esse privilégio,
         * provavelmente deverá ser adicionado em outro leiaute
         */
        {
          icon: 'mdi-message-outline',
          title: 'Sugerir Ação',
          to: '/sugerir-acao',
        },
        {
          icon: 'mdi-text',
          title: 'Sobre',
          to: '/sobre',
        },
        {
          icon: 'mdi-test-tube',
          title: 'Teste',
          to: '/teste',
        },
        {
          icon: 'mdi-test-tube',
          title: 'Teste Nested Pages',
          to: '/testes/parent',
        },
      ],
      mapItems: [
        {
          icon: 'mdi-map',
          title: 'Alegre',
          to: '/acoes/alegre',
        },
        {
          icon: 'mdi-map',
          title: 'Goiabeiras',
          to: '/acoes/goiabeiras',
        },
        {
          icon: 'mdi-map',
          title: 'Maruípe',
          to: '/acoes/maruipe',
        },
        {
          icon: 'mdi-map',
          title: 'São Mateus',
          to: '/acoes/sao-mateus',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Mapa Colaborativo: Sustentabilidade na UFES',
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
