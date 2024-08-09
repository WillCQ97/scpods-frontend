<template>
  <!-- TEMPLATE DO DIÁLOGO -->
  <v-dialog v-model="isDialogVisible" width="500">
    <v-card>
      <v-card-title>{{ dialog.title }}</v-card-title>
      <the-card-divider />
      <v-card-text class="dialog">
        <v-icon
          :icon="dialog.isError ? 'mdi-alert-circle' : 'mdi-check-circle'"
          :color="dialog.isError ? 'error' : 'success'"
          size="90"
        ></v-icon>
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

  <!-- TEMPLATE DA PÁGINA -->
  <v-row>
    <v-col>
      <v-row>
        <v-col>
          <v-card>
            <v-card-title>Filtro</v-card-title>
          </v-card>
        </v-col>
      </v-row>
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
          <actions-list
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
import ActionsList from '~/components/Actions/ActionsList.vue'
import TheCardDivider from '~/components/UI/TheCardDivider.vue'

const { $api } = useNuxtApp()
var submissoes = await $api.submissoes.search({})

const accepted = ref(false)

const isDialogVisible = ref(false)
const dialog = ref({ title: '', message: '', isError: false })

definePageMeta({
  middleware: 'auth',
})

interface AcceptHandlerParams {
  accepted: boolean
  id: number
}
async function acceptHandler({
  accepted,
  id,
}: AcceptHandlerParams): Promise<void> {
  console.log('EXECUTANDO HANDLER DE ACEITE E REJEITE')

  try {
    accepted = accepted

    if (accepted) {
      await $api.submissoes.aceitar(id)
    } else {
      await $api.submissoes.rejeitar(id)
    }

    showDialog(
      'Sucesso',
      `A submissão foi ${accepted ? 'aceita' : 'recusada'}!`,
      false,
    )
  } catch (error) {
    console.log('ERRO: ', error)
    showDialog(
      `Erro ao ${accepted ? 'aceitar' : 'recusar'}!`,
      'A ação não pode ser concluída! Por favor, tente novamente mais tarde!',
      true,
    )
  }

  await refreshList()
  console.log('REFRESH: ', submissoes)
}

async function refreshList(): Promise<void> {
  submissoes = await $api.submissoes.search({})
}

function showDialog(title: string, message: string, isError: boolean) {
  dialog.value.title = title
  dialog.value.message = message
  dialog.value.isError = true
  isDialogVisible.value = true
}
</script>
