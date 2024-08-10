<template>
  <!-- TEMPLATE DO DIÁLOGO -->
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
      <v-form v-model="isFormValid" @submit="entrar()">
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
import { encodeBasicAuth } from '@/utils/encodeAuth'
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

      const authHeader = `Basic ${encodeBasicAuth(this.username, this.password)}`
      const header = new Headers({
        Authorization: authHeader,
      })

      const apiUrl = useRuntimeConfig().public.apiBase
      const userStore = useUserStore()

      try {
        await $fetch(`${apiUrl}usuarios/validar-admin`, {
          headers: header,
        })

        userStore.loginAdmin(this.username, this.password)
        navigateTo('/admin/avaliar-submissoes')
      } catch (e) {
        const fetchError = e as FetchError
        if (fetchError.status === 401 || fetchError.status === 403) {
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
    limparCampos() {
      this.password = ''
      this.username = ''
    },
    showDialog(title: string, message: string) {
      this.dialog.title = title
      this.dialog.message = message
      this.isDialogVisible = true
    },
  },
}
</script>
