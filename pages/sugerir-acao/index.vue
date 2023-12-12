<template>
  <v-card>
    <v-card-title>Sobre o formulário de sugestão</v-card-title>
    <hr />
    <v-card-text>
      <p>
        O formulário é composto por informações essenciais acerca da
        ação/projeto executado:
      </p>
      <ul>
        <li>Título da ação</li>
        <li>ODS principal relacionado</li>
        <li>Meta da ODS atendida (só é possível escolher uma)</li>
        <li>Descrição/Objetivo da ação</li>
        <li>Local onde é ou foi executado (deverá ser selecionado no mapa)</li>
        <li>
          Vinculação do projeto: Local ou estrutura administrativa a que está
          submetido, por exemplo, ao departamento da farmácia, à administração
          central, etc.
        </li>
        <li>Coordenador do projeto: Seu nome e vinculação com a UFES.</li>
        <li>Datas de início e de finalização da ação.</li>
      </ul>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
export default {
  name: 'SugerirAcaoPage',
}
</script>
