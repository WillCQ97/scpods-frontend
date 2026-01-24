import type LocalizacaoInterface from './localizacao.model'

export interface LocalInfoInterface {
  id: number
  idd: number

  nomePrincipal: string
  nomeSecundario?: string
  nomeTerciario?: string

  localizacao: LocalizacaoInterface

  projetosTotais: number
  projetosAtivos: number
  objetivosAtendidos: number
  idObjetivoComMaisProjetos: number
}
