import type { AcaoInterface } from '~/models/acao.model'
import type { AcaoSearchOptionsInterface } from '~/models/acao.search.options.model'
import FetchFactory from '../factory'
import type { SubmissaoInputInterface } from '~/models/input/submissao.input.model'

class AcoesModule extends FetchFactory {
  private RESOURCE = '/acoes'

  async findById(id: number) {
    return this.call<AcaoInterface>('GET', `${this.RESOURCE}/${id}`)
  }

  async search(options: AcaoSearchOptionsInterface) {
    return this.call<AcaoInterface[]>(
      'POST',
      `${this.RESOURCE}/search`,
      options,
    )
  }

  async enviarSubmissao(submissao: SubmissaoInputInterface) {
    return this.call<void>('POST', `${this.RESOURCE}/submeter`, submissao)
  }
}

export default AcoesModule
