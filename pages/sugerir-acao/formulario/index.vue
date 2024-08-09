<template>
  <v-form v-model="valid" ref="form" @submit.prevent="enviarFormulario">
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
                  :rules="[obrigatorioValidator, naoVazioValidator]"
                ></v-text-field>
              </v-col>
            </v-row>

            <!-- OBJETIVOS -->
            <v-row>
              <v-col>
                <h2>
                  <strong> ODS relacionado </strong>
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
                <h2>
                  <strong> Metas Nacionais por ODS </strong>
                </h2>
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
                      :goal-code="getCodigoObjetivo(objetivoSelecionadoIndex)"
                      :height="50"
                      :width="50"
                    />
                  </div>
                  <p id="ods-selected-text">
                    <strong>{{
                      getTituloObjetivo(objetivoSelecionadoIndex! + 1)
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
                    v-model="idMetaSelecionada"
                    item-title="description"
                    item-value="value"
                    :items="getOpcoesMeta(objetivoSelecionadoIndex! + 1)"
                    :disabled="showOpcoesMetas"
                  ></v-select>
                </v-item-group>
              </v-col>
            </v-row>

            <!-- DEMAIS CAMPOS -->
            <v-row>
              <v-col>
                <v-text-field
                  v-model="campoDataInicial"
                  label="Data de Início"
                  :rules="[obrigatorioValidator, formatoDataValidator]"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  v-model="campoDataFinal"
                  label="Data de Encerramento, se houver"
                  :rules="[formatoDataValidator]"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-textarea
                  v-model="campoDescricao"
                  label="Descrição e objetivos da sua ação"
                  :rules="[obrigatorioValidator, naoVazioValidator]"
                ></v-textarea>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-select
                  v-model="lotacaoSelecionada"
                  label="Lotação da ação"
                  item-title="description"
                  item-value="value"
                  :items="opcoesLotacao"
                  :rules="[obrigatorioValidator]"
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
                  :rules="[obrigatorioValidator, naoVazioValidator]"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                Para informar um vínculo diferente das opções disponíveis, basta
                preencher o campo abaixo com valor desejado.
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-combobox
                  v-model="campoVinculoCoordenador"
                  v-model:search="search"
                  :hide-no-data="false"
                  label="Vínculo com a Ufes"
                  :items="campoOpcoesVinculo"
                  :rules="[obrigatorioValidator, naoVazioValidator]"
                >
                  <template v-slot:no-data>
                    <v-list-item>
                      <v-list-item-title>
                        Opção "<strong>{{ search }}</strong
                        >" não reconhecida. Pressione <kbd>enter</kbd> para
                        adicionar
                      </v-list-item-title>
                    </v-list-item>
                  </template>
                </v-combobox>
              </v-col>
              <v-col>
                <v-text-field
                  v-model="campoEmailCoordenador"
                  label="Endereço de e-mail"
                  :rules="[obrigatorioValidator, emailValidator]"
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
                  :rules="[obrigatorioValidator]"
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
                  :rules="[obrigatorioValidator]"
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
                  :rules="[obrigatorioValidator]"
                ></v-select>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-actions>
            <v-spacer />
            <v-btn type="submit"> Enviar submissão </v-btn>
            <v-btn @click="reset"> Limpar campos </v-btn>
            <v-btn @click="clickBtnVoltar"> Voltar </v-btn>
            <v-spacer />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-form>
  <!-- TEMPLATE DO DIÁLOGO -->
  <v-dialog v-model="isDialogVisible" width="500">
    <v-card>
      <v-card-title>{{ dialog.title }}</v-card-title>
      <the-card-divider />
      <v-card-text>
        {{ dialog.message }}
      </v-card-text>

      <the-card-divider />

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="isDialogVisible = false">OK</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import TheCardDivider from '~/components/UI/TheCardDivider.vue'
import TheGoalImage from '~/components/UI/TheGoalImage.vue'
import {
  SubmissaoInputBuilder,
  type SubmissaoInputInterface,
} from '~/models/input/submissao.input.model'
import type { Local } from '~/models/local.model'
import type { Objetivo } from '~/models/objetivo.model'
import type { SelectModelInterface } from '~/models/select/select.model'
import type { Unidade } from '~/models/unidade.model'

import {
  formatoDataValidator,
  obrigatorioValidator,
  naoVazioValidator,
  emailValidator,
} from '~/utils/custom.validators'

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

    // carrega informações das unidades e de lotações do backend
    this.opcoesLotacao = await $api.lotacoes.getOpcoesLotacao()
    this.opcoesCampus = await $api.unidades.getOpcoesCampus()
    this.unidades = await $api.unidades.getUnidades()
  },

  data() {
    return {
      valid: false,
      isDialogVisible: false,
      dialog: {
        title: '',
        message: '',
      },
      search: null,

      objetivos: [] as Objetivo[],
      unidades: [] as Unidade[],

      opcoesCampus: [] as Array<SelectModelInterface<string>>,
      opcoesUnidade: [] as Array<SelectModelInterface<string>>,
      opcoesLocal: [] as Array<SelectModelInterface<number>>,
      opcoesLotacao: [] as Array<SelectModelInterface<number>>,
      campoOpcoesVinculo: [
        //todo: adicionar valores enum
        'Professor',
        'Servidor técnico-administrativo',
        'Aluno de pós-graduação',
        'Aluno de graduação',
      ],
      campoTitulo: '',
      campoDescricao: '',
      campoDataInicial: '', // https://vuetifyjs.com/en/components/date-inputs/
      campoDataFinal: '',
      campoNomeCoordenador: '',
      campoEmailCoordenador: '',
      campoVinculoCoordenador: '',

      // dados da unidade e lotação
      campusSelecionado: '',
      unidadeSelecionada: '',
      localSelecionado: null as number | null,
      lotacaoSelecionada: null as number | null,

      showOpcoesMetas: true,
      objetivoSelecionadoIndex: null,
      idMetaSelecionada: null,
    }
  },
  methods: {
    async validate() {
      const { valid } = await this.$refs.form.validate()

      if (valid) alert('Form is valid')
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    clickBtnVoltar() {
      return navigateTo('/sugerir-acao/')
    },
    getCodigoObjetivo(index: number | null) {
      if (!index) return ''
      return (index + 1).toString()
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
        this.showOpcoesMetas = true
        return []
      }

      this.showOpcoesMetas = false

      return this.getMetasByObjetivoId(id)?.map((meta) => ({
        description:
          ('Meta ' + meta.id + ' - ' + meta.descricao).substring(0, 127) +
          ' ...',
        value: meta.id,
      }))
    },
    isObjetivoSelecionado() {
      return (
        this.objetivoSelecionadoIndex !== null &&
        this.objetivoSelecionadoIndex !== undefined
      )
    },
    isMetaSelecionada() {
      return (
        this.idMetaSelecionada !== null && this.idMetaSelecionada !== undefined
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
      this.localSelecionado = null
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
    mapTipoVinculo(vinculo: string): string {
      switch (vinculo) {
        case 'Professor':
          return 'PROFESSOR'
        case 'Servidor técnico-administrativo':
          return 'TECNICO_ADM'
        case 'Aluno de pós-graduação':
          return 'ALUNO_POS'
        case 'Aluno de graduação':
          return 'ALUNO_GRADUACAO'
        default:
          return 'OUTRO'
      }
    },
    montarSubmissao(): SubmissaoInputInterface {
      let submissao = SubmissaoInputBuilder()
      submissao.titulo = this.campoTitulo.trim()
      submissao.descricao = this.campoDescricao.trim()
      submissao.dataInicio = this.campoDataInicial
      submissao.dataEncerramento = this.campoDataFinal

      submissao.metaId = this.idMetaSelecionada!
      submissao.localId = this.localSelecionado!
      submissao.lotacaoId = this.lotacaoSelecionada!

      submissao.coordenador.nome = this.campoNomeCoordenador.trim()
      submissao.coordenador.email = this.campoEmailCoordenador
      submissao.coordenador.tipoVinculo = this.mapTipoVinculo(
        this.campoVinculoCoordenador,
      )
      submissao.coordenador.descricaoVinculo =
        submissao.coordenador.tipoVinculo === 'OUTRO'
          ? this.campoVinculoCoordenador
          : null
      return submissao
    },
    showDialog(title: string, message: string) {
      this.dialog.title = title
      this.dialog.message = message
      this.isDialogVisible = true
    },
    async enviarFormulario() {
      const submissao = this.montarSubmissao()

      const { $api } = useNuxtApp()

      try {
        await $api.acoes.enviarSubmissao(submissao)

        this.showDialog(
          'Sucesso!',
          'Sua ação foi enviada para contemplação pela comissão avaliadora.',
        )
      } catch (e) {
        this.showDialog(
          'Erro desconhecido!',
          'Por favor, tente novamente mais tarde!',
        )
      }
    },
  },
}
</script>

<style scoped>
.required-field {
  color: red;
}

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
