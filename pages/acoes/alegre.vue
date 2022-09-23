<template>
  <div>
    <!-- TODO: CARREGAR O TEXTO PARA ALEGRE AQUI-->
    <h1>Página de Wrapper de alegre</h1>
    <p>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit ut
      laudantium iusto, magnam culpa ipsam, alias amet natus dolore error ad quo
      eaque, reiciendis labore in optio iure. Unde, incidunt.
    </p>
    <p>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi rerum
      vitae accusamus repudiandae saepe quos. Facilis perferendis nemo fugiat
      quasi quos autem neque quidem, tenetur totam eaque at qui pariatur.
    </p>

    <v-card>
      <v-card-title>Selecione o mapa a ser visualizado</v-card-title>
      <v-card-actions>
        <v-btn @click="showMapAlegreSede">Alegre Sede</v-btn>
        <v-btn @click="showMapJeronimo">Jerônimo Monteiro</v-btn>
        <v-btn @click="showMapRive">Área Experimental Rive</v-btn>
      </v-card-actions>
    </v-card>

    <nuxt-child />
    <!--TODO: COLOCAR ALGUNS CARDS INFORMATIVOS SOBRE OS PROJETOS DE FORMA GERAL
    O QUE SERIA OUTRO COMPONENTE (DASHBOARD?) -->
    <!--
    -->
    <!-- TODO: adicionar a lista de projetos a serem exibidos (componente próprio) -->
    <p>CARREGAR UMA LISTA COM OS PROJETOS A PARTIR DA INTERAÇÃO COM O MAPA</p>
  </div>
</template>

<script>
export default {
  name: 'AlegreActionsWrapperPage',

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

