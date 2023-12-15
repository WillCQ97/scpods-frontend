<template>
  <!-- INFO GERAL SOBRE O CAMPUS DE ALEGRE -->
  <v-row>
    <v-col>
      <v-card>
        <v-card-title>Sobre a o campus</v-card-title>
        <v-card-subtitle>
          Descrição disponibilizada
          <a href="https://www.ufes.br/campus-de-alegre" target="_blank">
            na página da ufes
            <v-icon icon="mdi-open-in-new" size="x-small"></v-icon>
          </a>
        </v-card-subtitle>
        <hr />
        <v-card-text>
          <p>
            O Campus de Alegre da Universidade Federal do Espírito Santo está
            localizado na região sul do Espírito Santo e oferta atualmente 17
            cursos de graduação, 8 cursos de mestrado e 3 de doutorado.
          </p>
          <br />
          <p>
            Com o desmembramento do extinto Centro de Ciências Agrárias,
            atualmente, abriga dois centros de ensino denominados Centro de
            Ciências Agrárias e Engenharias e Centro de Ciências Exatas,
            Naturais e da Saúde, sendo que os dois Centros compartilham o mesmo
            espaço físico, com atividades de ensino, pesquisa e extensão, em
            articulação com os cursos de graduação e as coordenações dos
            programas de pós-graduação.
          </p>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <a href="https://alegre.ufes.br/" target="_blank">
            <v-btn
              small
              color="primary"
              text="Ir para o site"
              append-icon="mdi-open-in-new"
            >
            </v-btn>
          </a>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
export default {
  name: 'PaginaAcoesAlegre',
}
</script>
