import type LocalizacaoInterface from './localizacao.model'
import type { UnidadeAcaoInterface } from './unidade.model'

export interface LocalInterface {
  id: number
  idd: number
  nomePrincipal: string
  nomeSecundario?: string
  nomeTerciario?: string
}

export interface LocalInfoInterface extends LocalInterface {
  localizacao: LocalizacaoInterface

  projetosTotais: number
  projetosAtivos: number
  objetivosAtendidos: number
  idObjetivoComMaisProjetos: number
}

export interface LocalAcaoInterface extends LocalInterface {
  localizacao: LocalizacaoInterface
  unidade: UnidadeAcaoInterface
}
