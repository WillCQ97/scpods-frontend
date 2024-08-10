import type { Local, LocalInfo } from './local.model'

interface UnidadeBase {
  id: number
  nome: string
  codigo: string
  campus: string
}

export interface Unidade extends UnidadeBase {
  locais: Local[]
}

export interface UnidadeAcao extends UnidadeBase {}

export interface UnidadeInfo extends UnidadeBase {
  locais: LocalInfo[]
}
