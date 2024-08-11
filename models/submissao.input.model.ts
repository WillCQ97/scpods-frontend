import type { CoordenadorInterface } from './coordenador.model'

export interface SubmissaoInputInterface {
  titulo: string
  descricao: string

  dataInicio: string
  dataEncerramento: string | null

  metaId: number
  localId: number
  lotacaoId: number

  coordenador: CoordenadorInterface
}

export function SubmissaoInputBuilder(): SubmissaoInputInterface {
  return {
    coordenador: {} as CoordenadorInterface,
  } as SubmissaoInputInterface
}
