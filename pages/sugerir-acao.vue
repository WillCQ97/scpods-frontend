<template>
  <div>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>Sugestão de projetos</v-card-title>
          <hr />
          <v-card-text>
            <p>
              Se você deseja sugerir uma ação, é necessário que seja membro da
              comunidade acadêmica da UFES.
            </p>
            <p>
              Após realizar a autenticação com o seu e-mail institucional, o
              formulário de sugestão será disponibilizado para preenchimento.
            </p>
            <p>
              Sua requisição será apreciada, para posterior publicação no mapa.
            </p>
          </v-card-text>
          <hr />
          <v-card-actions>
            <v-spacer />
            <!-- TODO: em vez de um botão será realizada a validação via sso -->
            <v-btn :color="btnColor" @click="onLoadForm"
              >Exibir Formulário</v-btn
            >
            <v-spacer />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <nuxt-child />
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'SugerirAcaoWrapperPage',
  data() {
    return { btnColor: '#d2dce8' }
  },
  methods: {
    onLoadForm() {
      this.$router.push('/sugerir-acao/form')
    },
  },
}
</script>


<style>
</style>
