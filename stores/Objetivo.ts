import type { Objetivo } from '~/models/objetivo.model'

export type RootState = {
  objetivos: Objetivo[]
}

export const useObjetivoStore = defineStore('objetivoStore', {
  state: () => ({ objetivos: [] }) as RootState,

  getters: {
    getObjetivos(state) {
      return state.objetivos
    },
    getTituloObjetivoById: (state) => {
      return (id: number) => {
        const objetivo = state.objetivos.find((ods) => ods.id === id)
        return objetivo ? objetivo.titulo : ''
      }
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
