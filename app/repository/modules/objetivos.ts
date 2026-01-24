import type { ObjetivoInterface } from '~/models/objetivo.model'
import FetchFactory from '../factory'

class ObjetivosModule extends FetchFactory {
  private RESOURCE = '/objetivos'

  async getObjetivos() {
    return this.call<ObjetivoInterface[]>('GET', `${this.RESOURCE}`)
  }

  async getObjetivoById(codigo: string) {
    return this.call<ObjetivoInterface>(
      'GET',
      `${this.RESOURCE}/${codigo}`,
      undefined,
    )
  }
}

export default ObjetivosModule
