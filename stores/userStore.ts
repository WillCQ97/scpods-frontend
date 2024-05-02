// import { useRuntimeConfig } from '#app'
// https://nuxt.com/docs/api/composables/use-fetch
// https://pinia.vuejs.org/core-concepts/actions.html
// https://blog.logrocket.com/consume-apis-vuex-pinia-axios/
// https://nuxt.com/docs/guide/going-further/runtime-config#environment-variables

export const useUserStore = defineStore('userStore', {
  state: () => {
    return {
      user: {},
      isLoggedIn: false,
      isAdmin: true,
    }
  },

  getters: {},

  actions: {
    login(login: string, password: string) {
      // TODO: implementar a lógica de acesso
      this.isLoggedIn = true
      console.log(this.isLoggedIn)
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
