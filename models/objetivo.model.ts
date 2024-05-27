import type { Meta } from './meta.model'

interface ObjetivoBase {
  id: number
  codigo: string
  titulo: string
  descricao: string
}

export interface ObjetivoAcao extends ObjetivoBase {}

export interface Objetivo extends ObjetivoBase {
  metas: Meta[]
}
