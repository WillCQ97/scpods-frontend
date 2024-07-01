import type { CoordenadorAcao } from './coordenador.model'
import type { LocalAcao } from './local.model'
import type { LotacaoAcao } from './lotacao.model'
import type { MetaAcao } from './meta.model'

export interface AcaoInterface {
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

// TODO: melhorar o uso dessas interfaces
export function AcaoInterfaceBuilder(): AcaoInterface {
  return {
    titulo: '',
    descricao: '',
    dataCadastro: '',
    dataInicio: '',
    dataEncerramento: undefined,
    coordenador: {
      nome: '',
      descricaoVinculo: '',
    },
    meta: {
      id: undefined,
      codigo: '',
      descricao: '',
      objetivo: {
        id: undefined,
        codigo: '',
        titulo: '',
        descricao: '',
      },
    },
    local: {
      nomePrincipal: '',
      nomeSecundario: undefined,
      nomeTerciario: undefined,
      unidade: {
        nome: '',
      },
    },
    lotacao: {
      descricao: '',
      sigla: '',
    },
  }
}
