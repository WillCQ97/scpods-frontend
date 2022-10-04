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
      getGoalById(state, id) {
        for (const goal of state.loadedGoals) {
          if (goal.id === id) {
            return goal
          }
        }
      },
      getTargetById(state, id) {
        for (const target of state.loadedTargets) {
          if (target.id === id) {
            return target
          }
        }
      },
      getTargetByGoalId(state, id) {
        const targets = []
        for (const target of state.loadedTargets) {
          if (target.id.split('.')[0] === id) {
            targets.push(target)
          }
        }
        return targets
      },
    },
  })
}

export default createStore
