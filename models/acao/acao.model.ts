import type { Local } from '../local.model'
import type { Unidade, UnidadeBase } from '../unidade.model'

interface Objetivo {
  id: number
  titulo: string
  descricao: string
}

interface Meta {
  id: string
  descricao: string
  objetivo: Objetivo
}

interface Lotacao {
  id: number
  descricao: string
  sigla: string
  campus: string
}

interface Coordenador {
  id: number
  nome: string
  tipoVinculo: string
  descricaoVinculo: string
}

export interface Acao {
  id: number
  titulo: string
  descricao: string
  dataCadastro: string
  dataInicio: string
  dataEncerramento?: string
  aceito: boolean

  coordenador: Coordenador
  meta: Meta
  local: Local
  unidade: UnidadeBase
  lotacao: Lotacao
}
