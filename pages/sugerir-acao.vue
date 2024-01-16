<template>
  <div>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>Passos para sugerir uma ação</v-card-title>
          <hr />
          <v-card-text>
            <ol>
              <li>
                <strong>Ser membro da comunidade acadêmica:</strong> Se você
                deseja sugerir uma ação, é necessário que possua algum vínculo
                com a UFES.
              </li>
              <li>
                <strong>Logar com e-mail institucional:</strong> Após realizar a
                autenticação com o seu e-mail institucional, o formulário de
                sugestão será disponibilizado para preenchimento.
              </li>
              <li>
                <strong>Submeter o formulário preenchido:</strong> Sua
                requisição será apreciada, para posterior publicação no mapa.
              </li>
            </ol>
          </v-card-text>
          <hr />
          <v-card-actions>
            <v-spacer />
            <!-- TODO: em vez de um botão será realizada a validação via sso -->
            <v-btn :color="btnColor" @click="onLoadForm">
              Exibir Formulário
            </v-btn>
            <v-spacer />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <nuxt-page />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
export default {
  name: 'PaginaWraperSugerirNovaAcao',
  data() {
    return { btnColor: '#d2dce8' }
  },
  methods: {
    onLoadForm() {
      return navigateTo('/sugerir-acao/formulario')
    },
  },
}
</script>

<style scoped>
ol {
  padding-left: 25px;
}
</style>
