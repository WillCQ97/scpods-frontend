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
            <v-btn :color="btnColor" variant="tonal" @click="onLoadForm">
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

    <!-- DIÁLOGO DE LOGIN -->
    <v-dialog v-model="showDialog" width="125vh">
      <v-card>
        <v-card-title> Validação Necessária </v-card-title>
        <hr />
        <v-card-text>
          <p>
            Apenas membros da comunidade acadêmica podem realizar a submissão de
            projetos.
          </p>
          <p>Por favor, utilize o botão de entrar no menu superior.</p>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="showDialog = false"> OK </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import colorPalleteUfes from '~/assets/colors'

const user = useUser()

export default {
  name: 'PaginaWraperSugerirNovaAcao',
  data() {
    return { btnColor: colorPalleteUfes.monocromatic.mono5, showDialog: false }
  },
  methods: {
    onLoadForm() {
      if (user.isLoggedIn) {
        return navigateTo('/sugerir-acao/formulario')
      } else {
        this.showDialog = true
      }
    },
  },
}
</script>

<style scoped>
ol {
  padding-left: 25px;
}
</style>
