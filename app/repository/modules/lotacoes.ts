import type { SelectModelInterface } from '~/models/select/select.model'
import FetchFactory from '../factory'

class LotacoesModule extends FetchFactory {
  private RESOURCE = '/lotacoes'

  async getOpcoesLotacao() {
    return this.call<SelectModelInterface<number>[]>(
      'GET',
      `${this.RESOURCE}/opcoes-lotacao`,
    )
  }
}

export default LotacoesModule
