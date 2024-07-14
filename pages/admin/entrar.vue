<template>
  <v-row align="center">
    <v-spacer />
    <v-col>
      <v-card width="75vh">
        <v-card-title>Login do administrador</v-card-title>

        <the-card-divider />

        <v-card-text>
          <v-text-field
            v-model="username"
            label="Informe seu nome de usuário"
            prepend-icon="mdi-shield-account"
            :rules="[regras.obrigatorio]"
          ></v-text-field>

          <v-text-field
            v-model="password"
            label="Informe sua senha"
            :type="exibirSenha ? 'text' : 'password'"
            :prepend-icon="exibirSenha ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[regras.obrigatorio]"
            @click:prepend="exibirSenha = !exibirSenha"
          ></v-text-field>
        </v-card-text>

        <the-card-divider />

        <v-card-actions>
          <v-spacer />
          <v-btn @click="entrar()"> Entrar </v-btn>
          <v-btn @click="cancelar()"> Cancelar </v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>

      <!-- TEMPLATE DO DIÁLOGO DE ERRO -->
      <v-dialog v-model="dialogError" width="500">
        <v-card>
          <v-card-title>{{ error.title }}</v-card-title>
          <the-card-divider />
          <v-card-text>
            {{ error.message }}
          </v-card-text>

          <the-card-divider />

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="dialogError = false">OK</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
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
      exibirSenha: false,
      username: '',
      password: '',
      dialogError: false,
      error: {
        title: '',
        message: '',
      },
      regras: {
        obrigatorio: (value: any) => !!value || 'Este campo é obrigatório.',
      },
    }
  },

  methods: {
    async entrar(): Promise<void> {
      if (this.username.trim() === '' || this.password.trim() === '') {
        this.error.title = 'Há campos não informados!'
        this.error.message = 'Por favor, verifique-os e tente novamente!'
        this.dialogError = true
        return
      }

      const authHeader = `Basic ${encodeBasicAuth(this.username, this.password)}`
      const header = new Headers({
        Authorization: authHeader,
      })

      const apiUrl = useRuntimeConfig().public.apiBase
      const userStore = useUserStore()

      try {
        await $fetch(`${apiUrl}/usuarios/validar-admin`, {
          headers: header,
        })

        userStore.loginAdmin(this.username, this.password)
        navigateTo('/admin/avaliar-submissoes')
      } catch (e) {
        const fetchError = e as FetchError
        if (fetchError.status === 401 || fetchError.status === 403) {
          this.error.title = 'Login inválido!'
          this.error.message =
            'Por favor, verifique suas credenciais e tente novamente!'
        } else {
          this.error.title = 'Erro desconhecido!'
          this.error.message = 'Por favor, tente novamente mais tarde!'
        }
        this.dialogError = true
      }
    },
    cancelar(): void {
      navigateTo('/')
    },
    limparCampos() {
      this.password = ''
      this.username = ''
    },
  },
}
</script>
