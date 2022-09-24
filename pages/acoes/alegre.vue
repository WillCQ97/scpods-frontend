<!--TODO: COLOCAR ALGUNS CARDS INFORMATIVOS SOBRE OS PROJETOS DE FORMA GERAL O QUE SERIA OUTRO COMPONENTE (DASHBOARD?) -->
<template>
  <v-row>
    <v-col>
      <!-- TEXTO DA PÁGINA -->
      <v-row>
        <v-col>
          <h1>Página de Wrapper de alegre</h1>
          <!-- TODO: ADICIONAR O TEXTO PARA ALEGRE AQUI -->
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit ut
            laudantium iusto, magnam culpa ipsam, alias amet natus dolore error
            ad quo eaque, reiciendis labore in optio iure. Unde, incidunt.
          </p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi
            rerum vitae accusamus repudiandae saepe quos. Facilis perferendis
            nemo fugiat quasi quos autem neque quidem, tenetur totam eaque at
            qui pariatur.
          </p>
        </v-col>
      </v-row>

      <!-- MENU DE ESCOLHA DO MAPA -->
      <v-row>
        <v-spacer />
        <v-col>
          <v-card>
            <v-card-title>Escolha o mapa que deseja ver</v-card-title>
            <!-- TODO: no momento do clique centralizar no mapa -->
            <v-card-actions>
              <v-btn @click="showMapAlegreSede">Alegre Sede</v-btn>
              <v-btn @click="showMapJeronimo">Jerônimo Monteiro</v-btn>
              <v-btn @click="showMapRive">Área Experimental Rive</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-spacer />
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
    return {}
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

