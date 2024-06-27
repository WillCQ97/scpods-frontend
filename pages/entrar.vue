<!-- TODO: FINALIZAR ESTE TEMPLATE-->
<template>
  <v-row>
    <v-spacer />
    <v-col>
      <v-card width="95vh">
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
              parte da comunidade acadêmica da UFES.
            </v-list-item>
            <v-list-item>
              Os dados informados abaixo não serão armazenados.
            </v-list-item>
          </v-list>
          <v-text-field label="Informe seu CPF"></v-text-field>
          <v-text-field label="Informe sua senha da UFES"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="validarLogin()"> Validar Login </v-btn>
          <v-btn @click="cancelar()"> Cancelar </v-btn>
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

  methods: {
    validarLogin(): void {
      const userStore = useUserStore()
      userStore.login('cpf', 'senha')

      if (userStore.isLoggedIn) {
        navigateTo('/')
      } else {
        // todo: apresentar erro
      }
    },
    cancelar(): void {
      navigateTo('/')
    },
  },
}
</script>
