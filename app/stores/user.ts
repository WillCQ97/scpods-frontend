interface Admin {
  isLoggedIn: boolean
  username: string
  password: string
}

export const useUserStore = defineStore('userStore', {
  state: () => ({
    isLoggedIn: false,
    admin: { isLoggedIn: false, username: '', password: '' } as Admin,
  }),

  getters: {
    isUserLoggedIn({ isLoggedIn }): boolean {
      return isLoggedIn
    },
  },

  actions: {
    setLoginAdminCredentials(username: string, password: string) {
      this.admin.username = username
      this.admin.password = password
      this.admin.isLoggedIn = true
    },
    setUserLoggedIn() {
      this.isLoggedIn = true
    },
    logout() {
      this.isLoggedIn = false
      this.admin.isLoggedIn = false
      this.admin.username = ''
      this.admin.password = ''
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
