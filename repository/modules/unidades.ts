import type { Unidade, UnidadeInfo } from '~/models/unidade.model'
import FetchFactory from '../factory'
import type { AsyncDataOptions } from '#app'
import type { FetchOptions } from 'ofetch'

class UnidadesModule extends FetchFactory {
  private RESOURCE = '/unidades'

  async getOpcoesCampus() {
    return useAsyncData(() => {
      return this.call<string[]>(
        'GET',
        `${this.RESOURCE}/opcoes-campus`,
        undefined,
        {},
      )
    })
  }

  async getUnidadeInfo(
    codigoUnidade: string,
    asyncDataOptions?: AsyncDataOptions<UnidadeInfo>,
  ) {
    return useAsyncData(() => {
      const fetchOptions: FetchOptions<'json'> = {
        headers: {},
      }
      return this.call<UnidadeInfo>(
        'GET',
        `${this.RESOURCE}/${codigoUnidade}/info`,
        undefined,
        {},
      )
    }, asyncDataOptions)
  }
}

export default UnidadesModule
