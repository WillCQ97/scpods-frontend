import type { MetaInterface } from '~/models/meta.model'
import type { IObjetivo } from '~/models/objetivo.model'

type State = {
  objetivos: IObjetivo[]
}

export const useObjetivoStore = defineStore('objetivoStore', {
  state: () => ({ objetivos: [] }) as State,

  getters: {
    getLength(state): Number {
      return state.objetivos.length
    },

    getObjetivos(state): Objetivo[] {
      return state.objetivos
    },

    getObjetivoById({ objetivos }): (id: number) => IObjetivo | undefined {
      return (id: number): IObjetivo | undefined => {
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

    getMetasByObjetivoId(): (id: number) => MetaInterface[] | undefined {
      return (id: number): MetaInterface[] | undefined => {
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

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
