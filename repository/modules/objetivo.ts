import type { IObjetivo } from '~/models/objetivo.model'
import FetchFactory from '../factory'

class ObjetivoRepository extends FetchFactory {
  private RESOURCE = '/objetivos'

  async getObjetivos() {
    return this.call<IObjetivo[]>('GET', `${this.RESOURCE}`, undefined)
  }

  async getObjetivoById(id: number) {
    return this.call<IObjetivo>('GET', `${this.RESOURCE}/${id}`, undefined)
  }
}

export default ObjetivoRepository
