import type { LocalInterface } from './local.model'

export interface UnidadeInterface {
  id?: number
  nome: string
  campus: string
  codigo: string

  locais: LocalInterface[]
}
