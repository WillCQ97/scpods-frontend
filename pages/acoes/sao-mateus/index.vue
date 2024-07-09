<template>
  <v-row>
    <v-col>
      <v-row>
        <v-col>
          <v-card>
            <v-card-item>
              <v-card-title>Sobre o campus</v-card-title>
              <v-card-subtitle>
                Mais informações
                <a
                  href="https://www.ufes.br/campi/campus-de-sao-mateus"
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
                O campus de São Mateus abriga o Centro Universitário Norte do
                Espírito Santo (Ceunes) e fica localizado no município de São
                Mateus, região norte do Espírito Santo, a 215 km de Vitória/ES.
                Situado numa área de 532.000 m², a infraestrutura do campus se
                compõe de salas de aulas, laboratórios, restaurante
                universitário, biblioteca e fazenda experimental.
              </p>
              <br />
              <p>
                O Ceunes oferece 17 cursos de graduação e quatro de
                pós-graduação, e tem sido um importante polo de apoio ao
                desenvolvimento da região norte do Espírito Santo, que aparece
                como uma das dinâmicas do estado nos últimos anos, com
                investimentos industriais e de serviços relevantes.
              </p>
            </v-card-text>

            <v-card-actions>
              <v-spacer />
              <a href="https://saomateus.ufes.br/" target="_blank">
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
          <actions-map
            :title="nomeUnidade"
            :bounds="limitesSaoMateus"
            :center="centroSaoMateus"
            :feature="featureCampus"
            :unidade-info="infoSaoMateus"
            @show-actions="showActions"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <actions-list v-if="exibirAcoes" :actions="acoesSaoMateus" />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import feature from '~/assets/features/sao_mateus.json'
import ActionsList from '~/components/Actions/ActionsList.vue'
import ActionsMap from '~/components/Actions/ActionsMap.vue'
import TheCardDivider from '~/components/UI/TheCardDivider.vue'
import type { AcaoInterface } from '~/models/acao.model'
import type { UnidadeInfo } from '~/models/unidade.model'

const codigoUnidade = 'UN_SAO_MATEUS'
const { $api } = useNuxtApp()

export default {
  name: 'PaginaAcoesSaoMateus',
  components: { ActionsList, ActionsMap, TheCardDivider },

  data() {
    return {
      acoesSaoMateus: [] as AcaoInterface[],
      exibirAcoes: false,
      infoSaoMateus: {} as UnidadeInfo,
      nomeUnidade: 'Unidade de São Mateus',
      centroSaoMateus: [-18.675738334093378, -39.86240690464644],
      limitesSaoMateus: [
        [-18.670727522212445, -39.866469236990035],
        [-18.680308622184185, -39.85245444148613],
      ],
      featureCampus: feature,
    }
  },

  methods: {
    async loadActions() {
      this.acoesSaoMateus = await $api.acoes.getAcoes(codigoUnidade)
    },
    showActions(flag: boolean) {
      this.exibirAcoes = flag

      if (this.exibirAcoes) {
        this.loadActions()
      }
    },
  },

  async mounted() {
    this.infoSaoMateus = await this.$api.unidades.getUnidadeInfo(codigoUnidade)
  },
}
</script>
