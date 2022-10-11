import { Store } from 'vuex'

import odsGoals from '~/assets/data/ods_goals.json'

import actionsAlegre from '~/assets/data/alegre_actions'
import alegreInfo from '~/assets/data/alegre_info'

const createStore = () => {
  return new Store({
    state: {
      loadedGoals: [],
      loadedTargets: [],

      alegreActions: [],
      alegreInfo: {},
    },

    mutations: {
      setGoals(state, goals) {
        state.loadedGoals = goals
      },
      setTargets(state, targets) {
        state.loadedTargets = targets
      },

      setAlegreActions(state, actions) {
        state.alegreActions = actions
      },
      setAlegreInfo(state, info) {
        state.alegreInfo = info
      },
    },

    actions: {
      nuxtServerInit(vuexContext, context) {
        return new Promise((resolve, reject) => {
          vuexContext.commit('setGoals', odsGoals.goals)
          vuexContext.commit('setTargets', odsGoals.targets)

          vuexContext.commit('setAlegreActions', actionsAlegre)
          vuexContext.commit('setAlegreInfo', alegreInfo)
          resolve()
        })
      },
    },

    getters: {
      loadedGoals(state) {
        return state.loadedGoals
      },
      loadedTargets(state) {
        return state.loadedTargets
      },
      getGoalById: (state) => (id) => {
        return state.loadedGoals.find((goal) => goal.id === id)
      },
      getTargetById: (state) => (id) => {
        return state.loadedTargets.find((target) => target.id === id)
      },
      getTargetByGoalId: (state) => (id) => {
        return state.loadedTargets.filter(
          (target) => target.id.split('.')[0] === id
        )
      },

      loadedActions(state) {
        return state.alegreActions
      },
      loadedAlegreInfo(state) {
        return state.alegreInfo
      },
      createMarkersInfoAlegre: (state) => (local) => {
        const markers = state.alegreInfo[local].map((resumo) => ({
          id: resumo.id,
          coord: resumo.local.coord,
          content:
            '<div class="popup">' +
            '<img class="popup_img" src="' +
            require('~/assets/ods_icons/' + resumo.id_ods_principal + '.png') +
            '"><br>' +
            '<div class="popup_text">' +
            '<strong>' +
            resumo.local.nome +
            '</strong>' +
            '<br/>Total de Projetos: ' +
            resumo.qtd_projetos_totais +
            '<br/>Total de Projetos Ativos: ' +
            resumo.qtd_projetos_ativos +
            '<br/>Total de ODS atendidos: ' +
            resumo.qtd_ods +
            '<br/>ODS Principal Atendido: ' +
            resumo.id_ods_principal +
            '</div></div>',
        }))
        return markers
      },
    },
  })
}

export default createStore
