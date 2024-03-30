<template>
  <div>
    <!-- INFO GERAL SOBRE O CAMPUS DE GOIABEIRAS -->
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>Sobre o campus</v-card-title>
          <v-card-subtitle>
            Mais informações
            <a href="https://www.ufes.br/campus-de-goiabeiras" target="_blank">
              na página da ufes
              <v-icon icon="mdi-open-in-new" size="x-small"></v-icon>
            </a>
          </v-card-subtitle>
          <hr />
          <v-card-text>
            <p>
              É o principal campus da Ufes. Localizado em Vitória, Capital do
              Espírito Santo, concentra a maior parte dos cursos de graduação e
              de pós-graduação, os centros de ensino, laboratórios e projetos de
              extensão. Nele estão também os principais setores administrativos
              da universidade, como a Reitoria, pró-reitorias e secretarias.
            </p>
            <br />
            <p>
              Abriga áreas de cultura e lazer, com galerias de arte, cantinas,
              cinema, editora de livros, teatro, livraria, Sistema de
              Bibliotecas e a Rádio Universitária. Possui ginásio de esportes,
              parque aquático e outros equipamentos esportivos, além de Centro
              de Línguas, agências bancárias, Observatório Astronômico e
              Planetário. O campus é cercado por uma área de manguezal mantida
              sob proteção ambiental.
            </p>
          </v-card-text>

          <v-card-actions>
            <v-spacer />
            <a href="https://www.ufes.br/" target="_blank">
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
          :bounds="limitesGoiabeiras"
          :center="centroGoiabeiras"
          :feature="featureCampusGoiabeiras"
          :markers="obterMarcadores"
        ></app-map-component>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import featureGoiabeiras from '~/assets/features/goiabeiras.json'
import AppMapComponent from '~/components/UI/AppMap.vue'

export default {
  name: 'PaginaAcoesGoiabeiras',
  components: { AppMapComponent },

  data() {
    return {
      nomeCampus: 'GOIABEIRAS',
      nomeUnidade: 'Campus em Goiabeiras',
      centroGoiabeiras: [-20.2764, -40.3037],
      limitesGoiabeiras: [
        [-20.2696, -40.308],
        [-20.284, -40.3009],
      ],
      featureCampusGoiabeiras: featureGoiabeiras, // TODO: corrigir discrepância do geojson para a tile
    }
  },

  computed: {
    obterMarcadores() {
      return []
    },
  },
}
</script>
