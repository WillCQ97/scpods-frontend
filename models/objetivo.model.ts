import type { Meta } from './meta.model'

export interface Objetivo {
  id: number
  titulo: string
  descricao: string
  metas: Meta[]
}
