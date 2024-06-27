<template>
  <div>
    <!-- INFORMAÇÕES DA AÇÃO/PROJETO -->
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>Informações da ação</v-card-title>
          <the-card-divider />
          <v-card-text>
            <v-row>
              <v-col>
                <p>
                  Informe os campos a seguir para submeter uma ação. Após
                  apreciação, ela poderá ser incluída no mapa.
                </p>
              </v-col>
            </v-row>

            <!-- TÍTULO -->
            <v-row>
              <v-col>
                <v-text-field
                  v-model="fieldTitulo"
                  label="Título ou nome da ação"
                  :rules="rules"
                ></v-text-field>
              </v-col>
            </v-row>

            <!-- OBJETIVOS -->
            <v-row>
              <v-col>
                <h2>
                  <strong>ODS relacionado*: </strong>
                </h2>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <!--
              TODO: Este toggle considera que os objetivos recebidos estarão ordenados
              para obter o objetivo a partir do indice dos botões criados
              Talvez criar um componente que receba o objetivo.id
            -->
                <v-btn-toggle id="ods-btn-toggle" v-model="btnGoalIndex">
                  <v-btn
                    v-for="goal in goals"
                    :key="goal.id"
                    height="120"
                    width="120"
                  >
                    <the-goal-image-component
                      :cover="true"
                      :goal-code="goal.codigo"
                      :height="100"
                      :width="100"
                    />
                  </v-btn>
                </v-btn-toggle>
              </v-col>
            </v-row>

            <!-- METAS -->
            <v-row>
              <v-col>
                <h2><strong>Metas Nacionais por ODS*: </strong></h2>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <p v-if="!isGoalSelected()" style="color: #60646a">
                  Clique em um Objetivo de Desenvolvimento Sustentável para que
                  sejam exibidas as metas relacionadas.
                </p>
                <div v-if="isGoalSelected()" id="ods-selected">
                  <div id="ods-selected-image">
                    <the-goal-image-component
                      :cover="true"
                      :goal-code="btnGoalIndex + 1"
                      :height="50"
                      :width="50"
                    />
                  </div>
                  <p id="ods-selected-text">
                    <strong>{{ getGoalTitle(btnGoalIndex + 1) }}</strong>
                  </p>
                </div>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-item-group selected-class="bg-primary">
                  <v-combobox
                    label="Escolha a meta mais relevante para o projeto"
                    :items="getMetaFieldItems(btnGoalIndex + 1)"
                    :disabled="targetDisabled"
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
                </v-item-group>
              </v-col>
            </v-row>

            <!-- DEMAIS CAMPOS -->
            <v-row>
              <v-col>
                <v-text-field
                  label="Data de Início"
                  :rules="rules"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  label="Data de Encerramento, se houver"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-textarea
                  v-model="fieldDescricao"
                  label="Descrição e objetivos da sua ação"
                  :rules="rules"
                ></v-textarea>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-combobox
                  label="Lotação da ação"
                  :items="loadLotacaoItems()"
                  :rules="rules"
                ></v-combobox>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!--  CAMPOS DO COORDENADOR -->
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>Informações do coordenador</v-card-title>
          <the-card-divider />
          <v-card-text>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="fieldNomeCoordenador"
                  label="Nome completo"
                  :rules="rules"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-combobox
                  v-model="fieldVinculoCoordenador"
                  label="Vínculo com a UFES"
                  :items="fieldOpcoesVinculo"
                  :rules="rules"
                ></v-combobox>
              </v-col>
              <v-col>
                <v-text-field
                  v-model="fieldEmailCoordenador"
                  label="Endereço de e-mail"
                  :rules="rules"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!--  CAMPOS DE LOCALIZAÇÃO E LOTAÇÃO -->
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            Local de realização, nos limites da universidade
          </v-card-title>
          <the-card-divider />
          <v-card-text>
            <v-row>
              <v-col cols="3">
                <v-combobox
                  v-on:update:menu="setUnidadeItems()"
                  v-model="campusSelecionado"
                  label="Campus"
                  :items="fieldOpcoesCampus"
                  :rules="rules"
                ></v-combobox>
              </v-col>
              <v-col>
                <v-combobox
                  v-model="unidadeSelecionada"
                  label="Unidade"
                  :items="fieldOpcoesUnidade"
                  :rules="rules"
                ></v-combobox>
              </v-col>

              <v-col>
                <v-combobox
                  v-model="localSelecionado"
                  label="Local"
                  :items="fieldOpcoesLocal"
                  :rules="rules"
                ></v-combobox>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-actions>
            <v-spacer />
            <v-btn @click="sendForm"> Enviar submissão </v-btn>
            <v-btn @click="cleanFormFields"> Limpar campos </v-btn>
            <v-btn @click="btnVoltar"> Voltar </v-btn>
            <v-spacer />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- DIÁLOGOS DE MENSAGENS -->
    <!-- TODO: pode ser utilizado um diálogo apenas -->
    <v-dialog v-model="dialogSuccess" width="500">
      <v-card>
        <v-card-title>Sucesso!</v-card-title>
        <v-card-text>
          Sua ação foi enviada para contemplação pela comissão avaliadora.
        </v-card-text>

        <the-card-divider />

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

        <the-card-divider />

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="dialogError = false">Voltar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import TheCardDivider from '~/components/UI/TheCardDivider.vue'
import TheGoalImageComponent from '~/components/UI/TheGoalImage.vue'
import type { Objetivo } from '~/models/objetivo.model'

