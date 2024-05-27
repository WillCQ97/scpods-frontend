import type { RuntimeConfig } from 'nuxt/schema'
import type { Meta } from '~/models/meta.model'
import type { Objetivo } from '~/models/objetivo.model'

type State = {
  objetivos: Objetivo[]
  config: RuntimeConfig
}

export const useObjetivoStore = defineStore('objetivoStore', {
  state: () => ({ objetivos: [], config: useRuntimeConfig() }) as State,
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
      console.log(
        'fetchObjetivos',
        this.config.public.apiBase,
        this.config.apiSecret,
      )
      try {
        const response = await useFetch('objetivos', {
          baseURL: this.config.public.apiBase,
          method: 'get',
          headers: {
            'X-AUTH-API-KEY': this.config.apiSecret,
          },
        })
        this.objetivos = response.data
      } catch (error) {
        console.log('ERRO:', error)
        return error
      }
    },
  },
})
