import type { LocalInfoInterface, LocalInterface } from './local.model'

interface UnidadeBase {
  id: number
  nome: string
  codigo: string
  campus: string
}

export interface UnidadeInterface extends UnidadeBase {
  locais: LocalInterface[]
}

export interface UnidadeAcaoInterface extends UnidadeBase {}

export interface UnidadeInfoInterface extends UnidadeBase {
  locais: LocalInfoInterface[]
}
