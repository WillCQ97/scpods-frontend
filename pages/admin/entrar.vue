<template>
  <!-- TEMPLATE DO DIÁLOGO -->
  <v-dialog v-model="isDialogVisible" width="500" height="100">
    <!-- error, success, warning, info-->
    <v-alert
      closable
      :title="dialog.title"
      :text="dialog.message"
      type="info"
      v-on:click:close="isDialogVisible = false"
    ></v-alert>
  </v-dialog>
  <v-row align="center">
    <v-spacer />
    <v-col>
      <v-form v-model="isFormValid" @submit.prevent="entrar">
        <v-card width="75vh">
          <v-card-title>Login do administrador</v-card-title>

          <the-card-divider />

          <v-card-text>
            <v-text-field
              v-model="username"
              label="Informe seu nome de usuário"
              prepend-icon="mdi-shield-account"
              :rules="[obrigatorioValidator]"
            ></v-text-field>

            <v-text-field
              v-model="password"
              label="Informe sua senha"
              :type="exibirSenha ? 'text' : 'password'"
              :prepend-icon="exibirSenha ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[obrigatorioValidator]"
              @click:prepend="exibirSenha = !exibirSenha"
            ></v-text-field>
          </v-card-text>

          <the-card-divider />

          <v-card-actions>
            <v-spacer />
            <v-btn type="submit"> Entrar </v-btn>
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
  name: 'PaginaLoginAdministrador',

  components: { TheCardDivider },

  data() {
    return {
      isFormValid: false,
      exibirSenha: false,
      username: '',
      password: '',
      isDialogVisible: false,
      dialog: {
        title: '',
        message: '',
      },
    }
  },

  methods: {
    async entrar(): Promise<void> {
      if (!this.isFormValid) return

      const { $api } = useNuxtApp()
      const userStore = useUserStore()

      try {
        await $api.usuarios.validarAdmin(this.username, this.password)
        userStore.setLoginAdminCredentials(this.username, this.password)

        navigateTo('/admin/avaliar-submissoes')
      } catch (e) {
        console.debug('ERRO LOGIN ADMIN')
        console.debug(e)

        const fetchError = e as FetchError

        if (fetchError.data && fetchError.data.message) {
          this.showErrorDialog('Erro', fetchError.data.message)
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
    limparCampos() {
      this.password = ''
      this.username = ''
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
