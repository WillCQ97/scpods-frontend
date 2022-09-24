<!-- PÁGINA EXIBIDA ENQUANTO NENHUM MAPA É CARREGADO -->
<template>
  <div>
    <!-- INFO GERAL SOBRE O CAMPUS -->
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>Sobre a instituição</v-card-title>
          <hr />
          <v-card-text>
            <p>
              O Campus de Alegre da Universidade Federal do Espírito Santo está
              localizado na região sul do Espírito Santo e oferta atualmente 17
              cursos de graduação, 8 cursos de mestrado e 3 de doutorado.
            </p>
            <p>
              Com o desmembramento do extinto Centro de Ciências Agrárias,
              atualmente, abriga dois centros de ensino denominados Centro de
              Ciências Agrárias e Engenharias e Centro de Ciências Exatas,
              Naturais e da Saúde, sendo que os dois Centros compartilham o
              mesmo espaço físico, com atividades de ensino, pesquisa e
              extensão, em articulação com os cursos de graduação e as
              coordenações dos programas de pós-graduação.
            </p>
          </v-card-text>

          <v-card-actions>
            <v-spacer />
            <a href="https://alegre.ufes.br/" target="_blank">
              <v-btn small class="primary">
                Ir para o site
                <v-icon small right>mdi-open-in-new</v-icon>
              </v-btn>
            </a>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'AlegreActionsPage',
}
</script>
