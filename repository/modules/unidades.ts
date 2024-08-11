import {
  type UnidadeInterface,
  type UnidadeInfoInterface,
} from '~/models/unidade.model'
import FetchFactory from '../factory'
import type { SelectModelInterface } from '~/models/select/select.model'

class UnidadesModule extends FetchFactory {
  private RESOURCE = '/unidades'

  async getOpcoesCampus() {
    return this.call<SelectModelInterface<string>[]>(
      'GET',
      `${this.RESOURCE}/opcoes-campus`,
    )
  }

  async getUnidades() {
    return this.call<UnidadeInterface[]>('GET', `${this.RESOURCE}`)
  }

  async getUnidadeInfo(codigoUnidade: string) {
    return this.call<UnidadeInfoInterface>(
      'GET',
      `${this.RESOURCE}/info/${codigoUnidade}`,
    )
  }
}

export default UnidadesModule
