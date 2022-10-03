import { Store } from 'vuex'
// TODO: TROCAR IMPORTAÇÃO DO ARQUIVO PELA SOLICITAÇÃO DOS DADOS AO SERVIDOR
import odsGoals from '~/assets/data/ods_goals.json'

const createStore = () => {
  return new Store({
    state: {
      loadedGoals: [],
      loadedTargets: [],
    },

    mutations: {
      setGoals(state, goals) {
        state.loadedGoals = goals
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
