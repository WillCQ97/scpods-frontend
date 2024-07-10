import type { AcaoInterface } from '~/models/acao.model'
import type { AcaoSearchOptionsInterface } from '~/models/acao.search.options.model'
import FetchFactory from '../factory'

class AcoesModule extends FetchFactory {
  private RESOURCE = '/submissoes'

  async findById(id: number) {
    return this.call<AcaoInterface[]>('GET', `${this.RESOURCE}/${id}`)
  }

  async search(options: AcaoSearchOptionsInterface) {
    return this.call<AcaoInterface[]>('GET', `${this.RESOURCE}`, options)
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
}

export default AcoesModule
