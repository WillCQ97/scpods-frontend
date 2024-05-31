import type ILocalizacao from './localizacao.model'
import type { IUnidadeAcao } from './unidade.model'

interface Local {
  id: number
  idd: number
  nomePrincipal: string
  nomeSecundario?: string
  nomeTerciario?: string
  localizacao: ILocalizacao

  // info DTO
  projetosTotais?: number
  projetosAtivos?: number
  objetivosAtendidos?: number
  idObjetivoComMaisProjetos?: number

  // DTO da acao
  unidade?: IUnidadeAcao
}
