import type { Objetivo } from '~/models/objetivo.model'

type State = {
  objetivos: Objetivo[]
}

export const useObjetivoStore = defineStore('objetivoStore', {
  state: () => ({ objetivos: [] }) as State,
  // state: (): RootState => ({ objetivos: [] }),
  // state: () => ({ objetivos: <Objetivo[]>[] }) // not recommended to avoid type assertion
  // state: () => ({ objetivos: [] }) as { objetivos: Objetivo[] },

  getters: {
    getObjetivos(state): Objetivo[] {
      return state.objetivos
    },

    getTituloObjetivoById({ objetivos }): (id: number) => string | undefined {
      return (id: number): string | undefined => {
        return objetivos.find((ods) => ods.id === id)?.titulo
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
