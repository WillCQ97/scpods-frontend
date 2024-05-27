import type { Meta } from './meta.model'

export interface Objetivo {
  id: number
  titulo: string
  codigo: string
  descricao: string
  metas: Meta[]
}
