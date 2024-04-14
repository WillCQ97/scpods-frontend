<!-- TODO: testar a utilização desse componente -->
<template>
  <v-dialog
    v-model="showDialogModel"
    width="125vh"
    activator="parent"
    persistent
  >
    <v-card>
      <v-card-title> {{ titulo }} </v-card-title>

      <v-card-text>
        <strong>Ação:</strong> {{ acao.titulo }}
        <br />
        <strong>ODS:</strong>
        {{ acao.meta.objetivo.id }} -
        {{ acao.meta.objetivo.titulo }}
        <br />
        <strong>Meta ODS: </strong>
        {{ acao.meta.id }}
        -
        {{ acao.meta.descricao }}
        <br />
        <strong>Descrição: </strong>
        {{ acao.descricao }}
        <br />
        <strong>Centro: </strong>
        {{ acao.lotacao.centro.nome }}
        <br />
        <strong>Lotação: </strong>
        {{ acao.lotacao.nome }}
        <br />
        <strong>Coordenador: </strong>
        {{ acao.coordenador.nome }}
        <br />
        <strong>Vínculo com a UFES: </strong>
        {{ acao.coordenador.descricaoVinculo }}
        <br />
        <strong>Data de Início: </strong>
        {{ acao.dataInicio }}
        <div v-if="acao.dataEncerramento">
          <strong>Data Fim: </strong>
          {{ acao.dataEncerramento }} <br />
        </div>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="showDialogModel = false"> OK </v-btn>
        <div v-if="!isVisualizar">
          <v-btn color="primary"> Salvar </v-btn>
          <v-btn color="primary"> Aceitar Submissão </v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'DetalhesAcaoDialog',

  props: {
    acao: {
      type: Object,
      required: true,
    },
    isVisualizar: {
      type: Boolean,
      required: true,
    },
    exibirDialogo: {
      type: Boolean,
      required: true,
    },
    titulo: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      showDialogModel: this.exibirDialogo,
    }
  },

  methods: {},
}
</script>
