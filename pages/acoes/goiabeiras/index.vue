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
              <external-link-btn url="https://www.ufes.br/" />
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <!-- MAPA PARA O CAMPUS -->
      <v-row>
        <v-col>
          <actions-map
            :title="nomeUnidade"
            :bounds="limitesMapa"
            :center="centroMapa"
            :feature="campusGeojson"
            :unidade-info="goiabeirasInfo"
            @show-actions="showActions"
          />
        </v-col>
      </v-row>
      <!-- LISTAGEM DAS AÇÕES -->
      <v-row>
        <v-col>
          <actions-list v-if="exibirAcoes" :actions="acoesGoiabeiras" />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import featureGoiabeiras from '~/assets/features/goiabeiras.json'
import ActionsList from '~/components/Actions/ActionsList.vue'
import ActionsMap from '~/components/Actions/ActionsMap.vue'
import ExternalLinkBtn from '~/components/UI/ExternalLinkBtn.vue'
import TheCardDivider from '~/components/UI/TheCardDivider.vue'
import type { AcaoInterface } from '~/models/acao.model'
import { AcaoSearchOptionsBuilder } from '~/models/acao.search.options.model'
import type { UnidadeInfo } from '~/models/unidade.model'

export default {
  name: 'PaginaAcoesGoiabeiras',

  components: { ActionsList, ActionsMap, ExternalLinkBtn, TheCardDivider },

  data() {
    return {
      nomeUnidade: 'Campus em Goiabeiras',
      codigoUnidade: 'UN_GOIABEIRAS',
      acoesGoiabeiras: [] as AcaoInterface[],
      goiabeirasInfo: {} as UnidadeInfo,
      exibirAcoes: false,
      centroMapa: [-20.2764, -40.3037],
      limitesMapa: [
        [-20.2696, -40.3089],
        [-20.2846, -40.3009],
      ],
      campusGeojson: featureGoiabeiras,
    }
  },

  methods: {
    async loadActions() {
      const { $api } = useNuxtApp()
      this.acoesGoiabeiras = await $api.acoes.search(
        AcaoSearchOptionsBuilder(this.codigoUnidade),
      )
    },

    showActions(flag: boolean) {
      this.exibirAcoes = flag

      if (this.exibirAcoes) {
        this.loadActions()
      }
    },
  },

  async mounted() {
    const { $api } = useNuxtApp()
    this.goiabeirasInfo = await $api.unidades.getUnidadeInfo(this.codigoUnidade)
  },
}
</script>
