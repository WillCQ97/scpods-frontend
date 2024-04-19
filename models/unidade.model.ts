import type { Local } from './local.model'

export interface Unidade {
  id: number
  nome: string
  codigo: string

  locais: Local[]
}
