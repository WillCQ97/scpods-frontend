import type { UnidadeInfo } from '~/models/unidade.model'
import FetchFactory from '../factory'

class UnidadesModule extends FetchFactory {
  private RESOURCE = '/unidades'

  async getOpcoesCampus() {
    return this.call<string[]>('GET', `${this.RESOURCE}/opcoes-campus`)
  }

  async getUnidadeInfo(codigoUnidade: string) {
    return this.call<UnidadeInfo>(
      'GET',
      `${this.RESOURCE}/${codigoUnidade}/info`,
    )
  }
}

export default UnidadesModule
