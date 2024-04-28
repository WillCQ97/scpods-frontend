<template>
  <v-row>
    <v-col>
      <!-- SOBRE O CAMPUS -->
      <v-row>
        <v-col>
          <v-card>
            <v-card-item>
              <v-card-title>Sobre o campus</v-card-title>
              <v-card-subtitle>
                Mais informações
                <a href="https://www.ufes.br/campus-de-alegre" target="_blank">
                  na página da ufes
                  <v-icon icon="mdi-open-in-new" size="x-small"></v-icon>
                </a>
              </v-card-subtitle>
            </v-card-item>
            <the-card-divider />
            <v-card-text>
              <p>
                O Campus de Alegre da Universidade Federal do Espírito Santo
                está localizado na região sul do Espírito Santo e oferta
                atualmente 17 cursos de graduação, 8 cursos de mestrado e 3 de
                doutorado.
              </p>
              <br />
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

      <!-- INFO SOBRE AS ÁREAS DO CAMPUS -->
      <v-row>
        <v-col>
          <v-card>
            <v-card-item>
              <v-card-title>Campus de Alegre</v-card-title>
              <v-card-subtitle>Selecione o mapa a ser exibido!</v-card-subtitle>
            </v-card-item>
            <!--TODO-->
            <v-divider :color="dividerColor" thickness="3"></v-divider>

            <v-card-text>
              <p>
                Atualmente, o campus de Alegre conta com
                <strong>três localidades</strong>:
              </p>

              <ul>
                <li>
                  A <strong>sede do campus</strong> que está localizada no Alto
                  Universitário, no município de <strong> Alegre, ES</strong>.
                </li>
                <li>
                  As instalações do
                  <strong>
                    Departamento de Ciências Florestais e da Madeira (DCFM)
                  </strong>
                  localizadas no município de
                  <strong> Jerônimo Monteiro, ES</strong>.
                </li>
                <li>
                  A <strong> Área Experimental</strong> na localidade de
                  <strong>Rive</strong>, no município de Alegre. Onde estão
                  localizados o <strong>Hospital Veterinário (HOVET)</strong>, o
                  <strong>Laboratório de Solos</strong> e o
                  <strong>Viveiro</strong>.
                </li>
              </ul>
            </v-card-text>

            <v-card-actions>
              <v-spacer />
              <v-btn
                v-for="(mapa, index) in mapas"
                :key="index"
                :color="corBotao"
                variant="elevated"
                @click="exibirMapa(mapa.subpagina)"
              >
                {{ mapa.titulo }}
              </v-btn>
              <v-spacer />
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <!-- EXIBIÇÃO DO MAPA -->
      <v-row>
        <v-col>
          <nuxt-page />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import TheCardDivider from '~/components/UI/TheCardDivider.vue'
import colorPalleteUfes from '~/assets/colors'

async function carregarMapa(campus: string) {
  await navigateTo('/acoes/alegre/' + campus)
}

export default {
  components: { TheCardDivider },
  data() {
    return {
      corBotao: colorPalleteUfes.monocromatic.secondary,
      dividerColor: colorPalleteUfes.monocromatic.primary,
      mapas: [
        { titulo: 'Sede em Alegre', subpagina: 'sede' },
        { titulo: 'Unidade Jerônimo Monteiro', subpagina: 'jeronimo' },
        { titulo: 'Área Experimental Rive', subpagina: 'rive' },
      ],
      flagErroAoCarregarInfos: false,
    }
  },

  methods: {
    exibirMapa(campus: string) {
      carregarMapa(campus)
    },
  },
}
</script>
<style scoped>
ul {
  padding-left: 25px;
}
li {
  padding-left: 10px;
}
</style>
