<template>
  <v-card>
    <v-card-title> Informações detalhadas sobre a ação </v-card-title>

    <v-divider></v-divider>

    <v-card-text>
      <!-- FORMULÁRIO -->
      <v-form :readonly="true">
        <!-- OBJETIVO -->
        <v-row>
          <v-col cols="2">
            <the-goal-image-component :goal-id="goalId" :cover="true" />
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
        <v-row>
          <v-col>
            <v-text-field
              v-model="showedItem.titulo"
              label="Título ou nome da ação"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
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
        <v-row>
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
        <v-row>
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
        <v-row>
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
        <v-row>
          <v-col>
            <v-text-field
              v-model="showedItem.coordenador.nome"
              label="Nome completo do coordenador"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model="showedItem.coordenador.descricaoVinculo"
              label="Vínculo com a UFES"
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

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="emitClose()"> Fechar </v-btn>

      <v-btn v-if="isSubmission" color="primary" @click="emitAccept(true)">
        Aceitar Submissão
      </v-btn>

      <v-btn v-if="isSubmission" color="red" @click="emitAccept(false)">
        Recusar Submissão
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import TheGoalImageComponent from '~/components/UI/TheGoalImage.vue'

export default {
  name: 'ActionCardComponent',
  components: { TheGoalImageComponent },

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
      return this.action.meta.objetivo.id
    },
    goalText() {
      const objetivo = this.action.meta.objetivo
      return objetivo.id + ' - ' + objetivo.descricao
    },
    targetText() {
      const target = this.action.meta
      return target.id + ' - ' + target.descricao
    },
    showedItem() {
      return this.action
    },
  },

  methods: {
    emitAccept(accept: boolean) {
      this.$emit('accept', accept)
    },
    emitClose() {
      this.$emit('close', true)
    },
  },
}
</script>
