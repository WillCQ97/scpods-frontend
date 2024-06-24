<template>
  <!-- DIÁLOGO DE SUCESSO -->
  <v-dialog v-model="showSuccess" width="50vh">
    <v-card>
      <v-card-title>SUCESSO</v-card-title>
      <v-card-text>
        A submissão foi {{ accepted ? 'aceita' : 'recusada' }}!
      </v-card-text>
      <v-card-actions>
        <v-btn @click="showSuccess = false">Fechar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- DIÁLOGO DE ERRO -->
  <v-dialog v-model="showErrorDialog" width="50vh">
    <v-card>
      <v-card-title>ERRO</v-card-title>
      <v-card-text> A ação não pode ser concluída! </v-card-text>
      <v-card-actions>
        <v-btn @click="showErrorDialog = false">Fechar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- TEMPLATE DA PÁGINA -->
  <v-row>
    <v-col>
      <v-row>
        <v-col>
          <v-card>
            <v-card-title>Avaliação das submissões enviadas</v-card-title>
            <the-card-divider />
            <v-card-text>
              <v-list density="compact" variant="flat">
                <v-list-item>
                  Ao visualizar os detalhes de cada submissão, estarão
                  disponíveis as opções "ACEITAR" ou "RECUSAR".
                </v-list-item>
                <v-list-item>
                  Se uma submissão for recusada, a mesma será apagada, não sendo
                  possível sua recuperação.
                </v-list-item>
                <v-list-item>
                  Caso não queira realizar nenhuma ação, basta clicar em
                  "FECHAR".
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <actions-list-component
            :actions="submissoes"
            :is-submission="true"
            @accept="acceptHandler"
          />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import ActionsListComponent from '~/components/Actions/ActionsList.vue'
import TheCardDivider from '~/components/UI/TheCardDivider.vue'

const { $api } = useNuxtApp()
var submissoes = await $api.acoes.getSubmissoes()

definePageMeta({
  middleware: 'auth',
})
export default {
  components: { ActionsListComponent, TheCardDivider },

  data: () => ({
    accepted: false,
    showErrorDialog: false,
    showSuccess: false,
    submissoes,
  }),

  methods: {
    async acceptHandler({ accepted, id }): Promise<void> {
      console.log('EXECUTANDO HANDLER DE ACEITE E REJEITE')

      try {
        this.accepted = accepted

        if (accepted) {
          await this.$api.acoes.aceitarSubmissao(id)
        } else {
          await this.$api.acoes.rejeitarSubmissao(id)
        }
        this.showSuccess = true
      } catch (error) {
        this.showErrorDialog = true
        console.log('ERRO: ', error)
      }

      await this.refreshList()
      console.log('REFRESH: ', submissoes)
    },

    async refreshList(): Promise<void> {
      submissoes = await $api.acoes.getSubmissoes()
    },
  },
}
</script>
