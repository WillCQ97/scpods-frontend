<template>
  <div>
    <nuxt-layout name="default">
      <v-app>
        <v-row>
          <v-spacer />
          <v-col>
            <v-card width="80vh">
              <v-card-title v-if="error.statusCode === 404">
                {{ pageNotFound }}
              </v-card-title>
              <v-card-title v-else>
                {{ otherError }} Erro {{ error.statusCode }}
              </v-card-title>

              <hr />
              <v-card-text v-if="error.statusCode === 404">
                <p>
                  Lamentamos, mas a página que você está tentando acessar não
                  existe!
                </p>
              </v-card-text>
              <v-card-text v-else>
                <p>
                  Ocorreu um erro inesperado, por favor retorne a página
                  inicial.
                </p>
              </v-card-text>

              <v-card-actions>
                <v-spacer />
                <!--TODO: trocar para um link normal, pois caso o javascript quebre, possa ser recarregado a partir da página inicial -->
                <nuxt-link to="/">
                  <v-btn color="primary" small text>
                    <v-icon small>mdi-home</v-icon> Página Inicial
                  </v-btn>
                </nuxt-link>
                <v-spacer />
              </v-card-actions>
            </v-card>
          </v-col>
          <v-spacer />
        </v-row>
      </v-app>
    </nuxt-layout>
  </div>
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
      pageNotFound: 'Erro 404: Conteúdo não encontrado',
      otherError: 'Ocorreu um problema!',
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
