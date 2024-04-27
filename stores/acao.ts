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
      try {
        const response = await $fetch('acoes', {
          baseURL: 'http://localhost:8080/acoes-ods/v1/',
          method: 'post',
          params: { id },
          lazy: true,
          server: false,
        })
        return response
      } catch (error) {
        // ofetch Automatically throws errors when response.ok is false with a friendly error message and compact stack (hiding internals).
        console.log('ERRO:', error)
        console.log('Parsed error body:', error.data)
        return error
      }
    },
    async rejectSubmissao(id: number) {
      try {
        const response = await $fetch('acoes/' + id, {
          baseURL: 'http://localhost:8080/acoes-ods/v1/',
          method: 'delete',
          lazy: true,
          server: false,
        })
        return response
      } catch (error) {
        // ofetch Automatically throws errors when response.ok is false with a friendly error message and compact stack (hiding internals).
        console.log('ERRO:', error)
        console.log('Parsed error body:', error.data)
        return error
      }
    },
  },
})
