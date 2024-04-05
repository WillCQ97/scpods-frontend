export const useUser = defineStore('user', {
  state: () => {
    return {
      isLoggedIn: false,
      isAdmin: true,
    }
  },

  getters: {},

  actions: {
    login() {
      this.isLoggedIn = true
      useRouter().push('/')
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUser, import.meta.hot))
}
