<template>
  <div>
    <v-card>
      <v-card-title>Cadastro de ação</v-card-title>
      <hr />

      <v-card-text>
        <p>
          Informe os campos a seguir para submeter uma ação e, após apreciação
          da comissão, ela poderá ser incluída no mapa.
        </p>

        <!-- AÇÃO -->
        <v-text-field
          v-model="fieldTitle"
          label="Título ou nome da ação"
          :rules="rules"
        ></v-text-field>

        <!-- OBJETIVOS -->

        <p>
          <strong>ODS relacionado*: </strong>
          <!--
            TODO: Este toggle considera que os objetivos recebidos estarão ordenados
            para obter o objetivo a partir do indice dos botões criados
            Talvez criar um componente que receba o objetivo.id
           -->
        </p>

        <v-btn-toggle id="ods-btn-toggle" v-model="btnGoalIndex">
          <v-btn v-for="goal in goals" :key="goal.id" height="120" width="120">
            <v-img :src="loadGoalIcon(goal.id)" height="100" width="100" cover>
            </v-img>
          </v-btn>
        </v-btn-toggle>

        <!-- METAS -->
        <p><strong>Metas Nacionais por ODS*: </strong></p>

        <p v-if="!isGoalSelected()" style="color: #60646a">
          Clique em um Objetivo de Desenvolvimento Sustentável para que sejam
          exibidas as metas relacionadas.
        </p>

        <div v-if="isGoalSelected()" id="ods-selected">
          <div id="ods-selected-image">
            <v-img
              :src="loadGoalIcon(btnGoalIndex + 1)"
              width="50px"
              height="50px"
              contain
            ></v-img>
          </div>
          <p id="ods-selected-text">
            <strong>{{ getGoalDescription(btnGoalIndex + 1) }}</strong>
          </p>
        </div>
        <v-item-group selected-class="bg-primary">
          <v-row>
            <v-col>
              <v-combobox
                :items="getMetaFieldItems(btnGoalIndex + 1)"
              ></v-combobox>
              <!--
              <v-item v-slot="{ isSelected, selectedClass, toggle }">
                <v-card
                  :class="['d-flex align-center', selectedClass]"
                  height="200"
                  dark
                  @click="toggle"
                >
                  <div class="text-h3 flex-grow-1 text-center">
                    {{ isSelected ? 'Selected' : 'Click Me!' }}
                  </div>
                </v-card>
              </v-item>
              -->
            </v-col>
          </v-row>
        </v-item-group>

        <!-- DEMAIS CAMPOS -->
        <v-row>
          <v-col>
            <v-text-field label="Data de Início" :rules="rules"></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              label="Data de Encerramento, se houver"
              :rules="rules"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-textarea
          v-model="fieldDescription"
          label="Descrição e objetivos da sua ação"
          :rules="rules"
        ></v-textarea>

        <!--  CAMPOS DO COORDENADOR -->
        <v-text-field
          v-model="fieldCoordinatorName"
          label="Nome do coordenador da ação"
          :rules="rules"
        ></v-text-field>
        <v-combobox
          v-model="fieldCoordinatorRole"
          label="Vínculo do coordenador com a UFES, por exemplo, professor"
          :items="fieldRoleItems"
          :rules="rules"
        ></v-combobox>

        <v-text-field
          v-model="fieldCoordinatorEmail"
          label="E-mail do coordenador da ação"
          :rules="rules"
        ></v-text-field>

        <!--  CAMPOS DE LOCALIZAÇÃO E LOTAÇÃO -->
        <v-row>
          <v-col>
            <v-combobox
              label="Unidade onde a ação é realizada"
              :items="fieldUnidadeItems"
              :rules="rules"
            ></v-combobox>
          </v-col>
          <v-col>
            <v-combobox
              label="Local onde a ação é desenvolvida"
              :items="fieldLocalItems"
              :rules="rules"
            ></v-combobox>
          </v-col>
        </v-row>
        <v-combobox
          label="Lotação da ação"
          :items="fieldLotacaoItems"
          :rules="rules"
        ></v-combobox>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn @click="sendForm"> Enviar proposta de ação </v-btn>
        <v-btn @click="cleanFormFields"> Limpar campos </v-btn>
        <v-btn @click="btnVoltar"> Voltar </v-btn>
        <v-spacer />
      </v-card-actions>
    </v-card>

    <!-- DIÁLOGOS DE MENSAGENS -->
    <v-dialog v-model="dialogSuccess" width="500">
      <v-card>
        <v-card-title>Sucesso!</v-card-title>
        <v-card-text>
          Sua ação foi enviada para contemplação pela comissão avaliadora.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="dialogSuccess = false"> OK </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogError" width="500">
      <v-card>
        <v-card-title>Erro!</v-card-title>
        <v-card-text>
          Existem campos que não foram informados. <br />
          Por favor, verifique-os e tente novamente!
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="dialogError = false">Voltar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import goals from '~/assets/data/odsGoals.json'

