import type { Meta } from '~/models/meta.model'
import type { Objetivo } from '~/models/objetivo.model'

type State = {
  objetivos: Objetivo[]
}

export const useObjetivoStore = defineStore('objetivoStore', {
  state: () => ({ objetivos: [] }) as State,
  // TODO: clean the examples
  // state: (): RootState => ({ objetivos: [] }),
  // state: () => ({ objetivos: <Objetivo[]>[] }) // not recommended to avoid type assertion
  // state: () => ({ objetivos: [] }) as { objetivos: Objetivo[] },

  getters: {
    getObjetivos(state): Objetivo[] {
      return state.objetivos
    },

    getObjetivoById({ objetivos }): (id: number) => Objetivo | undefined {
      return (id: number): Objetivo | undefined => {
        return objetivos.find((ods) => ods.id === id)
      }
    },

    getTituloObjetivoById(): (id: number) => string | undefined {
      return (id: number): string | undefined => {
        return this.getObjetivoById(id)?.titulo
      }
    },

    getDescricaoObjetivoById(): (id: number) => string | undefined {
      return (id: number): string | undefined => {
        return this.getObjetivoById(id)?.descricao
      }
    },

    getMetasByObjetivoId(): (id: number) => Meta[] | undefined {
      return (id: number): Meta[] | undefined => {
        return this.getObjetivoById(id)?.metas
      }
    },
  },

  actions: {
    async fetchObjetivos() {
      //TODO: return await useFetch permite utilizar o {data, error, refresh} no front
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
