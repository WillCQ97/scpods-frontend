<!-- TODO: testar a utilização desse componente -->
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
            <the-goal-image-component :goal-id="goalId" />
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
              v-model="selectedItem.titulo"
              label="Título ou nome da ação"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-textarea
              v-model="selectedItem.descricao"
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
              v-model="selectedItem.dataInicio"
              label="Data de Início"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model="selectedItem.dataEncerramento"
              label="Data de Encerramento"
            ></v-text-field>
          </v-col>
        </v-row>

        <!-- LOTAÇÃO DA AÇÃO -->
        <v-row>
          <v-col>
            <v-text-field
              v-model="selectedItem.lotacao.descricao"
              label="Lotação da ação (sua vinculação)"
            ></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-text-field
              v-model="selectedItem.lotacao.sigla"
              label="Sigla"
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field
              v-model="selectedItem.lotacao.campus"
              label="Campus"
            ></v-text-field>
          </v-col>
        </v-row>

        <!-- LOCALIZAÇÃO DA AÇÃO -->
        <v-row>
          <v-col>
            <v-text-field
              v-model="selectedItem.local.nomePrincipal"
              label="Localização na unidade"
            >
            </v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model="selectedItem.local.unidade.nome"
              label="Unidade"
            >
            </v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model="selectedItem.local.unidade.campus"
              label="Campus"
            >
            </v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-text-field
              v-model="selectedItem.coordenador.nome"
              label="Nome completo"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model="selectedItem.coordenador.descricaoVinculo"
              label="Vínculo com a UFES"
            ></v-text-field>
          </v-col>
          <v-col v-if="!isVisualizar">
            <v-text-field
              v-model="selectedItem.coordenador.email"
              label="Endereço de e-mail"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="showDialogModel = false"> OK </v-btn>
      <v-btn v-if="!isVisualizar" color="primary"> Aceitar Submissão </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import TheGoalImageComponent from '~/components/UI/TheGoalImage.vue'
import actions from '~/assets/data/alegreActions.json'

export default {
  name: 'DetalhesAcaoDialog',
  components: { TheGoalImageComponent },

  props: {
    action: {
      type: Object,
      required: true,
    },
    isVisualizar: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      selectedItem: actions[0],
    }
  },

  computed: {
    goalId() {
      return this.selectedItem.meta.objetivo.id
    },
    goalText() {
      const objetivo = this.selectedItem.meta.objetivo
      return objetivo.id + ' - ' + objetivo.descricao
    },
    targetText() {
      const target = this.selectedItem.meta
      return target.id + ' - ' + target.descricao
    },
  },

  methods: {
    getGoal(target) {
      return target.objetivo.id + ' - ' + target.objetivo.titulo
    },
    getMetaDescription(meta) {
      return meta.id + ' - ' + meta.descricao
    },
  },
}
</script>
