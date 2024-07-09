import type { FetchOptions } from 'ofetch'
import type { AcaoInterface } from '~/models/acao.model'
import FetchFactory from '../factory'
import type { AcaoGridOptionsInterface } from '~/models/acao.grid.options.interface'

class AcoesModule extends FetchFactory {
  private RESOURCE = '/submissoes'

  async findById(id: number) {
    return this.call<AcaoInterface[]>('GET', `${this.RESOURCE}/${id}`)
  }

  async search(options: AcaoGridOptionsInterface) {
    return this.call<AcaoInterface[]>('GET', `${this.RESOURCE}`, options)
  }

  async rejeitar(id: number) {
    return this.call<AcaoInterface>(
      'DELETE',
      `${this.RESOURCE}/rejeitar`,
      undefined,
      {
        params: { id },
      },
    )
  }

  async aceitar(id: number) {
    return this.call<AcaoInterface>(
      'PATCH',
      `${this.RESOURCE}/aceitar`,
      undefined,
      {
        params: { id },
      },
    )
  }
}

export default AcoesModule
