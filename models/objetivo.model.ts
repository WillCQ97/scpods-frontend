import type { MetaInterface } from './meta.model'

interface ObjetivoBaseInterface {
  id: number
  codigo: string
  titulo: string
  descricao: string
}

export interface ObjetivoAcaoInterface extends ObjetivoBaseInterface {}

export interface IObjetivo extends ObjetivoBaseInterface {
  metas: MetaInterface[]
}
