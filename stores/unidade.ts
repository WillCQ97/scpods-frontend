import type { Unidade } from '~/models/unidade.model'

type State = {
  unidades: Unidade[] // armazenar a listagem dos locais para o formulário
}

export const useUnidadeStore = defineStore('unidadeStore', {
  state: () => ({ unidades: [] }) as State,

  getters: {
    getUnidades({ unidades }) {
      return unidades
    },
  },

  actions: {
    async fetchLocais() {
      try {
        const response = await $fetch('unidades/', {
          baseURL: 'http://localhost:8080/acoes-ods/v1/',
          method: 'get',
          lazy: true,
          server: false,
        })
        this.unidades = response
      } catch (error) {
        console.log('ERRO:', error)
        return error
      }
    },
  },
})
