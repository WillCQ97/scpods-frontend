<!-- FIXME: corrigir nomenclaturas em inglês nessa página -->
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
          v-model="fieldAction"
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
          <v-btn-toggle id="ods-btn-toggle" v-model="indiceBtnObjetivo" group>
            <v-btn
              v-for="objetivo in objetivosOds"
              :key="objetivo.id"
              height="100px"
              width="100px"
            >
              <v-img :src="carregarImagemObjetivo(objetivo.id)"></v-img>
            </v-btn>
          </v-btn-toggle>
        </p>

        <!-- METAS -->
        <p><strong>Metas Nacionais por ODS*: </strong></p>

        <p v-if="!isObjetivoSelecionado()" style="color: #60646a">
          Clique em um Objetivo de Desenvolvimento Sustentável para que sejam
          exibidas as metas relacionadas.
        </p>

        <div v-if="isObjetivoSelecionado()" id="ods-selected">
          <div id="ods-selected-image">
            <v-img
              :src="carregarImagemObjetivo(indiceBtnObjetivo + 1)"
              width="50px"
              height="50px"
              contain
            ></v-img>
          </div>
          <p id="ods-selected-text">
            <strong>{{ getGoalDescription(indiceBtnObjetivo + 1) }}</strong>
          </p>
        </div>

        <v-list-item-group
          v-if="isObjetivoSelecionado()"
          v-model="targetSelectedIndex"
        >
          <v-list-item
            v-for="meta in getTargetsODS(indiceBtnObjetivo + 1)"
            :key="meta.id"
            two-line
          >
            <template #default="{ active }">
              <v-list-item-action>
                <v-checkbox :input-value="active"></v-checkbox>
              </v-list-item-action>

              <v-list-item-title>
                <strong>Meta {{ meta.id }} </strong>
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ meta.descricao }}
              </v-list-item-subtitle>
            </template>
          </v-list-item>
        </v-list-item-group>

        <!-- DEMAIS CAMPOS -->

        <v-textarea
          v-model="fieldDescription"
          label="Descrição e objetivos da sua ação"
          :rules="rules"
        ></v-textarea>
        <v-combobox
          v-model="fieldCenterValue"
          label="Centro onde a ação é desenvolvida"
          :items="fieldCenterItems"
          :rules="rules"
        ></v-combobox>

        <v-text-field
          v-model="fieldDepartament"
          label="Departamento da UFES onde a ação é desenvolvida"
          :rules="rules"
        ></v-text-field>

        <v-text-field
          v-model="fieldCoordinator"
          label="Nome do coordenador da ação"
          :rules="rules"
        ></v-text-field>
        <v-combobox
          v-model="fieldRoleValue"
          label="Vínculo do coordenador com a UFES, por exemplo, professor"
          :items="fieldRoleItems"
          :rules="rules"
        ></v-combobox>

        <v-text-field
          v-model="fieldEmail"
          label="E-mail do coordenador da ação"
          :rules="rules"
        ></v-text-field>
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
import objetivos from '~/assets/data/objetivosODS.json'

export default {
  name: 'NewActionFormComponent',
  props: {},
  data() {
    return {
      submission: {
        acao: '',
        centro: '',
        coordenador: '',
        departamento: '',
        descricao: '',
        email: '',
        vinculo: '',
      },
      fieldAction: '',
      fieldCenterItems: [
        'Centro de Artes (CAr)',
        'Centro de Ciências Agrárias e Engenharias (CCAE)',
        'Centro de Ciências Exatas (CCE)',
        'Centro de Ciências Exatas, Naturais e da Saúde (CCENS)',
        'Centro de Ciências Humanas e Naturais (CCHN)',
        'Centro de Ciências Jurídicas e Econômicas (CCJE)',
        'Centro de Ciências da Saúde (CCS)',
        'Centro de Educação (CE)',
        'Centro de Educação Física e Desportos (CEFD)',
        'Centro Tecnológico (CT)',
        'Centro Universitário Norte do Espírito Santo (Ceunes)',
      ],
      fieldCenterValue: '',
      fieldCoordinator: '',
      fieldDepartament: '',
      fieldDescription: '',
      fieldEmail: '',
      fieldRoleItems: [
        'Professor',
        'Servidor técnico-administrativo',
        'Aluno de pós-graduação',
        'Aluno de graduação',
      ],
      fieldRoleValue: '',
      dialogSuccess: false,
      dialogError: false,
      rules: [
        // fixme: validar as entradas informadas
        (value) => !!value || 'Este campo é obrigatório.',
      ],

      objetivosOds: objetivos,
      targetsSelected: [],
      indiceBtnObjetivo: undefined,
      targetSelectedIndex: undefined,
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
      this.fieldAction = ''
      this.fieldCenter = ''
      this.fieldCoordinator = ''
      this.fieldDepartament = ''
      this.fieldDescription = ''
      this.fieldEmail = ''
      this.fieldRoleValue = ''
      this.indiceBtnObjetivo = undefined
      this.targetSelectedIndex = undefined
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
    carregarImagemObjetivo(idObjetivo) {
      return '/img/ods_icons/' + idObjetivo + '.png'
    },
    obterObjetivoSelecionado() {
      return this.indiceBtnObjetivo + 1
    },
    getObjetivo(objetivoId: number) {
      return this.objetivosOds.filter((objetivo) => objetivo.id === objetivoId)
    },
    getGoalDescription(odsNumber) {
      return this.getObjetivo(odsNumber).titulo
    },
    getTargetsODS(odsNumber) {
      if (odsNumber == null) {
        return
      }

      const objetivo = this.getObjetivo(odsNumber)
      return objetivo.metas
    },
    isObjetivoSelecionado() {
      return this.indiceBtnObjetivo !== undefined
    },
    isTargetSelected() {
      return this.targetSelectedIndex !== undefined
    },
    sendForm() {
      const campos = [
        this.fieldAction,
        this.fieldCenterValue,
        this.fieldCoordinator,
        this.fieldDepartament,
        this.fieldDescription,
        this.fieldEmail,
        this.fieldRoleValue,
      ]

      for (const campo of campos) {
        if (campo.trim() === '') {
          this.dialogError = true
          return
        }
      }

      if (
        this.indiceBtnObjetivo === undefined ||
        this.targetSelectedIndex === undefined
      ) {
        this.dialogError = true
        return
      }

      this.$store.commit('submissions/add', {
        date: this.dateFormatted(),
        project: {
          id: this.$store.state.submissions.nextIndex,
          action: this.fieldAction,
          target_id: this.targetsSelected[this.targetSelectedIndex].id,
          description: this.fieldDescription,
          location: {
            center: this.fieldCenterValue,
            departament: this.fieldDepartament,
            coord: [this.submissionLocation.lat, this.submissionLocation.lng],
          },
          coordinator: {
            name: this.fieldCoordinator,
            role: this.fieldRoleValue,
            email: this.fieldEmail,
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
