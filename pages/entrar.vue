<template>
  <!-- TEMPLATE DO DIÁLOGO -->
  <v-dialog v-model="isDialogVisible" width="500">
    <v-card>
      <v-card-title>{{ dialog.title }}</v-card-title>
      <the-card-divider />
      <v-card-text class="dialog">
        <v-icon icon="mdi-alert-circle" color="error" size="90"></v-icon>
        <br /><br />
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

      const { $api } = useNuxtApp()
      const userStore = useUserStore()

      try {
        await $api.usuarios.validarMembroAcademico(this.username, this.password)
        userStore.setUserLoggedIn()

        this.$router.go(-1)
      } catch (e) {
        console.debug('ERRO VALIDAÇÃO LOGIN UFES')
        console.debug(e)

        const fetchError = e as FetchError
        console.debug(fetchError.data)

        if (fetchError.data && fetchError.data.mensagem) {
          this.showErrorDialog('Erro!', fetchError.data.mensagem)
        } else if (fetchError.status === 401 || fetchError.status === 403) {
          this.showErrorDialog(
            'Login inválido!',
            'Por favor, verifique suas credenciais e tente novamente!',
          )
        } else {
          this.showErrorDialog(
            'Erro desconhecido!',
            'Por favor, tente novamente mais tarde!',
          )
        }
      }
    },

    cancelar(): void {
      navigateTo('/')
    },

    showErrorDialog(title: string, message: string) {
      this.dialog.title = title
      this.dialog.message = message
      this.isDialogVisible = true
    },
  },
}
</script>
<style scoped>
.dialog {
  text-align: center;
  font-size: 20px !important;
}
</style>
