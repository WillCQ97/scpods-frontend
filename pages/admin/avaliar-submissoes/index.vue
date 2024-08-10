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
          <v-form
            v-model="isFormValid"
            ref="form"
            @submit.prevent="searchSubmissoes"
          >
            <v-card>
              <v-card-title>Filtro</v-card-title>
              <v-card-text>
                <v-row dense>
                  <v-col cols="12" md="8">
                    <v-text-field
                      v-model="filter.titulo"
                      label="Título"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="filter.dataCadastro"
                      label="Data de Cadastro"
                      outlined
                      type="date"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="filter.codigoObjetivo"
                      label="Código do Objetivo"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="filter.codigoMeta"
                      label="Código da Meta"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="filter.siglaLotacao"
                      label="Sigla da Lotação"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="filter.codigoUnidade"
                      label="Código da Unidade"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="filter.nomeLocal"
                      label="Local"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="filter.nomeCoordenador"
                      label="Coordenador"
                      outlined
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn variant="elevated" :color="corBotao" type="submit">
                  Pesquisar
                </v-btn>
                <v-btn
                  variant="elevated"
                  :color="corBotao"
                  @click="cleanFilter"
                >
                  Limpar
                </v-btn>
                <v-spacer />
              </v-card-actions>
            </v-card>
          </v-form>
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
import colorPalleteUfes from '~/assets/colors'
import ActionsList from '~/components/Actions/ActionsList.vue'
import TheCardDivider from '~/components/UI/TheCardDivider.vue'
import type { AcaoSearchInterface } from '~/models/acao.search.model'

definePageMeta({
  middleware: 'auth',
})

const { $api } = useNuxtApp()
const corBotao = colorPalleteUfes.monocromatic.secondary
const dialog = ref({ title: '', message: '', isError: false })
const isDialogVisible = ref(false)

const filter = ref({
  titulo: undefined,
  dataCadastro: undefined,
  codigoObjetivo: undefined,
  codigoMeta: undefined,
  siglaLotacao: undefined,
  nomeLocal: undefined,
  nomeCoordenador: undefined,
  codigoUnidade: undefined,
})

const submissoes = ref([{}] as AcaoSearchInterface[])
searchSubmissoes()

interface AcceptHandlerParams {
  accepted: boolean
  id: number
}

async function searchSubmissoes(): Promise<void> {
  try {
    submissoes.value = await $api.submissoes.search(filter.value)
  } catch (e) {
    showDialog(
      `Erro ao buscar submissões!`,
      'A ação não pode ser concluída! Por favor, tente novamente mais tarde!',
      true,
    )
  }
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

  console.log('REFRESH APÓS ACEITE: ')
  searchSubmissoes()
}

const isFormValid = ref(false)
const form = ref(null)

async function cleanFilter() {
  resetForm()
  searchSubmissoes()
}

const validate = async () => {
  const { valid } = await form.value.validate()

  if (valid) alert('Form is valid')
}
const resetForm = () => {
  form.value.reset()
}
const resetValidation = () => {
  form.value.resetValidation()
}

function showDialog(title: string, message: string, isError: boolean) {
  dialog.value.title = title
  dialog.value.message = message
  dialog.value.isError = isError
  isDialogVisible.value = true
}
</script>
<style scoped>
.dialog {
  text-align: center;
  font-size: 20px !important;
}
</style>
