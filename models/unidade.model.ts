import type Local from './local.model'

export default interface Unidade {
  id: number
  nome: string
  codigo: string

  locais: Local[]
}
