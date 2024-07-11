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
                  v-model="campoTitulo"
                  label="Título ou nome da ação"
                  :rules="regras"
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
                <v-btn-toggle
                  id="ods-btn-toggle"
                  v-model="objetivoSelecionadoIndex"
                >
                  <v-btn
                    v-for="objetivo in objetivos"
                    :key="objetivo.id"
                    height="120"
                    width="120"
                  >
                    <the-goal-image
                      :cover="true"
                      :goal-code="objetivo.codigo"
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
                <p v-if="!isObjetivoSelecionado()" style="color: #60646a">
                  Selecione um Objetivo de Desenvolvimento Sustentável para que
                  sejam exibidas as metas relacionadas.
                </p>
                <div v-if="isObjetivoSelecionado()" id="ods-selected">
                  <div id="ods-selected-image">
                    <the-goal-image
                      :cover="true"
                      :goal-code="objetivoSelecionadoIndex + 1"
                      :height="50"
                      :width="50"
                    />
                  </div>
                  <p id="ods-selected-text">
                    <strong>{{
                      getTituloObjetivo(objetivoSelecionadoIndex + 1)
                    }}</strong>
                  </p>
                </div>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-item-group selected-class="bg-primary">
                  <v-select
                    label="Escolha a meta mais relevante para o projeto"
                    :items="getOpcoesMeta(objetivoSelecionadoIndex + 1)"
                    :disabled="targetDisabled"
                  ></v-select>
                </v-item-group>
              </v-col>
            </v-row>

            <!-- DEMAIS CAMPOS -->
            <v-row>
              <v-col>
                <v-text-field
                  label="Data de Início"
                  :rules="regras"
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
                  v-model="campoDescricao"
                  label="Descrição e objetivos da sua ação"
                  :rules="regras"
                ></v-textarea>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-select
                  label="Lotação da ação"
                  :items="opcoesLotacao"
                  :rules="regras"
                ></v-select>
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
                  v-model="campoNomeCoordenador"
                  label="Nome completo"
                  :rules="regras"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-combobox
                  v-model="campoVinculoCoordenador"
                  label="Vínculo com a UFES"
                  :items="campoOpcoesVinculo"
                  :rules="regras"
                ></v-combobox>
              </v-col>
              <v-col>
                <v-text-field
                  v-model="campoEmailCoordenador"
                  label="Endereço de e-mail"
                  :rules="regras"
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
                <v-select
                  v-on:update:menu="setUnidadeItems()"
                  v-model="campusSelecionado"
                  label="Campus"
                  item-title="description"
                  item-value="value"
                  :items="opcoesCampus"
                  :rules="regras"
                ></v-select>
              </v-col>
              <v-col>
                <v-select
                  v-on:update:menu="setLocalItems()"
                  v-model="unidadeSelecionada"
                  label="Unidade"
                  item-title="description"
                  item-value="value"
                  no-data-text="Selecione um Campus"
                  :items="opcoesUnidade"
                  :rules="regras"
                ></v-select>
              </v-col>

              <v-col>
                <v-select
                  v-model="localSelecionado"
                  label="Local"
                  item-title="description"
                  item-value="value"
                  no-data-text="Selecione uma Unidade"
                  :items="opcoesLocal"
                  :rules="regras"
                ></v-select>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-actions>
            <v-spacer />
            <v-btn @click="enviarFormulario"> Enviar submissão </v-btn>
            <v-btn @click="limparCamposFormulario"> Limpar campos </v-btn>
            <v-btn @click="clickBtnVoltar"> Voltar </v-btn>
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
import TheGoalImage from '~/components/UI/TheGoalImage.vue'
import type { Local } from '~/models/local.model'
import type { Objetivo } from '~/models/objetivo.model'
import type { Unidade } from '~/models/unidade.model'

definePageMeta({
  middleware: ['auth'],
})

