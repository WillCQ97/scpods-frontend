import type { CoordenadorAcaoInterface } from './coordenador.model'
import type { LocalAcaoInterface } from './local.model'
import type { LotacaoInterface } from './lotacao.model'
import type { MetaAcaoInterface } from './meta.model'

export interface AcaoInterface {
  id: number
  titulo: string
  descricao: string

  dataCadastro: string
  dataInicio: string
  dataEncerramento: string

  aceito: boolean

  coordenador: CoordenadorAcaoInterface // campo extra nas submissões
  meta: MetaAcaoInterface
  local: LocalAcaoInterface
  lotacao: LotacaoInterface
}

export function AcaoInterfaceBuilder(): AcaoInterface {
  return {
    id: 0,
    titulo: '',
    descricao: '',

    dataCadastro: '',
    dataInicio: '',
    dataEncerramento: '',

    aceito: true,

    coordenador: {
      id: 0,
      nome: '',
      descricaoVinculo: '',
      tipoVinculo: '',
    },

    meta: {
      id: 0,
      codigo: '',
      descricao: '',

      objetivo: {
        id: 0,
        codigo: '',
        titulo: '',
        descricao: '',
      },
    },

    local: {
      id: 0,
      idd: 0,
      nomePrincipal: '',
      nomeSecundario: '',
      nomeTerciario: '',

      localizacao: { type: '', coordinates: [] },

      unidade: {
        id: 0,
        nome: '',
        codigo: '',
        campus: '',
      },
    },

    lotacao: {
      id: 0,
      descricao: '',
      sigla: '',
      campus: '',
    },
  }
}
