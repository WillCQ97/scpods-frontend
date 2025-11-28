import {
  CoordenadorInterfaceBuilder,
  type CoordenadorInterface,
} from './coordenador.model'
import {
  LocalAcaoInterfaceBuilder,
  type LocalAcaoInterface,
} from './local.acao.model'
import { LotacaoInterfaceBuilder, type LotacaoInterface } from './lotacao.model'
import {
  MetaAcaoInterfaceBuilder,
  type MetaAcaoInterface,
} from './meta.acao.model'

export interface AcaoInterface {
  id?: number
  titulo: string
  descricao: string
  urlEvidencia: string

  dataCadastro: string
  dataInicio: string
  dataEncerramento: string

  aceito?: boolean

  coordenador: CoordenadorInterface // campo extra nas submissões
  meta: MetaAcaoInterface
  local: LocalAcaoInterface
  lotacao: LotacaoInterface
}

export function AcaoInterfaceBuilder(): AcaoInterface {
  return {
    titulo: '',
    descricao: '',
    urlEvidencia: '',

    dataCadastro: '',
    dataInicio: '',
    dataEncerramento: '',

    coordenador: CoordenadorInterfaceBuilder(),
    meta: MetaAcaoInterfaceBuilder(),
    local: LocalAcaoInterfaceBuilder(),
    lotacao: LotacaoInterfaceBuilder(),
  }
}
