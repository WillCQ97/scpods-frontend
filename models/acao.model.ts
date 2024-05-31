import type { CoordenadorInterface } from './coordenador.model'
import type { LocalAcao } from './local.model'
import type { ILotacao } from './lotacao.model'
import type { IMetaAcao } from './meta.model'

export interface AcaoInterface {
  id: number
  titulo: string
  descricao: string

  dataCadastro: string
  dataInicio: string
  dataEncerramento?: string

  aceito: boolean

  coordenador: CoordenadorInterface
  meta: IMetaAcao
  local: LocalAcao
  lotacao: ILotacao
}
