<template>
  <v-app>
    <v-row align="center">
      <v-col id="card-col">
        <v-card align="start" width="80vh">
          <v-card-title v-if="error.statusCode === 404">
            {{ pageNotFound }}
          </v-card-title>
          <v-card-title v-else>
            {{ otherError }}
          </v-card-title>

          <the-card-divider />
          <v-card-text v-if="error.statusCode === 404">
            <p>
              Lamentamos, mas a página que você está tentando acessar não
              existe!
            </p>
          </v-card-text>
          <v-card-text v-else>
            <p>Ocorreu um erro inesperado de código {{ error.statusCode }}.</p>
            <p>Por favor retorne a página inicial.</p>
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
</template>

<script lang="ts">
import TheCardDivider from './components/UI/TheCardDivider.vue'

export default {
  name: 'PaginaErro',
  components: { TheCardDivider },

  props: {
    error: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
      pageNotFound: 'Erro 404: Conteúdo não encontrado',
      otherError: 'Ops... Algo de errado não está certo!',
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
#card-col {
  display: flex;
  justify-content: center;
}
</style>
