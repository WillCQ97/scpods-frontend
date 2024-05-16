// import { useRuntimeConfig } from '#app'
// https://nuxt.com/docs/api/composables/use-fetch
// https://pinia.vuejs.org/core-concepts/actions.html
// https://blog.logrocket.com/consume-apis-vuex-pinia-axios/
// https://nuxt.com/docs/guide/going-further/runtime-config#environment-variables

export const useUserStore = defineStore('userStore', {
  state: () => ({
    isLoggedIn: false,
    isAdmin: true,
  }),

  getters: {
    isUserLoggedIn({ isLoggedIn }): boolean {
      return isLoggedIn
    },
  },

  actions: {
    login(login: string, password: string) {
      // TODO: implementar a lógica de acesso
      this.isLoggedIn = true
      console.log(this.isLoggedIn)
    },

    logout() {
      this.isLoggedIn = false
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