const { $api } = useNuxtApp()

// TODO: criar lógica de obtenção dos objetivos
const odsStore = useObjetivoStore() // TODO: verificar erro de acesso ao pinia antes do mesmo estar ativo
if (odsStore.getLength == 0) {
  const { data: objetivosResponse, error } = await $api.objetivos.getObjetivos()

  if (error) {
    // show dialog não foi carregar os objetivos
    //return
  }

  odsStore.setObjetivos(
    objetivosResponse?.value ? objetivosResponse.value : ([] as Objetivo[]),
  )
}

definePageMeta({
  middleware: [], //todo: adicionar auth
})

export default {
  name: 'PaginaFormularioSugerirNovaAcao',
  components: { TheCardDivider, TheGoalImageComponent },
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

      fieldTitulo: '',
      fieldDescricao: '',
      fieldDataInicial: '', // https://vuetifyjs.com/en/components/date-inputs/
      fieldDataFinal: '',
      fieldNomeCoordenador: '',
      fieldEmailCoordenador: '',
      fieldVinculoCoordenador: '',

      fieldOpcoesVinculo: [
        'Professor',
        'Servidor técnico-administrativo',
        'Aluno de pós-graduação',
        'Aluno de graduação',
        'Outro',
      ],
      fieldOpcoesCampus: ['Alegre', 'Goiabeiras', 'Maruípe', 'São Mateus'],
      fieldOpcoesUnidade: [] as Array<string>,
      fieldOpcoesLocal: [],

      // dados da unidade e lotação
      campusSelecionado: '',
      unidadeSelecionada: '',
      localSelecionado: '',

      fieldCenterValue: '',
      fieldDepartament: '',

      dialogSuccess: false,
      dialogError: false,
      rules: [(value) => !!value || 'Este campo é obrigatório.'],

      goals: odsStore.getObjetivos,
      targetsSelected: [],
      targetDisabled: true,
      btnGoalIndex: null,
      targetSelectedIndex: null,
    }
  },
  methods: {
    addZeroToDate(number: number) {
      if (number <= 9) {
        return '0' + number
      }
      return number
    },
    btnVoltar() {
      return navigateTo('/sugerir-acao/')
    },
    cleanFormFields() {
      this.fieldTitulo = ''
      this.fieldCenter = ''
      this.fieldNomeCoordenador = ''
      this.fieldDepartament = ''
      this.fieldDescricao = ''
      this.fieldEmailCoordenador = ''
      this.fieldVinculoCoordenador = ''
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
    getSelectedGoal() {
      return this.btnGoalIndex + 1
    },
    getGoal(id: number) {
      return odsStore.getObjetivoById(id)
    },
    getGoalTitle(id: number) {
      return odsStore.getTituloObjetivoById(id)
    },
    getGoalTargets(id: number) {
      if (id == null) {
        return
      }
      return odsStore.getMetasByObjetivoId(id)
    },
    getMetaFieldItems(id: number) {
      if (this.btnGoalIndex === null || this.btnGoalIndex === undefined) {
        this.targetDisabled = true
        return []
      }

      this.targetDisabled = false

      return this.getGoalTargets(id)?.map(
        (target) =>
          ('Meta ' + target.id + ' - ' + target.descricao).substring(0, 117) +
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
    setUnidadeItems() {
      if (!this.campusSelecionado) {
        this.fieldOpcoesUnidade = []
        return
      }

      if (this.campusSelecionado === 'Alegre') {
        this.fieldOpcoesUnidade = [
          'Campus Alegre',
          'Área Experimental em Rive, Alegre',
          'Unidade em Jerônimo Monteiro',
          'Área Experimental em Jerônimo Monteiro',
          'Área Experimental em São José do Calçado',
        ]
      }
      if (this.campusSelecionado === 'Goiabeiras') {
        this.fieldOpcoesUnidade = ['Campus de Goiabeiras']
      }
      if (this.campusSelecionado === 'Maruípe') {
        this.fieldOpcoesUnidade = ['Campus de Maruípe']
      }
      if (this.campusSelecionado === 'São Mateus') {
        this.fieldOpcoesUnidade = ['Campus de São Mateus']
      }
    },
    loadLocalItems() {
      return [
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
      ]
    },
    loadLotacaoItems() {
      return [
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
      ]
    },
    sendForm() {
      const campos = [
        this.fieldTitulo,
        this.fieldCenterValue,
        this.fieldNomeCoordenador,
        this.fieldDepartament,
        this.fieldDescricao,
        this.fieldEmailCoordenador,
        this.fieldVinculoCoordenador,
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

      this.dialogSuccess = true
    },
  },
}
</script>

<style scoped>
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
