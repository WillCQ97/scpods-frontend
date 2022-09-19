<template>
  <v-app dark>
    <v-row>
      <v-spacer />
      <v-col>
        <v-card width="80vh">
          <v-card-title v-if="error.statusCode === 404">
            {{ pageNotFound }}
          </v-card-title>
          <v-card-title v-else>
            {{ otherError }}
          </v-card-title>

          <hr />
          <v-card-text v-if="error.statusCode === 404">
            <p>A página que você está tentando acessar não existe.</p>
          </v-card-text>

          <v-card-actions>
            <v-spacer />
            <!-- TODO: FIX quando clicar no botão, sem ser clicar no link ir para a página em questão -->
            <v-btn>
              <nuxt-link to="/"> Página Inicial </nuxt-link>
            </v-btn>
            <v-spacer />
          </v-card-actions>
        </v-card>
      </v-col>
      <v-spacer />
    </v-row>
  </v-app>
</template>

<script>
export default {
  name: 'EmptyLayout',
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: '404 Conteúdo Não Encontrado',
      otherError: 'Ocorreu um problema.',
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
