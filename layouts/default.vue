<template>
  <v-app>
    <!-- TOP BAR -->
    <v-app-bar :clipped-left="clipped" :color="headerColor" fixed>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <!-- TITTLE -->
      <v-app-bar-title id="title-bar" class="text-h5 font-weight-bold">
        {{ headerTitle }}
      </v-app-bar-title>

      <!-- LOGIN/LOGOUT BUTTONS -->
      <!-- USER -->
      <v-btn
        :prepend-icon="!isUserLoggedIn() ? 'mdi-login' : 'mdi-logout'"
        @click.stop="!isUserLoggedIn() ? navigateTo('/entrar') : logoff()"
      >
        {{ !isUserLoggedIn() ? 'Entrar' : 'Sair' }}
      </v-btn>

      <!-- ADMIN -->
      <v-btn
        prepend-icon="mdi-shield-account"
        @click.stop="!isUserAdmin() ? navigateTo('/admin/entrar') : logoff()"
      >
        Admin
      </v-btn>

      <!-- ODS ICON-->
      <v-btn id="btn-icon-ods" icon disabled>
        <v-img
          src="/img/logo-ods-na-ufes.png"
          height="40"
          width="40"
          contain
        ></v-img>
      </v-btn>
    </v-app-bar>

    <!-- MENU -->
    <v-navigation-drawer v-model="drawer" :color="menuColor">
      <v-list>
        <!-- HOME -->
        <v-list-item to="/" prepend-icon="mdi-home">
          <v-list-item-title class="font-weight-bold">
            Início
          </v-list-item-title>
        </v-list-item>

        <!-- MAPAS -->
        <v-list-group :value="true" no-action prepend-icon="mdi-map">
          <template #activator="{ props }">
            <v-list-item v-bind="props">
              <v-list-item-title class="font-weight-bold">
                Mapas
              </v-list-item-title>
            </v-list-item>
          </template>

          <!-- SUBMENU DOS CAMPUS -->
          <v-list-item
            to="/acoes/alegre"
            prepend-icon="mdi-alpha-a"
            router
            exact
          >
            <v-list-item-title class="font-weight-bold">
              Alegre
            </v-list-item-title>
          </v-list-item>

          <v-list-item
            to="/acoes/goiabeiras"
            prepend-icon="mdi-alpha-g"
            router
            exact
          >
            <v-list-item-title class="font-weight-bold">
              Goiabeiras
            </v-list-item-title>
          </v-list-item>

          <v-list-item
            to="/acoes/maruipe"
            prepend-icon="mdi-alpha-m"
            router
            exact
          >
            <v-list-item-title class="font-weight-bold">
              Maruípe
            </v-list-item-title>
          </v-list-item>

          <v-list-item
            to="/acoes/sao-mateus"
            prepend-icon="mdi-alpha-s"
            router
            exact
          >
            <v-list-item-title class="font-weight-bold">
              São Mateus
            </v-list-item-title>
          </v-list-item>
        </v-list-group>

        <!-- SUGERIR AÇÃO -->
        <v-list-item
          to="/sugerir-acao"
          prepend-icon="mdi-message-outline"
          router
          exact
        >
          <v-list-item-title class="font-weight-bold">
            Sugerir Ação
          </v-list-item-title>
        </v-list-item>

        <v-list-item
          v-if="isUserAdmin()"
          to="/admin/avaliar-submissoes"
          prepend-icon="mdi-order-bool-ascending-variant"
          router
          exact
        >
          <v-list-item-title class="font-weight-bold">
            Avaliar Submissões
          </v-list-item-title>
        </v-list-item>

        <!-- SOBRE -->
        <v-list-item to="/sobre" prepend-icon="mdi-text" router exact>
          <v-list-item-title class="font-weight-bold">
            Sobre
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
    <v-footer :color="footerColor">
      <v-spacer />
      <span> &copy; {{ new Date().getFullYear() }} - {{ author }} </span>
      <v-spacer />
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
import colorPalleteUfes from 'assets/colors'

const author = ref('Willian Conceição Queiroz')
const headerColor = ref(colorPalleteUfes.monocromatic.mono6)
const footerColor = ref(colorPalleteUfes.monocromatic.mono5)
const menuColor = ref(colorPalleteUfes.monocromatic.mono7)
const headerTitle = ref('Mapa Colaborativo: Sustentabilidade na UFES')

const clipped = ref(true)
const drawer = ref(false)

const userStore = useUserStore()

function isUserLoggedIn(): boolean {
  return userStore.isUserLoggedIn || userStore.admin.isLoggedIn
}
function isUserAdmin(): boolean {
  return userStore.admin.isLoggedIn
}
function logoff(): void {
  userStore.logout()
  navigateTo('/')
}
</script>

<style scoped>
#btn-icon-ods {
  opacity: 1;
}
#title-bar {
  /* colorPalleteUfes.monocromatic.mono8 */
  text-shadow: 1px 1px 2px #94aaea;
}
</style>
