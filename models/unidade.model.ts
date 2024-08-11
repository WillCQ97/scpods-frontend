import type { LocalInfoInterface, LocalInterface } from './local.model'

interface UnidadeBaseInterface {
  id: number
  nome: string
  campus: string
  codigo: string
}

export interface UnidadeInterface extends UnidadeBaseInterface {
  locais: LocalInterface[]
}

export interface UnidadeInfoInterface extends UnidadeBaseInterface {
  locais: LocalInfoInterface[]
}

export interface UnidadeAcaoInterface extends UnidadeBaseInterface {}
