<template>
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
          <actions-list-component :actions="submissoes" :is-submission="true" />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import ActionsListComponent from '~/components/Actions/ActionsList.vue'
import TheCardDivider from '~/components/UI/TheCardDivider.vue'

const acaoStore = useAcaoStore()
const submissoes = await acaoStore.fetchSubmissoes()

definePageMeta({
  middleware: 'auth',
})
</script>
