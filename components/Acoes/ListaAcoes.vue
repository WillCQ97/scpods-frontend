<template>
  <v-card class="mx-auto" max-width="800" tile>
    <!-- LISTA COM OS PROJETOS-->
    <v-list>
      <v-subheader>{{ title }}</v-subheader>

      <v-list-item-group v-model="selectedItem" color="primary">
        <v-list-item v-if="projects.length === 0">
          <v-list-item-content>
            <v-list-item-title>
              Não foi possível carregar a lista com os projetos.
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-for="(project, index) in projects" :key="index" two-line>
          <v-list-item-content>
            <v-list-item-title>
              <strong>Ação: </strong>{{ project.titulo }}
            </v-list-item-title>

            <v-list-item-subtitle>
              <strong>ODS: </strong>
              {{ project.meta.id }}. {{ getTituloObjetivo(project.meta.id) }}
              <br />
              <strong>Descrição: </strong>{{ project.descricao }}
              <br />
              <strong>Coordenador: </strong>
              {{ project.coordenador.nome }}<br />
              <br />
            </v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn @click="showActionInfo(index)"> info </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list-item-group>
    </v-list>

    <!-- CAIXA DE DIÁLOGO QUE EXIBE AS INFORMAÇÕES -->
    <v-dialog v-model="dialogSuccess" width="80vh">
      <v-card>
        <v-card-title> Informações detalhadas sobre o projeto </v-card-title>

        <v-card-text>
          <strong>Ação:</strong> {{ selectedProject.titulo }}
          <br />
          <strong>ODS:</strong>
          {{ selectedProject.meta.id.split('.')[0] }} -
          {{ getTituloObjetivo(selectedProject.meta.id.split('.')[0]) }}
          <br />
          <strong>Meta ODS: </strong>
          {{ selectedProject.meta.id }}
          -
          {{ getTargetDescription(selectedProject.meta.id) }}
          <br />
          <strong>Descrição: </strong>{{ selectedProject.descricao }}
          <br />
          <strong>Centro: </strong>
          {{ selectedProject.departamento.centro.nome }}
          <br />
          <strong>Departamento: </strong>
          {{ selectedProject.departamento.nome }}
          <br />
          <strong>Coordenador: </strong>
          {{ selectedProject.coordenador.nome }}
          <br />
          <strong>Vínculo com a UFES: </strong>
          {{ selectedProject.coordenador.vinculo.tipo }}
          <br />
          <strong>Data de Início: </strong>
          {{ selectedProject.data_inicio }}
          <div v-if="selectedProject.data_fim">
            <strong>Data Fim: </strong>
            {{ selectedProject.data_fim }} <br />
          </div>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="dialogSuccess = false"> OK </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
export default {
  name: 'ListaAcoesComponent',

  props: {
    title: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      dialogSuccess: false,
      projects: this.$store.getters.getAcoesAlegre.sede,
      selectedItem: undefined,
      selectedProject: {
        id: '1',
        titulo: '',
        meta: {
          id: '1.1',
        },
        departamento: {
          nome: '',
          centro: {
            nome: '',
          },
          local: '',
        },
        coordenador: {
          nome: '',
          vinculo: {
            tipo: '',
          },
        },
        data_inicio: '',
        data_fim: undefined,
      },
    }
  },

  methods: {
    showActionInfo(index) {
      this.dialogSuccess = true
      this.selectedProject = this.projects[index]
    },
    getTituloObjetivo(idMeta) {
      const idObjetivo = parseInt(idMeta)
      return this.$store.getters.getObjetivoById(idObjetivo).titulo
    },
    getTargetDescription(idMeta) {
      // return this.$store.getters.getMetaById(idMeta)
      return 'vazio'
    },
  },
}
</script>
