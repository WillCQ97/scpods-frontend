import type { MetaInterface } from './meta.model'

interface IObjetivoBase {
  id: number
  codigo: string
  titulo: string
  descricao: string
}

export interface IObjetivoAcao extends IObjetivoBase {}

export interface IObjetivo extends IObjetivoBase {
  metas: MetaInterface[]
}
