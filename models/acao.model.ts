import type { CoordenadorAcao } from './coordenador.model'
import type { LocalAcao } from './local.model'
import type { LotacaoAcao } from './lotacao.model'
import type { MetaAcao } from './meta.model'

export interface Acao {
  id: number
  titulo: string
  descricao: string

  dataCadastro: string
  dataInicio: string
  dataEncerramento?: string

  aceito: boolean

  coordenador: CoordenadorAcao
  meta: MetaAcao
  local: LocalAcao
  lotacao: LotacaoAcao
}
