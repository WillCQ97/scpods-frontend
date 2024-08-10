<template>
  <v-card>
    <v-card-title>
      Informações detalhadas sobre a
      {{ isSubmission ? 'submissão enviada' : 'ação' }}
    </v-card-title>

    <the-card-divider />

    <v-card-text>
      <!-- FORMULÁRIO -->
      <v-form :readonly="true">
        <!-- OBJETIVO -->
        <v-row dense>
          <v-col cols="3" align-self="center">
            <the-goal-image :goal-code="goalId" :cover="true" />
          </v-col>

          <v-col>
            <v-textarea
              v-model="goalText"
              label="Objetivo de Desenvolvimento Sustentável"
              auto-grow
              rows="1"
            ></v-textarea>

            <v-textarea
              v-model="targetText"
              label="Meta"
              auto-grow
              rows="3"
            ></v-textarea>
          </v-col>
        </v-row>

        <!-- TÍTULO DA AÇÃO -->
        <v-row dense>
          <v-col>
            <v-text-field
              v-model="showedItem.titulo"
              label="Título ou nome da ação"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row dense>
          <v-col>
            <v-textarea
              v-model="showedItem.descricao"
              label="Descrição da ação"
              auto-grow
              rows="2"
            ></v-textarea>
          </v-col>
        </v-row>

        <!-- DATAS DE INÍCIO E TÉRMINO -->
        <v-row dense>
          <v-col>
            <v-text-field
              v-model="showedItem.dataInicio"
              label="Data de Início"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model="showedItem.dataEncerramento"
              label="Data de Encerramento"
            ></v-text-field>
          </v-col>
        </v-row>

        <!-- LOTAÇÃO DA AÇÃO -->
        <v-row dense>
          <v-col>
            <v-text-field
              v-model="showedItem.lotacao.descricao"
              label="Lotação da ação (sua vinculação)"
            ></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-text-field
              v-model="showedItem.lotacao.sigla"
              label="Sigla"
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field
              v-model="showedItem.lotacao.campus"
              label="Campus"
            ></v-text-field>
          </v-col>
        </v-row>

        <!-- LOCALIZAÇÃO DA AÇÃO -->
        <v-row dense>
          <v-col>
            <v-text-field
              v-model="showedItem.local.nomePrincipal"
              label="Localização na unidade"
            >
            </v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model="showedItem.local.unidade.nome"
              label="Unidade"
            >
            </v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model="showedItem.local.unidade.campus"
              label="Campus"
            >
            </v-text-field>
          </v-col>
        </v-row>

        <!-- COORDENADOR -->
        <v-row dense>
          <v-col>
            <v-text-field
              v-model="showedItem.coordenador.nome"
              label="Nome completo do coordenador"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model="showedItem.coordenador.descricaoVinculo"
              label="Vínculo com a Ufes"
            ></v-text-field>
          </v-col>
          <v-col v-if="isSubmission">
            <v-text-field
              v-model="showedItem.coordenador.email"
              label="Endereço de e-mail"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>

    <the-card-divider />

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn
        v-if="isSubmission"
        prepend-icon="mdi-check"
        color="green"
        @click="emitAccept(true)"
      >
        Aceitar
      </v-btn>

      <v-btn
        v-if="isSubmission"
        prepend-icon="mdi-close"
        color="red"
        @click="emitAccept(false)"
      >
        Recusar
      </v-btn>
      <v-btn color="primary" @click="emitClose()"> Fechar </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import TheGoalImage from '~/components/UI/TheGoalImage.vue'
import TheCardDivider from '../UI/TheCardDivider.vue'

export default {
  name: 'ActionCardDetail',
  components: { TheCardDivider, TheGoalImage },

  props: {
    action: {
      type: Object,
      required: true,
    },
    isSubmission: {
      type: Boolean,
      required: false,
      default: true,
    },
  },

  emits: ['accept', 'close'],

  computed: {
    goalId() {
      return this.action.meta.objetivo.codigo
    },
    goalText() {
      const objetivo = this.action.meta.objetivo
      return objetivo.codigo + ' - ' + objetivo.descricao
    },
    targetText() {
      const target = this.action.meta
      return target.codigo + ' - ' + target.descricao
    },
    showedItem() {
      return this.action
    },
  },

  methods: {
    emitAccept(accept: boolean) {
      this.$emit('accept', { accepted: accept, id: this.action.id })
    },
    emitClose() {
      this.$emit('close', true)
    },
  },
}
</script>
