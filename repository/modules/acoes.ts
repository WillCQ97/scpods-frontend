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
}

export default AcoesModule
