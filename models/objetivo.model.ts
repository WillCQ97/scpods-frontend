import type { MetaInterface } from './meta.model'

interface ObjetivoBaseInterface {
  id: number
  codigo: string
  titulo: string
  descricao: string
}
export interface ObjetivoInterface extends ObjetivoBaseInterface {
  metas: MetaInterface[]
}

export interface ObjetivoAcaoInterface extends ObjetivoBaseInterface {}
