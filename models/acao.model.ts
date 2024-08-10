import type { CoordenadorInterface } from './coordenador.model'
import type { LocalAcao } from './local.model'
import type { LotacaoInterface } from './lotacao.model'
import type { MetaAcaoInterface } from './meta.model'

export interface AcaoInterface {
  id: number
  titulo: string
  descricao: string

  dataCadastro: string
  dataInicio: string
  dataEncerramento?: string

  aceito: boolean

  coordenador: CoordenadorInterface
  meta: MetaAcaoInterface
  local: LocalAcao
  lotacao: LotacaoInterface
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
