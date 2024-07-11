import { type Unidade, type UnidadeInfo } from '~/models/unidade.model'
import FetchFactory from '../factory'

class UnidadesModule extends FetchFactory {
  private RESOURCE = '/unidades'

  async getOpcoesCampus() {
    return this.call<string[]>('GET', `${this.RESOURCE}/opcoes-campus`)
  }

  async getUnidadeInfo(codigoUnidade: string) {
    return this.call<UnidadeInfo>(
      'GET',
      `${this.RESOURCE}/info/${codigoUnidade}`,
    )
  }

  async getUnidades() {
    return this.call<Unidade[]>('GET', `${this.RESOURCE}`)
  }
}

export default UnidadesModule
