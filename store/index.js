// here we can add some data to be loaded only once time
// this can be used for shorting the loading time or
// the data is used outside of the component and is here for conviniently

import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: [],
    },
    mutations: {
      setPosts(state, posts) {
        state.loadedPosts = posts
      },
    },
    actions: {
      setPosts(vuexContext, posts) {
        vuexContext.commit('setPosts', posts)
      },
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts
      },
    },
  })
}

export default createStore
