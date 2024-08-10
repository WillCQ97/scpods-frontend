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
                  href="https://www.ufes.br/campi/campus-de-maruipe"
                  target="_blank"
                >
                  na página da Ufes
                  <v-icon icon="mdi-open-in-new" size="x-small"></v-icon>
                </a>
              </v-card-subtitle>
            </v-card-item>
            <the-card-divider />
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
                para a sociedade, por meio de seus diferentes projetos e
                programas de extensão e, principalmente, da assistência médica e
                odontológica, com destaque para o Hospital Universitário
                Cassiano Antônio de Moraes (Hucam), o Instituto de Odontologia
                da Ufes (Ioufes) e a Clínica Escola Interprofissional em Saúde.
              </p>
            </v-card-text>

            <v-card-actions>
              <v-spacer />
              <external-link-btn url="https://ccs.ufes.br/" />
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <!-- MAPA PARA O CAMPUS -->
      <v-row>
        <v-col>
          <actions-map
            :title="nomeUnidade"
            :bounds="limitesMaapa"
            :center="centroMapa"
            :feature="featureCampus"
            :unidade-info="infoMaruipe"
            @show-actions="showActions"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <actions-list v-if="exibirAcoes" :actions="acoesMaruipe" />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import feature from '~/assets/features/maruipe.json'
import ActionsList from '~/components/Actions/ActionsList.vue'
import ActionsMap from '~/components/Actions/ActionsMap.vue'
import ExternalLinkBtn from '~/components/UI/ExternalLinkBtn.vue'
import TheCardDivider from '~/components/UI/TheCardDivider.vue'
import type { AcaoInterface } from '~/models/acao.model'
import { AcaoSearchOptionsBuilder } from '~/models/acao.search.options.model'
import type { UnidadeInfoInterface } from '~/models/unidade.model'

export default {
  name: 'PaginaAcoesMaruipe',
  components: { ActionsList, ActionsMap, ExternalLinkBtn, TheCardDivider },

  data() {
    return {
      nomeUnidade: 'Unidade de Maruípe',
      codigoUnidade: 'UN_MARUIPE',
      acoesMaruipe: [] as AcaoInterface[],
      infoMaruipe: {} as UnidadeInfoInterface,
      exibirAcoes: false,
      centroMapa: [-20.29815881701748, -40.31628393322453],
      limitesMaapa: [
        [-20.297085718911358, -40.32064926449737],
        [-20.301772383132487, -40.31412608305674],
      ],
      featureCampus: feature,
    }
  },

  methods: {
    async loadActions() {
      const { $api } = useNuxtApp()
      this.acoesMaruipe = await $api.acoes.search(
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
    this.infoMaruipe = await $api.unidades.getUnidadeInfo(this.codigoUnidade)
  },
}
</script>
