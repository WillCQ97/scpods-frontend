import type { FetchOptions } from 'ofetch'
import type { AcaoInterface } from '~/models/acao.model'
import FetchFactory from '../factory'

class AcoesModule extends FetchFactory {
  private RESOURCE = '/acoes'

  async findById(id: number) {
    return this.call<AcaoInterface[]>('GET', `${this.RESOURCE}/${id}`)
  }

  async getAcoes(codigoUnidade: string) {
    const fetchOptions: FetchOptions<'json'> = {
      params: { aceito: true, unidade: codigoUnidade },
    }
    return this.call<AcaoInterface[]>(
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
    return this.call<AcaoInterface[]>(
      'GET',
      `${this.RESOURCE}`,
      undefined, // body
      fetchOptions,
    )
  }

  async enviarSubmissao(submissao: AcaoInterface) {
    return this.call<AcaoInterface>('POST', `${this.RESOURCE}`, submissao)
  }

  async aceitarSubmissao(id: number) {
    return this.call<AcaoInterface>(
      'PATCH',
      `${this.RESOURCE}/aceitar`,
      undefined,
      {
        params: { id },
      },
    )
  }

  async rejeitarSubmissao(id: number) {
    return this.call<AcaoInterface>('DELETE', `${this.RESOURCE} + ${id}`)
  }
}

export default AcoesModule
