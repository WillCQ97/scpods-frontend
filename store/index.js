import { Store } from 'vuex'

const createStore = () => {
  return new Store({
    state: {
      acoes: {},
      infos: {},
      objetivos: [],
    },

    mutations: {
      setObjetivos(state, objetivos) {
        state.objetivos = objetivos
      },

      // TODO: para ficar semelhante ao setInfo talvez
      setAcoes(state, campus, acoes) {
        state.acoes[campus] = acoes
      },

      setInfo(state, campusInfo) {
        state.infos[campusInfo.campus] = campusInfo.unidades
      },
    },

    actions: {
      nuxtServerInit(vuexContext, context) {
        return context.app.$axios
          .$get('/objetivos')
          .then((objetivosData) => {
            vuexContext.commit('setObjetivos', objetivosData)
          })
          .catch((e) => {
            console.log('Não foi possível obter os objetivos do backend')
            context.error(e)
          })
        // (e) => context.error(e)
      },

      setInfo(vuexContext, campusInfo) {
        vuexContext.commit('setInfo', campusInfo)
      },
      /*  TODO
      loadInfo(vuexContext, nomeCampus) {
        return this.$axios
          .$get('/info/' + nomeCampus)
          .then((infoAlegre) => {
            vuexContext.commit('setInfo', infoAlegre)
          })
          .catch((e) => {
            vuexContext.error(e)
          })
      },
      */
    },

    getters: {
      /* TODO
      isInfoLoaded: (state) => (campus) => {
        return state.infos[campus] !== undefined
      },
      */
      /* Métodos ainda usados no formulário */
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

      /* Métodos ainda usados no formulário */

      obterMarcadoresInfoPorCampusEUnidade:
        (state) =>
        ({ nomeCampus, nomeUnidade }) => {
          const unidades = state.infos[nomeCampus]

          if (!unidades) {
            return [] // TODO: Apenas para não quebrar o mapa
          }

          const unidade = unidades.find((u) => u.nome === nomeUnidade)

          const lotacoes = unidade.lotacoes.filter(
            (lotacao) => lotacao.quantidadeProjetosTotais > 0
          )

          const marcadores = lotacoes.map((lotacao) => ({
            id: lotacao.id,
            coordinates: lotacao.localizacao.coordinates.reverse(),
            content:
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
              lotacao.quantidadeObjetivosAtendidos +
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
