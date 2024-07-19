<!-- TODO: FINALIZAR ESTE TEMPLATE-->
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
              parte da comunidade acadêmica da UFES.
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
            label="Informe sua senha da UFES"
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
    async getExecutionValueFromLoginPage() {
      try {
        const response = await fetch('https://acesso.ufes.br/login')
        const headerDate = response.headers.get('date') || 'no response date'

        console.log('Status Code:', response.status)
        console.log('Date in Response header:', headerDate)

        const html = await response.text()
        const matchedItems = html.match(
          /<input type="hidden" name="execution" value="[a-zA-Z0-9-_]+"/,
        )

        if (matchedItems) {
          const input = matchedItems[0] // the first item will be the desired input
          const inputItems = input.split(' ')
          const inputValue = inputItems[inputItems.length - 1] // value will be the last item on split
          const value = inputValue.substring(7, inputValue.length - 3)

          console.log('input', input)
          console.log('value', value)

          this.execution = value
        } else {
          console.log('No matched items found')
        }
      } catch (error) {
        console.log('Error: ', error.message)
      }
    },

    async efetuarLogin() {},

    validarLogin(): void {
      const userStore = useUserStore()
      userStore.isLoggedIn = true
    },
    cancelar(): void {
      navigateTo('/')
    },
  },
}
</script>
