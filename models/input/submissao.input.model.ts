import type { CoordenadorInputInterface } from './coordenador.input.model'

export interface SubmissaoInputInterface {
  titulo: string
  descricao: string

  dataInicio: string
  dataEncerramento: string | null

  metaId: number
  localId: number
  lotacaoId: number

  coordenador: CoordenadorInputInterface
}
