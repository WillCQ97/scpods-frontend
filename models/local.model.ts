import type { Localizacao } from './localizacao.model'

export interface Local {
  id: number
  idd: number
  nomePrincipal: string
  nomeSecundario?: string
  nomeTerciario?: string
  localizacao: Localizacao

  // pode ser extraído para outra interface que estende esta???
  projetosTotais: number
  projetosAtivos: number
  objetivosAtendidos: number
  idObjetivoComMaisProjetos: number
}
