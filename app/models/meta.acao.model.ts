import {
  ObjetivoAcaoInterfaceBuilter,
  type ObjetivoAcaoInterface,
} from './objetivo.acao.model'

export interface MetaAcaoInterface {
  id?: number
  codigo: string
  descricao: string
  objetivo: ObjetivoAcaoInterface
}

export function MetaAcaoInterfaceBuilder(): MetaAcaoInterface {
  return { codigo: '', descricao: '', objetivo: ObjetivoAcaoInterfaceBuilter() }
}
