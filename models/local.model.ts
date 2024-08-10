import type LocalizacaoInterface from './localizacao.model'
import type { UnidadeAcaoInterface } from './unidade.model'

interface LocalBaseInterface {
  id: number
  idd: number
  nomePrincipal: string
  nomeSecundario?: string
  nomeTerciario?: string
  localizacao: LocalizacaoInterface
}

export interface LocalInterface extends LocalBaseInterface {}

export interface LocalAcao extends LocalBaseInterface {
  unidade: UnidadeAcaoInterface
}

export interface LocalInfoInterface extends LocalBaseInterface {
  projetosTotais: number
  projetosAtivos: number
  objetivosAtendidos: number
  idObjetivoComMaisProjetos: number
}
