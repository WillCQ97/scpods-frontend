<template>
  <v-card>
    <v-card-title> {{ card.titulo }} </v-card-title>
    <v-card-subtitle>
      {{ card.subtitulo }}
    </v-card-subtitle>
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
    }
  },
}
</script>