import { Store } from 'vuex'

import listaObjetivos from '~/assets/data/objetivosODS'

import listaAcoesAlegre from '~/assets/data/alegre/acoes'
// import listaInfoAlegre from '~/assets/data/alegre/info'

const createStore = () => {
  return new Store({
    state: {
      objetivos: [],
      acoesAlegre: {},

      infos: {},
    },

    mutations: {
      setObjetivos(state, objetivos) {
        state.objetivos = objetivos
      },

      setAcoesAlegre(state, acoes) {
        state.acoesAlegre = acoes
      },
      setInfo(state, campus, infos) {
        state.infos[campus] = infos
      },
    },

    actions: {
      nuxtServerInit(vuexContext, context) {
        return new Promise((resolve, reject) => {
          vuexContext.commit('setObjetivos', listaObjetivos)

          vuexContext.commit('setAcoesAlegre', listaAcoesAlegre)
          // vuexContext.commit('setInfoAlegre', listaInfoAlegre)

          resolve()
        })
      },

      setInfo(vuexContext, campus, infos) {
        vuexContext.commit('setInfo', campus, infos)
      },
    },

    getters: {
      getObjetivos(state) {
        return state.objetivos
      },
      getObjetivoById: (state) => (id) => {
        return state.objetivos.find((objetivo) => objetivo.id === id)
      },
      getMetaById: (state) => (id) => {
        // const idObjetivo = parseInt(id)
        // const metas = this.getters.getObjetivoById(idObjetivo).metas
        const objetivo = state.objetivos.find((objetivo) => objetivo.id === id)
        const metas = objetivo.metas
        return metas.find((meta) => meta.id === id)
      },

      getAcoesAlegre(state) {
        return state.acoesAlegre
      },
      obterInfoPorCampusEUnidade: (state) => (campus) => (nomeUnidade) => {
        return state.infos[campus].unidades.find(
          (unid) => unid.nome === nomeUnidade
        )
      },
      obterMarcadoresInfoPorCampusEUnidade:
        (state) =>
        ({ nomeCampus, nomeUnidade }) => {
          const campus = state.infos[nomeCampus]
          const unidade = campus.unidades.find((u) => u.nome === nomeUnidade)

          // TODO: filtrar as lotações com projetos ativos

          const marcadores = unidade.lotacoes.map((lotacao) => ({
            id: lotacao.id,
            coordenadas: lotacao.localizacao.coordinates,
            conteudo:
              '<div class="popup">' +
              '<img class="popup_img" src="' +
              require('~/assets/ods_icons/' +
                lotacao.idObjetivoMaisAtendido +
                '.png') +
              '"><br>' +
              '<div class="popup_text">' +
              '<strong>' +
              lotacao.nome +
              '</strong>' +
              '<br/>Total de Projetos: ' +
              lotacao.quantidadeProjetosTotais +
              '<br/>Total de Projetos Ativos: ' +
              lotacao.quantidadeProjetosAtivos +
              '<br/>Total de ODS atendidos: ' +
              lotacao.quantidadeOdsAtendidos +
              '<br/>ODS Principal Atendido: ' +
              lotacao.idObjetivoMaisAtendido +
              '</div></div>',
          }))
          return marcadores
        },
    },
  })
}

export default createStore
