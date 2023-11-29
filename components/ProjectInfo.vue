<template>
  <v-card>
    <v-card-title>Informações da Submissão</v-card-title>
    <hr />

    <v-card-text>
      <!-- 
      <h1>Título</h1>
      <h1>{{submissao.titulo}}</h1>
      -->
      <v-text-field
        v-model="submissao.titulo"
        label="Título ou nome da ação"
        disabled
      ></v-text-field>
      <!--
      <p>Descrição:</p>
      <h1>{{submissao.descricao}}</h1>
        -->
      <v-textarea
        v-model="submissao.descricao"
        label="Descrição e objetivos da sua ação"
        disabled
      ></v-textarea>

      <h2>Objetivo ODS</h2>
      <p>Meta</p>

      <h2>Local</h2>
      <p>Departamento:</p>
      <v-text-field
        v-model="submissao.estruturaOrganizacional.nome"
        label="Departamento da UFES onde a ação é desenvolvida"
        :rules="rules"
      ></v-text-field>
      <p>Centro:</p>
      <p>Campus:</p>
      <!--
      <h2>Coordenador</h2>
      <p>Nome</p>
      <p>Vínculo</p>

      <p>Email</p>
      -->
      <v-text-field
        v-model="submissao.coordenador.nome"
        label="Nome do coordenador da ação"
        disabled
      ></v-text-field>
      <v-text-field
        v-model="submissao.coordenador.descricaoVinculo"
        label="Vínculo do coordenador com a UFES, por exemplo, professor"
        disabled
      ></v-text-field>

      <v-text-field
        v-model="submissao.coordenador.email"
        label="E-mail do coordenador da ação"
        disabled
      ></v-text-field>
    </v-card-text>
  </v-card>
</template>

<script>
import submissions from '~/assets/data/alegre_submissions.json'

export default {
  /* TODO: remover esse componente */
  name: 'ProjectFormInfoComponent',
  data() {
    return {
      submissao: submissions[0],
    }
  },
}
</script>
