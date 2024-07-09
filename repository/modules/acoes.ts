import type { AcaoGridOptionsInterface } from '~/models/acao.grid.options.interface'
import type { AcaoInterface } from '~/models/acao.model'
import FetchFactory from '../factory'

class AcoesModule extends FetchFactory {
  private RESOURCE = '/acoes'

  async findById(id: number) {
    return this.call<AcaoInterface[]>('GET', `${this.RESOURCE}/${id}`)
  }

  async search(options: AcaoGridOptionsInterface) {
    return this.call<AcaoInterface[]>(
      'POST',
      `${this.RESOURCE}/search`,
      options,
    )
  }

  async enviarSubmissao(submissao: AcaoInterface) {
    return this.call<AcaoInterface>(
      'POST',
      `${this.RESOURCE}/submeter`,
      submissao,
    )
  }
}

export default AcoesModule
