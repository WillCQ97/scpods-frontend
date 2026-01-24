import type { LocalInfoInterface } from './local.info'

export interface UnidadeInfoInterface {
  id?: number
  nome: string
  campus: string
  codigo: string
  locais: LocalInfoInterface[]
}
