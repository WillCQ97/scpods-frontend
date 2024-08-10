import type Localizacao from './localizacao.model'
import type { UnidadeAcao } from './unidade.model'

interface LocalBase {
  id: number
  idd: number
  nomePrincipal: string
  nomeSecundario?: string
  nomeTerciario?: string
  localizacao: Localizacao
}

export interface Local extends LocalBase {}

export interface LocalAcao extends LocalBase {
  unidade: UnidadeAcao
}

export interface LocalInfo extends LocalBase {
  projetosTotais: number
  projetosAtivos: number
  objetivosAtendidos: number
  idObjetivoComMaisProjetos: number
}
