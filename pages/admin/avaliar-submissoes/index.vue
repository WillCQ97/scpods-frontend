<template>
  <!-- DIÁLOGO DE SUCESSO -->
  <v-dialog v-model="showDialog" width="50vh">
    <v-card>
      <v-card-title>{{ dialog.title }}</v-card-title>
      <v-card-text>
        {{ dialog.message }}
      </v-card-text>
      <v-card-actions>
        <v-btn @click="showDialog = false">OK</v-btn>
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
const showErrorDialog = ref(false)
const showSuccess = ref(false)

const showDialog = ref(false)
const dialog = ref({ title: '', message: '' })

definePageMeta({
  middleware: 'auth',
})

async function acceptHandler({ accepted, id }): Promise<void> {
  console.log('EXECUTANDO HANDLER DE ACEITE E REJEITE')

  try {
    accepted = accepted

    if (accepted) {
      await $api.submissoes.aceitar(id)
    } else {
      await $api.submissoes.rejeitar(id)
    }
    dialog.value.title = 'Sucesso'
    dialog.value.message = `A submissão foi ${accepted ? 'aceita' : 'recusada'}!`
    showDialog.value = true
  } catch (error) {
    dialog.value.title = 'Erro'
    dialog.value.message = `A ação não pode ser concluída!`
    showDialog.value = true
    console.log('ERRO: ', error)
  }

  await refreshList()
  console.log('REFRESH: ', submissoes)
}

async function refreshList(): Promise<void> {
  submissoes = await $api.submissoes.search({})
}
</script>
