import type { AcaoInterface } from '~/models/acao.model'

export const useAcaoStore = defineStore('acaoStore', {
  state: () => ({
    acoesInfo: {}, // listagem das ações mostradas no mapa
  }),

  actions: {
    async fetchAcoes(codigoUnidade: string): Promise<AcaoInterface[]> {
      try {
        const response = await $fetch('acoes', {
          baseURL: 'http://localhost:8080/acoes-ods/v1/',
          method: 'get',
          params: { aceito: true, unidade: codigoUnidade },
          lazy: true,
          server: false,
        })
        return response as AcaoInterface[]
      } catch (error) {
        console.log('ERRO:', error)
        return error
      }
    },

    async fetchSubmissoes(): Promise<AcaoInterface[]> {
      try {
        const response = await $fetch('acoes', {
          baseURL: 'http://localhost:8080/acoes-ods/v1/',
          method: 'get',
          params: { aceito: false },
          lazy: true,
          server: false,
        })
        return response as AcaoInterface[]
      } catch (error) {
        console.log('ERRO:', error)
        return error
      }
    },

    async submitSubmissao(submissao: AcaoInterface) {
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
      return await $fetch('aceitar', {
        baseURL: 'http://localhost:8080/acoes-ods/v1/acoes',
        method: 'post',
        params: { id },
      })
    },

    async rejectSubmissao(id: number) {
      return await $fetch('acoes/' + id, {
        baseURL: 'http://localhost:8080/acoes-ods/v1/',
        method: 'delete',
      })
    },
  },
})