export default {
  name: 'PaginaFormularioSubmissao',

  components: { TheCardDivider, TheGoalImage },

  async mounted() {
    // carrega os objetivos
    const { $api } = useNuxtApp()
    const odsStore = useObjetivoStore()

    if (odsStore.getLength != 0) {
      this.objetivos = odsStore.getObjetivos
    } else {
      const { data: objetivosResponse, error } =
        await $api.objetivos.getObjetivos()

      if (error) {
        // TODO: show dialog não foi carregar os objetivos
        return
      }

      odsStore.setObjetivos(
        objetivosResponse?.value ? objetivosResponse.value : ([] as Objetivo[]),
      )
    }
    // carrega as unidades do backend
    this.unidades = await $api.unidades.getUnidades()
  },

  data() {
    return {
      objetivos: [] as Objetivo[],
      unidades: [] as Unidade[],
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

      campoTitulo: '',
      campoDescricao: '',
      campoDataInicial: '', // https://vuetifyjs.com/en/components/date-inputs/
      campoDataFinal: '',
      campoNomeCoordenador: '',
      campoEmailCoordenador: '',
      campoVinculoCoordenador: '',

      campoOpcoesVinculo: [
        'Professor',
        'Servidor técnico-administrativo',
        'Aluno de pós-graduação',
        'Aluno de graduação',
        'Outro',
      ],
      opcoesCampus: [
        { value: 'ALEGRE', description: 'Alegre' },
        { value: 'GOIABEIRAS', description: 'Goiabeiras' },
        { value: 'MARUIPE', description: 'Maruípe' },
        { value: 'SAO_MATEUS', description: 'São Mateus' },
      ],
      opcoesUnidade: [] as Array<Object>,
      opcoesLocal: [] as Array<Object>,
      opcoesLotacao: [
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

      // dados da unidade e lotação
      campusSelecionado: '',
      unidadeSelecionada: '',
      localSelecionado: '',

      dialogSuccess: false,
      dialogError: false,
      regras: [(value) => !!value || 'Este campo é obrigatório.'],

      targetDisabled: true,
      objetivoSelecionadoIndex: null,
      metaSelecionadaIndex: null,
    }
  },
  methods: {
    addZeroToDate(number: number) {
      if (number <= 9) {
        return '0' + number
      }
      return number
    },
    clickBtnVoltar() {
      return navigateTo('/sugerir-acao/')
    },
    limparCamposFormulario() {
      this.campoTitulo = ''
      this.fieldCenter = ''
      this.campoNomeCoordenador = ''
      this.fieldDepartament = ''
      this.campoDescricao = ''
      this.campoEmailCoordenador = ''
      this.campoVinculoCoordenador = ''
      this.objetivoSelecionadoIndex = null
      this.metaSelecionadaIndex = null
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
    getTituloObjetivo(id: number) {
      const odsStore = useObjetivoStore()
      return odsStore.getTituloObjetivoById(id)
    },
    getMetasByObjetivoId(id: number) {
      const odsStore = useObjetivoStore()
      if (id == null) {
        return
      }
      return odsStore.getMetasByObjetivoId(id)
    },
    getOpcoesMeta(id: number) {
      if (
        this.objetivoSelecionadoIndex === null ||
        this.objetivoSelecionadoIndex === undefined
      ) {
        this.targetDisabled = true
        return []
      }

      this.targetDisabled = false

      return this.getMetasByObjetivoId(id)?.map(
        (target) =>
          ('Meta ' + target.id + ' - ' + target.descricao).substring(0, 127) +
          ' ...',
      )
    },
    isObjetivoSelecionado() {
      return (
        this.objetivoSelecionadoIndex !== null &&
        this.objetivoSelecionadoIndex !== undefined
      )
    },
    isMetaSelecionada() {
      return (
        this.metaSelecionadaIndex !== null &&
        this.metaSelecionadaIndex !== undefined
      )
    },
    setUnidadeItems() {
      if (!this.campusSelecionado) {
        this.opcoesUnidade = []
        return
      }

      this.opcoesUnidade = this.unidades
        .filter((un) => un.campus === this.campusSelecionado)
        .map((un) => ({ value: un.codigo, description: un.nome }))

      this.unidadeSelecionada = ''
      this.localSelecionado = ''
    },
    setLocalItems() {
      if (!this.unidadeSelecionada) {
        this.opcoesLocal = []
        return
      }

      const unidade = this.unidades
        .filter((un) => un.campus === this.campusSelecionado)
        .find((un) => un.codigo === this.unidadeSelecionada)

      if (!unidade) {
        this.opcoesLocal = []
      } else {
        this.opcoesLocal = unidade.locais.map((lc) => ({
          value: lc.id,
          description: this.getDescricaoLocais(lc),
        }))
      }
    },
    getDescricaoLocais(local: Local): string {
      let description = local.nomePrincipal
      if (local.nomeSecundario) {
        description += ' - ' + local.nomeSecundario
      }
      if (local.nomeTerciario) {
        description += ' - ' + local.nomeTerciario
      }
      return description
    },
    enviarFormulario() {
      const campos = [
        this.campoTitulo,
        this.fieldCenterValue,
        this.campoNomeCoordenador,
        this.fieldDepartament,
        this.campoDescricao,
        this.campoEmailCoordenador,
        this.campoVinculoCoordenador,
      ]

      for (const campo of campos) {
        if (campo.trim() === '') {
          this.dialogError = true
          return
        }
      }

      if (
        this.objetivoSelecionadoIndex === null ||
        this.metaSelecionadaIndex === null
      ) {
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
