<template>
  <div>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>Sobre o campus</v-card-title>
          <v-card-subtitle>
            Mais informações
            <a
              href="https://www.ufes.br/campi/campus-de-maruipe"
              target="_blank"
            >
              na página da ufes
              <v-icon icon="mdi-open-in-new" size="x-small"></v-icon>
            </a>
          </v-card-subtitle>
          <hr />
          <v-card-text>
            <p>
              Localizado no bairro de Maruípe, em Vitória, capital do Espírito
              Santo, o campus de Maruípe abriga o Centro de Ciências da Saúde
              (CCS), que concentra os cursos de graduação e pós-graduação na
              área de saúde.
            </p>
            <br />
            <p>
              Isso faz com que o campus seja um grande prestador de serviços
              para a sociedade, por meio de seus diferentes projetos e programas
              de extensão e, principalmente, da assistência médica e
              odontológica, com destaque para o Hospital Universitário Cassiano
              Antônio de Moraes (Hucam), o Instituto de Odontologia da Ufes
              (Ioufes) e a Clínica Escola Interprofissional em Saúde.
            </p>
          </v-card-text>

          <v-card-actions>
            <v-spacer />
            <a href="https://ccs.ufes.br/" target="_blank">
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
    <!-- MAPA PARA O CAMPUS -->
    <v-row>
      <v-col>
        <app-map-component
          :title="nomeUnidade"
          :bounds="limitesMapa"
          :center="centroMapa"
          :feature="featureCampus"
          :markers="obterMarcadores"
        ></app-map-component>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import AppMapComponent from '~/components/UI/AppMap.vue'
import feature from '~/assets/features/maruipe.json'

export default {
  name: 'PaginaAcoesMaruipe',
  components: { AppMapComponent },

  data() {
    return {
      nomeCampus: 'MARUÍPE',
      nomeUnidade: 'Unidade de Maruípe',
      centroMapa: [-20.29815881701748, -40.31628393322453],
      limitesMapa: [
        [-20.297085718911358, -40.320649264497376],
        [-20.301772383132487, -40.31412608305674],
      ],
      featureCampus: feature, // TODO: corrigir discrepância do geojson para a tile
    }
  },
  computed: {
    obterMarcadores() {
      return []
    },
  },
}
</script>
