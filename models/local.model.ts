import type Localizacao from './localizacao.model'

export interface Local {
  id: number
  idd: number
  nomePrincipal: string
  nomeSecundario?: string
  nomeTerciario?: string
  localizacao: Localizacao
}

export interface LocalInfo extends Local {
  projetosTotais: number
  projetosAtivos: number
  objetivosAtendidos: number
  idObjetivoComMaisProjetos: number
}
