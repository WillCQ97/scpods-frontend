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
              <strong>Ação: </strong>{{ project.action }}
            </v-list-item-title>

            <v-list-item-subtitle>
              <strong>ODS: </strong>
              {{ project.target_id.split('.')[0] }}.
              {{ getGoalName(project.target_id.split('.')[0]) }} <br />
              <strong>Descrição: </strong>{{ project.description }}
              <br />
              <strong>Coordenador: </strong>
              {{ project.coordinator.name }}<br />
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
          <strong>Ação:</strong> {{ selectedProject.action }} <br />
          <strong>ODS:</strong>
          {{ selectedProject.target_id.split('.')[0] }} -
          {{ getGoalName(selectedProject.target_id.split('.')[0]) }} <br />
          <strong>Meta ODS: </strong>
          {{ selectedProject.target_id }}
          -
          {{ getTargetDescription(selectedProject.target_id) }}<br />
          <strong>Descrição: </strong>{{ selectedProject.description }}
          <br />
          <strong>Centro: </strong>
          {{ selectedProject.location.center }}
          <br />
          <strong>Departamento: </strong>
          {{ selectedProject.location.departament }}
          <br />
          <strong>Coordenador: </strong>
          {{ selectedProject.coordinator.name }}<br />
          <strong>Vínculo com a UFES: </strong>
          {{ selectedProject.coordinator.role }} <br />
          <strong>E-mail: </strong>
          {{ selectedProject.coordinator.email }}
          <br />
          <!--strong>Data de envio: </strong>{{ date }}<br /-->
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
import projects from '~/assets/data/alegre_actions.json'

export default {
  name: 'ActionsListComponent',

  props: {
    title: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      dialogSuccess: false,
      projects,
      selectedItem: undefined,
      selectedProject: {
        id: '1',
        action: '',
        target_id: '1.1',
        location: {
          center: '',
          departament: '',
          coord: '',
        },
        coordinator: {
          name: '',
          role: '',
        },
      },
    }
  },

  methods: {
    showActionInfo(index) {
      this.dialogSuccess = true
      this.selectedProject = projects[index]
    },
    getGoalName(id) {
      return this.$store.getters.getGoalById(id).name
    },
    getTargetDescription(id) {
      return this.$store.getters.getTargetById(id).description
    },
  },
}
</script>
