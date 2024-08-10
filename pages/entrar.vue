<template>
  <v-row align="center">
    <v-spacer />
    <v-col>
      <v-form v-model="isFormValid" @submit.prevent="validarLogin">
        <v-card width="75vh">
          <v-card-title>Realizar login</v-card-title>

          <the-card-divider />

          <v-card-text>
            <v-list>
              <v-list-item>
                Após a confirmação será possível acessar o formulário para
                submissão da ação.
              </v-list-item>
              <v-list-item>
                Esta informação será utilizada apenas para garantir que você faz
                parte da comunidade acadêmica da Ufes.
              </v-list-item>
              <v-list-item>
                Os dados informados abaixo não serão armazenados.
              </v-list-item>
            </v-list>

            <v-text-field
              v-model="username"
              label="Informe seu CPF"
              prepend-icon="mdi-badge-account"
              :rules="[obrigatorioValidator, cpfValidator]"
            ></v-text-field>

            <v-text-field
              v-model="password"
              label="Informe sua senha da Ufes"
              :prepend-icon="exibirSenha ? 'mdi-eye' : 'mdi-eye-off'"
              :type="exibirSenha ? 'text' : 'password'"
              @click:prepend="exibirSenha = !exibirSenha"
              :rules="[obrigatorioValidator]"
            ></v-text-field>
          </v-card-text>

          <the-card-divider />

          <v-card-actions>
            <v-spacer />
            <v-btn type="submit"> Validar Login </v-btn>
            <v-btn @click="cancelar()"> Cancelar </v-btn>
            <v-spacer />
          </v-card-actions>
        </v-card>
      </v-form>
    </v-col>
    <v-spacer />
  </v-row>
</template>

<script lang="ts">
import TheCardDivider from '~/components/UI/TheCardDivider.vue'

export default {
  name: 'PaginaLogin',

  components: { TheCardDivider },

  data() {
    return {
      isFormValid: false,
      exibirSenha: false,
      username: '',
      password: '',
      execution: '',
    }
  },

  methods: {
    async validarLogin() {
      if (!this.isFormValid) return

      const userStore = useUserStore()
      userStore.isLoggedIn = true

      this.$router.go(-1)
    },

    cancelar(): void {
      navigateTo('/')
    },
  },
}
</script>
