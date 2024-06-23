import type { Meta } from '~/models/meta.model'
import type { Objetivo } from '~/models/objetivo.model'

type State = {
  objetivos: Objetivo[]
}

export const useObjetivoStore = defineStore('objetivoStore', {
  state: () => ({ objetivos: [] }) as State,

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
    setObjetivos(objetivos: Objetivo[]) {
      this.objetivos = objetivos
    },
  },
})
