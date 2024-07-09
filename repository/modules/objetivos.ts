import type { AsyncDataOptions } from '#app'
import type { FetchOptions } from 'ofetch'
import type { Objetivo } from '~/models/objetivo.model'
import FetchFactory from '../factory'

class ObjetivosModule extends FetchFactory {
  private RESOURCE = '/objetivos'

  async getObjetivos(asyncDataOptions?: AsyncDataOptions<Objetivo[]>) {
    return useAsyncData(() => {
      const fetchOptions: FetchOptions<'json'> = {
        headers: {},
      }
      return this.call<Objetivo[]>(
        'GET',
        `${this.RESOURCE}`,
        undefined, // body
        fetchOptions,
      )
    }, asyncDataOptions)
  }
}

export default ObjetivosModule
