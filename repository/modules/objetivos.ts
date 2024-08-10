import type { AsyncDataOptions } from '#app'
import type { FetchOptions } from 'ofetch'
import type { Objetivo } from '~/models/objetivo.model'
import FetchFactory from '../factory'

class ObjetivosModule extends FetchFactory {
  private RESOURCE = '/objetivos'

  async getObjetivos() {
    return this.call<Objetivo[]>('GET', `${this.RESOURCE}`)
  }
}

export default ObjetivosModule
