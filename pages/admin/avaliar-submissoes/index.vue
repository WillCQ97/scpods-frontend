<template>
  <!-- DIÁLOGO DE SUCESSO -->
  <v-dialog v-model="showSuccess" width="50vh">
    <v-card>
      <v-card-title>SUCESSO</v-card-title>
      <v-card-text>
        A submissão foi {{ aceito ? 'aceita' : 'recusada' }}!
      </v-card-text>
      <v-card-actions>
        <v-btn @click="showSuccess = false">Fechar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- DIÁLOGO DE ERRO -->
  <v-dialog v-model="showError" width="50vh">
    <v-card>
      <v-card-title>ERRO</v-card-title>
      <v-card-text> A ação não pode ser concluída! </v-card-text>
      <v-card-actions>
        <v-btn @click="showError = false">Fechar</v-btn>
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

<script setup lang="ts">
/*
 * Como neste arquivo está sendo usado a Composition API, os valores devem
 * ser acessados com variavel.value no script setup
 */
import ActionsListComponent from '~/components/Actions/ActionsList.vue'
import TheCardDivider from '~/components/UI/TheCardDivider.vue'

const acaoStore = useAcaoStore()
var submissoes = await acaoStore.fetchSubmissoes()

const showError = ref(false)
const showSuccess = ref(false)

var aceito = ref(false)

definePageMeta({
  middleware: 'auth',
})

async function refreshList() {
  submissoes = await acaoStore.fetchSubmissoes()
}

async function acceptHandler({ accepted, id }) {
  console.log('EXECUTANDO HANDLER DE ACEITE E REJEITE')

  try {
    aceito = accepted

    if (accepted) {
      await acaoStore.acceptSubmissao(id)
    } else {
      await acaoStore.rejectSubmissao(id)
    }
    showSuccess.value = true
  } catch (error) {
    showError.value = true
    console.log('ERRO: ', error)
  }

  await refreshList()
}
</script>
