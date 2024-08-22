<template>
  <v-dialog v-model="isDialogVisible" width="500">
    <v-card>
      <v-card-title>{{ dialog.title }}</v-card-title>
      <the-card-divider />
      <v-card-text>
        {{ dialog.message }}
      </v-card-text>

      <the-card-divider />

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="isDialogVisible = false">OK</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
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
import type { FetchError } from 'ofetch'
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
      isDialogVisible: false,
      dialog: {
        title: '',
        message: '',
      },
    }
  },

  methods: {
    async validarLogin() {
      if (!this.isFormValid) return

      const apiUrl = useRuntimeConfig().public.apiBaseUrl
      const userStore = useUserStore()

      try {
        await $fetch(`${apiUrl}usuarios/validar-login`, {
          method: 'post',
          body: { username: this.username, password: this.password },
        })

        userStore.setUserLoggedIn()
        this.$router.go(-1)
      } catch (e) {
        const fetchError = e as FetchError
        if (
          fetchError.status === 400 ||
          fetchError.status === 401 ||
          fetchError.status === 403
        ) {
          this.showDialog(
            'Login inválido!',
            'Por favor, verifique suas credenciais e tente novamente!',
          )
        } else {
          this.showDialog(
            'Erro desconhecido!',
            'Por favor, tente novamente mais tarde!',
          )
        }
      }
    },

    cancelar(): void {
      navigateTo('/')
    },

    showDialog(title: string, message: string) {
      this.dialog.title = title
      this.dialog.message = message
      this.isDialogVisible = true
    },
  },
}
</script>
