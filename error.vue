<template>
  <div>
    <v-app>
      <v-row id="card-row">
        <v-col id="card-col">
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
                Ocorreu um erro inesperado, por favor retorne a página inicial.
              </p>
            </v-card-text>

            <v-card-actions>
              <v-spacer />
              <a href="/">
                <v-btn color="primary" small text>
                  <v-icon small>mdi-home</v-icon> Página Inicial
                </v-btn>
              </a>
              <v-spacer />
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-app>
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
#card-row {
  align-items: center;
}
#card-col {
  display: flex;
  justify-content: center;
}
</style>
