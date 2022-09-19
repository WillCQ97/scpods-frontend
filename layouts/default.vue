<!-- TODO: Verificar questão do menu lateral e footer em relação ao fixed, para que o footer seja ocultado automaticamente -->
<template>
  <v-app>
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
        <v-list-item to="/">
          <v-list-item-action class="mn-li-action">
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              <strong>Início</strong>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!-- MAPAS -->
        <v-list-group :value="false" no-action>
          <template #activator>
            <v-list-item-action class="mn-li-action">
              <v-icon>mdi-map</v-icon>
            </v-list-item-action>
            <v-list-item-title>
              <strong>Mapas</strong>
            </v-list-item-title>
          </template>

          <v-list-item
            v-for="(item, i) in itemsActions"
            :key="i"
            :to="item.to"
            router
            exact
            class="mn-lg-li-action"
          >
            <v-list-item-action class="mn-li-action">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                <strong>{{ item.title }}</strong>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>

        <!-- RESTANTE DOS ITEMS DO MENU -->
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action class="mn-li-action">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              <strong>{{ item.title }}</strong>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- TOP BAR -->
    <v-app-bar :clipped-left="clipped" :color="colorBar" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>

      <v-spacer />
      <v-toolbar-title id="title-bar" class="text-h5">
        <strong>{{ title }}</strong>
      </v-toolbar-title>
      <v-spacer />

      <v-btn icon left disabled>
        <v-img
          :src="iconSrc"
          :height="iconHeight"
          :width="iconWidth"
          contain
        ></v-img>
      </v-btn>
    </v-app-bar>

    <!-- MAIN SECTION -->
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

    <!-- FOOTER -->
    <v-footer :color="colorFooter" app dark>
      <v-spacer />
      <span> &copy; {{ new Date().getFullYear() }} - {{ author }} </span>
      <v-spacer />
    </v-footer>
  </v-app>
</template>

<script>
import ufesTheme from 'assets/themes'

export default {
  name: 'DefaultLayout',
  data() {
    return {
      author: 'Willian',
      clipped: true,
      drawer: false,
      fixed: false,
      colorBar: ufesTheme.default.mono6,
      colorFooter: ufesTheme.default.mono5,
      colorMenu: ufesTheme.default.mono7,
      iconSrc: '/logos/ods-na-ufes.png',
      iconHeight: 40,
      iconWidth: 40,
      items: [
        // TODO: exibir a submissão apenas para o usuário logado com esse privilégio, provavelmente deverá ser adicionado em outro leiaute
        {
          icon: 'mdi-format-list-bulleted-type',
          title: 'Submissões',
          to: '/submissions',
        },
        {
          icon: 'mdi-text',
          title: 'Sobre',
          to: '/about',
        },
      ],
      itemsActions: [
        {
          icon: 'mdi-map',
          title: 'Alegre',
          to: '/actions/alegre',
        },
        {
          icon: 'mdi-map',
          title: 'Goiabeiras',
          to: '/actions/goiabeiras',
        },
        {
          icon: 'mdi-map',
          title: 'São Mateus',
          to: '/actions/sao-mateus',
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
  text-shadow: 2px 2px 3px #94aaea;
}
.mn-li-action {
  margin-right: 12px !important;
}
.mn-lg-li-action {
  padding-left: 52px !important;
}
</style>
