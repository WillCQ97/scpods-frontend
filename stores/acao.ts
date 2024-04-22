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
    async fetchSubmissoes() {
      // todo: retorna a lista de submissões para avaliação
    },
    async submitSubmissao() {
      // todo: envia uma submissão de ação ao backend
    },
    async acceptSubmissao(id: number) {
      // todo: aceita a submissão
    },
    async rejectSubmissao(id: number) {
      // todo: deleta a submissão ao ser recusada
    },
  },
})
