<!-- TODO: Teste para criação de um card base -->
<template>
  <v-card>
    <v-card-item>
      <v-card-title> {{ card.titulo }} </v-card-title>
      <v-card-subtitle>
        {{ card.subtitulo }}
      </v-card-subtitle>
    </v-card-item>
    <hr />
    <v-card-text>
      {{ card.text }}
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <a :href="card.botao.link" target="_blank">
        <v-btn color="primary" small text>
          {{ card.botao.texto }}
          <v-icon right small>mdi-open-in-new</v-icon>
        </v-btn>
      </a>
      <v-spacer />
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      card: {
        titulo: '',
        subtitulo: '',
        texto: '',
        botao: {
          texto: '',
          link: '',
        },
      },
      cards: [
        {
          titulo: 'A agenda 2030 e os ODS',
          subtitulo:
            'Saiba mais sobre os Objetivos de Desenvolvimento Sustentável',
          texto:
            'A Agenda 2030 consiste em um plano de ação global para governos, sociedade, empresas, academias e pessoas, no qual foram definidos 17 objetivos e 169 metas para o fomento de um desenvolvimento mais sustentável das atividades humanas nos próximos anos.',
          botao: {
            texto: 'Veja mais',
            link: '',
          },
        },
      ],
    }
  },
}
</script>
