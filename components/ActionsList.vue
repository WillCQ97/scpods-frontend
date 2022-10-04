<template>
  <v-card class="mx-auto" max-width="800" tile>
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
    <v-dialog v-model="dialogSuccess" width="500">
      <v-card>
        <v-card-title>Projeto X</v-card-title>
        <v-card-text> Informações completas sobre o projeto X. </v-card-text>

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
    }
  },
  methods: {
    showActionInfo(index) {
      this.dialogSuccess = true
      console.log('Info projeto ' + index)
    },
    getGoalName(id) {
      return this.$store.getters.getGoalById(id).name
    },
  },
}
</script>
