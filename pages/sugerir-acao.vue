<template>
  <div>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>Passos para sugerir uma ação</v-card-title>
          <the-card-divider />
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
                <strong>Submeter o formulário preenchido:</strong> Sua submissão
                será avaliada, para posterior adição ao mapa.
              </li>
            </ol>
          </v-card-text>

          <v-card-actions>
            <v-spacer />
            <v-btn :color="btnColor" variant="elevated" @click="showForm">
              Acessar Formulário
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
    <v-dialog v-model="showDialog" width="75vh">
      <v-card>
        <v-card-title> Validação Necessária </v-card-title>
        <the-card-divider />
        <v-card-text>
          <p>
            Apenas membros da comunidade acadêmica podem realizar a submissão de
            projetos.
          </p>
          <p>Por favor, utilize o botão de entrar no menu superior.</p>
        </v-card-text>

        <the-card-divider />

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            variant="elevated"
            :color="btnColor"
            @click="showDialog = false"
          >
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import colorPalleteUfes from '~/assets/colors'
import TheCardDivider from '~/components/UI/TheCardDivider.vue'

// FIXME: isso resulta em erro relacionado ao carregamento do pinia se a página for acessada primeiramente
// USO DO COMPOSITION API RESOLVE?!
// USO DO PLUGIN, CRIANDO A STORE GLOBALMENTE RESOLVE?!
// WORKAROUND: criar um middleware onde se o to e from são iguais e não são /, redireciona para a home?!
const userStore = useUserStore()

export default {
  name: 'PaginaSugerirNovaAcaoWraper',
  components: { TheCardDivider },
  data() {
    return {
      btnColor: colorPalleteUfes.monocromatic.secondary,
      showDialog: false,
    }
  },
  methods: {
    showForm() {
      if (!userStore.isLoggedIn) {
        this.showDialog = true
      }
      // todo: the middleware auth should prevent this page to load the form
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
