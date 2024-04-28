import type { Acao } from '~/models/acao/acao.model'

export const useAcaoStore = defineStore('acaoStore', {
  state: () => ({
    acoesInfo: {}, // listagem das ações mostradas no mapa
  }),

  actions: {
    async fetchAcoes(codigoUnidade: string): Promise<Acao[]> {
      try {
        const response = await $fetch('acoes', {
          baseURL: 'http://localhost:8080/acoes-ods/v1/',
          method: 'get',
          params: { aceito: true, unidade: codigoUnidade },
          lazy: true,
          server: false,
        })
        return response as Acao[]
      } catch (error) {
        console.log('ERRO:', error)
        return error
      }
    },

    async fetchSubmissoes(): Promise<Acao[]> {
      try {
        const response = await $fetch('acoes', {
          baseURL: 'http://localhost:8080/acoes-ods/v1/',
          method: 'get',
          params: { aceito: false },
          lazy: true,
          server: false,
        })
        return response as Acao[]
      } catch (error) {
        console.log('ERRO:', error)
        return error
      }
    },

    async submitSubmissao(submissao: Acao) {
      // todo
      try {
        const response = await $fetch('acoes', {
          baseURL: 'http://localhost:8080/acoes-ods/v1/',
          method: 'post',
          body: submissao,
          lazy: true,
          server: false,
        })
        return response
      } catch (error) {
        console.log('ERRO:', error)
        return error
      }
    },
    async acceptSubmissao(id: number) {
      const { error } = await useFetch('acoes', {
        baseURL: 'http://localhost:8080/acoes-ods/v1/',
        method: 'post',
        params: { id },
        lazy: true,
        server: false,
      })
      return { error }
    },
    async rejectSubmissao(id: number) {
      const { error } = await useFetch('acoes/' + id, {
        baseURL: 'http://localhost:8080/acoes-ods/v1/',
        method: 'delete',
        lazy: true,
        server: false,
      })
      return { error }
    },
  },
})
