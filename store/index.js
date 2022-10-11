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
    },
  })
}

export default createStore
