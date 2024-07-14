// import { useRuntimeConfig } from '#app'
// https://nuxt.com/docs/api/composables/use-fetch
// https://pinia.vuejs.org/core-concepts/actions.html
// https://blog.logrocket.com/consume-apis-vuex-pinia-axios/
// https://nuxt.com/docs/guide/going-further/runtime-config#environment-variables

export const useUserStore = defineStore('userStore', {
  state: () => ({
    isLoggedIn: false,
    isAdmin: true,
    username: 'willcq',
    password: 'admin.123',
  }),

  getters: {
    isUserLoggedIn({ isLoggedIn }): boolean {
      return isLoggedIn
    },
  },

  actions: {
    async loginAdmin(login: string, password: string) {
      useFetch('/http://localhost:8080/acoes-ods/v1/usuarios/validar-admin')

      const { status, error } = await useFetch('/api/modules', {
        pick: ['title'],
      })

      this.isAdmin = true
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
