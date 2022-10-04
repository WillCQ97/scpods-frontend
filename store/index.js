import { Store } from 'vuex'
// TODO: TROCAR IMPORTAÇÃO DO ARQUIVO PELA SOLICITAÇÃO DOS DADOS AO SERVIDOR
import odsGoals from '~/assets/data/ods_goals.json'
import odsInfoAlegre from '~/assets/data/alegre_info.json'

const createStore = () => {
  return new Store({
    state: {
      loadedGoals: [],
      loadedTargets: [],
      odsInfoAlegre: [],
    },

    mutations: {
      setGoals(state, goals) {
        state.loadedGoals = goals
      },
      setInfoAlegre(state, info) {
        state.odsInfoAlegre = info
      },
      setTargets(state, targets) {
        state.loadedTargets = targets
      },
    },

    actions: {
      nuxtServerInit(vuexContext, context) {
        return new Promise((resolve, reject) => {
          vuexContext.commit('setGoals', odsGoals.goals)
          vuexContext.commit('setTargets', odsGoals.targets)
          vuexContext.commit('setInfoAlegre', odsInfoAlegre)
          resolve()
        })
      },
    },

    getters: {
      loadedAlegreInfo(state) {
        return state.odsInfoAlegre
      },
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
    },
  })
}

export default createStore
