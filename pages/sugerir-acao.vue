<template>
  <div>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>Passos para enviar uma sugestão de ação</v-card-title>
          <the-card-divider />
          <v-card-text>
            <ol>
              <li>
                <strong>Ser membro da comunidade acadêmica:</strong> Se você
                deseja sugerir uma ação, é necessário que possua algum vínculo
                com a Ufes.
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
            <v-btn
              :color="corBotao"
              variant="elevated"
              @click="acessarFormulario"
            >
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
    <v-dialog v-model="exibirDialogo" width="75vh">
      <v-card>
        <v-card-title> Validação Necessária </v-card-title>
        <the-card-divider />
        <v-card-text>
          <p>
            Apenas membros da comunidade acadêmica podem realizar a submissão de
            projetos.
          </p>
        </v-card-text>

        <the-card-divider />

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            variant="elevated"
            :color="corBotao"
            @click="navigateTo('/entrar')"
          >
            Ir para página de login
          </v-btn>
          <v-btn
            variant="elevated"
            :color="corBotao"
            @click="exibirDialogo = false"
          >
            Fechar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import colorPalleteUfes from '~/assets/colors'
import TheCardDivider from '~/components/UI/TheCardDivider.vue'

export default {
  name: 'PaginaSugerirNovaAcaoWraper',
  components: { TheCardDivider },

  data() {
    return {
      corBotao: colorPalleteUfes.monocromatic.secondary,
      exibirDialogo: false,
    }
  },

  methods: {
    acessarFormulario() {
      const userStore = useUserStore()

      if (!userStore.isLoggedIn) {
        this.exibirDialogo = true
        return
      }
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
