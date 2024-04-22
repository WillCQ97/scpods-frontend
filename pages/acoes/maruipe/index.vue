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
                  na página da ufes
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
          <actions-map-component
            :title="nomeUnidade"
            :bounds="limitesMapa"
            :center="centroMapa"
            :feature="featureCampus"
            :markers="createMarkers"
            @show-actions="showActions"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <actions-list-component
            v-if="isActionsListVisible"
            :actions="maruipeActions"
          />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import ActionsListComponent from '~/components/Actions/ActionsList.vue'
import ActionsMapComponent from '~/components/Actions/ActionsMap.vue'
import TheCardDivider from '~/components/UI/TheCardDivider.vue'
import maruipeActions from '~/assets/data/maruipeActions.json'
import feature from '~/assets/features/maruipe.json'

const unidadeStore = useUnidadeStore()

export default {
  name: 'PaginaAcoesMaruipe',
  components: { ActionsListComponent, ActionsMapComponent, TheCardDivider },

  async beforeRouteEnter() {
    await unidadeStore.fetchInfo('UN_MARUIPE')
  },

  data() {
    return {
      maruipeActions,
      isActionsListVisible: false,
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
    createMarkers() {
      return unidadeStore.getMarcadores
    },
  },
  methods: {
    showActions(flag: boolean) {
      this.isActionsListVisible = flag
    },
  },
}
</script>
