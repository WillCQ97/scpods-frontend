import { useFetch } from '#app'
import { useRuntimeConfig } from '#app'
// https://nuxt.com/docs/api/composables/use-fetch
// https://pinia.vuejs.org/core-concepts/actions.html
// https://blog.logrocket.com/consume-apis-vuex-pinia-axios/
// https://nuxt.com/docs/guide/going-further/runtime-config#environment-variables

export const useUser = defineStore('user', {
  state: () => {
    return {
      isLoggedIn: false,
      isAdmin: true,
    }
  },

  getters: {},

  actions: {
    async login(login, password) {
      if (!this.isLoggedIn) {
        // efetua login

        try {
          // this receives a api url and an options with configuration
          // the body of the request is a object directly
          this.user = await useFetch('validate-user', {
            //const param1 = ref('value1')
            //query: { param1, param2: 'value2' } //https://api.nuxt.com/modules?param1=value1&param2=value2
            method: 'POST',
            body: { message: 'Hello API' },
            // headers: {}
            baseURL: '/my/api/',
          })
          this.isLoggedIn = true
        } catch (error) {
          // do something with the error
          return error
        }
      } else {
        // user is alread loggedin
        useRouter().push('/')
      }
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUser, import.meta.hot))
}
