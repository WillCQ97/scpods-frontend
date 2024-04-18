export const useObjetivoStore = defineStore('objetivoStore', {
  state: () => ({
    objetivos: [],
  }),

  getters: {
    getObjetivos(state) {
      return state.objetivos
    },
  },

  actions: {
    async fetchObjetivos() {
      try {
        const response = await useFetch('objetivos', {
          baseURL: 'http://localhost:8080/acoes-ods/v1/',
          method: 'get',
        })
        this.objetivos = response.data
      } catch (error) {
        console.log('ERRO:', error)
        return error
      }
    },
  },
})
