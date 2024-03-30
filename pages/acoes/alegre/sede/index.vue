<template>
  <div>
    <app-map-component
      :title="nomeUnidade"
      :bounds="limitesMapa"
      :center="centroMapa"
      :feature="featureCampusAlegre"
      :markers="obterMarcadoresParaAlegre"
      @showActions="exibirProjetos"
    />

    <acoes-list v-if="isActionsListVisible" :projetos="projetos" />
  </div>
</template>

<script lang="ts">
import AppMapComponent from '~/components/UI/AppMap.vue'
import featureCampusAlegre from '~/assets/features/alegre.json'
import projetosAlegre from '~/assets/data/acoesAlegre.json'

export default {
  name: 'PaginaMapaAcoesAlegreSede',
  components: { AppMapComponent },

  data() {
    return {
      nomeCampus: 'ALEGRE',
      nomeUnidade: 'Campus Sede em Alegre',
      centroMapa: [-20.76161, -41.536],
      limitesMapa: [
        [-20.75885, -41.53911],
        [-20.76464, -41.53211],
      ],
      featureCampusAlegre,
      isActionsListVisible: false,
      projetos: [],
    }
  },

  computed: {
    obterMarcadoresParaAlegre() {
      return []
    },
  },
  methods: {
    exibirProjetos(flag: boolean) {
      this.projetos = projetosAlegre.sede
      this.isActionsListVisible = flag
    },
  },
}
</script>