export default {
  name: 'NewActionFormComponent',
  props: {},
  data() {
    return {
      submissao: {
        titulo: '',
        descricao: '',
        dataInicio: '',
        dataEncerramento: null,
        meta: {
          id: '',
        },
        coordenador: {
          nome: '',
          email: '',
          tipoVinculo: '',
        },
        local: {
          id: '',
        },
        lotacao: {
          id: '',
        },
      },

      fieldTitle: '',
      fieldDescription: '',
      fieldInitialDate: '',
      fieldEndDate: '',
      fieldCoordinatorName: '',
      fieldCoordinatorEmail: '',
      fieldCoordinatorRole: '',

      // lotação
      fieldUnidadeItems: [
        'Campus Alegre',
        'Campus de Goiabeiras',
        'Campus Maruípe',
        'Campus São Mateus',
        'Área Experimental em Rive, Alegre',
        'Unidade em Jerônimo Monteiro',
        'Área Experimental em Jerônimo Monteiro',
        'Área Experimental em São José do Calçado',
      ],
      fieldLocalItems: [
        'Anatomia Animal',
        'Biologia',
        'Biotecnologia',
        'SUGRAD',
        'Cemuni 1',
        'Cemuni 2',
        'Cemuni 3',
        'Cantina / Copiadora',
        'Prédio da Oceanografia',
        'Oceanografia - Prédio da Mata',
        'CT 1',
        'CT 2',
      ],
      fieldLotacaoItems: [
        'Centro de Ciências Agrárias e Engenharias',
        'Centro de Ciências Exatas, Naturais e da Saúde',
        'Centro Universitário Norte do Espírito Santo',
        'Centro de Ciências da Saúde',
        'Centro de Artes',
        'Centro de Ciências Exatas',
        'Centro de Ciências Humanas e Naturais',
        'Centro de Ciências Jurídicas e Econômicas',
        'Centro de Educação',
        'Centro de Educação Física e Desportos',
        'Centro Tecnológico',
        'Hospital Universitário Cassiano Antônio Moraes',
        'Reitoria (incluindo Pró-Reitorias, Secretarias, Superintendências, Institutos, Bibliotecas, etc.)',
      ],
      fieldRoleItems: [
        'Professor',
        'Servidor técnico-administrativo',
        'Aluno de pós-graduação',
        'Aluno de graduação',
      ],

      fieldCenterValue: '',
      fieldDepartament: '',

      dialogSuccess: false,
      dialogError: false,
      rules: [(value) => !!value || 'Este campo é obrigatório.'],

      goals,
      targetsSelected: [],
      btnGoalIndex: null,
      targetSelectedIndex: null,
    }
  },
  methods: {
    addZeroToDate(number) {
      if (number <= 9) {
        return '0' + number
      }
      return number
    },
    btnVoltar() {
      return navigateTo('/sugerir-acao/')
    },
    cleanFormFields() {
      this.fieldTitle = ''
      this.fieldCenter = ''
      this.fieldCoordinatorName = ''
      this.fieldDepartament = ''
      this.fieldDescription = ''
      this.fieldCoordinatorEmail = ''
      this.fieldCoordinatorRole = ''
      this.btnGoalIndex = null
      this.targetSelectedIndex = null
    },
    dateFormatted() {
      const date = new Date()
      return (
        date.getFullYear() +
        '-' +
        this.addZeroToDate(date.getMonth() + 1) +
        '-' +
        this.addZeroToDate(date.getDate())
      )
    },
    loadGoalIcon(goalId) {
      return '/img/ods_icons/' + goalId + '.png'
    },
    getSelectedGoal() {
      return this.btnGoalIndex + 1
    },
    getGoal(id: number) {
      return this.goals.filter((goal) => goal.id === id)
    },
    getGoalDescription(odsNumber) {
      return this.getGoal(odsNumber)[0].titulo
    },
    getTargetsODS(odsNumber) {
      if (odsNumber == null) {
        return
      }

      const objetivo = this.getGoal(odsNumber)
      return objetivo[0].metas
    },
    getMetaFieldItems(odsNumber) {
      if (this.btnGoalIndex === null || this.btnGoalIndex === undefined) {
        return []
      }

      const objetivo = this.getGoal(odsNumber)
      return objetivo[0].metas.map(
        (meta) =>
          ('Meta ' + meta.id + ' - ' + meta.descricao).substring(0, 117) +
          ' ...',
      )
    },
    isGoalSelected() {
      return this.btnGoalIndex !== null && this.btnGoalIndex !== undefined
    },
    isTargetSelected() {
      return (
        this.targetSelectedIndex !== null &&
        this.targetSelectedIndex !== undefined
      )
    },
    sendForm() {
      const campos = [
        this.fieldTitle,
        this.fieldCenterValue,
        this.fieldCoordinatorName,
        this.fieldDepartament,
        this.fieldDescription,
        this.fieldCoordinatorEmail,
        this.fieldCoordinatorRole,
      ]

      for (const campo of campos) {
        if (campo.trim() === '') {
          this.dialogError = true
          return
        }
      }

      if (this.btnGoalIndex === null || this.targetSelectedIndex === null) {
        this.dialogError = true
        return
      }

      this.$store.commit('submissions/add', {
        date: this.dateFormatted(),
        project: {
          id: this.$store.state.submissions.nextIndex,
          action: this.fieldTitle,
          target_id: this.targetsSelected[this.targetSelectedIndex].id,
          description: this.fieldDescription,
          location: {
            center: this.fieldCenterValue,
            departament: this.fieldDepartament,
            coord: [this.submissionLocation.lat, this.submissionLocation.lng],
          },
          coordinator: {
            name: this.fieldCoordinatorName,
            role: this.fieldCoordinatorRole,
            email: this.fieldCoordinatorEmail,
          },
        },
      })

      this.dialogSuccess = true
    },
  },
}
</script>

<style>
#ods-btn-toggle {
  display: flex;
  flex-wrap: wrap;
  min-height: 240px;
}

#ods-selected {
  display: flex;
}

#ods-selected-text {
  margin: auto;
  align-self: center;
  font-size: xx-large;
  padding-left: 5px;
}
</style>
