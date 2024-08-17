import type { MetaInterface } from './meta.model'

export interface ObjetivoInterface {
  id: number
  codigo: string
  titulo: string
  descricao: string
  metas: MetaInterface[]
}
