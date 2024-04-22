import type { Local, LocalInfo } from './local.model'

interface UnidadeBase {
  id: number
  nome: string
  codigo: string
}

export interface Unidade extends UnidadeBase {
  locais: Local[]
}

export interface UnidadeInfo extends UnidadeBase {
  locais: LocalInfo[]
}
