import type LocalizacaoInterface from './localizacao.model'
import { LocalizacaoInterfaceBuilder } from './localizacao.model'
import {
  UnidadeAcaoInterfaceBuilder,
  type UnidadeAcaoInterface,
} from './unidade.acao.model'

export interface LocalAcaoInterface {
  id?: number
  idd?: number
  nomePrincipal: string
  nomeSecundario?: string
  nomeTerciario?: string
  localizacao: LocalizacaoInterface
  unidade: UnidadeAcaoInterface
}

export function LocalAcaoInterfaceBuilder(): LocalAcaoInterface {
  return {
    nomePrincipal: '',
    nomeSecundario: '',
    nomeTerciario: '',
    localizacao: LocalizacaoInterfaceBuilder(),
    unidade: UnidadeAcaoInterfaceBuilder(),
  }
}
