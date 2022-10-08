<!--TODO: COLOCAR ALGUNS CARDS INFORMATIVOS SOBRE OS PROJETOS DE FORMA GERAL O QUE SERIA OUTRO COMPONENTE (DASHBOARD?) -->
<template>
  <v-row>
    <v-col>
    <!-- INFO SOBRE AS ÁREAS DO CAMPUS E MENU DE SELEÇÃO -->
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>Campus de Alegre</v-card-title>
          <v-card-subtitle>Selecione o mapa a ser exibido!</v-card-subtitle>
          <hr />
          <v-card-text>
            <p>Atualmente, o campus de Alegre conta com <strong>três localidades</strong>:</p>
            <p>
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
                localizados o <strong>Hospital Veterinário (HOVET)</strong>,
                o <strong>Laboratório de Solos</strong> e o <strong>Viveiro</strong>.
              </li>
            </ul>
            </p>
          </v-card-text>
          <hr />
          <v-card-actions>
            <v-spacer />
            <v-btn :color="btnColor" @click="showMapAlegreSede">Alegre</v-btn>
            <v-btn :color="btnColor" @click="showMapJeronimo">Jerônimo Monteiro</v-btn>
            <v-btn :color="btnColor" @click="showMapRive">Rive</v-btn>
            <v-spacer />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

      <!-- EXIBIÇÃO DO MAPA -->
      <v-row>
        <v-col>
          <nuxt-child />
        </v-col>
      </v-row>

      <!-- LISTA DE PROJETOS -->
      <v-row>
        <v-col>
          <!-- TODO: adicionar a lista de projetos a serem exibidos (componente próprio) -->
          <actions-list />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import ActionsList from '~/components/ActionsList.vue'

export default {
  name: 'AlegreActionsWrapperPage',
  components: { ActionsList },

  data() {
    return {
      btnColor: '#d2dce8',
    }
  },

  methods: {
    showMapAlegreSede() {
      this.$router.push('/acoes/alegre/sede/')
    },
    showMapJeronimo() {
      this.$router.push('/acoes/alegre/jeronimo/')
    },
    showMapRive() {
      this.$router.push('/acoes/alegre/rive/')
    },
  },
}
</script>

