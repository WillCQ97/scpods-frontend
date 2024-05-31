import type { AcaoInterface } from '~/models/acao.model'
import FetchFactory from '../factory'

class AcaoRepository extends FetchFactory {
  private RESOURCE = 'acao'

  async getAcao() {
    return this.call<AcaoInterface[]>(
      'GET',
      `${this.RESOURCE}`,
      undefined, // body
    )
  }
}

export default AcaoRepository
