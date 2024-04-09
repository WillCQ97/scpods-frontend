<template>
  <v-row>
    <v-col>
      <!-- INFO SOBRE AS ÁREAS DO CAMPUS -->
      <v-row>
        <v-col>
          <v-card>
            <v-card-title>Campus de Alegre</v-card-title>
            <v-card-subtitle>Selecione o mapa a ser exibido!</v-card-subtitle>
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
        <v-col id="child-container" ref="childContainer">
          <nuxt-page />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import colorPalleteUfes from '~/assets/colors'

async function carregarMapa(campus: string) {
  await navigateTo('/acoes/alegre/' + campus)
}

export default {
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
