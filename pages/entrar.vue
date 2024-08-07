<template>
  <v-row align="center">
    <v-spacer />
    <v-col>
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
          ></v-text-field>

          <v-text-field
            v-model="password"
            :prepend-icon="exibirSenha ? 'mdi-eye' : 'mdi-eye-off'"
            :type="exibirSenha ? 'text' : 'password'"
            label="Informe sua senha da Ufes"
            @click:prepend="exibirSenha = !exibirSenha"
          ></v-text-field>
        </v-card-text>

        <the-card-divider />

        <v-card-actions>
          <v-spacer />
          <v-btn @click="validarLogin()"> Validar Login </v-btn>
          <v-btn @click="cancelar()"> Cancelar </v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>
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
      exibirSenha: false,
      username: '',
      password: '',
      execution: '',
    }
  },

  methods: {
    async validarLogin() {
      const userStore = useUserStore()
      userStore.isLoggedIn = true
    },

    cancelar(): void {
      navigateTo('/')
    },
  },
}
</script>
