import type { ObjetivoAcao } from './objetivo.model'

export interface Meta {
  id: number
  codigo: string
  descricao: string
}

export interface MetaAcao extends Meta {
  objetivo: ObjetivoAcao
}
