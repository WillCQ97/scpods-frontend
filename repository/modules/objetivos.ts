import type { Objetivo } from '~/models/objetivo.model'
import FetchFactory from '../factory'
import type { AsyncDataOptions } from '#app'
import type { FetchOptions } from 'ofetch'

class ObjetivosModule extends FetchFactory<Objetivo[]> {
  // usar no singular
  private RESOURCE = '/objetivos'

  async getObjetivos(asyncDataOptions?: AsyncDataOptions<Objetivo[]>) {
    return useAsyncData(() => {
      const fetchOptions: FetchOptions<'json'> = {
        headers: {},
      }
      return this.call('GET', `${this.RESOURCE}`, undefined, {})
    }, asyncDataOptions)
  }
}

export default ObjetivosModule
