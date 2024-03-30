<template>
  <div>
    <actions-map-component
      :title="nomeUnidade"
      :bounds="limitesAlegre"
      :center="centroAlegre"
      :feature="featureCampusAlegre"
      :markers="obterMarcadoresParaAlegre"
      @show-actions="exibirProjetos"
    />

    <actions-list-component v-if="isActionsListVisible" :actions="projetos" />
  </div>
</template>

<script lang="ts">
import ActionsListComponent from '~/components/Actions/ActionsList.vue'
import ActionsMapComponent from '~/components/Actions/ActionsMap.vue'

import featureCampusAlegre from '~/assets/features/alegre.json'
import projetosAlegre from '~/assets/data/acoesAlegre.json'

export default {
  name: 'PaginaMapaAcoesAlegreSede',
  components: { ActionsListComponent, ActionsMapComponent },

  data() {
    return {
      nomeCampus: 'ALEGRE',
      nomeUnidade: 'Campus Sede em Alegre',
      centroAlegre: [-20.76161, -41.536],
      limitesAlegre: [
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
      this.isActionsListVisible = flag
      this.projetos = projetosAlegre.sede
    },
  },
}
</script>
