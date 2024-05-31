<template>
  <v-row>
    <v-col>
      <!-- INFO GERAL SOBRE O CAMPUS DE GOIABEIRAS -->
      <v-row>
        <v-col>
          <v-card>
            <v-card-item>
              <v-card-title>Sobre o campus</v-card-title>
              <v-card-subtitle>
                Mais informações
                <a
                  href="https://www.ufes.br/campus-de-goiabeiras"
                  target="_blank"
                >
                  na página da ufes
                  <v-icon icon="mdi-open-in-new" size="x-small"></v-icon>
                </a>
              </v-card-subtitle>
            </v-card-item>
            <the-card-divider />
            <v-card-text>
              <p>
                É o principal campus da Ufes. Localizado em Vitória, Capital do
                Espírito Santo, concentra a maior parte dos cursos de graduação
                e de pós-graduação, os centros de ensino, laboratórios e
                projetos de extensão. Nele estão também os principais setores
                administrativos da universidade, como a Reitoria, pró-reitorias
                e secretarias.
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
          <actions-map-component
            :title="nomeUnidade"
            :bounds="limitesGoiabeiras"
            :center="centroGoiabeiras"
            :feature="featureGoiabeiras"
            :markers="createMarkers"
            @show-actions="showActions"
          />
        </v-col>
      </v-row>
      <!-- LISTAGEM DAS AÇÕES -->
      <v-row>
        <v-col>
          <actions-list-component
            v-if="exibirAcoes"
            :actions="acoesGoiabeiras"
          />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import featureGoiabeiras from '~/assets/features/goiabeiras.json'
import ActionsListComponent from '~/components/Actions/ActionsList.vue'
import ActionsMapComponent from '~/components/Actions/ActionsMap.vue'
import TheCardDivider from '~/components/UI/TheCardDivider.vue'
import type { AcaoInterface } from '~/models/acao.model'
import type MarkerInterface from '~/models/props/marker.model'

const codigoUnidade = 'UN_GOIABEIRAS'
const acaoStore = useAcaoStore()
const unidadeStore = useUnidadeStore()

export default {
  name: 'PaginaAcoesGoiabeiras',
  components: { ActionsListComponent, ActionsMapComponent, TheCardDivider },

  async beforeRouteEnter() {
    await unidadeStore.fetchInfo(codigoUnidade)
  },

  data() {
    return {
      acoesGoiabeiras: [] as AcaoInterface[],
      exibirAcoes: false,
      nomeUnidade: 'Campus em Goiabeiras',
      centroGoiabeiras: [-20.2764, -40.3037],
      limitesGoiabeiras: [
        [-20.2696, -40.3089],
        [-20.2846, -40.3009],
      ],
      featureGoiabeiras, // TODO: corrigir discrepância do geojson para a tile
    }
  },

  computed: {
    createMarkers(): MarkerInterface[] {
      return unidadeStore.getMarcadores
    },
  },

  methods: {
    async showActions(flag: boolean) {
      this.exibirAcoes = flag
      this.acoesGoiabeiras = await acaoStore.fetchAcoes(codigoUnidade)
    },
  },
}
</script>
