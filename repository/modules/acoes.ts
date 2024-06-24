import type { FetchOptions } from 'ofetch'
import type { Acao } from '~/models/acao.model'
import FetchFactory from '../factory'

class AcoesModule extends FetchFactory {
  private RESOURCE = '/acoes'

  async getAcoes(codigoUnidade: string) {
    const fetchOptions: FetchOptions<'json'> = {
      params: { aceito: true, unidade: codigoUnidade },
    }
    return this.call<Acao[]>(
      'GET',
      `${this.RESOURCE}`,
      undefined, // body
      fetchOptions,
    )
  }

  async getSubmissoes() {
    const fetchOptions: FetchOptions<'json'> = {
      params: { aceito: false },
    }
    return this.call<Acao[]>(
      'GET',
      `${this.RESOURCE}`,
      undefined, // body
      fetchOptions,
    )
  }

  async enviarSubmissao(submissao: Acao) {
    return this.call<Acao>('POST', `${this.RESOURCE}`, submissao)
  }

  async aceitarSubmissao(id: number) {
    return this.call<Acao>('PATCH', `${this.RESOURCE}/aceitar`, undefined, {
      params: { id },
    })
  }

  async rejeitarSubmissao(id: number) {
    return this.call<Acao>('DELETE', `${this.RESOURCE} + ${id}`)
  }
}

export default AcoesModule
